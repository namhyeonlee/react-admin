import { REGISTER_USER, LOGIN_USER  } from '../actions/type'

const initState = {
  email: '',
  password: '',
  name: '',
  age: '',
  gender: '',
  loading: false,

};

export default function (state = initState, action) {
  switch (action.type) {
    
    case REGISTER_USER:
      return {
        ...state,
        success: action.payload
      }
    case LOGIN_USER :
      return {
        ...state,
        loginSuccess: action.payload
      }
    
    default:
      return state;
  }
}

