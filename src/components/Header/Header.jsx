import logoImage from '../../assets/img/logo.svg'

import classes from './Header.module.scss'

export default function Header() {
  const { logo, container } = classes

  return (
    <div className={container}>
      <img src={logoImage} alt="logo" className={logo} />
    </div>
  )
}
