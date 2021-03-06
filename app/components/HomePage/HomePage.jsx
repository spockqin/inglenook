import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {questionActions, userActions} from '../../_actions';
import utils from '../../utils';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      commentEnabled: false,
      comment: "",
    };

    this.handleEnableComment = this.handleEnableComment.bind(this);
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
  }

  async componentDidMount() {
    // load data into redux state
    this.props.dispatch(questionActions.getAll());
    await utils.setTronWeb(window.tronWeb);
  }

  handleEnableComment(id) {
    this.setState({commentEnabled: true});
  }

  handleCommentChange(event) {
    const { value } = event.target;
    this.setState({
      comment: value,
    });
  }

  handleSubmitComment(event, id) {
    event.preventDefault();

    const { dispatch } = this.props;
    const { comment } = this.state;
    console.log("comment is:::: ", comment);
    dispatch(questionActions.comment(id, comment));
    this.setState({comment: "", commentEnabled: false});
  }

  handleUpvote(id) {
    const { dispatch } = this.props;
    dispatch(questionActions.upvote(id));
    const posterAddr = '"TLMqCdsX3dXLAebEms41moaa2jrKnaxDHp"';
    utils.contract.mint(1, posterAddr).send({
      shouldPollResponse: true,
      callValue: 0,
    }).then(res => {
      console.log(res);
    });
  }

  handleDownvote(id) {
    const { dispatch } = this.props;
    dispatch(questionActions.downvote(id));
  }

  render() {
    const { user, questions } = this.props;
    const questionsLocal = JSON.parse(localStorage.getItem('questions'));
    const cardStyle = {
      width: '70rem',
      margin: '50px',
      border: '2px solid #f9f9f9',
    };
    const cardBodyStyle = {
      margin: '10px',
    };
    const buttonStyle = {
      margin: '10px',
    };
    const { commentEnabled, comment } = this.state;
    return (
      <div className="jumbotron">
        <div className="col-md-6 col-md-offset-3">
          <h1 className="display-4">Hi, {user.firstName}</h1>
          <p className="lead">
            <Link to="/post">Post</Link>
          </p>
          <p className="lead">
            <Link to="/login">Log out</Link>
          </p>
          <hr className="my-4" />
        </div>
        <div className="col-xl-1 col-lg-6 offset-lg-3">
          {questions.loading && <em>Loading questions...</em>}
          {questionsLocal && questionsLocal.map(question =>
              <div className="card bg-light mb-3 border-primary" style={cardStyle}>
                <div className="card-body" style={cardBodyStyle}>
                  <h3 className="card-title">{question.title}</h3>
                  <p className="card-text">{question.content}</p>
                  <button onClick={(e) => this.handleEnableComment(question.id)} className="btn btn-primary mx-3" style={buttonStyle}>
                    Comment
                  </button>
                  <button onClick={(e) => this.handleUpvote(question.id)} className="btn btn-primary mx-3" style={buttonStyle}>
                    Upvote {question.upvotes}
                  </button>
                  <button onClick={(e) => this.handleDownvote(question.id)} className="btn btn-primary mx-3" style={buttonStyle}>
                    Downvote {question.downvotes}
                  </button>
                </div>
                {commentEnabled &&
                  <form name="form" onSubmit={(e) => this.handleSubmitComment(e, question.id)}>
                    <div className='form-group'>
                      <label htmlFor="content">Post Comment</label>
                      <input type="text" className="form-control" name="content" value={comment} onChange={this.handleCommentChange} />
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary">Post Comment</button>
                    </div>
                  </form>
                }
                <h4 className="card-text">Comments</h4>
                {question.comments && question.comments.map(comment =>
                  <div>
                    <p className="card-text">{comment}</p>
                    <button onClick={(e) => this.handleUpvote(question.id)} className="btn btn-primary mx-3" style={buttonStyle}>
                      Upvote {question.upvotes}
                    </button>
                    <button onClick={(e) => this.handleDownvote(question.id)} className="btn btn-primary mx-3" style={buttonStyle}>
                      Downvote {question.downvotes}
                    </button>
                  </div>
                )}
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, questions, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users,
    questions,
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };