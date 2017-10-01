// @flow

import React, { Component } from 'react';
import { Card, CardProps } from './Card'
import { cardValues } from './Util'

export interface HandProps {
  cards: CardProps[]
}

interface PropsWithActions extends HandProps {
  actions: {
    selectCard: Function
  }
}

export class Hand extends Component<PropsWithActions, any> {
  render() {
    const selectCard = this.props.actions.selectCard
    return (
      <div className="hand">
        {this.props.cards.map(c => (
          <Card 
          suit={c.suit} 
          value={c.value} 
          selected={c.selected} 
          actions={{ selectCard }} />
        ))}
      </div>
    )
  }
}

export function handValue(cards: CardProps[]): number {
  return cards.reduce((sum, card) => {
    const added = sum + cardValues.indexOf(card.value) + 1
    return added
  }, 0)
}