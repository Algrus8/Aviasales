import React from 'react'

import Header from '../Header'
import PriorityList from '../PriorityList'
import Filters from '../Filters'
import TicketsList from '../TicketsList'
import Ticket from '../Ticket'
import ShowMore from '../ShowMore'

import classes from './App.module.scss'

export default function App() {
  const { wrapper, main } = classes
  return (
    <React.Fragment>
      <Header />
      <div className={wrapper}>
        <Filters />
        <div className={main}>
          <PriorityList />
          <TicketsList>
            <Ticket />
            <Ticket />
            <Ticket />
            <Ticket />
            <Ticket />
          </TicketsList>
          <ShowMore />
        </div>
      </div>
    </React.Fragment>
  )
}
