import { connect } from 'react-redux'

import PoemCharacter from '../component/PoemCharacter'

const mapStateToProps = (state, ownProps) => {
    const poemcharacter = state.inst.poemcharacter[ownProps.id] || { dancing: false }
    return ({
      ...poemcharacter
    })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
})

const PoemCharacterContainer = connect(
    mapStateToProps, mapDispatchToProps
)(PoemCharacter)

export default PoemCharacterContainer
