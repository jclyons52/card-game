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
  let sum = cards.reduce((sum, card) => {
    const added = sum + cardValues.indexOf(card.value) + 1
    return added
  }, 0)

  if (cards.length < 2) return sum
  if (onSuit(cards)) sum += countSum(cards.length)
  if (isSequential(cards)) sum += countSum(cards.length)
  if (sameNumber(cards)) sum += countSum(cards.length)
  return sum
}

export function canPlay(cards: CardProps[]): boolean {
  return isSequential(cards) || onSuit(cards) || sameNumber(cards)
}

function sameNumber(cards: CardProps[]) {
  const values = cards.map(card => card.value)
  return values.filter(value => value !== values[0]).length == 0
}

function onSuit(cards: CardProps[]): boolean {
  const suits = cards.map(card => card.suit)
  const start = suits[0]
  return suits.filter(suit => start !== suit).length == 0
}

function isSequential(cards: CardProps[]): boolean {
  const data = cards.map(card => cardValues.indexOf(card.value))
  data.sort((a, b) => {
    if (a > b) return 1
    if (a < b) return -1
    return 0
  })
  for (var i = 1, len = data.length; i < len; i++) {
    // check if current value smaller than previous value
    if (data[i] !== 1 + data[i - 1]) {
      if (!loopAround(data, i)) {
        return false;
      }
    }
  }
  return true;
}

function loopAround(data, i) {
  return data[i] == 0 && data[i - 1] == 11
}

function countSum(n: number, start = 0) {
  if (n < 1) return start
  return countSum(n - 1, start + n)
}