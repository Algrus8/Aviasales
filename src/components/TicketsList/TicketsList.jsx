import React from 'react'
import classes from './TicketsList.module.scss'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Ticket from '../Ticket/Ticket'
import { generateKey } from '../..'

const TicketsList = ({ visibleTickets }) => {
  return (
    <React.Fragment>
      <div className={classes.ticketsCards}>
        {visibleTickets.map((ticket) => {
          return <Ticket ticket={ticket} key={generateKey()} />
        })}
      </div>
      <ShowMore />
    </React.Fragment>
  )
}

let ShowMore = ({ fetchTickets, searchId, stop }) => {
  const text = stop ? 'По данному запросу билетов больше нет' : ' Показать еще 5 билетов!'

  return (
    <button className={classes.more} onClick={() => fetchTickets(searchId)}>
      {text}
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
export default connect(mapStateToProps, actions)(TicketsList)
