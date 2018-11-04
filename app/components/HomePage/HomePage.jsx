import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {questionActions, userActions} from '../../_actions';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.handleComment = this.handleComment.bind(this);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
  }

  componentDidMount() {
    // load data into redux state
    this.props.dispatch(questionActions.getAll());
  }

  handleComment(id) {
    const { dispatch } = this.props;
    dispatch(questionActions.delete(id));
  }

  handleUpvote(id) {
    const { dispatch } = this.props;
    dispatch(questionActions.upvote(id));
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
                  <h5 className="card-title">{question.title}</h5>
                  <p className="card-text">{question.content}</p>
                  <button onClick={(e) => this.handleComment(question.id)} className="btn btn-primary mx-3" style={buttonStyle}>
                    Comment
                  </button>
                  <button onClick={(e) => this.handleUpvote(question.id)} className="btn btn-primary mx-3" style={buttonStyle}>
                    Upvote {question.upvotes}
                  </button>
                  <button onClick={(e) => this.handleDownvote(question.id)} className="btn btn-primary mx-3" style={buttonStyle}>
                    Downvote {question.downvotes}
                  </button>
                </div>
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