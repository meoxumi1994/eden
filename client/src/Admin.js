import React, { Component } from 'react';
import config from './config'
import { Link } from 'react-router-dom';


class Admin extends Component {
  constructor(props){
    super(props)
  }
  handleChange(files){
    const reader = new FileReader();
    reader.readAsText(files[0]);

    reader.onload = (event) => {
      const csv = event.target.result;
      console.log(csv)
      const body = {
        'data' : csv,
      }

      fetch(config.SERVER_EDEN_IP + 'import_data', {
        headers: {
            "Content-Type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify(body)
      }).then((response) => response.json())
      .then(res => {
        console.log(res)
        this.props.history.push("/")
      })
      .catch(error => {
        console.error('POST', config.SERVER_EDEN_IP + 'import_data', error)
      })
    };
  }

  render(){
    return(
      <div style={{   textAlign: 'center', }}>
        <h3>Import data to Eden</h3>
        <div>The csv headers exactly are :</div>
        <div style={{ marginTop: 10 }}>id | role | speech | background | autio | text</div>
        <h5>Example</h5>
        <div style={{ fontSize: 10 }}>
          <div>1|Female protagonist|false|https://i.imgur.com/TppaGji.jpg|https://s3-ap-southeast-1.amazonaws.com/projecteden/Female+protagonist+1.m4a|Heeeeeyyyyy!</div>
          <div>9|Female protagonist|false|https://i.imgur.com/TppaGji.jpg|https://s3-ap-southeast-1.amazonaws.com/projecteden/Female+protagonist+9.m4a|I overslept again!</div>
        </div>
        <div style={{ marginTop: 10 }}>
          <input name="myFile" type="file" accept=".csv" onChange={ (e) => this.handleChange(e.target.files) }/>
        </div>

        <h3>Current Data in database</h3>
        <a href={config.SERVER_EDEN_IP}>get current data</a>
      </div>
    )
  }
}

export default Admin
