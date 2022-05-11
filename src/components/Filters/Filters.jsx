import { connect } from 'react-redux'

import Filter from '../Filter'
import * as actions from '../../actions'

import classes from './Filters.module.scss'

function Filters({ filters, onAll, onNonStop, onOneTransfer, onTwoTransfers, onThreeTransfers }) {
  const { card, title } = classes
  const { all, nonStop, oneTransfer, twoTransfers, threeTransfers } = filters
  return (
    <div className={card}>
      <p className={title}>Количество пересадок</p>
      <Filter action={onAll} isChecked={all}>
        Все
      </Filter>
      <Filter action={onNonStop} isChecked={nonStop}>
        Без пересадок
      </Filter>
      <Filter action={onOneTransfer} isChecked={oneTransfer}>
        1 пересадка
      </Filter>
      <Filter action={onTwoTransfers} isChecked={twoTransfers}>
        2 пересадки
      </Filter>
      <Filter action={onThreeTransfers} isChecked={threeTransfers}>
        3 пересадки
      </Filter>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters,
  }
}

export default connect(mapStateToProps, actions)(Filters)
