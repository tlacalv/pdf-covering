import './assets/styles/main.scss';
import {input, container} from './modules/dom/elements.js';
import { inputFile, setStore } from './modules/events/index';
import  { createStore } from 'redux';
import coveringApp from './reducers';

const store = createStore(coveringApp);

console.log(store.getState());

const unsuscribe = store.subscribe(() => console.log(store.getState()));
setStore(store);


inputFile(input,container);


// unsuscribe();

    