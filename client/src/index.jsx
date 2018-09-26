import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import AddGrocery from './components/AddGrocery.jsx';
import Signup from './components/Signup.jsx';
import NavBar from './components/NavBar.jsx';
import Welcome from './components/Welcome.jsx';
import firebase from '../../firebase/firebase.js';
import { RingLoader } from 'react-spinners';

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
    this.mapDBUserDataToState = this.mapDBUserDataToState.bind(this);
    // this.addGrocery = this.addGrocery.bind(this)
    // this.getGroceries = this.getGroceries.bind(this)
  }

  componentDidMount() {
    this.authListener();
    // this.mapDBUserDataToState();
    console.log(this.state.googleUserData)
    console.log(this.state.userStats)
  }

  authListener() {
    firebase.auth().onAuthStateChanged( (user) => {
      if (user) {
        this.setState({
          googleUserData: Object.assign( {}, user.providerData[0] ),
          loading: false
        }, this.mapDBUserDataToState);
        // this.mapDBUserDataToState();
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
        // this.mapDBUserDataToState();
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
          userStats: response.data[0]
        }, () => console.log('user stats: ',this.state.userStats));
      })
      .catch((err) => {
        console.log(err);
      })
    
  }

  handleSignUp (username) {
    axios.post('/user', {params: {email: this.state.googleUserData.email, fullName: this.state.googleUserData.displayName, username: username}})
      .then(() => {
        // this.setState({signedUp: true})
        this.mapDBUserDataToState();
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
    if ( this.state.loading ) {
      return (
        <div className="loading-spinner">
          <RingLoader
            sizeUnit={'px'}
            size={200}
            color={'black'}
            loading={ this.state.loading }
          />
        </div>
      );
    }
    return (
      <div>
        <NavBar 
          googleSignIn={ this.googleSignIn }
          googleSignOut={ this.googleSignOut }
          googleUserData={ this.state.googleUserData }
        />
        
        {!this.state.googleUserData ? <Welcome /> : 
        !this.state.userStats
          ? 

           <Signup 
          googleUserData={ this.state.googleUserData }
          handleSignUp={ this.handleSignUp }
          />
         
          : 
           <AddGrocery /> 
         }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));