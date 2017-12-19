import React, { Component } from 'react';
import './App.css'
import Record from './Record'
import Dictaphone from './Dictaphone'
import getScore from './utils/getScore'
import { Button } from 'material-ui'
import config from './config'
import { Circle, Line } from 'rc-progress'
import preLoader from 'pre-loader';

let that
let current_outside_id = -1
const imgs = []

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      score: 0,
      current_id : 0,
      data: undefined,
      reset: {},
      record_text: '',
      text_max_score : '',
      record_list: [],
      loss_internet: !(navigator.onLine),
      waitting_index: 0,
    }
    that = this
  }
  componentDidMount(){
    fetch(config.SERVER_EDEN_IP, {
      headers: {
          "Content-Type": "application/json",
      },
      method: 'GET',
    }).then((response) => response.json())
    .then(res => {

      res.map( (obj, index ) => {
        imgs.push(obj.background)
      })


      new preLoader( imgs , {
        onProgress: function(src, element, index){
          console.log(index)
          if(index >= 5){
            that.setState({ data: res })
          }
        },
        onComplete: function(loaded, errors){

      	}
      });
    })
    .catch(error => {
      console.error('POST', config.SERVER_EDEN_IP + 'import_data', error)
    })

    window.addEventListener('load', () => {
      window.addEventListener('online',  () => {
        that.setState({ loss_internet: false })
      })
      window.addEventListener('offline',  () => {
        that.setState({ loss_internet: true })
      })
    })
  }

  play_audio_then_next(){
    const current_id = this.state.current_id;
    const next_id = this.state.current_id + 1;

    if(!that.state.data[current_id].speech){
      const audio = new Audio(that.state.data[current_id].audio)
      audio.play()
      audio.addEventListener("ended", function(){
         if(next_id < that.state.data.length){
           that.setState({ current_id: next_id, reset : {}, score: 0 })
         }
      });
    }
  }

  componentDidUpdate(){
    if(current_outside_id != this.state.current_id && this.state.data ){
      current_outside_id = this.state.current_id
      this.play_audio_then_next()
    }
  }

  onRecord(record_text){
    if(!that.state.data) return;
    if(that.state.data[that.state.current_id].speech && that.state.current_id < that.state.data.length){
      const next_id = that.state.current_id + 1;
      let score = 0;
      let is_running = false;
      let result = { list: [] };
      let text_max_score = ''

      that.state.data[that.state.current_id].text.split(`","`).map(text => {
        text = text.replace(/[\[\]\"]+/g, '');
        const cur_result = {}
        const cur_score = getScore( text, record_text, cur_result)
        if(cur_score >= score){

          score = cur_score
          result.list = cur_result.list
          text_max_score = record_text

          that.setState({ record_text : record_text, record_list: result.list, text_max_score : text_max_score })
        }
      })

      if(!is_running){
        that.setState({ score: score })
      }
      if(score >= 0.75){
        is_running = true
        if(next_id < that.state.data.length){
          setTimeout(() => {
            is_running = false
            that.setState({
              text_max_score : '',
              current_id: next_id,
              reset : {},
              score: 0,
            })
          }, (1 - score)* 8000 )
        }
      }
    }
  }

  render() {
    if(!that.state.data)
      return (
        <div>
          <div>
              Waitting...
          </div>
        </div>
      )

    let text = that.state.data[this.state.current_id].text
    if(text.split(`","`).length > 1){
      text = text.split(`","`).map( (value, index) => {
        value = value.replace(/[\[\]\"]+/g, '');
        return (index + 1) + ". " + value;
      })
    }else{
      text = [text]
    }

    return (
      <div>
        <div style={{
            width: '100%',
            height: '100vh',
            backgroundImage: `url("` + that.state.data[this.state.current_id].background + `")`,
            backgroundPosition: `center`,
            backgroundRepeat: `no-repeat`,
            backgroundSize: `cover`,
          }}>
        </div>
        <div style={{ marginTop: '-28vh', height: '5vh', width: '100%', backgroundColor: 'white',
          fontSize: '3vh', textAlign: 'center', color: "#4468B0", textShadow: '1px 1px 2px black' }}>
            <div style={{ height: '0.5vh' }}></div>
            <div>{this.state.data[this.state.current_id].role}</div>
        </div>
        <div className="meter">
          <span style={{ width: `${ this.state.score * 100 }%` }}></span>
        </div>
        <div style={{
          height: '18vh',
          fontSize: '3vh',
          backgroundColor: !that.state.data[this.state.current_id].speech ? '#FEDBE7' : '#95E9FE',
          textAlign: 'center',
        }}>
          <div style={{ height: '0.8vh' }}></div>
          <div>
            {text.map((value, index) => <div key={index}>{value}</div>)}
          </div>
        </div>

        {(!this.state.loss_internet && that.state.data[this.state.current_id].speech) ?
          <div style={{ backgroundColor: 'white', height: '4.5vh', fontSize: '2.7vh', textAlign: 'center', }}>
            <div style={{ height: '0.7vh' }}></div>
            <div key={this.state.text_max_score} >
              { this.state.text_max_score.toString().split(" ").map((ch, ind ) => {
                return <span key={ind} style={{ color: (this.state.record_list[ind] === 1) ? "#1BB933" : 'back'}}>{ch}{" "}</span>
                }
               )}
            </div>
          </div>
          :
          <div style={{ height: '4.5vh', backgroundColor: "white", fontSize: '2.5vh', textAlign: 'center' }}>
            <div style={{ height: '0.8vh' }}></div>
            <span style={{ color: 'red' }}>{this.state.loss_internet && "lost internet connection ..."}</span>
          </div>
        }
        <Dictaphone onChange={this.onRecord} reset={this.state.reset}
        />
      </div>

    );
  }
}

export default App;
