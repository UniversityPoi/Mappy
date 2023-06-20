export const SET_CAMERA = "SET_CAMERA";


/*
camera: [<Mapbox.Camera/>]
*/
export const setCamera = camera => dispatch => {
  dispatch({
    type: SET_CAMERA,
    payload: camera
  })
}