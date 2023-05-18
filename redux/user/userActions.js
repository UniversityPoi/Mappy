export const SET_USER = "SET_USER";


/*
user: {
  username: string,
  email: string,
  token: string,
}
*/
export const setUser = user => dispatch => {
  dispatch({
    type: SET_USER,
    payload: user
  })
}