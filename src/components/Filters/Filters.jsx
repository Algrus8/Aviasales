import classes from './Filters.module.scss'

export default function Filters(props) {
  const { children } = props
  const { card, title } = classes

  return (
    <div className={card}>
      <p className={title}>Количество пересадок</p>
      {children}
    </div>
  )
}
