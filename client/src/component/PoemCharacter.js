import React, { Component } from 'react'
import './PoemCharacter.css'

class PoemCharacter extends Component {
  constructor(props){
    super(props)
  }
  render(){
    const { style, dancing } = this.props
    return(
      <img className={dancing ? "active" : "" } src={style.src} style={{...style}}/>
    )
  }
}

export default PoemCharacter
