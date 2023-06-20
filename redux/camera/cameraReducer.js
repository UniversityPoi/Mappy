import { SET_CAMERA } from "./cameraAction";

const initialState = {
  camera: []
};

function cameraReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CAMERA:
      return { ...state, camera: action.payload };
    default:
      return state;
  }
}

export default cameraReducer;