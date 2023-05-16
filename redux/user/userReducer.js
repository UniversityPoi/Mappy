import { SET_USER } from "./userActions";

const initialState = {
  user: null
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export default userReducer;