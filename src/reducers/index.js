import { combineReducers } from 'redux'

const initialPriority = {
  cheapest: true,
  fastest: false,
  optimal: false,
}

function priority(state = initialPriority, action) {
  switch (action.type) {
    case 'CHEAPEST':
      return {
        cheapest: true,
        fastest: false,
        optimal: false,
      }

    case 'FASTEST':
      return {
        cheapest: false,
        fastest: true,
        optimal: false,
      }

    case 'OPTIMAL':
      return {
        cheapest: false,
        fastest: false,
        optimal: true,
      }

    default:
      return state
  }
}

const initialcheckBoxes = {
  all: false,
  nonStop: false,
  oneTransfer: false,
  twoTransfers: false,
  threeTransfers: false,
}

function checkBoxes(state = initialcheckBoxes, action) {
  const { type } = action
  let newState

  if (type === 'ALL') {
    newState = { ...state }
    for (let key in newState) {
      state.all ? (newState[key] = false) : (newState[key] = true)
    }
  }

  if (type === 'NON_STOP') {
    newState = { ...state, nonStop: !state.nonStop }
  }

  if (type === 'ONE_TRANSFER') {
    newState = { ...state, oneTransfer: !state.oneTransfer }
  }

  if (type === 'TWO_TRANSFERS') {
    newState = { ...state, twoTransfers: !state.twoTransfers }
  }

  if (type === 'THREE_TRANSFERS') {
    newState = { ...state, threeTransfers: !state.threeTransfers }
  }

  if (newState) {
    let { all, ...others } = newState

    const values = Object.values(others)
    const filtered = values.filter((value) => value)

    values.length === filtered.length ? (all = true) : (all = false)

    const result = { all, ...others }
    return result
  }

  return state
}

const reducers = combineReducers({ priority, checkBoxes })

export default reducers
