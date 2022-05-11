import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions'
import Header from '../Header'
import PriorityList from '../PriorityList'
import Filters from '../Filters'
import TicketsList from '../TicketsList'

import classes from './App.module.scss'

function App({ fetchTickets, tickets, onShowMore }) {
  const { wrapper, main } = classes
  const { searchId, ticketsArr, stop, firstCall } = tickets
  useEffect(() => {
    if (searchId && !stop) {
      fetchTickets(searchId)
    }
  }, [searchId, ticketsArr])

  useEffect(() => {
    if (ticketsArr.length && firstCall) {
      onShowMore()
    }
  }, [ticketsArr])

  return (
    <React.Fragment>
      <Header />
      <div className={wrapper}>
        <Filters />
        <div className={main}>
          <PriorityList />
          <TicketsList />
        </div>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    tickets: state.tickets,
  }
}

export default connect(mapStateToProps, actions)(App)
