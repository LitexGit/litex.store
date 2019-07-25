import { Preferences, PrefKeys } from '../../utils/preferences'

export function update (state, payload) {
  Object.keys(payload).forEach(key => {
    this._vm.$set(state, key, payload[key])
  })
}

export function addCard (state, card) {
  state.cards.push(card)
  Preferences.setItem(PrefKeys.GAS_CARDS, state.cards)
}

export function removeCard (state, card) {
  if (state.selectedCard.id === card.id) {
    state.selectedCard = null
  }
  state.cards.splice(state.cards.findIndex(item => item.id === card.id), 1)
  Preferences.setItem(PrefKeys.GAS_CARDS, state.cards)
}

export function initCards (state) {
  const cards = Preferences.getItem(PrefKeys.GAS_CARDS)
  state.cards = cards === null ? [] : cards
}
