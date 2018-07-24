import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';


class AddGrocery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groceryList: [], 
      groceryItem: ''
    }
    this.renderInput = this.renderInput.bind(this)
    this.addGrocery = this.addGrocery.bind(this)
  }

  renderInput(e) {
    e.preventDefault();
    this.setState({groceryItem: e.target.value})
    console.log('state: ', this.state.groceryItem)
  }

  addGrocery() {
    // e.preventDefault();
    console.log('currentItem: ', this.state.groceryItem)
    axios.post('/list', {params : {item: this.state.groceryItem}})
      .then((response) => {
        this.setState({groceryList: [...this.state.groceryList, this.state.groceryItem]})
      })
  }

  render() {

    const groceries = this.state.groceryList.map((grocery, idx) => {
      return <li key={ idx }>{grocery}</li>
    })

    return (
      <div>
          <input onChange={ this.renderInput }/>
          <button onClick={ this.addGrocery }>Add Grocery</button>
        <ul>
          {groceries}
        </ul>
        <h3>{this.state.groceryItem}</h3>
      </div>
    )
  }

}

  export default AddGrocery;