import { connect } from 'react-redux'

import Typography from '../../components/Typography/component.jsx'

const mapStateToProps = (state, ownProps) => {
  return state.app.pageData
}

export default connect(mapStateToProps)(Typography)
