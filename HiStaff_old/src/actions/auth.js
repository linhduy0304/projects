import {
  FETCH_LOGIN,
  DATA_USER
} from './actionTypes';
import Const from '../services/Const';

export const dataUser = (header) => {
  return {
    type: DATA_USER,
    header
  }
}

export const login = (header) => {
  return {
    type: FETCH_LOGIN,
    header,
  }
}
