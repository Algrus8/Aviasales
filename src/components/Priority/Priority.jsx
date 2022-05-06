import classNames from 'classnames'

import classes from './Priority.module.scss'

export default function Priority({ action, isActive, children }) {
  const { text, wrapper, active } = classes
  const buttonClass = classNames({ [wrapper]: true, [active]: isActive })

  return (
    <button className={buttonClass} onClick={action}>
      <p className={text}>{children}</p>
    </button>
  )
}
