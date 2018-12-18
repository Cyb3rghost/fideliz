import React, { Component } from 'react';
import './App.css';
import Coentreprise from './component/coentreprise';
import Coclient from './component/coclient';
import Inscription from './component/inscription';
import Dashboard from './component/dashboard';
import Profil from './component/profil';
import Client from './component/client';
<<<<<<< HEAD
import Ficheclient from './component/ficheclient';
import Nouveauclient from './component/nouveauclient';
import Modifclient from './component/modifclient';
=======

>>>>>>> 076d363ab8c0355033b4d94e010d1061230b4e87

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
<<<<<<< HEAD
        case '/voirclient':
          return <Ficheclient />
          break;
        case '/nouveauclient':
          return <Nouveauclient />
          break;
        case '/modifclient':
          return <Modifclient />
          break;
=======
>>>>>>> 076d363ab8c0355033b4d94e010d1061230b4e87
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
