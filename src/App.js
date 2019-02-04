import React, { Component } from 'react';
import cookie from 'react-cookies'
import Select from 'react-select';

import './App.css';

/* INTERFACE ENTREPRISE */
import Dashboard from './component/dashboard'
import Profil from './component/profil'
import Client from './component/client'
import Nouveauclient from './component/nouveauclient'
import Voirclient from './component/voirclient'
import Planning from './component/planning'
import Modifclient from './component/modifclient'
import Gestioncompte from './component/gestioncompte'
import Listetypecarte from './component/listetypecarte'
import Ajoutcarte from './component/ajoutcarte'
/* INTERFACE ENTREPRISE */

/* INTERFACE CLIENT */

import Fichecoclient from './component/componentclient/fichecoclient'
import Editionclient from './component/componentclient/editionclient'
import Mescadeaux from './component/componentclient/mescadeaux'
import Planningclient from './component/componentclient/planningclient'

/* INTERFACE CLIENT */


import Cards from './component/testcomposant/cards'
import Buttons from './component/testcomposant/buttons'
import Login from './component/login'
import Register from './component/register'
import Forgot from './component/testcomposant/forgot'
import Error from './component/404'
import Blank from './component/testcomposant/blank'
import Charts from './component/testcomposant/charts'
import Table from './component/testcomposant/table'

class App extends Component {

    constructor(props){

        super(props)
        this.state = {
            // GESTION CONNEXION ENTREPRISE
            connexionEmail: '',
            connexionPassword: '',
            isLogged: false,
            idUser: '',
            infCarteBackground: '',
            infCarteIcon: '',
            vrfLogged: cookie.load('#FID#CO#SUCCESS'),
            vrfIdUser: cookie.load('#FID#CO#IDUSER'),
            vrfInfosCarteBg: cookie.load('#FID#CO#CARTEBG'),
            vrfInfosCarteIcon: cookie.load('#FID#CO#CARTEICON'),
            // GESTION CONNEXION CLIENT
            connexionEmailClient: '',
            connexionPasswordClient: '',
            isLoggedClient: false,
            idUserClient: '',
            vrfLoggedClient: cookie.load('#FID#COCLIENT#SUCCESS'),
            vrfIdUserClient: cookie.load('#FID#COCLIENT#IDUSER'),
            vrfIdEntrepriseClient: cookie.load('#FID#COCLIENT#IDENT'),
            idTransitionRedirection: '',

            selectedOption: null,
            options: []

        }

    }

    componentDidMount()
    {
  
        fetch('http://127.0.0.1/fidapi/main.php?action=selectionSociete')
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          this.setState({
            options: response
          })
        })
        .catch(err => console.error(err))
  
    }

    Connexion()
    {
  
      const {connexionEmail, connexionPassword, isLogged, idUser } = this.state;
  
      fetch('http://127.0.0.1/fidapi/main.php?action=connexion&cntemail=' + connexionEmail + '&cntpassword=' + connexionPassword)
      .then((response) => response.json())
      .then((response) => {
          console.log(response)
          this.setState({ isLogged, idUser })
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
  
          }
  
      })
      .catch(err => console.error(err))
  
    }
  
    connexionClient()
    {
  
        const { connexionEmailClient, connexionPasswordClient, isLoggedClient, idUserClient, selectedOption } = this.state;
  
        //alert('Email : ' + emailClient + '\n Password : ' + passwordClient)
  
        fetch('http://127.0.0.1/fidapi/main.php?action=connexionClient&idEntreprise=' + selectedOption.value + '&cntemail=' + connexionEmailClient + '&cntpassword=' + connexionPasswordClient)
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          this.setState({ isLoggedClient, idUserClient })
          if(response === "#COCLIENT#ECHEC")
          {
            
            this.setState({
              connexionEmailClient: '',
              connexionPasswordClient: ''
            })
  
          }
          else {
  
            {response.map((value, index) => 
              (
                  this.setState({
                    connexionEmailClient: '',
                    connexionPasswordClient: '',
                    isLoggedClient: cookie.save('#FID#COCLIENT#SUCCESS', true, { path: '/' }),
                    idUserClient: cookie.save('#FID#COCLIENT#IDUSER', value.id, { path: '/' }),
                    idEntrepriseClient: cookie.save('#FID#COCLIENT#IDENT', value.identreprise, { path: '/' }),
                    idTransitionRedirection: value.id
                  })
              )
            )}
  
            //alert(this.state.isLogged)
            //window.location.href = '/dashboard';
            //return <Dashboard loggedIn={this.state.isLogged} />
            //window.history.pushState(null, null, '/dashboard');
            window.location.href = '/fichecoclient'
  
          }
  
      })
      .catch(err => console.error(err))
  
  
    }
  
    handleChange = (selectedOption) => {
      this.setState({ selectedOption });
      console.log(`Option selected:`, selectedOption);
    }

  renderRoute()
  {

    const { vrfLogged, vrfLoggedClient } = this.state
    const { selectedOption } = this.state;

    let options = this.state.options.map(function (valux) {
            return { value: valux.id, label: valux.nomsociete }
    })

    switch (window.location.pathname) 
    {
      case '/':
        return <div className="container">

        <div className="row justify-content-center">

        <div className="col-xl-10 col-lg-12 col-md-9">

            <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
                
                <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                    <div className="p-5">
                    <div className="text-center form-control-user">
                        <h1 className="h4 text-gray-900 mb-4">FIDELIZ <br/> <small>Espace entreprise</small></h1>
                    </div>
                    <form className="user">
                        <div className="form-group">
                        <input 
                        type="email" 
                        value={this.state.connexionEmail}
                        onChange={e => this.setState({connexionEmail: e.target.value})}
                        className="form-control form-control-user" 
                        placeholder="Enter Email Address..." 
                        
                        />
                        </div>
                        <div className="form-group">
                        <input 
                        type="password" 
                        value={this.state.connexionPassword}
                        onChange={e => this.setState({connexionPassword: e.target.value})}
                        className="form-control form-control-user" 
                        placeholder="Password" 
                        
                        />
                        </div>
                        <button type="button" onClick={this.Connexion.bind(this)} class="btn btn-primary btn-user btn-block">Connexion</button>
                        <hr/>
                        <a href="/connexionclient" className="btn btn-google btn-user btn-block">
                        Accès compte client
                        </a>
                    </form>
                    <hr/>
                    <div className="text-center">
                        <a className="small" href="forgot-password.html">Mot de passe oublié ?</a>
                    </div>
                    <div className="text-center">
                        <a className="small" href="/register">Pas de compte entreprise ? Cliquez-ici !</a>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>

        </div>

        </div>
        </div>
        break;
      case '/connexionclient':
        return <div className="container">

        <div className="row justify-content-center">

        <div className="col-xl-10 col-lg-12 col-md-9">

            <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
                
                <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                    <div className="p-5">
                    <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">FIDELIZ <br/> <small>Espace client</small></h1>
                    </div>
                    <form className="user">
                        <div className="form-group">
                            <Select
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={options}
                            /> 
                        </div>
                        <div className="form-group">
                        <input 
                            value={this.state.connexionEmailClient}
                            onChange={e => this.setState({connexionEmailClient: e.target.value})}
                            type="email" 
                            className="form-control" 
                            placeholder="Email"  
                        />
                        </div>
                        <div className="form-group">
                        <input 
                            value={this.state.connexionPasswordClient}
                            onChange={e => this.setState({connexionPasswordClient: e.target.value})}
                            type="password" 
                            className="form-control" 
                            placeholder="Password" 
                        />
                        </div>
                        <button type="button" onClick={this.connexionClient.bind(this)} class="btn btn-primary btn-user btn-block">Connexion</button>
                        <hr/>
                        <a href="/" className="btn btn-google btn-user btn-block">
                        Accès compte entreprise
                        </a>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            </div>

        </div>

        </div>
        </div>
        break;
      case '/register':
        return <Register />
        break;
      case '/dashboard':
        if( vrfLogged ) {
            return <Dashboard loggedIn={this.state.vrfLogged} idUserRecup={this.state.vrfIdUser} />
        }
        else{
            window.location.href = "/"
        }  
        break;
      case '/profil':
        if( vrfLogged ) {
            return <Profil loggedIn={this.state.vrfLogged} idUserRecup={this.state.vrfIdUser} />
        }
        else{
            window.location.href = "/"
        }  
        break;
      case '/client':
        if( vrfLogged ) {
            return <Client loggedIn={this.state.vrfLogged} idUserRecup={this.state.vrfIdUser} />
        }
        else{
            window.location.href = "/"
        }  
        break;
      case '/nouveauclient':
        if( vrfLogged ) {
            return <Nouveauclient loggedIn={this.state.vrfLogged} idUserRecup={this.state.vrfIdUser} />
        }
        else{
            window.location.href = "/"
        } 
        break;
      case '/voirclient':
        if( vrfLogged ) {
            return <Voirclient loggedIn={this.state.vrfLogged} idUserRecup={this.state.vrfIdUser} />
        }
        else{
            window.location.href = "/"
        }  
        break;
      case '/planning':
        if( vrfLogged ) {
            return <Planning loggedIn={this.state.vrfLogged} idUserRecup={this.state.vrfIdUser}  />
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
      case '/gestioncompte':
        if( vrfLogged ) {
            return <Gestioncompte loggedIn={this.state.vrfLogged} idUserRecup={this.state.vrfIdUser}  />
        }
        else{
            window.location.href = "/"
        } 
        break;
      case '/listetypecarte':
        if( vrfLogged ) {
            return <Listetypecarte loggedIn={this.state.vrfLogged} idUserRecup={this.state.vrfIdUser}  />
        }
        else{
            window.location.href = "/"
        } 
        break;
      case '/ajoutcarte':
        if( vrfLogged ) {
            return <Ajoutcarte loggedIn={this.state.vrfLogged} idUserRecup={this.state.vrfIdUser} bkgdCarte={this.state.infCarteBackground} iconCarte={this.state.infCarteIcon}  />
        }
        else{
            window.location.href = "/"
        } 
        break;
    /* PARTIE CLIENT */
    case '/fichecoclient':
        if( vrfLoggedClient ) {
          return <Fichecoclient loggedInClient={this.state.vrfLoggedClient} idUserRecupClient={this.state.vrfIdUserClient} idEntRecupClient={this.state.vrfIdEntrepriseClient} />
        }
        else{
          window.location.href = "/"
        } 
        break; 
    case '/editionclient':
        if( vrfLoggedClient ) {
          return <Editionclient loggedInClient={this.state.vrfLoggedClient} idUserRecupClient={this.state.vrfIdUserClient} idEntRecupClient={this.state.vrfIdEntrepriseClient} />
        }
        else{
          window.location.href = "/"
        } 
        break; 
    case '/mescadeaux':
        if( vrfLoggedClient ) {
          return <Mescadeaux loggedInClient={this.state.vrfLoggedClient} idUserRecupClient={this.state.vrfIdUserClient} idEntRecupClient={this.state.vrfIdEntrepriseClient} />
        }
        else{
          window.location.href = "/"
        } 
        break; 
    case '/planningclient':
        if( vrfLoggedClient ) {
          return <Planningclient loggedInClient={this.state.vrfLoggedClient} idUserRecupClient={this.state.vrfIdUserClient} idEntRecupClient={this.state.vrfIdEntrepriseClient} />
        }
        else{
          window.location.href = "/"
        } 
        break; 
    /* PARTIE CLIENT */    
      case '/buttons':
        return <Buttons />
        break;
      case '/cards':
        return <Cards />
        break;
      case '/login':
        return <Login />
        break;
      case '/forgot':
        return <Forgot />
        break;
      case '/404':
        return <Error />
        break;
      case '/blank':
        return <Blank />
        break;
      case '/charts':
        return <Charts />
        break;
      case '/table':
        return <Table />
        break;
      default:
        break;


    }



  }

  render() {
    return (
      <div id="page-top">
        {this.renderRoute()}
      </div>
    );
  }
}

export default App;
