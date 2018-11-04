import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { questionActions } from '../../_actions';

function getUserAttr(key) {
  return JSON.parse(localStorage.getItem('user'))[key];
}

class PostPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      question: {
        title: '',
        content: '',
        // tags: '',
      },
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { question } = this.state;
    this.setState({
      question: {
        ...question,
        [name]: value,
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { question } = this.state;
    const { dispatch } = this.props;

    if (question.title && question.content) {
      dispatch(questionActions.post(
        getUserAttr('username'),
        question.title,
        question.content,
      ));
    }
  }

  render() {
    const { posting } = this.props;
    const { question, submitted } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Ask</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className={'form-group' + (submitted && !question.title ? ' has-error' : '')}>
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" name="title" value={question.title} onChange={this.handleChange} />
            {submitted && !question.title &&
            <div className="help-block">Title is required</div>
            }
          </div>
          <div className={'form-group' + (submitted && !question.content ? ' has-error' : '')}>
            <label htmlFor="content">Content</label>
            <input type="text" className="form-control" name="content" value={question.content} onChange={this.handleChange} />
            {submitted && !question.content &&
            <div className="help-block">Content is required</div>
            }
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Post Question</button>
            {posting &&
            <img src="https://loading.io/spinners/typing/lg.-text-entering-comment-loader.gif" />
            }
            <Link to="/login" className="btn btn-link">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { posting } = state.questions;
  return {
    posting,
  };
}

const connectedPostPage = connect(mapStateToProps)(PostPage);
export { connectedPostPage as PostPage };