import {rectangle} from '../draw/rectangle';
import { testar } from '../modals/testar';

const tempLayerHandler = (e) => {
  let rect = new rectangle(e);
  switch(e.type){
    case 'mousedown':
      rect.handleMouseDown(e);
      break;
    case 'mousemove':
      rect.handleMouseMove(e);
    break;
    case 'mouseup':
      testar(rect.handleMouseUp(e));
    break;
    case 'mouseout':
      rect.handleMouseOut(e);
    break;

  }
}




export default tempLayerHandler;
