import rectangle from './rectangle';

const ev_canvas = (e) => {
  let rect = new rectangle(e);
  switch(e.type){
    case 'mousedown':
      rect.handleMouseDown(e);
      break;
    case 'mousemove':
      rect.handleMouseMove(e);
    break;
    case 'mouseup':
      rect.handleMouseUp(e);
    break;
    case 'mouseout':
      rect.handleMouseOut(e);
    break;

  }
}




export default ev_canvas;
