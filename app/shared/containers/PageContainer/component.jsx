import { connect } from 'react-redux'

import Page from '../../components/Page/component.jsx'

const mapStateToProps = (state, ownProps) => {
  return state.app.pageData
}

export default connect(mapStateToProps)(Page)
