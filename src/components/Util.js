
export function randValue(a: Array<any>) {
    return a[randIndex(a)]
}

export function randIndex(a: Array<any>): number {
    return Math.floor(Math.random() * a.length)
}

export const suits = {
    diamonds: 'diamonds',
    hearts: 'hearts',
    clubs: 'clubs',
    spades: 'spades'
}

export const cardValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']