import Constants   from   "../constants";

export default (state = {}, action) => {
  switch (action.type) {
    case Constants.ADD_CONTACT:
      return { ...state, contact: action.payload };
    case Constants.GET_CONTACTS:
      return { ...state, contacts: action.payload };
    case Constants.GET_CONTACT:
      return { ...state, contact: action.payload };
    case Constants.DELETE_CONTACT:
      return { ...state, contact: action.payload };
    case Constants.EDIT_CONTACT:
      return { ...state, contact: action.payload };

    default:
      return state;
  }
};
