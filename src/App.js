// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Player } from './components/Player'
import { CardProps } from './components/Card'
import Deck from './components/Deck'
import { State } from './actions/CardReducer'

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/css/bootstrap-theme.css'
// import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import './App.css';

let deck = new Deck()

interface AppProps {
  state: State,
  actions: {
    dealHand: Function,
    shuffle: Function,
    playCards: Function,
    resolvePot: Function,
    addPlayer: Function,
    selectCard: Function
  }
}

class App extends Component<AppProps, any> {

  deal: Function
  shuffle: Function

  constructor(props: AppProps) {
    super(props)

    this.deal = () => props.actions.dealHand()
    this.shuffle = () => {
      props.actions.shuffle()
    }
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.deal} >deal</button>
        <button onClick={this.shuffle} >shuffle</button>
        <button onClick={this.props.actions.addPlayer} >Add player</button>
        <button onClick={this.props.actions.resolvePot} >Resolve Pot</button>
        {this.props.state.players.map(player => {
          const actions = {
            playCards: this.props.actions.playCards,
            selectCard: this.props.actions.selectCard
          }
          return (
            <Player
              hand={player.hand}
              played={player.played}
              won={player.won}
              actions={actions}
              id={player.id}
            />
          )
        })}
      </div>
    );
  }
}

export default App;

