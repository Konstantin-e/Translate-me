import React, { Component } from 'react'
import './App.css'
import Header from './Header'
import Input from './Input'
import Definition from './Definition'
import data from './words/all-words.json'
 

class App extends Component {
  state = {
    word: "",
    isWordReady: false,
    items: '',
  }

  handleTranslate = () => {
      this.setState({
        isWordReady: true,
      })
  }

  handleClearField = () => {
    this.setState({
      word: "",
      isWordReady: false,
    })
  }

  handleUpdateValue = (word) => {
    this.setState({
      word: word,
      isWordReady: false
    })
  }

  getData = searchText => {
    // if length of entered word > 1 AND it has letters only
    if (searchText.length > 1 && /^[a-z]+$/i.test(searchText)) {

      const regex = new RegExp(`^${searchText}`, 'i');
      let singleMatch = '';

      for (let i = 0; singleMatch.length === 0; i++) {
        if (data[i] === undefined)  {
          break
        }
        if (data[i].id.match(regex)) {
          singleMatch = data[i];
          break
        }
      }

      let indexSM = data.indexOf(singleMatch);

      let matches = data.slice(indexSM, indexSM + 6)
      this.setState({items: matches})
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        
        
        <Input 
          items={this.state.items}
          getData={this.getData}
          onUpdateValue={this.handleUpdateValue}
          word={this.state.word}
          onButtonClick={this.handleTranslate}
          onClearField={this.handleClearField}  />
        <div className="Definition">
          <Definition
            isWordReady={this.state.isWordReady}
            currentWord={this.state.word} />
      </div>
    </div>
    )
  }
}


export default App;
