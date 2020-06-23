import {rectangle} from '../draw/rectangle';
import { testar } from '../modals/testar';

const tempLayerHandler = (e, store) => {
  let rect = new rectangle(e);
  switch(e.type){
    case 'mousedown':
      rect.handleMouseDown(e);
      break;
    case 'mousemove':
      rect.handleMouseMove(e);
    break;
    case 'mouseup':
      testar(rect.handleMouseUp(e), store);
    break;
    case 'mouseout':
      rect.handleMouseOut(e);
    break;

  }
}




export default tempLayerHandler;
