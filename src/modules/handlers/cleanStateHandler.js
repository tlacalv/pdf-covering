import { clearRectangle } from '../draw/rectangle';
import {deleteAll} from '../../actions/index';

const cleanStateHandler = (store) => {
  let state = store.getState();

  state.forEach(page => {
    let idPage = page.idPage;
    let pageCanvas = document.getElementById(idPage);
    let ctxPage = pageCanvas.getContext('2d');
    clearRectangle(ctxPage, 0, 0, pageCanvas.width, pageCanvas.height);

  });

  store.dispatch(deleteAll());
}

export default cleanStateHandler;
