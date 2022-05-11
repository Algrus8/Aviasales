import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions'
import Ticket from '../Ticket/Ticket'

import classes from './TicketsList.module.scss'

const TicketsList = ({ visibleTickets }) => {
  return (
    <React.Fragment>
      <div className={classes.ticketsCards}>
        {visibleTickets.map((ticket, index) => {
          return <Ticket ticket={ticket} key={index} />
        })}
      </div>
      <Spinner />
      <ShowMore />
    </React.Fragment>
  )
}

let Spinner = ({ stop }) => {
  if (stop) {
    return null
  }
  return (
    <div className={classes.spinnerContainer}>
      <div className={classes.spinner} />
    </div>
  )
}

let ShowMore = ({ onShowMore }) => {
  return (
    <button className={classes.more} onClick={() => onShowMore()}>
      Показать еще 5 билетов!
    </button>
  )
}

const mapStateToProps = (state) => {
  return {
    numberOfVisible: state.tickets.numberOfVisible,
    stop: state.tickets.stop,
    searchId: state.tickets.searchId,
    visibleTickets: state.tickets.visible,
  }
}

ShowMore = connect(mapStateToProps, actions)(ShowMore)
Spinner = connect(mapStateToProps, actions)(Spinner)
export default connect(mapStateToProps, actions)(TicketsList)
