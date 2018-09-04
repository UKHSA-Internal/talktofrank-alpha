import { connect } from 'react-redux'
import PageHome from '../../components/PageHome/component.jsx'

const mapStateToProps = (state, ownProps) => {
  return state.app.pageData
}

export default connect(mapStateToProps)(PageHome)
