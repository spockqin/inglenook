import { questionConstants } from '../_constants';

export function questions(state = {}, action) {
  switch (action.type) {
    case questionConstants.GETALL_REQUEST:
      return { loading: true };
    case questionConstants.GETALL_SUCCESS:
      return {
        items: action.questions,
      };
    case questionConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case questionConstants.POST_REQUEST:
      return { posting: true };
    case questionConstants.POST_SUCCESS:
      return {};
    case questionConstants.POST_FAILURE:
      return {};
    case questionConstants.UPVOTE_REQUEST:
      return { voting: true };
    case questionConstants.UPVOTE_SUCCESS:
      return {};
    case questionConstants.UPVOTE_FAILURE:
      return {};
    case questionConstants.DOWNVOTE_REQUEST:
      return { voting: true };
    case questionConstants.DOWNVOTE_SUCCESS:
      return {};
    case questionConstants.DOWNVOTE_FAILURE:
      return {};
    default:
      return state;
  }
}
