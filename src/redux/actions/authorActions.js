import * as types from './actionTypes'
import AuthorApi from '../../api/mockAuthorApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions'


export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}


//thunk function to get async data..
export function loadAuthors() {
  return dispatch => {
    dispatch(beginAjaxCall());
    return AuthorApi.getAllAuthors()
      .then(authors => { dispatch(loadAuthorsSuccess(authors)); })
      .catch(error => {
        dispatch(ajaxCallError());
        throw (error);
      });
  };
}


