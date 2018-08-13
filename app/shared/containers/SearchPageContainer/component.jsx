import { connect } from 'react-redux'
import { fetchSearchTerm } from '../../actions'

import SearchPage from '../../components/SearchPage/component.jsx'

const mapStateToProps = (state, ownProps) => {
  return state.app
}

const mapDispatchToProps = (dispatch) => {
  return ({
    searchForTerm: (term) => {
      dispatch(fetchSearchTerm(term))
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
