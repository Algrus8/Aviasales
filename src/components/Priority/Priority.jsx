import classes from './Priority.module.scss'

export default function Priority(props) {
  const { children } = props
  const { text, wrapper } = classes
  return (
    <button className={wrapper}>
      <p className={text}>{children}</p>
    </button>
  )
}
