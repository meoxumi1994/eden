import React, { Component } from 'react';
import PoemCharacter from '../container/PoemCharacter'

const girls = {
  "Yuri" : {
    "dance" : "https://s3-ap-southeast-1.amazonaws.com/eden-upload/Screen+Shot+2017-12-26+at+3.22.51+PM.png"
  },
  "Natsuki" : {
    "dance" : "https://s3-ap-southeast-1.amazonaws.com/eden-upload/Screen+Shot+2017-12-26+at+3.22.54+PM.png"
  },
  "Sayori" : {
    "dance" : "https://s3-ap-southeast-1.amazonaws.com/eden-upload/Screen+Shot+2017-12-21+at+5.45.47+PM.png"
  }
}

class Poem extends Component {
  constructor(props){
    super(props)
  }
  render(){
    const { current_id, role, sentence, poem } = this.props
    const { text, name, next_id } = this.props.sentence

    const cur_girls = {}
    name.split(",").map((value, index) => cur_girls[value] = girls[value] )

    const arr_girls = []
    for(let item in girls){
      arr_girls.push({ name: item, ...girls[item]})
    }

    return(
      <div>
        <div style={{ marginTop: '-85vh' }}>

        </div>
        <div>
          {
            text.split(",").map((value, index) =>
            <button
              key={index}
              onClick={() => this.props.onDance(name.split(",")[index], poem) }
              style={{ fontSize: 30, marginLeft: '12vw', marginTop: '3vh', width: '30vw', height: '6vh' }}>
              {value}
            </button>)
          }
        </div>
        <div style={{ marginTop: '3vh', marginLeft: '3vw'}}>
          {arr_girls.map((value,index) =>
                <PoemCharacter key={index} id={value.name} next_id={next_id}
                  style={{ width: '12vw', src: value.dance, height: '20vh', marginLeft: '1vw'}}/>)
          }
        </div>
      </div>
    )
  }
}

export default Poem
