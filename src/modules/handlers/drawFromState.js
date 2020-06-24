import { drawRectangle } from '../draw/rectangle';

const drawFromState = (store) => {
  let state = store.getState();

  //loop 
  for(let i = 0; i<state.length; i++) {
    //get context
    let drawLayer = document.getElementById(state[i].idPage)
    let drawCtx = drawLayer.getContext('2d');
    for(let j=0; j <state[i].rectangles.length; j++) {
      let x, y, h, w;
      x = state[i].rectangles[j].x;
      y = state[i].rectangles[j].y;
      w = state[i].rectangles[j].w;
      h = state[i].rectangles[j].h;

      drawRectangle(drawCtx, x, y, w, h);
    }
  }
}

export default drawFromState;

