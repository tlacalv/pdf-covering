import { ADD_PAGE, addPage } from '../actions';

function coveringApp(state = [], action) {
  switch(action.type) { 
    case ADD_PAGE: 
      return [
        ...state, 
        {
          idPage: action.idPage,
          numPage: action.numPage
        }
      ]
    default:
      return state
  }
}

export default coveringApp;