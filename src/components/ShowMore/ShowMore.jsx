import classes from './ShowMore.module.scss'

export default function ShowMore() {
  const { more } = classes
  return <button className={more}>Показать еще 5 билетов!</button>
}
