import React, { Component } from 'react';
import logo from '../images/logo.png'

class Inscription extends Component {


    render() {
      return (
        <div className="App">
          
              <div className="col-md-4">
              
              
              
              </div>
              <div className="col-md-4">
              
                    <div className="wellLoginEntreprise">
                    

                        <img src={logo} class="img-responsive" alt="Logo - Fideliz" />
                        <div className="form-group">
                            <label>Nom de l'entreprise</label>
                            <input type="text" className="form-control" placeholder="Nom de l'entreprise" />
                        </div>
                        <div className="form-group">
                            <label>Adresse email</label>
                            <input type="email" className="form-control" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label>Mot de passe</label>
                            <input type="password" className="form-control" placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <label>Retapez</label>
                            <input type="password" className="form-control" placeholder="Retapez" />
                        </div>
                        <button type="submit" className="btn btn-loginConnexion btn-block">Inscription</button>
                        <a href="/">Déjà un compte ? Cliquez-ici !</a>

                    
                    </div>
              
              </div>
              <div className="col-md-4">
              
              
              
              </div>            
  
          
        </div>
      );
    }
  }

export default Inscription;