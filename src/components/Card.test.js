// @flow

import React from 'react'
import ReactDom from 'react-dom'
import { Card } from './Card'

const actions = {
    selecteCard: () => null
}
it('mounts without throwing an error', () => {
    const div = document.createElement('div')
    ReactDom.render(<Card suit={'hearts'} value={'1'} selected={false} actions={actions} />, div)
})