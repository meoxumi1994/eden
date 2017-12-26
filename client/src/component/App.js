import React, { Component } from 'react';
import './App.css'

import Dictaphone from '../container/Dictaphone'
import getScore from '../utils/getScore'
import { Button } from 'material-ui'
import config from '../config'
import { Circle, Line } from 'rc-progress'
import preLoader from 'pre-loader';


import Conversation from '../container/Conversation'
import Poem from '../container/Poem'

import Text from '../container/animation/Text'

const imgs = []

let background_audio;
let background_music;

class App extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.onGetData()
  }
  shouldComponentUpdate(nextProps, nextState){
    const { current_id, data } = nextProps
    if(data[current_id] && background_music !== data[current_id].background_music){
      if(background_music){
        background_audio.pause()
        background_audio.currentTime = 0
      }
      background_music = data[current_id].background_music
      background_audio = new Audio(background_music)
      background_audio.play()
      background_audio.volume = 0.2
      background_audio.loop = true
    }
    return true
  }
  render() {
    const { data, current_id } = this.props
    if(!data)
      return (
        <div>
          <div>
              Waitting...
          </div>
        </div>
      )
    const sentence = data[current_id]
    if(!sentence)
      return (
        <div>
            End...
        </div>
      )
    return (
      <div>
        <div style={{
            width: '100%',
            height: '100vh',
            backgroundImage: `url("` + data[current_id].background + `")`,
            backgroundPosition: `center`,
            backgroundRepeat: `no-repeat`,
            backgroundSize: `cover`,
          }}>
        </div>
        {sentence.role == "poems" ?
          <Poem sentence={sentence} current_id={current_id}/>
        :
          <Conversation sentence={sentence} current_id={current_id}/>
        }
        <Dictaphone />
      </div>

    );
  }
}

export default App;
