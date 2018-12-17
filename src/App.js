import React, { Component } from 'react';
import './App.css';
import Coentreprise from './component/coentreprise';
import Coclient from './component/coclient';
import Inscription from './component/inscription';
import Dashboard from './component/dashboard';
import Profil from './component/profil';
import Client from './component/client';


class App extends Component {

  renderRoute()
  {

      switch (window.location.pathname) {
        case '/':
          return <Coentreprise />
          break;
        case '/connexionclient':
          return <Coclient />
          break;
        case '/inscription':
          return <Inscription />
          break;
        case '/dashboard':
          return <Dashboard />
          break;
        case '/profil':
          return <Profil />
          break;
        case '/client':
          return <Client />
          break;
        default:
          break;
      }

  }


  render() {
    return (
      <div>
        {this.renderRoute()}
      </div>
    );
  }
}

export default App;
