import { SET_LOCATION } from "./locationActions";

const initialState = {
  favoriteLocations: []
};

function locationReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOCATION:
      return { ...state, favoriteLocations: action.payload };
    default:
      return state;
  }
}

export default locationReducer;