import classes from './Ticket.module.scss'

export default function Ticket({ ticket }) {
  const { price, carrier, segments } = ticket
  const [there, back] = segments
  return (
    <div className={classes.card}>
      <div className={classes.header}>
        <p className={classes.price}>{`${price} Р`}</p>
        <img src={`//pics.avs.io/99/36/${carrier}.png`} alt="logo" />
      </div>
      <OneWay info={there} />
      <OneWay info={back} />
    </div>
  )
}

const OneWay = ({ info }) => {
  const { description, value, ticketContainer, ticket } = classes
  const { date, destination, duration, origin, stops } = info

  const dateHours = new Date(date).getHours()
  const dateMinutes = new Date(date).getMinutes()
  const arrivalDate = Date.parse(date) + duration * 60000
  const arrivalHours = new Date(arrivalDate).getHours()
  const arrivalMinutes = new Date(arrivalDate).getMinutes()

  return (
    <div className={ticketContainer}>
      <div className={ticket}>
        <p className={description}>
          {origin} - {destination}
        </p>
        <p className={value}>{`${dateHours}:${dateMinutes} - ${arrivalHours}:${arrivalMinutes}`}</p>
      </div>
      <div>
        <p className={description}>В пути</p>
        <p className={value}>{getTimeFromMins(duration)}</p>
      </div>
      <div>
        <p className={description}>{calculateTransfersNumber(stops)}</p>
        <p className={value}>{stops.join(' ')}</p>
      </div>
    </div>
  )
}

const getTimeFromMins = (mins) => {
  const hours = Math.trunc(mins / 60)
  const minutes = mins % 60
  return `${hours} ч ${minutes} м`
}

const calculateTransfersNumber = (stops) => {
  switch (stops.length) {
    case 0:
      return 'Без пересадок'
    case 1:
      return '1 пересадка'
    case 2:
      return '2 пересадки'
    case 3:
      return '3 пересадки'
    default:
      return 'Ошибка'
  }
}
