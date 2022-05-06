import { connect } from 'react-redux'

import * as actions from '../../actions'
import Priority from '../Priority'

import classes from './PriorityList.module.scss'

function PriorityList({ priority, cheapest, fastest, optimal }) {
  const { list } = classes
  return (
    <div className={list}>
      <Priority action={cheapest} isActive={priority.cheapest}>
        Самый дешевый
      </Priority>
      <Priority action={fastest} isActive={priority.fastest}>
        Самый быстрый
      </Priority>
      <Priority action={optimal} isActive={priority.optimal}>
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
