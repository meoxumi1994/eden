const getScore = (text, record_text, result) => {
  text = text.toLowerCase()
  record_text = record_text.toLowerCase()

  text = text.replace(/[.,!?]+/g, '')
  record_text = record_text.replace(/[.,!?]+/g, '')

  text = text.toString().split(" ");
  record_text = record_text.toString().split(" ");

  // console.log(text, record_text)
  const max_length = Math.round(text.length * 2)

  result.list = {}
  if(record_text.length > max_length){
    record_text = record_text.slice(Math.max ( 0, record_text.length - max_length ), record_text.length)
  }

  const f = [];

  for(let i = -1; i < text.length ; i++ ){
    const l = [];
    for(let j = -1; j < record_text.length ; j++ ){
      l[j] = 0;
    }
    f[i] = l
  }

  let score = 0;

  for(let i = 0; i < text.length ; i++ ){
    for(let j = 0; j < record_text.length ; j++ ){
      if(text[i] === record_text[j]){
        f[i][j] = f[i-1][j-1] + 1;
      }else {
        f[i][j] = Math.max( f[i-1][j] , f[i][j-1]);
      }
      score = Math.max(score, f[i][j])
    }
  }

  let cur_x = text.length - 1
  let cur_y = record_text.length - 1

  while(cur_x != -1 && cur_y != -1 ){
    if(text[cur_x] === record_text[cur_y]){
      result.list[cur_y] = 1
      cur_x = cur_x - 1;
      cur_y = cur_y - 1;
    }else{
      if(f[cur_x-1][cur_y] > f[cur_x][cur_y-1]){
        cur_x = cur_x - 1;
      }else{
        cur_y = cur_y - 1;
      }
    }
  }

  return score / text.length;
}

// const result = {}
// console.log('score', getScore("tran finh", "tran minh",result))
// console.log(result)

export default getScore
