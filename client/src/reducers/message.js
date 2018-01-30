import Constants   from   "../constants";

export default (state = {}, action) => {
  switch (action.type) {
    case Constants.ADD_MESSAGE:
      return { ...state, newMessage: action.payload };
    case Constants.GET_MESSAGES:
      return { ...state, messages: action.payload };
    case Constants.DELETE_MESSAGE:
      return { ...state, deletedMsg: action.payload };
    case Constants.EDIT_MESSAGE:
      return { ...state, editedMsg: action.payload };

    default:
      return state;
  }
};
