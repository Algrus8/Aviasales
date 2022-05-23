export const onCheapest = () => ({ type: 'CHEAPEST' })
export const onFastest = () => ({ type: 'FASTEST' })
export const onOptimal = () => ({ type: 'OPTIMAL' })
export const onAll = () => ({ type: 'ALL' })
export const onFirstCall = () => ({ type: 'FIRST_CALL' })
export const onNonStop = () => ({ type: 'NON_STOP' })
export const onOneTransfer = () => ({ type: 'ONE_TRANSFER' })
export const onTwoTransfers = () => ({ type: 'TWO_TRANSFERS' })
export const onThreeTransfers = () => ({ type: 'THREE_TRANSFERS' })
export const onShowMore = () => ({ type: 'SHOW_MORE' })

export const fetchSearchId = () => async (dispatch) => {
  try {
    const response = await fetch('https://aviasales-test-api.kata.academy/search')
    const json = await response.json()
    dispatch({ type: 'SEARCH_ID', payload: json })
  } catch (error) {
    if (navigator.onLine) dispatch(fetchSearchId())
    if (!navigator.onLine) setTimeout(() => dispatch(fetchSearchId()), 5000)
    throw new Error(error.message)
  }
}

export const fetchTickets = (searchId) => async (dispatch) => {
  try {
    const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
    const json = await response.json()
    dispatch({ type: 'SEARCH_TICKETS', payload: json })
  } catch (error) {
    if (navigator.onLine) dispatch(fetchTickets(searchId))
    if (!navigator.onLine) setTimeout(() => dispatch(fetchTickets(searchId)), 5000)
    throw new Error(error.message)
  }
}
