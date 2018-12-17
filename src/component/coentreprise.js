import React, { Component } from 'react';
import logo from '../images/logo.png'

class Coentreprise extends Component {


    render() {
      return (
        <div className="App">
          
              <div className="col-md-4">
              
              
              
              </div>
              <div className="col-md-4">
              
                    <div className="wellLoginEntreprise">
                    

                        <img src={logo} class="img-responsive" alt="Logo - Fideliz" />
                        <div className="form-group">
                            <label>Adresse email</label>
                            <input type="email" className="form-control" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label>Mot de passe</label>
                            <input type="password" className="form-control" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-loginConnexion btn-block">Connexion</button>
                        <a class="btn btn-loginConnexion btn-block" href="/connexionclient" role="button">Accès compte client</a>
                        <a href="/inscription">Pas de compte entreprise ? Cliquez-ici !</a>

                    
                    </div>
              
              </div>
              <div className="col-md-4">
              
              
              
              </div>            
  
          
        </div>
      );
    }
  }

export default Coentreprise;