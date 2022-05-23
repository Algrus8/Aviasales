import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import logoImage from '../../assets/img/logo.svg'
import * as actions from '../../actions'
import PriorityList from '../PriorityList'
import Filters from '../Filters'
import TicketsList from '../TicketsList'

import classes from './App.module.scss'

function App({ fetchTickets, tickets, onCheapest, onAll, onFirstCall }) {
  const { wrapper, main, headerContainer, logo } = classes
  const { searchId, ticketsArr, stop, firstCall } = tickets
  useEffect(() => {
    if (searchId && !stop) {
      fetchTickets(searchId)
    }
  }, [searchId, ticketsArr])

  useEffect(() => {
    if (ticketsArr.length && firstCall) {
      onCheapest()
      onAll()
      onFirstCall()
    }
  }, [ticketsArr])

  return (
    <>
      <header className={headerContainer}>
        <img src={logoImage} alt="logo" className={logo} />
      </header>
      <div className={wrapper}>
        <Filters />
        <div className={main}>
          <PriorityList />
          <TicketsList />
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    tickets: state.tickets,
  }
}

export default connect(mapStateToProps, actions)(App)
