import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import cardReducer from './actions/CardReducer'
import {
    dealHands,
    shuffle,
    playCards,
    resolvePot,
    addPlayer,
    selectCard
} from './actions/CardActions'

let store = createStore(cardReducer)

let actions = {
    dealHand: () => store.dispatch(dealHands()) ,
    shuffle: () => store.dispatch(shuffle()),
    playCards: (cards, playerId) => store.dispatch(playCards(cards, playerId)),
    resolvePot: () => store.dispatch(resolvePot()),
    addPlayer: () => store.dispatch(addPlayer()),
    selectCard: (card) => store.dispatch(selectCard(card))
}

const render = () => {
    ReactDOM.render(
    <Provider store={store}>
      <App state={store.getState()} actions={actions} />
    </Provider>,
    document.getElementById('root')
  )
}
store.subscribe(render)
render()
registerServiceWorker();
