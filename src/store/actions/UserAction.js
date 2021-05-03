import { REGISTER_USER, LOGIN_USER , LOGOUT_USER, AUTH_USER} from './type'
import axios from 'axios'

export function register(dataTodoSubmit) {
 
  const req = axios.post('http://localhost:4000/register', dataTodoSubmit)
      .then(res=>res.data)

  return { type: REGISTER_USER, payload: req }

}

export function loginUser(dataTodoSubmit) {
  const req =axios.post('http://localhost:4000/login', dataTodoSubmit)
    .then(res => res.data)
  return { type: LOGIN_USER, payload: req }
}


