import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions'
import Ticket from '../Ticket/Ticket'

import classes from './TicketsList.module.scss'

const TicketsList = ({ visibleTickets, firstCall, error }) => {
  return (
    <>
      {error ? (
        <div>
          <p className={classes.error}>{`Что-то пошло не так: ${error}`}</p>
        </div>
      ) : (
        <Spinner />
      )}
      <div className={classes.ticketsCards}>
        {visibleTickets.map((ticket, index) => {
          return <Ticket ticket={ticket} key={index} />
        })}
      </div>
      {!visibleTickets.length && !firstCall ? <NotFind /> : null}
      {visibleTickets.length ? <ShowMore /> : null}
    </>
  )
}

let Spinner = ({ stop }) => {
  if (stop) {
    return null
  }
  return (
    <div className={classes.spinnerContainer}>
      <div className={classes.spinner} />
      <p>Загружаем все билеты</p>
    </div>
  )
}

let ShowMore = ({ onShowMore }) => {
  return (
    <button className={classes.more} onClick={() => onShowMore()}>
      <p> Показать еще 5 билетов!</p>
    </button>
  )
}

let NotFind = () => {
  return (
    <div className={classes.notFind}>
      <p> Рейсов, подходящих под заданные фильтры, не найдено</p>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    numberOfVisible: state.tickets.numberOfVisible,
    stop: state.tickets.stop,
    searchId: state.tickets.searchId,
    visibleTickets: state.tickets.visible,
    firstCall: state.tickets.firstCall,
    error: state.tickets.error,
  }
}

NotFind = connect(mapStateToProps, actions)(NotFind)
ShowMore = connect(mapStateToProps, actions)(ShowMore)
Spinner = connect(mapStateToProps, actions)(Spinner)
export default connect(mapStateToProps, actions)(TicketsList)
