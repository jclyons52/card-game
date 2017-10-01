// @flow

import React, { Component } from 'react'
import { HandProps, Hand, handValue } from './Hand'

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
            <div className='panel panel-default'>
                <div className="panel-heading">
                    <button className='btn btn-primary' onClick={() => this.props.actions.playCards(this.props.hand.cards.filter(c => c.selected), this.props.id)} >Play cards</button>
                    <div className="pull-right">
                        <span>won: {this.props.won.cards.length}</span>
                    </div>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="panel panel-default">
                            <div className="panel-heading">Hand</div>
                            <div className="panel-body">
                            <Hand cards={this.props.hand.cards} actions={{ selectCard }} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                Played
                                <div className="pull-right">
                                    value: {handValue(this.props.played.cards)}
                                </div>
                            </div>
                            <div className="panel-body">
                            <Hand cards={this.props.played.cards} actions={{ selectCard: () => null }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}