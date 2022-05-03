import classes from './TicketsList.module.scss'

export default function TicketsList(props) {
  const { children } = props
  const { ticketsCards } = classes
  return <div className={ticketsCards}>{children}</div>
}
