import axios from 'axios';
import {
  LOGIN_USER,
	LOGIN_SUCCESS,
	LOGIN_FAILED,

	REGISTER_USER,
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	

	UPDATE_USER_DATA,
	UPDATE_USER_DATA_SUCCESS,
	UPDATE_USER_DATA_FAILED,

	
	FETCH_USER,

	FETCH_USER_FAILED,
  LOGOUT_SUCCESS,

} from './actions_type/actions_type_user';
import { sendAlert } from './AlertActions';
// import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'





export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_USER,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    
    const { data } = await axios.post(
      '/api/login',
      { email, password },
      config
    )
   
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    })
    
    dispatch(sendAlert('Login Successfully', 1))

    localStorage.setItem('userInfo', JSON.stringify(data));
    
  } catch (error) {
    dispatch({
      type: LOGIN_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    dispatch(sendAlert(error?.response?.data?.message ? error.response.data.message : "Server Error", 3))

  }
}




export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('paymentMethod')
  dispatch({ type: LOGOUT_SUCCESS })

}

export const register = (username, email, password) => async (dispatch) => {


  try {
    dispatch({
      type: REGISTER_USER,
    })

    
  if(!username || !email || !password){
    return dispatch(sendAlert('Please fill the Blank Field', 2));
  };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/register',
      { username, email, password },
      config
    )

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });

    dispatch(sendAlert('Account Create Successfully', 1));
    localStorage.setItem('userInfo', JSON.stringify(data));

  } catch (error) {
    dispatch({
      type: REGISTER_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    dispatch(sendAlert(error?.response?.data?.message ? error.response.data.message : "Server Error", 3))
  }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REGISTER_USER,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users/${id}`, config)

    dispatch({
      type: FETCH_USER,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout(dispatch))
    }
    dispatch({
      type: FETCH_USER_FAILED,
      payload: message,
    })
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  
  try {
    dispatch({
      type: UPDATE_USER_DATA,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/user/update`, user, config)

    dispatch({
      type: UPDATE_USER_DATA_SUCCESS,
      payload: data,
    })
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    })
    localStorage.setItem('userInfo', JSON.stringify(data));


  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout(dispatch))
    }
    dispatch({
      type: UPDATE_USER_DATA_FAILED,
      payload: message,
    })
  }
}

