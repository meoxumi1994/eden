import React, { PropTypes, Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'

let current_transcript = ''
let current_reset = {}

class Dictaphone extends Component {
  constructor(props){
    super(props)
    this.state = {
      interact_time : 0
    }
  }
  componentDidMount(){
    const { resetTranscript } = this.props

    setInterval(() => {
      if(this.state.interact_time == 1){
        resetTranscript()
      }

      if(this.state.interact_time > 0 ){
        this.setState({ interact_time: this.state.interact_time - 1 })
      }
    }, 100);

    setInterval(() => {
      if(this.state.interact_time == 0){
        resetTranscript()
      }
    }, 5000);
  }
  componentDidUpdate(){
    const { transcript, onChange, reset, resetTranscript } = this.props
    if(current_transcript !== transcript){
      current_transcript = transcript
      onChange(transcript)
      this.setState({ interact_time: 25 })
    }
    if(current_reset != reset){
      current_reset = reset
      resetTranscript()
    }
  }
  render() {
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = this.props

    if (!browserSupportsSpeechRecognition) {
      return null
    }

    return (
      <div></div>
    )
  }
}

export default SpeechRecognition(Dictaphone)
