export const onCheapest = () => ({ type: 'CHEAPEST' })
export const onFastest = () => ({ type: 'FASTEST' })
export const onOptimal = () => ({ type: 'OPTIMAL' })

export const onAll = () => ({ type: 'ALL' })
export const onNonStop = () => ({ type: 'NON_STOP' })
export const onOneTransfer = () => ({ type: 'ONE_TRANSFER' })
export const onTwoTransfers = () => ({ type: 'TWO_TRANSFERS' })
export const onThreeTransfers = () => ({ type: 'THREE_TRANSFERS' })

export const onSearchId = (json) => ({ type: 'SEARCH_ID', payload: json })
export const fetchSearchId = () => {
  return (dispatch) => {
    fetch(`https://aviasales-test-api.kata.academy/search`)
      .then((response) => response.json())
      .then((json) => dispatch(onSearchId(json)))
      .catch((error) => {
        throw new Error(error.message)
      })
  }
}

export const onSearchTickets = (json) => ({ type: 'SEARCH_TICKETS', payload: json })
export const fetchTickets = (searchId) => {
  return (dispatch) => {
    fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
      .then((response) => response.json())
      .then((json) => dispatch(onSearchTickets(json)))
      .catch((error) => {
        throw new Error(error.message)
      })
  }
}
