import { connect } from 'react-redux'

import Text from '../../component/animation/Text'

const mapStateToProps = (state, ownProps) => {
    let cur_Text = state.inst.animation.text[ownProps.id] || { 'get_high' : false }

    const { get_high } = cur_Text

    return ({
      get_high: get_high
    })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSay: (text) => {
    dispatch({ type: "CHANGE_CONVERSATION", key: "record_text", value: text })
  }
})

const TextContainer = connect(
    mapStateToProps, mapDispatchToProps
)(Text)

export default TextContainer
