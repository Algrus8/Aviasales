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
    firstCall: true,
    stop: false,
  },
}

const calculateVisible = (sorted, filters, numberOfVisible) => {
  const visible = numberOfVisible === 0 ? 5 : numberOfVisible
  if (filters.all) {
    return sorted.slice(0, visible)
  }
  const filtered = sorted.filter((ticket) => {
    const thereStops = ticket.segments[0].stops.length
    const backStops = ticket.segments[1].stops.length

    if (filters.nonStop && thereStops === 0 && backStops === 0) {
      return ticket
    }
    if (filters.oneTransfer && thereStops === 1 && backStops === 1) {
      return ticket
    }
    if (filters.twoTransfers && thereStops === 2 && backStops === 2) {
      return ticket
    }
    if (filters.threeTransfers && thereStops === 3 && backStops === 3) {
      return ticket
    }
    return
  })
  return filtered.slice(0, visible)
}

const calculateFilters = (filters) => {
  let { all, ...others } = filters
  const values = Object.values(others)
  const filtered = values.filter((value) => value)
  values.length === filtered.length ? (all = true) : (all = false)
  const result = { all, ...others }
  return result
}

const calculateSorted = (priority, tickets) => {
  const { cheapest, fastest, optimal } = priority
  const [...ticketsArr] = tickets
  if (cheapest) {
    return ticketsArr.sort((a, b) => a.price - b.price)
  }
  if (fastest) {
    return ticketsArr.sort((a, b) => {
      const durationA = a.segments.reduce((acc, value) => (acc += value.duration), 0)
      const durationB = b.segments.reduce((acc, value) => (acc += value.duration), 0)
      return durationA - durationB
    })
  }
  if (optimal) {
    const averageTime =
      ticketsArr.reduce((acc, ticket) => (acc += ticket.segments[0].duration + ticket.segments[1].duration), 0) /
      ticketsArr.length

    return ticketsArr
      .sort((a, b) => a.price - b.price)
      .filter((ticket) => {
        return ticket.segments.reduce((acc, value) => (acc += value.duration), 0) < averageTime * 0.7
      })
  }
  return tickets
}

const reducer = (state = initialState, action) => {
  const { type } = action
  const { ticketsArr } = state.tickets
  const numberOfVisible = state.tickets.visible.length

  if (type === 'CHEAPEST') {
    const priority = { cheapest: true, fastest: false, optimal: false }
    const sorted = calculateSorted(priority, ticketsArr)
    return {
      ...state,
      priority,
      tickets: {
        ...state.tickets,
        sorted,
        visible: calculateVisible(sorted, state.filters, numberOfVisible),
      },
    }
  }

  if (type === 'FASTEST') {
    const priority = {
      cheapest: false,
      fastest: true,
      optimal: false,
    }
    const sorted = calculateSorted(priority, ticketsArr)

    return {
      ...state,
      priority,
      tickets: {
        ...state.tickets,
        sorted,
        visible: calculateVisible(sorted, state.filters, numberOfVisible),
      },
    }
  }

  if (type === 'OPTIMAL') {
    const priority = {
      cheapest: false,
      fastest: false,
      optimal: true,
    }

    const sorted = calculateSorted(priority, ticketsArr)

    return {
      ...state,
      priority,
      tickets: {
        ...state.tickets,
        sorted,
        visible: calculateVisible(sorted, state.filters, numberOfVisible),
      },
    }
  }

  if (type === 'ALL') {
    let newFilters = { ...state.filters }
    for (let key in newFilters) {
      state.filters.all ? (newFilters[key] = false) : (newFilters[key] = true)
    }
    newFilters = calculateFilters(newFilters)
    return {
      ...state,
      filters: newFilters,
      tickets: {
        ...state.tickets,
        visible: calculateVisible(state.tickets.sorted, newFilters, numberOfVisible),
      },
    }
  }

  if (type === 'NON_STOP') {
    const newFilters = calculateFilters({ ...state.filters, nonStop: !state.filters.nonStop })

    return {
      ...state,
      filters: newFilters,
      tickets: {
        ...state.tickets,
        visible: calculateVisible(state.tickets.sorted, newFilters, numberOfVisible),
      },
    }
  }

  if (type === 'ONE_TRANSFER') {
    const newFilters = calculateFilters({ ...state.filters, oneTransfer: !state.filters.oneTransfer })
    return {
      ...state,
      filters: newFilters,
      tickets: {
        ...state.tickets,
        visible: calculateVisible(state.tickets.sorted, newFilters, numberOfVisible),
      },
    }
  }

  if (type === 'TWO_TRANSFERS') {
    const newFilters = calculateFilters({ ...state.filters, twoTransfers: !state.filters.twoTransfers })
    return {
      ...state,
      filters: newFilters,
      tickets: {
        ...state.tickets,
        visible: calculateVisible(state.tickets.sorted, newFilters, numberOfVisible),
      },
    }
  }
  if (type === 'THREE_TRANSFERS') {
    const newFilters = calculateFilters({ ...state.filters, threeTransfers: !state.filters.threeTransfers })
    return {
      ...state,
      filters: newFilters,
      tickets: {
        ...state.tickets,
        visible: calculateVisible(state.tickets.sorted, newFilters, numberOfVisible),
      },
    }
  }

  if (type === 'SEARCH_ID') {
    return { ...state, tickets: { ...state.tickets, searchId: action.payload.searchId } }
  }

  if (type === 'SEARCH_TICKETS') {
    const sorted = calculateSorted(state.priority, [].concat(ticketsArr, action.payload.tickets))
    return {
      ...state,
      tickets: {
        ...state.tickets,
        ticketsArr: [].concat(ticketsArr, action.payload.tickets),
        stop: action.payload.stop,
        sorted,
        visible: calculateVisible(sorted, state.filters, numberOfVisible),
      },
    }
  }

  if (type === 'SHOW_MORE') {
    return {
      ...state,
      tickets: {
        ...state.tickets,
        visible: calculateVisible(state.tickets.sorted, state.filters, numberOfVisible + 5),
      },
    }
  }

  if (type === 'FIRST_CALL') {
    return {
      ...state,
      tickets: {
        ...state.tickets,
        firstCall: false,
      },
    }
  }

  return state
}

export default reducer
