// @flow

import { HandProps, handValue } from '../components/Hand'
import { CardProps } from '../components/Card'
import Deck from '../components/Deck'
import {
    Action,
    PlayCardsAction,
    DEAL_HAND,
    SHUFFLE,
    PLAY_CARDS,
    RESOLVE_POT,
    ADD_PLAYER,
    SELECT_CARD
} from './CardActions'

export interface State {
    players: Player[],
    deck: Deck
}

export interface Player {
    id: number,
    hand: HandProps,
    played: HandProps,
    won: HandProps
}

const initialState: State = {
    players: [],
    deck: new Deck()
}

function dealHands(state: State, action: Action): State {
    const player = state.players.map(player => {
        const count = 5 - player.hand.cards.length
        try {
            const cards = [...player.hand.cards, ...state.deck.deal(count)]
            player.hand.cards = cards
        } catch (e) {
            return player
        }
        return player
    })
    return { ...state, player }
}

function shuffle(state: State, action: Action): State {
    state.deck.shuffle()
    return state
}

function playCards(state: State, action: PlayCardsAction): State {
    const players = state.players.map(player => {
        if (player.id !== action.playerId) {
            return player
        }
        const hand = player.hand.cards.filter(card => {
            return action.cards.filter(c => cardMatch(c, card)).length == 0
        })
        const played = player.hand.cards.filter(card => {
            return action.cards.filter(c => cardMatch(c, card)).length == 1
        })
        player.hand.cards = hand
        player.played.cards = played
        return player
    })
    return { ...state, players }
}

function cardMatch(a: CardProps, b: CardProps): boolean {
    return a.suit == b.suit && a.value == b.value
}

function resolvePot(state: State, action: Action) {
    const values = state.players.map(player => ({ id: player.id, value: handValue(player.played.cards) }))
    const winner = values.reduce((a, b) => Math.max(a.value, b.value) == a.value ? a : b, { value: 0, id: null })
    const cards: CardProps[] = state.players.reduce((carry, player) => [...carry, ...player.played.cards], [])
    const players = state.players.map(player => {
        if (player.id === winner.id) {
            player.won.cards = [...player.won.cards, ...cards]
        }
        player.played.cards = []
        return player
    })
    return { ...state, players }
}

function addPlayer(state: State, action: Action) {
    const player: Player = {
        hand: {
            cards: []
        },
        won: {
            cards: []
        },
        played: {
            cards: []
        },
        id: state.players.length + 1
    }
    const players = [...state.players, player]
    return { ...state, players }
}

function selectCard(state: State, card: CardProps) {
    const players = state.players.map(player => {
        const cards = player.hand.cards.map(c => {
            if (c.suit == card.suit && c.value == card.value) {
                const selected = !c.selected 
                return { ...c, selected }
            }
            return c
        })
        player.hand.cards = cards
        return player
    })
    return { ...state, players }
}

function reducer(state: State = initialState, action: Action | PlayCardsAction): State {
    switch (action.type) {
        case DEAL_HAND:
            return dealHands(state, action)
        case SHUFFLE:
            return shuffle(state, action)
        case PLAY_CARDS:
            if (action.playerId && action.cards) {
                return playCards(state, action)
            }
        case RESOLVE_POT:
            return resolvePot(state, action)
        case ADD_PLAYER:
            return addPlayer(state, action)
        case SELECT_CARD:
            return selectCard(state,action.card)
        default:
            return state
    }
}

export default reducer