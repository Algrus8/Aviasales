import { connect } from 'react-redux'

import * as actions from '../../actions'
import Priority from '../Priority'

import classes from './PriorityList.module.scss'

function PriorityList({ priority, onCheapest, onFastest, onOptimal }) {
  const { cheapest, fastest, optimal } = priority
  return (
    <div className={classes.list}>
      <Priority action={onCheapest} isActive={cheapest}>
        Самый дешевый
      </Priority>
      <Priority action={onFastest} isActive={fastest}>
        Самый быстрый
      </Priority>
      <Priority action={onOptimal} isActive={optimal}>
        Оптимальный
      </Priority>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    priority: state.priority,
  }
}

export default connect(mapStateToProps, actions)(PriorityList)
