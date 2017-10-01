// @flow

import React, { Component } from 'react';

export interface CardProps {
    suit: string,
    value: string,
    selected: boolean
}

interface WithActions extends CardProps {
    actions: {
        selectCard: Function
      }
}

export class Card extends Component<WithActions, any> {

    render() {
        let classes = ['card', `suit${this.props.suit}`]
        if (this.props.selected) {
            classes.push('selected')
        }
        return (
            <div
                className={classes.join(' ')}
                onClick={() => this.props.actions.selectCard(this.props)}
            >
                <p>{this.props.value}</p>
            </div>
        )
    }
}