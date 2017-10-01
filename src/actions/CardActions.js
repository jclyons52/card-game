// @flow

import { CardProps } from '../components/Card'

export const DEAL_HAND = 'DEAL_HAND'
export const SHUFFLE = 'SHUFFLE'
export const PLAY_CARDS = 'PLAY_CARDS'
export const RESOLVE_POT = 'RESOLVE_POT'
export const ADD_PLAYER = 'ADD_PLAYER'
export const SELECT_CARD = 'SELECT_CARD'

export interface Action {
    type: string
}

export interface PlayCardsAction extends Action {
    cards: CardProps[],
    playerId: number
}


export function dealHands(): Action {
    return {
        type: DEAL_HAND
    }
}
export function shuffle(): Action {
    return {
        type: SHUFFLE
    }
}
export function playCards(cards: CardProps[], playerId: number): PlayCardsAction {
    return {
        type: PLAY_CARDS,
        cards,
        playerId
    }
}
export function resolvePot(): Action {
    return {
        type: RESOLVE_POT
    }
}

export function addPlayer(): Action {
    return {
        type: ADD_PLAYER
    }
}

export function selectCard(card: CardProps) {
    return {
        type: SELECT_CARD,
        card: card
    }
}


