import React, { Component } from 'react';
import cookie from 'react-cookies'
import Select from 'react-select';
import { Offline, Online } from "react-detect-offline";
import validator from 'validator';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Configuration from './component/fidconfig'
import './App.css';

import offline from './images/offline.png'
import ReactGA from 'react-ga';

/* INTERFACE ENTREPRISE */
import Dashboard from './component/dashboard'
import Profil from './component/profil'
import Modifprofil from './component/modifprofil'
import Client from './component/client'
import Nouveauclient from './component/nouveauclient'
import Inscriptionclient from './component/inscriptionclient'
import Voirclient from './component/voirclient'
//import Gestioncompte from './component/gestioncompte'
import Log from './component/log'
import Prestations from './component/prestations'
import Productivite from './component/productivite'
/* INTERFACE ENTREPRISE */

/* INTERFACE CLIENT */
import Fichecoclient from './component/componentclient/fichecoclient'
import Editionclient from './component/componentclient/editionclient'
import Mescadeaux from './component/componentclient/mescadeaux'
import Logpointages from './component/componentclient/logpointage'
import Qrcodeclient from './component/componentclient/qrcodeclient'
import Archives from './component/componentclient/archivesclient'
/* INTERFACE CLIENT */


import Register from './component/register'
import Error from './component/404'
import Maintenance from './component/maintenance'

ReactGA.initialize('UA-139038748-1');
ReactGA.pageview(window.location.pathname + window.location.search);

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
            infTypeCompte: '',
            infAPIKEY: '',
            vrfLogged: cookie.load('#FID#CO#SUCCESS'),
            vrfIdUser: cookie.load('#FID#CO#IDUSER'),
            vrfInfosCarteBg: cookie.load('#FID#CO#CARTEBG'),
            vrfInfosCarteIcon: cookie.load('#FID#CO#CARTEICON'),
            vrfInfosTypeCompte: cookie.load('#FID#CO#TYPECPT'),
            vrfInfosAPIKEY: cookie.load('#FID#CO#APIKEY'),
            // GESTION CONNEXION CLIENT
            connexionEmailClient: '',
            connexionPasswordClient: '',
            isLoggedClient: false,
            idUserClient: '',
            vrfLoggedClient: cookie.load('#FID#COCLIENT#SUCCESS'),
            vrfIdUserClient: cookie.load('#FID#COCLIENT#IDUSER'),
            vrfIdEntrepriseClient: cookie.load('#FID#COCLIENT#IDENT'),
            idTransitionRedirection: '',
            apikeyz: '',

            selectedOption: null,
            options: [],
            dataMaintenance: '',
            dataVersion: '',
            dataUrlMaj: '',
            objetMaintenance: '',
            checkMsg: ''


        }

    }

    componentDidMount()
    {

          var idapikey = Math.floor(Math.random() * 10) + 1;

          var apiRequest1 = fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=getApiKey'
          + '&id=' + idapikey).then(function(response){ 
              return response.json()
          });
          var apiRequest2 = fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=maintenance').then(function(response){
                      return response.json()
          });
          var apiRequest3 = fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=selectionSociete').then(function(response){
                      return response.json()
          });
  
          var combinedData = {"apiRequest1":{},"apiRequest2":{},"apiRequest3":{}};
  
          Promise.all([apiRequest1,apiRequest2, apiRequest3])
          .then(function(values){
              combinedData["apiRequest1"] = values[0];
              combinedData["apiRequest2"] = values[1];
              combinedData["apiRequest3"] = values[2];
              
              combinedData["apiRequest1"].map((value) => 
              (
    
                this.setState({
                  apikeyz: value.apikey
                })
    
              ))
  
              combinedData["apiRequest2"].map((value) => 
              (
  
                  this.setState({
                    dataMaintenance: value.maintenance,
                    dataVersion: value.version,
                    dataUrlMaj: value.url,
                    objetMaintenance: value.objet
                  })
  
                )
              )
  
              this.setState({
                options: combinedData["apiRequest3"]
              })
  
  
          }.bind(this));

        

    }

    Connexion(event)
    {
  
      const {connexionEmail, connexionPassword, isLogged, idUser } = this.state;

      event.preventDefault();

      fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=jourRestantMaj&cntemail=' + connexionEmail + '&cntpassword=' + connexionPassword)
      .then((response) => response.json())
      .then((response) => {
          console.log(response)

          if(response === "#ENT#NOEXIST")
          {

            this.setState({
                checkMsg: '1',
                connexionEmail: '',
                connexionPassword: ''
            })

            setTimeout(() => window.location.href = "/",2500)

          }
          else
          {

            fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=configurationPremiereConnexion&cntemail=' + connexionEmail + '&cntpassword=' + connexionPassword)
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
  
                  fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=connexion&cntemail=' + connexionEmail + '&cntpassword=' + connexionPassword)
                  .then((response) => response.json())
                  .then((response) => {
                      console.log(response)
                      this.setState({ isLogged, idUser })
                      if(response === "#CO#ECHEC")
                      {
                        
                        this.setState({
                          checkMsg: '2',
                          connexionEmail: '',
                          connexionPassword: ''
                        })
              
                      }
                      else {
              
                        response.map((value, index) => 
                          (
                              this.setState({
                                connexionEmail: '',
                                connexionPassword: '',
                                isLogged: cookie.save('#FID#CO#SUCCESS', true, { path: '/' }),
                                idUser: cookie.save('#FID#CO#IDUSER', value.id, { path: '/' }),
                                infCarteBackground: cookie.save('#FID#CO#CARTEBG', value.imgfond, { path: '/' }),
                                infCarteIcon: cookie.save('#FID#CO#CARTEICON', value.imgicon, { path: '/' }),
                                infTypeCompte: cookie.save('#FID#CO#TYPECPT', value.typecompte, { path: '/'}),
                                infAPIKEY: cookie.save('#FID#CO#APIKEY', this.state.apikeyz, { path: '/'})
                              })
                          )
                        )

                        ReactGA.event({
                          category: 'User',
                          action: 'Une entreprise se connecte.'
                        });
              
                        //alert(this.state.isLogged)
                        //window.location.href = '/dashboard';
                        //return <Dashboard loggedIn={this.state.isLogged} />
                        //window.history.pushState(null, null, '/dashboard');
                        window.location.pathname = '/dashboard'
              
                      }
              
                  })
                  .catch(err => console.error(err))
        
            })
            .catch(err => console.error(err))

            
          }


  
      })
      .catch(err => console.error(err))


  
    }
  
    connexionClient(event)
    {
  
        const { connexionEmailClient, connexionPasswordClient, isLoggedClient, idUserClient, selectedOption } = this.state;
  
        event.preventDefault()
        //alert('Email : ' + emailClient + '\n Password : ' + passwordClient)
  
        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=connexionClient&idEntreprise=' + selectedOption.value + '&cntemail=' + connexionEmailClient + '&cntpassword=' + connexionPasswordClient)
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          this.setState({ isLoggedClient, idUserClient })
          if(response === "#COCLIENT#ECHEC")
          {
            
            this.setState({
              checkMsg: '3',
              connexionEmailClient: '',
              connexionPasswordClient: ''
            })

            setTimeout(() => window.location.href = "/connexionclient",2500)
  
          }
          else {
  
            response.map((value, index) => 
              (
                  this.setState({
                    connexionEmailClient: '',
                    connexionPasswordClient: '',
                    isLoggedClient: cookie.save('#FID#COCLIENT#SUCCESS', true, { path: '/' }),
                    idUserClient: cookie.save('#FID#COCLIENT#IDUSER', value.id, { path: '/' }),
                    idEntrepriseClient: cookie.save('#FID#COCLIENT#IDENT', value.identreprise, { path: '/' }),
                    infAPIKEY: cookie.save('#FID#CO#APIKEY', this.state.apikeyz, { path: '/'}),
                    idTransitionRedirection: value.id
                  })
              )
            )

            ReactGA.event({
              category: 'User',
              action: 'Un client se connecte.'
            });
  
            //alert(this.state.isLogged)
            //window.location.href = '/dashboard';
            //return <Dashboard loggedIn={this.state.isLogged} />
            //window.history.pushState(null, null, '/dashboard');
            window.location.href = '/fichecoclient'
  
          }
  
      })
      .catch(err => console.error(err))
  
  
    }

    checkMsg()
    {

      if(this.state.checkMsg === '1')
      {

        return <div className="alert alert-danger">
        
            <center>Connexion impossible à cette entreprise car elle n'existe pas, vérifiez vos informations...</center>
        
        </div>

      }
      else if(this.state.checkMsg === '2')
      {

        return <div className="alert alert-danger">
        
            <center>Connexion impossible, vérifiez vos informations...</center>
        
        </div>

      }
      else if(this.state.checkMsg === '3')
      {

        return <div className="alert alert-danger">
        
            <center>Connexion impossible, vérifiez vos informations...</center>
        
        </div>

      }



    }
  
    handleChange = (selectedOption) => {
      this.setState({ selectedOption });
      console.log(`Option selected:`, selectedOption);
    }

  render() {
    const { vrfLogged, vrfLoggedClient, dataMaintenance } = this.state
    const { selectedOption, connexionEmail, connexionPassword, connexionEmailClient, connexionPasswordClient } = this.state;

    const isEnabled = validator.isEmail(connexionEmail) && !validator.isEmpty(connexionPassword);
    const isEnabledTwo = validator.isEmail(connexionEmailClient) && !validator.isEmpty(selectedOption.label) && !validator.isEmpty(connexionPasswordClient)

    let options = this.state.options.map(function (valux) {
            return { value: valux.id, label: valux.nomsociete }
    })

    /* GERE L'ABONNEMENT 
    <Route path="/gestioncompte/:eventpaiement?/:identreprise?/:mode?/:abonnement?/:prix?/:limitationclient?/:secure?" render={( props ) => dataMaintenance === "1" ? <Redirect to="/maintenance" /> : vrfLogged?<Gestioncompte {...props} loggedIn={this.state.vrfLogged} idUserRecup={this.state.vrfIdUser} infoTypeCompte={this.state.vrfInfosTypeCompte} apikey={this.state.vrfInfosAPIKEY} /> : <Redirect to="/" />} />
    */

    return (
      <div>
      <Online>
      <Router>
            <Switch>
                    <Route exact path="/" render={() => dataMaintenance === "1" ? <Redirect to="/maintenance" /> : <div className="container">

                    <div className="row justify-content-center">

                    <div className="col-xl-10 col-lg-12 col-md-9">

                        <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            
                            <div className="row">
                            <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                            <div className="col-lg-6">
                                <div className="p-5">
                                <div className="text-center form-control-user">
                                    <h1 className="h4 text-gray-900 mb-4">FIDLIZ <span className="text-danger">[BETA]</span><br/> <small>Espace entreprise</small></h1>
                                </div>
                                {this.checkMsg()}
                                <form onSubmit={this.Connexion.bind(this)} className="user">
                                    <div className="form-group">
                                    <input 
                                    type="email" 
                                    value={this.state.connexionEmail}
                                    onChange={e => this.setState({connexionEmail: e.target.value})}
                                    className="form-control" 
                                    placeholder="Enter Email Address..." 
                                    
                                    />
                                    </div>
                                    <div className="form-group">
                                    <input 
                                    type="password" 
                                    value={this.state.connexionPassword}
                                    onChange={e => this.setState({connexionPassword: e.target.value})}
                                    className="form-control" 
                                    placeholder="Password" 
                                    
                                    />
                                    </div>
                                    <button type="submit" disabled={!isEnabled} className="btn btn-primary btn-block">Connexion</button>
                                    <hr/>
                                    <a href="/connexionclient" className="btn btn-google btn-block">
                                    Accès compte client
                                    </a>
                                </form>
                                <hr/>
                                <div className="text-center">
                                    <a className="small" href="">Mot de passe oublié ?</a>
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
                    </div>} /> 

                <Route path="/connexionclient" render={() => dataMaintenance === "1" ? <Redirect to="/maintenance" /> : <div className="container">

                <div className="row justify-content-center">

                <div className="col-xl-10 col-lg-12 col-md-9">

                    <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        
                        <div className="row">
                        <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                        <div className="col-lg-6">
                            <div className="p-5">
                            <div className="text-center">
                                <h1 className="h4 text-gray-900 mb-4">FIDLIZ <span className="text-danger">[BETA]</span><br/> <small>Espace client</small></h1>
                            </div>
                            {this.checkMsg()}
                            <form onSubmit={this.connexionClient.bind(this)} className="user">
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
                                <button type="submit" disabled={!isEnabledTwo} className="btn btn-primary btn-block">Connexion</button>
                                <hr/>
                                <a href="/" className="btn btn-google btn-block">
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
                </div>} />

                <Route path="/register" render={() => dataMaintenance === "1" ? <Redirect to="/maintenance" /> : <Register apikey={this.state.vrfInfosAPIKEY} /> } />
                <Route path="/dashboard" render={() => dataMaintenance === "1" ? <Redirect to="/maintenance" /> : vrfLogged?<Dashboard loggedIn={this.state.vrfLogged} idUserRecup={this.state.vrfIdUser} infoTypeCompte={this.state.vrfInfosTypeCompte} apikey={this.state.vrfInfosAPIKEY} version={this.state.dataVersion} urlmaj={this.state.dataUrlMaj} /> : <Redirect to="/" />} />
                <Route path="/profil" render={() => dataMaintenance === "1" ? <Redirect to="/maintenance" /> : vrfLogged?<Profil loggedIn={this.state.vrfLogged} idUserRecup={this.state.vrfIdUser} infoTypeCompte={this.state.vrfInfosTypeCompte} apikey={this.state.vrfInfosAPIKEY} /> : <Redirect to="/" />} />
                <Route path="/modifprofil" render={() => dataMaintenance === "1" ? <Redirect to="/maintenance" /> : vrfLogged?<Modifprofil loggedIn={this.state.vrfLogged} idUserRecup={this.state.vrfIdUser} infoTypeCompte={this.state.vrfInfosTypeCompte} apikey={this.state.vrfInfosAPIKEY} /> : <Redirect to="/" />} />
                <Route path="/client" render={() => dataMaintenance === "1" ? <Redirect to="/maintenance" /> : vrfLogged?<Client loggedIn={this.state.vrfLogged} idUserRecup={this.state.vrfIdUser} infoTypeCompte={this.state.vrfInfosTypeCompte} apikey={this.state.vrfInfosAPIKEY} /> : <Redirect to="/" />} />
                <Route path="/nouveauclient" render={() => dataMaintenance === "1" ? <Redirect to="/maintenance" /> : vrfLogged?<Nouveauclient loggedIn={this.state.vrfLogged} idUserRecup={this.state.vrfIdUser} infoTypeCompte={this.state.vrfInfosTypeCompte} apikey={this.state.vrfInfosAPIKEY} /> : <Redirect to="/" />} />
                <Route path="/inscriptionclient/:identreprise/:emailclt" render={( props ) => dataMaintenance === "1" ? <Redirect to="/maintenance" /> : <Inscriptionclient {...props} />} />
                <Route path="/voirclient/:id" render={( props ) => dataMaintenance === "1" ? <Redirect to="/maintenance" /> : vrfLogged?<Voirclient {...props} loggedIn={this.state.vrfLogged} idUserRecup={this.state.vrfIdUser} infoTypeCompte={this.state.vrfInfosTypeCompte} apikey={this.state.vrfInfosAPIKEY} /> : <Redirect to="/" />} />
                <Route path="/log" render={() => dataMaintenance === "1" ? <Redirect to="/maintenance" /> : vrfLogged?<Log loggedIn={this.state.vrfLogged} idUserRecup={this.state.vrfIdUser} infoTypeCompte={this.state.vrfInfosTypeCompte} bkdgCarte={this.state.vrfInfosCarteBg} iconCarte={this.state.vrfInfosCarteIcon} apikey={this.state.vrfInfosAPIKEY} /> : <Redirect to="/" />} />
                <Route path="/prestations" render={() => dataMaintenance === "1" ? <Redirect to="/maintenance" /> : vrfLogged?<Prestations loggedIn={this.state.vrfLogged} idUserRecup={this.state.vrfIdUser} infoTypeCompte={this.state.vrfInfosTypeCompte} bkdgCarte={this.state.vrfInfosCarteBg} iconCarte={this.state.vrfInfosCarteIcon} apikey={this.state.vrfInfosAPIKEY} /> : <Redirect to="/" />} />
                <Route path="/productivite" render={() => dataMaintenance === "1" ? <Redirect to="/maintenance" /> : vrfLogged?<Productivite loggedIn={this.state.vrfLogged} idUserRecup={this.state.vrfIdUser} infoTypeCompte={this.state.vrfInfosTypeCompte} bkdgCarte={this.state.vrfInfosCarteBg} iconCarte={this.state.vrfInfosCarteIcon} apikey={this.state.vrfInfosAPIKEY} /> : <Redirect to="/" />} />
                <Route path="/maintenance" render={() => <Maintenance etatmaintenance={this.state.dataMaintenance} version={this.state.dataVersion} objet={this.state.objetMaintenance} />} />

                <Route path="/fichecoclient" render={() => dataMaintenance === "1" ? <Redirect to="/maintenance" /> : vrfLoggedClient?<Fichecoclient loggedInClient={this.state.vrfLoggedClient} idUserRecupClient={this.state.vrfIdUserClient} idEntRecupClient={this.state.vrfIdEntrepriseClient} apikey={this.state.vrfInfosAPIKEY} /> : <Redirect to="/connexionclient" />} />
                <Route path="/editionclient" render={() => dataMaintenance === "1" ? <Redirect to="/maintenance" /> : vrfLoggedClient?<Editionclient loggedInClient={this.state.vrfLoggedClient} idUserRecupClient={this.state.vrfIdUserClient} idEntRecupClient={this.state.vrfIdEntrepriseClient}  apikey={this.state.vrfInfosAPIKEY}/> : <Redirect to="/connexionclient" />} />
                <Route path="/mescadeaux" render={() => dataMaintenance === "1" ? <Redirect to="/maintenance" /> : vrfLoggedClient?<Mescadeaux loggedInClient={this.state.vrfLoggedClient} idUserRecupClient={this.state.vrfIdUserClient} idEntRecupClient={this.state.vrfIdEntrepriseClient} apikey={this.state.vrfInfosAPIKEY} /> : <Redirect to="/connexionclient" />} />
                <Route path="/logpointages" render={() => dataMaintenance === "1" ? <Redirect to="/maintenance" /> : vrfLoggedClient?<Logpointages loggedInClient={this.state.vrfLoggedClient} idUserRecupClient={this.state.vrfIdUserClient} idEntRecupClient={this.state.vrfIdEntrepriseClient} apikey={this.state.vrfInfosAPIKEY} /> : <Redirect to="/connexionclient" />} />
                <Route path="/qrcodeclient" render={() => dataMaintenance === "1" ? <Redirect to="/maintenance" /> : vrfLoggedClient?<Qrcodeclient loggedInClient={this.state.vrfLoggedClient} idUserRecupClient={this.state.vrfIdUserClient} idEntRecupClient={this.state.vrfIdEntrepriseClient} apikey={this.state.vrfInfosAPIKEY} /> : <Redirect to="/connexionclient" />} />
                <Route path="/archives" render={() => dataMaintenance === "1" ? <Redirect to="/maintenance" /> : vrfLoggedClient?<Archives loggedInClient={this.state.vrfLoggedClient} idUserRecupClient={this.state.vrfIdUserClient} idEntRecupClient={this.state.vrfIdEntrepriseClient} apikey={this.state.vrfInfosAPIKEY} /> : <Redirect to="/connexionclient" />} />
                <Route render={() => <Error />}/>
            </Switch>
      </Router>
      </Online>
      <Offline><div className="container">
            <br/>
            <div className="text-center">
                <p><img src={offline} className="img-fluid" alt="Connexion internet perdu..." /><br/></p>
                <div className="alert alert-danger">
                  <center><p>Vous devez être connecté à internet.<br/>
                  Veuillez vérifier votre connexion internet. (<b>3G / 4G / Wi-FI</b>)</p></center>
                </div>
                <br/>
                
            </div>
        </div></Offline>
      </div>
    );
  }
}

export default App;
