import React, { Component } from 'react';

import Text from '../container/animation/Text'
import getScore from '../utils/getScore'

let score = 0;
let cur_id = 0;
let record_list = [];
let text_max_score = ''

const onRecord = ( record_text, sentence, onHighLighTest, current_id) => {
  const { speech, text } = sentence
  if( !sentence || !speech || !record_text) return;

  let is_running = false;

  text.split(`","`).map((text, id) => {
    text = text.replace(/[\[\]\"]+/g, '');

    const cur_result = {}
    const cur_score = getScore( text, record_text, cur_result)
    if(cur_score >= score){

      cur_id = id;
      score = cur_score
      record_list = cur_result.list
      text_max_score = record_text
    }
  })

  if(score >= 0.75){
    if(!is_running){
      onHighLighTest(cur_id)
    }
    is_running = true
  }
}

class Conversation extends Component {
  constructor(props){
    super(props)
  }

  prepare_or_play(audio, speech, onNextScreen){
    text_max_score = ""
    record_list = []
    score = 0

    if( audio && !speech ){
      const myaudio = new Audio(audio)
      myaudio.play()
      myaudio.addEventListener("ended", function(){
        onNextScreen()
      });
    }
  }

  componentWillMount(){
    const { onNextScreen } = this.props
    const { audio, speech } = this.props.sentence
    this.prepare_or_play(audio, speech, onNextScreen)
  }

  shouldComponentUpdate(nextProps, nextState){
    const { current_id, onNextScreen, record_text, onHighLighTest, sentence } = nextProps
    const { audio, speech } = nextProps.sentence

    if( current_id != this.props.current_id ){
      this.prepare_or_play(audio, speech, onNextScreen)
    }

    if( record_text != this.props.record_text ){
      onRecord(record_text, sentence, onHighLighTest, current_id)
    }
    return true
  }

  render(){
    const { internet, record_text, sentence, onHighLighTest, current_id  } = this.props
    const { role, text, speech, audio } = sentence

    let texts;

    if(text.split(`","`).length > 1){
      texts = text.split(`","`).map( (value, index) => {
        value = value.replace(/[\[\]\"]+/g, '');
        return (index + 1) + ". " + value;
      })
    }else{
      texts = [text]
    }

    return(
      <div>
        <div style={{ marginTop: '-28vh', height: '5vh', width: '100%', backgroundColor: 'white',
          fontSize: '3vh', textAlign: 'center', color: "#4468B0", textShadow: '1px 1px 2px black' }}>
            <div style={{ height: '0.5vh' }}></div>
            <div>{role}</div>
        </div>
        <div className="meter">
          <span style={{ width: `${ score * 100 }%` }}></span>
        </div>
        <div style={{
          height: '18vh',
          fontSize: '3vh',
          backgroundColor: !speech ? '#FEDBE7' : '#95E9FE',
          textAlign: 'center',
        }}>
          <div style={{ height: '0.8vh' }}></div>
          <div className="highlight">
            {texts.map((value, index) => <Text key={index}
              id={index} text={value} audio={audio} speech={speech}/> )}
          </div>
        </div>

        <div>
          {(internet && speech) ?
            <div style={{ backgroundColor: 'white', height: '4.5vh', fontSize: '2.7vh', textAlign: 'center', }}>
              <div style={{ height: '0.7vh' }}></div>
              <div key={text_max_score} >
                { text_max_score.toString().split(" ").map((ch, ind ) => {
                  return <span key={ind} style={{
                    color: ( record_list[ind] === 1 ) ? "#1BB933" : 'back'
                  }}>{ch}{" "}</span>
                  }
                 )}
              </div>
            </div>
            :
            <div style={{ height: '4.5vh', backgroundColor: "white", fontSize: '2.5vh', textAlign: 'center' }}>
              <div style={{ height: '0.8vh' }}></div>
              <span style={{ color: 'red' }}>{ !internet && "lost internet connection ..."}</span>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Conversation
