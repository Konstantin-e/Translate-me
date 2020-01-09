import React, { Component } from 'react'
import Autocomplete from 'react-autocomplete'


export class Input extends Component {
  state = {
  }

  handleKeyPress = (event) => {
   
    if (event.key === "Enter") {
      this.props.onButtonClick()
      event.preventDefault();
    } 
  }

  render() {
    return (
      <form onKeyDown={this.handleKeyPress}>

         <input
          type="button"
          value="Translate"
          onClick={() => this.props.onButtonClick()}
          />
        <input
          type="button"
          value="Clear"
          onClick={this.props.onClearField}
          />
        <div id='input'>
          <Autocomplete
            items={this.props.word.length > 1 ? this.props.items : []}
            shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
            getItemValue={item => item.label}
            inputProps={{placeholder: "..."}}
            renderItem={(item, highlighted) =>
              <div
                key={item.id}
                style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
              >
                {item.label}
              </div>
            }
            value={this.props.word}
            onChange={event => {
              this.props.getData(event.target.value)
              this.props.onUpdateValue(event.target.value)
              
              }}
            onSelect={value => {
              this.props.onUpdateValue(value)
              this.props.onButtonClick()}}
        />
        </div>
        
       
      </form>
    )
  }
}

export default Input
