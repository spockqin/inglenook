import { questionConstants } from '../_constants';
import { questionService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const questionActions = {
  post,
  getAll,
  upvote,
  downvote,
};

function post(username, title, content) {
  function request(question) { return { type: questionConstants.POST_REQUEST, question } }
  function success(question) { return { type: questionConstants.POST_SUCCESS, question } }
  function failure(error) { return { type: questionConstants.POST_FAILURE, error } }

  return (dispatch) => {
    dispatch(request({ username }));

    questionService.post(username, title, content)
      .then(
        question => {
          dispatch(success(question));
          history.push('/');
          dispatch(alertActions.success('Question posted'));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        },
      );
  };
}

function getAll() {
  function request(question) { return { type: questionConstants.GETALL_REQUEST, question } }
  function success(question) { return { type: questionConstants.GETALL_SUCCESS, question } }
  function failure(error) { return { type: questionConstants.GETALL_FAILURE, error } }

  return (dispatch) => {
    dispatch(request());

    questionService.getAll()
      .then(
        questions => dispatch(success(questions)),
        (error) => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        },
      );
  };
}

function upvote(id) {
  console.log("questionAction calling upvote");
  function request(question) { return { type: questionConstants.UPVOTE_REQUEST, question } }
  function success(question) { return { type: questionConstants.UPVOTE_SUCCESS, question } }
  function failure(error) { return { type: questionConstants.UPVOTE_FAILURE, error } }

  return (dispatch) => {
    dispatch(request({ id }));

    questionService.upvote(id)
      .then(
        question => {
          dispatch(success(question));
          // dispatch(alertActions.success('Question posted'));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        },
      );
  };
}

function downvote(id) {
  function request(question) { return { type: questionConstants.DOWNVOTE_REQUEST, question } }
  function success(question) { return { type: questionConstants.DOWNVOTE_SUCCESS, question } }
  function failure(error) { return { type: questionConstants.DOWNVOTE_FAILURE, error } }

  return (dispatch) => {
    dispatch(request({ id }));

    questionService.downvote(id)
      .then(
        question => {
          dispatch(success(question));
          // dispatch(alertActions.success('Question posted'));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        },
      );
  };
}

// function deleteUser(id) {
//   return dispatch => {
//     dispatch(request(id));
//
//     userService.delete(id)
//       .then(
//         user => dispatch(success(id)),
//         error => dispatch(failure(id, error.toString()))
//       );
//   };
//
//   function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
//   function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
//   function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
// }
