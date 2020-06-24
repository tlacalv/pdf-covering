//ACTION TYPES
export const ADD_PAGE = 'ADD_PAGE';
export const ADD_RECTANGLE = 'ADD_RECTANGLE';
export const DELETE_ALL = 'DELETE_ALL';
export const DELETE_RECTANGLE = 'DELETE_RECTANGLE';

//ACTION CREATORS
export function addPage(idPage, numPage) {
  return {
    type: ADD_PAGE,
    idPage,
    numPage
  }
}

export function addRectangle(payload) {
  return {
    type: ADD_RECTANGLE,
    payload
  }
}

export function deleteAll() {
  return {
    type: DELETE_ALL
  }
}