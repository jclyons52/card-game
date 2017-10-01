// @flow

import React, { Component } from 'react'
import { HandProps, Hand } from './Hand'

export interface PlayerProps {
    id: number,
    hand: HandProps,
    played: HandProps,
    won: HandProps,
    actions: {
        playCards: Function,
        selectCard: Function
    }
}

export class Player extends Component<PlayerProps, any> {
    render() {
        const selectCard = this.props.actions.selectCard
        return (
            <div className='row'>
                <div className="row">
                    <button onClick={() => this.props.actions.playCards(this.props.hand.cards.filter(c => c.selected), this.props.id)} >Play cards</button>
                    <span>won: {this.props.won.cards.length}</span>
                </div>
                <div className="row">
                <div className="col-sm-6">
                    <Hand cards={this.props.hand.cards} actions={{ selectCard }} />
                </div>
                <div className="col-sm-6">
                    <Hand cards={this.props.played.cards} actions={{selectCard: () => null}} />
                </div>
                </div>
            </div>
        )
    }
}