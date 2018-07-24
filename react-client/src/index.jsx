import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import axios from 'axios';
import AddGrocery from './components/AddGrocery.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      groceryList: ['apples, bananas']
    }
    // this.addGrocery = this.addGrocery.bind(this)
    this.getGroceries = this.getGroceries.bind(this)
  }

  // componentDidMount() {
    
  // }

  getGroceries() {
    axios.get('/list')
      .then((response) => {
        this.setState({groceryList: response})
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // addGrocery(e) {
  //   e.preventDefault();
  //   console.log(e.target.value)
  //   axios.post('/list', {params : {item: e.target.value}})
  //     .then((response) => {
  //       this.setState({groceryList: [...groceryList, e.target.value]})
  //     })
  // }

  render () {
    return (<div>
      <h1>Grocery List</h1>
      <AddGrocery groceries={ this.state.groceryList } />
      {/* <List items={this.state.items}/> */}
      {/* <button>Add Grocery</button> */}
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));