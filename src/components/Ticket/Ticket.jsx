import logoImage from '../../assets/img/S7Logo.svg'

import classes from './Ticket.module.scss'

export default function Ticket() {
  const { card, header, price } = classes
  console.log(card)
  return (
    <div className={card}>
      <div className={header}>
        <p className={price}>13 400</p>
        <img src={logoImage} alt="logo" />
      </div>
      <OneWay />
      <OneWay />
    </div>
  )
}

const OneWay = () => {
  const { description, value, ticketContainer, ticket } = classes
  return (
    <div className={ticketContainer}>
      <div className={ticket}>
        <p className={description}>MOW - HKT</p>
        <p className={value}>10:45 - 8:00</p>
      </div>
      <div>
        <p className={description}>В пути</p>
        <p className={value}>10:45 - 8:00</p>
      </div>
      <div>
        <p className={description}>2 пересадки</p>
        <p className={value}>10:45 - 8:00</p>
      </div>
    </div>
  )
}
