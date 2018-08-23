import { connect } from 'react-redux'
import { fetchSearchTerm } from '../../actions'

import SearchResults from '../../components/SearchResults/component.jsx'

const mapStateToProps = (state, ownProps) => {
  return state.app
}

const mapDispatchToProps = (dispatch) => {
  return ({
    searchForTerm: (searchTerm, drug, mustOrShould) => {
      dispatch(fetchSearchTerm(searchTerm, drug, mustOrShould))
    },
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)
