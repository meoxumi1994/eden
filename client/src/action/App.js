import config from '../config'
import preLoader from 'pre-loader';
import { get } from './API'

export const getData = (id) => dispatch => {
    dispatch({ type : "GET_DATA" });

    const imgs = []
    const isPush = false

    get('')
      .then(sentences => {
        return new Promise((res, rej) => {

          sentences.map((obj, index) => {
            imgs.push(obj.background)
          })

          new preLoader( imgs , {
            onProgress: function(src, element, index){
              if(index >= 4){
                res(sentences)
              }
            },
            onComplete: function(loaded, errors){
              res(sentences)
          	}
          });

        })
      })
      .then(sent => {
        const sentences = {}
        sent.map(value => {
          sentences[value.id] = value
        })
        dispatch({ type: "CHANGE_DATA", key: "sentences", value: sentences })
      })
}
