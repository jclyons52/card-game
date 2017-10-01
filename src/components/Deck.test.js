// @flow

import Deck from './Deck'
import { suits } from './Util'

it('deals each card only once', () => {
    const deck = new Deck()
    const hands = deck.deal(52)
    expect(hands.filter(c => c.suit == suits.clubs).length).toBe(13)
    expect(hands.filter(c => c.suit == suits.clubs).length).toBe(13)
    expect(hands.filter(c => c.suit == suits.clubs).length).toBe(13)
    expect(hands.filter(c => c.suit == suits.clubs).length).toBe(13)
})