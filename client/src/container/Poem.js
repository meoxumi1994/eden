import { connect } from 'react-redux'

import Poem from '../component/Poem'

const girls = ["Yuri", "Natsuki", "Sayori"]

const mapStateToProps = (state, ownProps) => {
    const poem = state.inst.poem
    return ({
      poem
    })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    onDance: (name_dance, poem) => {
      if(!poem[name_dance])
        poem[name_dance] = 0
      poem[name_dance] ++
      dispatch({ type: "CHANGE_POEM_CHARACTER", id: name_dance, key: "dancing", value: true })
      dispatch({ type: "CHANGE_POEM_UP", name: name_dance })
      setTimeout(() => {
        dispatch({ type: "CHANGE_POEM_CHARACTER", id: name_dance, key: "dancing", value: false })
        const nexts = ownProps.sentence.next_id.split(",")
        if(nexts.length > 1){
          let res_id = 0
          let res_score = 0
          nexts.map((value,index) => {
            if( res_score < poem[girls[index]] ){

              res_score = poem[girls[index]]
              res_id = value
            }
          })
          dispatch({ type: "NEXT_SCREEN", next_id: res_id })
        }else{
          dispatch({ type: "NEXT_SCREEN", next_id: ownProps.sentence.next_id })
        }
      }, 1200)
    }
})


const PoemContainer = connect(
    mapStateToProps, mapDispatchToProps
)(Poem)

export default PoemContainer
