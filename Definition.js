import React, { Component } from 'react'


export class Definition extends Component {
  state = {
    errorMessage: "",
    isError: false,
  }
  
  
  componentDidUpdate(prevProps) {
    if(this.props !== prevProps && this.props.isWordReady) {
      let word = this.props.currentWord;
      if (word !== "") {
        const url = 
      'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20191116T024633Z.d7108db0a180f458.3627bc518f73ce1a4c71d9808c4f57b3943393ae&lang=en-ru&text=' +
        word;
  
      fetch(url)
        .then(result => result.json())
        .then(result => {
          this.setState({
            translation: result.def[0].tr[0].text,
            pronunciation: result.def[0].ts,
            isError: false,
          })
        })
        .catch(err => this.setState({isError: true}))
      }
    }
  }

  render() {
    return (
      <div className="card" style={{width: "18rem" }}>
         <div className="card-body">
          {this.props.isWordReady && !this.state.isError &&
            <div>
              <h5 className="card-title">{this.props.currentWord}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{this.state.pronunciation}</h6>
              <p className="card-text">{this.state.translation}</p>
            </div>}
          {this.state.isError && <div className="card-title">No such word</div>}
        </div>
      </div>
    )
  }
}

export default Definition
