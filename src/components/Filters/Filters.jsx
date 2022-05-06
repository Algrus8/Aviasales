import { connect } from 'react-redux'

import Filter from '../Filter'
import * as actions from '../../actions'

import classes from './Filters.module.scss'

function Filters({ checkBoxes, all, nonStop, oneTransfer, twoTransfers, threeTransfers }) {
  const { card, title } = classes

  return (
    <div className={card}>
      <p className={title}>Количество пересадок</p>
      <Filter action={all} isChecked={checkBoxes.all}>
        Все
      </Filter>
      <Filter action={nonStop} isChecked={checkBoxes.nonStop}>
        Без пересадок
      </Filter>
      <Filter action={oneTransfer} isChecked={checkBoxes.oneTransfer}>
        1 пересадка
      </Filter>
      <Filter action={twoTransfers} isChecked={checkBoxes.twoTransfers}>
        2 пересадки
      </Filter>
      <Filter action={threeTransfers} isChecked={checkBoxes.threeTransfers}>
        3 пересадки
      </Filter>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    checkBoxes: state.checkBoxes,
  }
}

export default connect(mapStateToProps, actions)(Filters)
