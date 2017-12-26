import { connect } from 'react-redux'

import Conversation from '../component/Conversation'

const mapStateToProps = (state, ownProps) => {
    const { internet } = state.inst.app
    const { record_text } = state.inst.conversation
    return ({
      internet,
      record_text
    })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onNextScreen: () => {
    dispatch({ type: "NEXT_SCREEN", next_id: ownProps.sentence.next_id})
  },
  onHighLighTest: (id) => {
    dispatch({ type: "CHANGE_TEXT", id: id, key: "get_high", value: true })
    setTimeout(() => {
      dispatch({ type: "CHANGE_TEXT", id: id, key: "get_high", value: false })
      dispatch({ type: "NEXT_SCREEN", next_id: ownProps.sentence.next_id.split(",")[id] })
    }, 600)
  }
})

const ConversationContainer = connect(
    mapStateToProps, mapDispatchToProps
)(Conversation)

export default ConversationContainer
