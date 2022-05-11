import { combineReducers } from 'redux'

// const initialPriority = {
//   cheapest: true,
//   fastest: false,
//   optimal: false,
// }

// function priority(state = initialPriority, action) {
//   switch (action.type) {
//     case 'CHEAPEST':
//       return {
//         cheapest: true,
//         fastest: false,
//         optimal: false,
//       }

//     case 'FASTEST':
//       return {
//         cheapest: false,
//         fastest: true,
//         optimal: false,
//       }

//     case 'OPTIMAL':
//       return {
//         cheapest: false,
//         fastest: false,
//         optimal: true,
//       }

//     default:
//       return state
//   }
// }

// const initialcheckBoxes = {
//   all: false,
//   nonStop: false,
//   oneTransfer: false,
//   twoTransfers: false,
//   threeTransfers: false,
// }

// function filters(state = initialcheckBoxes, action) {
//   let newState

//   switch (action.type) {
//     case 'ALL':
//       newState = { ...state }
//       for (let key in newState) {
//         state.all ? (newState[key] = false) : (newState[key] = true)
//       }
//       break
//     case 'NON_STOP':
//       newState = { ...state, nonStop: !state.nonStop }
//       break
//     case 'ONE_TRANSFER':
//       newState = { ...state, oneTransfer: !state.oneTransfer }
//       break
//     case 'TWO_TRANSFERS':
//       newState = { ...state, twoTransfers: !state.twoTransfers }
//       break
//     case 'THREE_TRANSFERS':
//       newState = { ...state, threeTransfers: !state.threeTransfers }
//       break

//     default:
//       return state
//   }

//   let { all, ...others } = newState

//   const values = Object.values(others)
//   const filtered = values.filter((value) => value)

//   values.length === filtered.length ? (all = true) : (all = false)

//   const result = { all, ...others }
//   return result
// }

// const initialTickets = {
//   searchId: null,
//   ticketsArr: [],
//   visible: [],
//   sorted: [],
//   numberOfVisible: 0,
//   firstCall: true,
//   stop: false,
// }

// const tickets = (state = initialTickets, action) => {
//   let sorted
//   switch (action.type) {
//     case 'SEARCH_ID':
//       return { ...state, searchId: action.payload.searchId }

//     case 'SEARCH_TICKETS':
//       return {
//         ...state,
//         ticketsArr: [].concat(...state.ticketsArr, action.payload.tickets),
//         stop: action.payload.stop,
//       }

//     case 'SHOW_MORE':
//       return {
//         ...state,
//         visible: [...state.ticketsArr.slice(0, state.numberOfVisible + 5)],
//         numberOfVisible: (state.numberOfVisible += 5),
//         firstCall: false,
//       }

//     case 'CHEAPEST':
//       sorted = [...state.ticketsArr.sort((a, b) => a.price - b.price)].slice(0, state.numberOfVisible)
//       return {
//         ...state,
//         visible: sorted,
//         sorted,
//       }

//     case 'FASTEST':
//       sorted = [
//         ...state.ticketsArr.sort((a, b) => {
//           const durationA = a.segments.reduce((acc, value) => (acc += value.duration), 0)
//           const durationB = b.segments.reduce((acc, value) => (acc += value.duration), 0)
//           return durationA - durationB
//         }),
//       ].slice(0, state.numberOfVisible)

//       return {
//         ...state,
//         visible: sorted,
//         sorted,
//       }
//     case 'OPTIMAL':
//       return {
//         ...state,
//         visible: [
//           ...state.ticketsArr.sort((a, b) => {
//             return a - b
//           }),
//         ].slice(0, state.numberOfVisible),
//       }

//     default:
//       return state
//   }
// }

const initialState = {
  priority: {
    cheapest: true,
    fastest: false,
    optimal: false,
  },
  filters: {
    all: false,
    nonStop: false,
    oneTransfer: false,
    twoTransfers: false,
    threeTransfers: false,
  },
  tickets: {
    searchId: null,
    ticketsArr: [],
    visible: [],
    sorted: [],
    numberOfVisible: 0,
    firstCall: true,
    stop: false,
  },
}

const reducer = (state = initialState, action) => {
  let newFilters
  let sorted

  const calculateVisible = (arr, filters) => {
    if (filters.all) {
      return arr
    }
    const sorted = arr.slice()
    let result =[]
    if (filters.nonStop) {
      result = arr.filter((ticket) => ticket.segments[0].stops.length || ticket.segments[1].stops.length)
    }
    if(filters.oneTransfer){
      
    }
  }

  switch (action.type) {
    case 'CHEAPEST':
      sorted = [...state.tickets.ticketsArr.sort((a, b) => a.price - b.price)]
      return {
        ...state,
        priority: { cheapest: true, fastest: false, optimal: false },
        tickets: {
          ...state.tickets,
          sorted,
          visible: calculateVisible(sorted, state.filters),
        },
      }

    case 'FASTEST':
      return {
        ...state,
        priority: {
          cheapest: false,
          fastest: true,
          optimal: false,
        },
        tickets: {
          ...state.tickets,
          sorted: [
            ...state.tickets.ticketsArr.sort((a, b) => {
              const durationA = a.segments.reduce((acc, value) => (acc += value.duration), 0)
              const durationB = b.segments.reduce((acc, value) => (acc += value.duration), 0)
              return durationA - durationB
            }),
          ],
        },
      }

    case 'OPTIMAL':
      return {
        ...state,
        priority: {
          cheapest: false,
          fastest: false,
          optimal: true,
        },
      }
  }

  switch (action.type) {
    case 'ALL':
      newFilters = { ...state.filters }
      for (let key in newFilters) {
        state.filters.all ? (newFilters[key] = false) : (newFilters[key] = true)
      }
      break
    case 'NON_STOP':
      newFilters = { ...state.filters, nonStop: !state.filters.nonStop }
      break
    case 'ONE_TRANSFER':
      newFilters = { ...state.filters, oneTransfer: !state.filters.oneTransfer }
      break
    case 'TWO_TRANSFERS':
      newFilters = { ...state.filters, twoTransfers: !state.filters.twoTransfers }
      break
    case 'THREE_TRANSFERS':
      newFilters = { ...state.filters, threeTransfers: !state.filters.threeTransfers }
      break
  }

  if (newFilters) {
    let { all, ...others } = newFilters
    const values = Object.values(others)
    const filtered = values.filter((value) => value)
    values.length === filtered.length ? (all = true) : (all = false)
    const result = { all, ...others }
    return { ...state, filters: result }
  }

  switch (action.type) {
    case 'SEARCH_ID':
      return { ...state, tickets: { ...state.tickets, searchId: action.payload.searchId } }

    case 'SEARCH_TICKETS':
      return {
        ...state,
        tickets: {
          ...state.tickets,
          ticketsArr: [].concat(...state.tickets.ticketsArr, action.payload.tickets),
          stop: action.payload.stop,
        },
      }

    case 'SHOW_MORE':
      return {
        ...state,
        tickets: {
          ...state.tickets,
          visible: [...state.tickets.sorted.slice(0, state.tickets.numberOfVisible + 5)],
          numberOfVisible: (state.tickets.numberOfVisible += 5),
          firstCall: false,
        },
      }

    // case 'CHEAPEST':
    //   console.log()
    //   return {
    //     ...state,
    //     tickets: {
    //       ...state.tickets,
    //       sorted: [...state.tickets.ticketsArr.sort((a, b) => a.price - b.price)].slice(),
    //     },
    //   }

    case 'FASTEST':
      sorted = [
        ...state.ticketsArr.sort((a, b) => {
          const durationA = a.segments.reduce((acc, value) => (acc += value.duration), 0)
          const durationB = b.segments.reduce((acc, value) => (acc += value.duration), 0)
          return durationA - durationB
        }),
      ].slice(0, state.numberOfVisible)

      return {
        ...state,
        visible: sorted,
        sorted,
      }
    case 'OPTIMAL':
      return {
        ...state,
        visible: [
          ...state.ticketsArr.sort((a, b) => {
            return a - b
          }),
        ].slice(0, state.numberOfVisible),
      }

    default:
      return state
  }
}

// const rootReducer = combineReducers({ priority, filters, tickets })

export default reducer
