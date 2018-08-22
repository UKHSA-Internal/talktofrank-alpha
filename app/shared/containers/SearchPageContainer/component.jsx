import { connect } from 'react-redux'
import { fetchSearchTerm } from '../../actions'

import SearchPage from '../../components/SearchPage/component.jsx'

const mapStateToProps = (state, ownProps) => {
  console.log(state.app)
  return state.app
}

const mapDispatchToProps = (dispatch) => {
  return ({
    searchForTerm: (term, mustOrShould) => {
      dispatch(fetchSearchTerm(term, mustOrShould))
    },
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
