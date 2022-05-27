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
export const onError = (message) => ({ type: 'ERROR', payload: message })

const requestRetry = async (url, n) => {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(response.statusText)
    return response
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('проверьте подключение к интернету')
    }
    if (n <= 1) throw error
    return await requestRetry(url, n - 1)
  }
}

export const fetchSearchId = () => async (dispatch) => {
  try {
    const response = await requestRetry('https://aviasales-test-api.kata.academy/search', 5)
    const json = await response.json()
    dispatch({ type: 'SEARCH_ID', payload: json })
  } catch (error) {
    dispatch(onError(error.message))
    throw new Error(error.message)
  }
}

export const fetchTickets = (searchId) => async (dispatch) => {
  try {
    const response = await requestRetry(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`, 5)
    const json = await response.json()
    dispatch({ type: 'SEARCH_TICKETS', payload: json })
  } catch (error) {
    dispatch(onError(error.message))
    throw new Error(error)
  }
}
