// @flow

import { CardProps } from './Card'
import { randIndex, suits, cardValues } from './Util' 

export default class Deck {

    cards: CardProps[]

    constructor() {
        this.cards = this.resetDeck()
    }

    shuffle() {
      this.cards = this.resetDeck()
    }

    resetDeck() {
        return Object.values(suits).map(suit => {
            return cardValues.map(value =>{
                 return { suit, value }
            })
        }).reduce((carry, item) => [ ...carry, ...item ])
    }

    deal(n: number): CardProps[] {
        if (n > this.cards.length) {
            return range(this.cards.length).map(i => this.dealCard())
        }
        return range(n).map(i => this.dealCard())
    }

    cardsLeft() {
        return this.cards.length
    }

    dealCard(): CardProps {
        if (this.cards.length === 0) {
            throw new Error('No cards left in deck')
        }
        const index = randIndex(this.cards)
        const card = this.cards[index]
        this.cards = this.cards.filter(c => c.suit !== card.suit || c.value !== card.value)
        return card
    }
}

function range(n) {
   return [...Array(n).keys()]
}