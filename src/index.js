import './assets/styles/main.scss';
import {input, container, saveButton} from './modules/dom/elements.js';
import { inputFile, setStore, savePdf } from './modules/events/index';
import  { createStore, applyMiddleware } from 'redux';
import coveringApp from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(coveringApp, composeWithDevTools(
  applyMiddleware()
));


setStore(store);


inputFile(input,container);
savePdf(saveButton);

// unsuscribe();

    