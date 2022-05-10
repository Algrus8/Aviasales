import { combineReducers } from 'redux'
import { store } from '../index'

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
  let newState

  switch (action.type) {
    case 'ALL':
      newState = { ...state }
      for (let key in newState) {
        state.all ? (newState[key] = false) : (newState[key] = true)
      }
      break
    case 'NON_STOP':
      newState = { ...state, nonStop: !state.nonStop }
      break
    case 'ONE_TRANSFER':
      newState = { ...state, oneTransfer: !state.oneTransfer }
      break
    case 'TWO_TRANSFERS':
      newState = { ...state, twoTransfers: !state.twoTransfers }
      break
    case 'THREE_TRANSFERS':
      newState = { ...state, threeTransfers: !state.threeTransfers }
      break

    default:
      return state
  }

  let { all, ...others } = newState

  const values = Object.values(others)
  const filtered = values.filter((value) => value)

  values.length === filtered.length ? (all = true) : (all = false)

  const result = { all, ...others }
  return result
}

const initialTickets = {
  searchId: null,
  ticketsArr: [],
  stop: false,
  visible: [],
  numberOfVisible: 0,
  firstCall: true,
}

function tickets(state = initialTickets, action) {
  switch (action.type) {
    case 'SEARCH_ID':
      return { ...state, searchId: action.payload.searchId }

    case 'SEARCH_TICKETS':
      const newArray = [].concat(...state.ticketsArr, action.payload.tickets)
      const showMore = state.numberOfVisible % 500 || (state.numberOfVisible < 500 && !state.firstCall)
      if (showMore) {
        return {
          ...state,
          visible: [...state.ticketsArr.slice(0, state.numberOfVisible + 5)],
          numberOfVisible: (state.numberOfVisible += 5),
          firstCall: false,
        }
      }
      return {
        ...state,
        ticketsArr: newArray,
        stop: action.payload.stop,
        visible: [...state.ticketsArr.slice(0, state.numberOfVisible), ...action.payload.tickets.slice(0, 5)],
        numberOfVisible: state.numberOfVisible + 5,
      }

    default:
      return state
  }
}

const reducers = combineReducers({ priority, checkBoxes, tickets })

export default reducers
