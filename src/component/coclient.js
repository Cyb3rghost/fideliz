import React, { Component } from 'react';
import logo from '../images/logo.png'

class Coclient extends Component {

    constructor(props){

        super(props)
        this.state = {
            emailClient: '',
            passwordClient: ''

        }


    }

    connexionClient()
    {

        const { emailClient, passwordClient } = this.state;

        //alert('Email : ' + emailClient + '\n Password : ' + passwordClient)

        fetch('http://127.0.0.1/fidapi/main.php?action=connexionClient&cntemail=' + emailClient + '&cntpassword=' + passwordClient)
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            /*this.setState({ isLogged, idUser })
            if(response === "#CO#ECHEC")
            {
              
              this.setState({
                connexionEmail: '',
                connexionPassword: ''
              })
    
            }
            else {
    
              {response.map((value, index) => 
                (
                    this.setState({
                      connexionEmail: '',
                      connexionPassword: '',
                      isLogged: cookie.save('#FID#CO#SUCCESS', true, { path: '/' }),
                      idUser: cookie.save('#FID#CO#IDUSER', value.id, { path: '/' }),
                      infCarteBackground: cookie.save('#FID#CO#CARTEBG', value.imgfond, { path: '/' }),
                      infCarteIcon: cookie.save('#FID#CO#CARTEICON', value.imgicon, { path: '/' })
                    })
                )
              )}
    
              //alert(this.state.isLogged)
              //window.location.href = '/dashboard';
              //return <Dashboard loggedIn={this.state.isLogged} />
              //window.history.pushState(null, null, '/dashboard');
              window.location.pathname = '/dashboard'
    
            }*/
    
        })
        .catch(err => console.error(err))


    }

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
                            <input 
                                value={this.state.emailClient}
                                onChange={e => this.setState({emailClient: e.target.value})}
                                type="email" 
                                className="form-control" 
                                placeholder="Email" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Mot de passe</label>
                            <input 
                                value={this.state.passwordClient}
                                onChange={e => this.setState({passwordClient: e.target.value})}
                                type="password" 
                                className="form-control" 
                                placeholder="Password" 
                            />
                        </div>
                        <button type="submit" onClick={this.connexionClient.bind(this)} className="btn btn-loginConnexion btn-block">Connexion</button>
                        <a class="btn btn-loginConnexion btn-block" href="/" role="button">Accès compte entreprise</a>

                    
                    </div>
              
              </div>
              <div className="col-md-4">
              
              
              
              </div>            
  
          
        </div>
      );
    }
  }

export default Coclient;