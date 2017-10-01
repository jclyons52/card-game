// @flow

import { CardProps } from './Card'
import { handValue } from './Hand'

it('gives a point for each card', () => {
    const cards: CardProps[] = [
        {
            suit: 'hearts',
            value: '5',
            selected: false
        }
    ] 

    expect(handValue(cards)).toBe(5)

})
it('gives a point for each sequential card', () => {
    const cards: CardProps[] = [
        {
            suit: 'hearts',
            value: '1',
            selected: false
        },
        {
            suit: 'clubs',
            value: '2',
            selected: false
        },
        {
            suit: 'spades',
            value: '3',
            selected: false
        },
    ] 

    expect(handValue(cards)).toBe(8)
})
it('gives a point for each card of the same suit', () => {
    const cards: CardProps[] = [
        {
            suit: 'hearts',
            value: '1',
            selected: false
        },
        {
            suit: 'hearts',
            value: '3',
            selected: false
        },
        {
            suit: 'hearts',
            value: '5',
            selected: false
        },
    ] 

    expect(handValue(cards)).toBe(11)
})

it('gives an additional point for each card of the same number', () => {
    
})

