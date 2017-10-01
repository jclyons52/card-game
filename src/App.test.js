import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Deck from './components/Deck'

it('renders without crashing', () => {
  let deck = new Deck()
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
