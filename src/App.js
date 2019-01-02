import React, { Component } from 'react';
import cookie from 'react-cookies'

import './App.css';
import Coentreprise from './component/coentreprise';
import Coclient from './component/coclient';
import Inscription from './component/inscription';
import Dashboard from './component/dashboard';
import Profil from './component/profil';
import Client from './component/client';
import Insertcrud from './crud/insert.js';

<<<<<<< HEAD
import Ficheclient from './component/ficheclient';
import Nouveauclient from './component/nouveauclient';
import Modifclient from './component/modifclient';
<<<<<<< HEAD
import Log from './component/log';
=======
=======
<<<<<<< HEAD
=======
>>>>>>> Creation api / fonctionnement inscription et connexion
import Ficheclient from './component/ficheclient';
import Nouveauclient from './component/nouveauclient';
import Modifclient from './component/modifclient';

<<<<<<< HEAD
>>>>>>> 076d363ab8c0355033b4d94e010d1061230b4e87
>>>>>>> d39c98daaa5dc7991b671a1eb014003e74515d5e
>>>>>>> 0bb363c86623f1d0824b5abfa5c3ccf8bd82450e
=======
import Log from './component/log';
import logo from './images/logo.png'
>>>>>>> Creation api / fonctionnement inscription et connexion

class App extends Component {

  constructor(props){

    super(props)
    this.state = {
      connexionEmail: '',
      connexionPassword: '',
      isLogged: false,
      vrfLogged: cookie.load('#FID#CO#SUCCESS')
    }

  }

  Connexion()
  {

    const {connexionEmail, connexionPassword, isLogged } = this.state;

    fetch('http://127.0.0.1/fidapi/main.php?action=connexion&cntemail=' + connexionEmail + '&cntpassword=' + connexionPassword)
    .then((response) => response.json())
    .then((response) => {
        console.log(response)
        this.setState({ isLogged })
        if(response === "#CO#SUCCESS")
        {

          this.setState({
            connexionEmail: '',
            connexionPassword: '',
            isLogged: cookie.save('#FID#CO#SUCCESS', true, { path: '/' })
          })

          //alert(this.state.isLogged)
          //window.location.href = '/dashboard';
          //return <Dashboard loggedIn={this.state.isLogged} />
          //window.history.pushState(null, null, '/dashboard');
          window.location.pathname = '/dashboard'

        }
        else if (response === "#CO#ECHEC") {

          this.setState({
            connexionEmail: '',
            connexionPassword: ''
          })

          //alert(this.state.isLogged)

        }

    })
    .catch(err => console.error(err))

  }

  renderRoute()
  {
      const { vrfLogged } = this.state

      switch (window.location.pathname) {
        case '/':
          return <div>
          
                <div className="col-md-4">
                
                
                
                </div>
                <div className="col-md-4">
                
                      <div className="wellLoginEntreprise">
                      

                          <img src={logo} class="img-responsive" alt="Logo - Fideliz" />
                          <div className="form-group">
                              <label>Adresse email</label>
                              <input 
                              type="email" 
                              value={this.state.connexionEmail}
                              onChange={e => this.setState({connexionEmail: e.target.value})}
                              className="form-control" 
                              placeholder="Email" 
                              />
                          </div>
                          <div className="form-group">
                              <label>Mot de passe</label>
                              <input 
                              type="password" 
                              value={this.state.connexionPassword}
                              onChange={e => this.setState({connexionPassword: e.target.value})}
                              className="form-control" 
                              placeholder="Password" 
                              />
                          </div>
                          <button type="submit" onClick={this.Connexion.bind(this)} className="btn btn-loginConnexion btn-block">Connexion</button>
                          <a class="btn btn-loginConnexion btn-block" href="/connexionclient" role="button">Accès compte client</a>
                          <a href="/inscription">Pas de compte entreprise ? Cliquez-ici !</a>

                      
                      </div>
                
                </div>
                <div className="col-md-4">
                
                
                
                </div>            

            
          </div>
          break;
        case '/connexionclient':
          return <Coclient />
          break;
        case '/inscription':
          return <Inscription />
          break;
        case '/dashboard':
          if( vrfLogged ) {
            return <Dashboard loggedIn={this.state.vrfLogged} />
          }
          else{
            window.location.href = "/"
          }  
          break;
        case '/profil':
          if( vrfLogged ) {
            return <Profil loggedIn={this.state.vrfLogged} />
          }
          else{
            window.location.href = "/"
          }  
          break;
        case '/client':
          if( vrfLogged ) {
            return <Client loggedIn={this.state.vrfLogged} />
          }
          else{
            window.location.href = "/"
          }  
          break;
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d39c98daaa5dc7991b671a1eb014003e74515d5e
>>>>>>> 0bb363c86623f1d0824b5abfa5c3ccf8bd82450e
=======
>>>>>>> Creation api / fonctionnement inscription et connexion
        case '/voirclient':
          if( vrfLogged ) {
            return <Ficheclient loggedIn={this.state.vrfLogged} />
          }
          else{
            window.location.href = "/"
          }  
          break;
        case '/nouveauclient':
          if( vrfLogged ) {
            return <Nouveauclient loggedIn={this.state.vrfLogged} />
          }
          else{
            window.location.href = "/"
          } 
          break;
        case '/modifclient':
          if( vrfLogged ) {
            return <Modifclient loggedIn={this.state.vrfLogged} />
          }
          else{
            window.location.href = "/"
          } 
          break;
        case '/log':
          if( vrfLogged ) {
            return <Log loggedIn={this.state.vrfLogged} />
          }
          else{
            window.location.href = "/"
          } 
          break;
        case '/insert':
          return <Insertcrud />
          break;
<<<<<<< HEAD
<<<<<<< HEAD
        case '/log':
          return <Log />
          break;
        case '/insert':
          return <Insertcrud />
          break;
=======
<<<<<<< HEAD
=======
=======
>>>>>>> 076d363ab8c0355033b4d94e010d1061230b4e87
>>>>>>> d39c98daaa5dc7991b671a1eb014003e74515d5e
>>>>>>> 0bb363c86623f1d0824b5abfa5c3ccf8bd82450e
=======
>>>>>>> Creation api / fonctionnement inscription et connexion
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
