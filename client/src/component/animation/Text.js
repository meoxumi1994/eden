import React, { Component } from 'react';
import './Text.css'

class Text extends Component {
  constructor(props){
    super(props);
  }
  play_audio(){
    const { audio, id } = this.props

    const myAu = new Audio(audio.split(",")[id])
    myAu.play()
  }
  render(){
    const { get_high, text, speech, id } = this.props

    return(
      <div
        style={{ color: (this.props.get_high ? "green" : "") }}
        className={this.props.get_high ? "active" : "" }>
        {<span style={{
        }}>{text}</span>}{" "}
        {speech &&
          <button style={{
            backgroundPosition: `center`,
            backgroundRepeat: `no-repeat`,
            backgroundSize: `cover`,
            height: '2.5vh',
            width: '2.5vh',
            backgroundImage: `url("https://s3-ap-southeast-1.amazonaws.com/eden-upload/Audio/listen.png")`}} onClick={() => this.play_audio()}/>
        }
        {/* {speech &&
          <button onClick={() => this.props.onSay(text)}>next</button>
        } */}
     </div>
    )
  }
}

export default Text;
