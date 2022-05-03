import classes from './PriorityList.module.scss'

export default function PriorityList(props) {
  const { children } = props
  const { list } = classes
  return <div className={list}>{children}</div>
}
