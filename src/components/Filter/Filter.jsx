import classes from './Filter.module.scss'

export default function Filter({ children, action, isChecked }) {
  const { label, input, checkbox, wrapper } = classes
  return (
    <div className={wrapper}>
      <label className={label}>
        <input type="checkbox" className={input} checked={isChecked} onChange={action} />
        <span className={checkbox} />
        <span>{children}</span>
      </label>
    </div>
  )
}
