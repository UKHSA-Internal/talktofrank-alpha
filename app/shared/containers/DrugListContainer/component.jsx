import { connect } from 'react-redux'

import DrugList from '../../components/DrugList/component.jsx'

const mapStateToProps = (state, ownProps) => {
  return state.app.pageData
}

export default connect(mapStateToProps)(DrugList)
