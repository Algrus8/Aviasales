import classes from './Filter.module.scss'

export default function Filter(props) {
  const { children } = props
  const { label, input, checkbox, wrapper } = classes
  return (
    <div className={wrapper}>
      <label className={label}>
        <input type="checkbox" className={input} />
        <span className={checkbox} />
        <span>{children}</span>
      </label>
    </div>
  )
}
