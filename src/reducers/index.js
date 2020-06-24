import { ADD_PAGE, ADD_RECTANGLE, DELETE_ALL } from '../actions';

function coveringApp(state = [], action) {
  switch(action.type) { 
    case ADD_PAGE: 
      return [
        ...state, 
        {
          idPage: action.idPage,
          numPage: action.numPage,
          rectangles: []
        }
      ]
    case ADD_RECTANGLE: 
      return state.map( page => { 
        if(page.idPage === action.payload.idPage) {
          return Object.assign({}, page, {
            rectangles: [
              ...page.rectangles,
              {
                text: action.payload.text,
                x: action.payload.x,
                y: action.payload.y,
                h: action.payload.h,
                w: action.payload.w
              }
            ]
          });
        }
        return page;   
      });
    case DELETE_ALL: 
      return []
    default:
      return state
  }
}

export default coveringApp;