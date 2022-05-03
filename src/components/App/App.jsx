import React from 'react'
// import classNames from 'classnames'

import Header from '../Header'
import Priority from '../Priority'
import PriorityList from '../PriorityList'
import Filters from '../Filters'
import Filter from '../Filter'
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
        <Filters>
          <Filter>Все</Filter>
          <Filter>Без пересадок</Filter>
          <Filter>1 пересадка</Filter>
          <Filter>2 пересадки</Filter>
          <Filter>3 пересадки</Filter>
        </Filters>
        <div className={main}>
          <PriorityList>
            <Priority>Самый дешевый</Priority>
            <Priority>Самый быстрый</Priority>
            <Priority>Оптимальный</Priority>
          </PriorityList>
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
