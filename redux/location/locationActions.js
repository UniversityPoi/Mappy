export const SET_LOCATION = "SET_LOCATION";


/*
location: [{
  id: string,
  userId: string,
  name: string,
  date: string,
  latitude: number,
  longitude: number
}]
*/
export const setLocation = location => dispatch => {
  dispatch({
    type: SET_LOCATION,
    payload: location
  })
}