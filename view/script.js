import '@mdi/font/scss/materialdesignicons.scss';
import 'bootstrap/scss/bootstrap.scss';
import './scss/app.scss';

import bootstrap from 'bootstrap';
import Shuffle from 'shufflejs';
import Typed from 'typed.js';


const shuffleInstance = new Shuffle(document.getElementById('grid'), {
  itemSelector: '.item',
  sizer: '.js-shuffle-sizer'
});

