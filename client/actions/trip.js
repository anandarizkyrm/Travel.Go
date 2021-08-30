import {
    GET_TRIP_SUCCESS, 
    GET_TRIP_FAILED,  
    GET_TRIP, 
    READ_ONE_TRIP_SUCCESS, 
    READ_ONE_TRIP_FAILED,  
    READ_ONE_TRIP, 
    CREATE_TRIP, 
    CREATE_TRIP_SUCCESS, 
    CREATE_TRIP_FAILED, 
    EDIT_TRIP, 
    EDIT_TRIP_SUCCESS, 
    EDIT_TRIP_FAILED, 
    DELETE_TRIP,
    DELETE_TRIP_SUCCESS,
    DELETE_TRIP_FAILED,
    REVIEW_TRIP,
    REVIEW_TRIP_SUCCESS,
    REVIEW_TRIP_FAILED,

} from './actions_type/actions_type_trip';
import axios from 'axios';
import { sendAlert } from './AlertActions';



export const getTrip = () => async (dispatch) => {
    try {
      dispatch({
        type: GET_TRIP,
      });

      const { data } = await axios.get(
        'http://127.0.0.1:5000/api/trip'
      )
  
      dispatch({
        type: GET_TRIP_SUCCESS,
        payload: data,
      });
  

      
    } catch (error) {
      dispatch({
        type: GET_TRIP_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
};


export const readOneTrip = (id) => async (dispatch, getState) => {

  try {
      dispatch({
        type: READ_ONE_TRIP,
      });
      
      
    const {
      userLogin: { userInfo },
    } = getState();


      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`http://127.0.0.1:5000/api/trip/${id}`, config)
  
      dispatch({
        type: READ_ONE_TRIP_SUCCESS,
        payload: data,
      });
  
     
      
    } catch (error) {
      dispatch({
        type: READ_ONE_TRIP_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
};

export const createTrip = (image) => async (dispatch, getState) => {
  console.log(image)
  try {
    dispatch({
      type: CREATE_TRIP,
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

    const { data } = await axios.post(`http://localhost:5000/api/trip`,image, config)
 
    dispatch({
      type: CREATE_TRIP_SUCCESS,
      payload: data,
    });
    dispatch(sendAlert('Create Trip Successfull', 1))
  } catch (error) {
    console.log(error)
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: CREATE_TRIP_FAILED,
      payload: message,
    });
    dispatch(sendAlert(error.response ? error.response.data.message : "Network Error", 3))
  }
}


export const editTrip = (id, trip) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EDIT_TRIP,
    })

    console.log(id)
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }


    const { data } = await axios.put(`http://localhost:5000/api/trip/${id}`, trip, config)
  
    dispatch({
      type: EDIT_TRIP_SUCCESS,
      payload: data,
    });
    dispatch(sendAlert('Edit Trip Successfull', 1))
  } catch (error) {
    
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }

    dispatch({
      type: EDIT_TRIP_FAILED,
      payload: message,
    });
    dispatch(sendAlert(error.response ? error.response.data.message : "Network Error", 3))
  }
}


export const deleteTrip = ( id ) => async (dispatch, getState) => {

  try {
    dispatch({
      type: DELETE_TRIP,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { deleted } = await axios.delete(`http://localhost:5000/api/trip/${id}`, config )

    dispatch({
      type: DELETE_TRIP_SUCCESS,
      payload: deleted,
    });
    dispatch(sendAlert('Delete Trip Successfull', 1))
  } catch (error) {
    console.log(error)
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    
    console.log(message)
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: DELETE_TRIP_FAILED,
      payload: message,
    });
    dispatch(sendAlert(error.response ? error.response.data.message : "Network Error", 3));
  }
}



export const createProductReview = (tripId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: REVIEW_TRIP,
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

    await axios.post(`http://localhost:5000/api/${tripId}/reviews`, review, config)

    dispatch({
      type: REVIEW_TRIP_SUCCESS,
      payload : 'Review Saved'
    });
  
  } catch (error) {
    console.log('babi')
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
      
        dispatch({
          type: REVIEW_TRIP_FAILED,
          payload: message,
        });

  }
}