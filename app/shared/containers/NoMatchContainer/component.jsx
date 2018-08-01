import { connect } from 'react-redux'

import NotFound from '../../components/NoMatch/component.jsx'

const mapStateToProps = (state, ownProps) => {
  return state.app.pageData
}

export default connect(mapStateToProps)(NotFound)
