import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import AddGrocery from './components/AddGrocery.jsx';
import Signup from './components/Signup.jsx';
import NavBar from './components/NavBar.jsx';
import firebase from '../../firebase/firebase.js';

// import socketIOClient from 'socket.io-client'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      groceryList: ['apples, bananas'], 
      signedUp: false,
      googleUserData: null,
      userStats: null,
      loading: true
    }

    this.authListener = this.authListener.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
    this.googleSignOut = this.googleSignOut.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    // this.addGrocery = this.addGrocery.bind(this)
    // this.getGroceries = this.getGroceries.bind(this)
  }

  componentDidMount() {
    this.authListener();
    console.log(this.state.googleUserData)
    console.log(this.state.signedUp)
  }

  authListener() {
    firebase.auth().onAuthStateChanged( (user) => {
      if (user) {
        this.setState({
          googleUserData: Object.assign( {}, user.providerData[0] ),
          loading: false
        });
        console.log(user.providerData[0]);
      } else {
        this.setState({
          googleUserData: null,
          loading: false
        });
      }
    });
  }
  googleSignIn () {
    this.setState({
      loading: true
    });

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect( provider )
      .then( () => {
        return;
      })
      .catch( (err) => {
        console.error( err );
      });
  }
  googleSignOut() {
    this.setState({
      googleUserData: null
    });

    firebase.auth().signOut()
      .then( () => {
        return;
      })
      .catch( ( err ) => {
        console.error( err );
      });
  }

  mapDBUserDataToState () {
    axios.get('/user', {params: {email: this.state.googleUserData.email}})
      .then((response) => {
        this.setState({
          playerData: response
        });
      })
      .catch((err) => {
        console.log(err);
      })
    
  }

  handleSignUp (username) {
    axios.post('/user', {params: {email: this.state.googleUserData.email, fullName: this.state.googleUserData.displayName, username: username}})
      .then(() => {
        this.setState({signedUp: true})
        return 
      })
      .catch((err) => {
        console.log(err)
      })

  }


  // componentDidMount() {
  //   // this.getGroceries();
  // }

  // send() {
  //   const socket = socketIOClient(this.state.endpoint);
  //   socket.emit('client action', this.state.color)
  // }

  // getGroceries() {
  //   axios.get('/list')
  //     .then((response) => {
  //       console.log(response.data)
  //       this.setState({groceryList: response})
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  // addGrocery(e) {
  //   e.preventDefault();
  //   console.log(e.target.value)
  //   axios.post('/list', {params : {item: e.target.value}})
  //     .then((response) => {
  //       this.setState({groceryList: [...groceryList, e.target.value]})
  //     })
  // }

  render () {
    return (
      <div>
        <NavBar 
          googleSignIn={ this.googleSignIn }
          googleSignOut={ this.googleSignOut }
          googleUserData={ this.state.googleUserData }
        />
        <h1>Grocery List</h1>
        {!this.state.googleUserData ? <div>Welcome!</div> : 
        this.state.signedUp 
          ? 
          <AddGrocery /> 
          : 
          <Signup 
          googleUserData={ this.state.googleUserData }
          handleSignUp={ this.handleSignUp }
          />}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));