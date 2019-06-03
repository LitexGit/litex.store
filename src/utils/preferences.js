
import Keys from '../constants/prefkeys'

const localStorage = window.localStorage

function getItem (key) {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (err) {
    return null
  }
}

function setItem (key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}

function clear () {
  localStorage.clear()
}

function keys () {
  return localStorage.keys()
}

function removeItem (key) {
  localStorage.removeItem(key)
}

export const PrefKeys = Keys
export const Preferences = {
  getItem,
  setItem,
  clear,
  keys,
  removeItem
}
