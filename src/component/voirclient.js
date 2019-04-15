import React, { Component } from 'react';
import Loader from 'react-loader-spinner'
import Configuration from './fidconfig'

import Footer from './footer'
import Menu from './menu'

class Voirclient extends Component {

    constructor(props)
    {

        super(props)
        this.state = {
            idEntreprise: this.props.idUserRecup,
            dataInscription: '',
            nomClient: '',
            prenomClient: '',
            adresseClient: '',
            emailClient: '',
            telephoneClient: '',
            carteTotal: '',
            pointageTotal: '',
            selectedOption: null,
            afflisteCadeaux: [],
            prestation: '',

            carteId: '',
            carteDateCreation: '',
            carteNom: '',
            cartePrenom: '',
            carteNbPointage: '',
            carteLimitPointage: '',
            carteStatut: '',
            carteCadeaux: '',
            carteImgBackground: '',
            carteImgIcon: '',
            carteQrCode: '',
            carteStatutMsg: '',
            cartePointageMsg: '',
            gainsClient: '',
            prestationsClients: '',
            value: null,
            loading: false

        }

    }

    componentDidMount()
    {

            var idClient = this.props.match.params.id

            var apiRequest1 = fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=voirCarteClient&id=' + idClient
            + '&apikey=' + this.props.apikey).then(function(response){ 
                return response.json()
            });

            var apiRequest2 = fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=gainsClient&ident=' + this.props.idUserRecup
            + '&idclt=' + idClient
            + '&apikey=' + this.props.apikey).then(function(response){ 
                return response.json()
            });

            var apiRequest3 = fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=prestationsCadeauxClientsTotal&idclt=' + idClient
            + '&apikey=' + this.props.apikey).then(function(response){ 
                return response.json()
            });

            var apiRequest4 = fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=voirClient&id=' + idClient
            + '&apikey=' + this.props.apikey).then(function(response){ 
                return response.json()
            });

            var apiRequest5 = fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=afficheListeCadeaux&id=' + this.props.idUserRecup
            + '&apikey=' + this.props.apikey).then(function(response){ 
                return response.json()
            });

            var apiRequest6 = fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=prestationsCadeauxClients&idcarte=' + this.state.carteId
            + '&idclt=' + idClient
            + '&apikey=' + this.props.apikey).then(function(response){ 
                return response.json()
            });

            var combinedData = {"apiRequest1":{},"apiRequest2":{},"apiRequest3":{},"apiRequest4":{},"apiRequest5":{},"apiRequest6":{}};

            Promise.all([apiRequest1,apiRequest2,apiRequest3,apiRequest4,apiRequest5, apiRequest6])
            .then(function(values){
                combinedData["apiRequest1"] = values[0];
                combinedData["apiRequest2"] = values[1];
                combinedData["apiRequest3"] = values[2];
                combinedData["apiRequest4"] = values[3];
                combinedData["apiRequest5"] = values[4];
                combinedData["apiRequest6"] = values[5];

                if(combinedData["apiRequest1"] === "#VOIRCARTE#NOEXIST")
                {

                    this.setState({
                        carteStatutMsg: '1',
                        gainsClient: combinedData["apiRequest2"]                                  
                    })

                    if(combinedData["apiRequest3"] === "#GTTPRSTATION#FAILED")
                    {

                        console.log(combinedData["apiRequest3"])

                    }
                    else
                    {

                        this.setState({
                            prestationsClients: combinedData["apiRequest3"]                
                        })

                        combinedData["apiRequest4"].map((value) => 
                            (
                                this.setState({
                                    dataInscription: value.dinscription,
                                    nomClient: value.nom,
                                    prenomClient: value.prenom,
                                    adresseClient: value.adresse,
                                    emailClient: value.email,
                                    telephoneClient: value.telephone,
                                    carteTotal: value.nbcarteterminer,
                                    pointageTotal: value.nbpointagetotal                     
                                })
                            )
                          )

                          if(combinedData["apiRequest5"] === "#SLCTLISTECADEAUX#ECHEC")
                          {
              
                              this.setState({
                                  carteStatutMsg: '10'
                              })
              
                          }
                          else
                          {
              
                              this.setState({
                                  afflisteCadeaux: combinedData["apiRequest5"],
                                  loading: true 
                              })
              
                          }


                    }


                }
                else
                {

                    this.setState({
                        carteStatutMsg: '2'
                    })
    
                    combinedData["apiRequest1"].map((valuedeux, index) => 
                        (
                            this.setState({
                                carteId: valuedeux.id,
                                carteDateCreation: valuedeux.datecreation,
                                carteNom: valuedeux.nom,
                                cartePrenom: valuedeux.prenom,
                                carteNbPointage: valuedeux.nbpointage,
                                carteLimitPointage: valuedeux.limitpointage,
                                carteStatut: valuedeux.statut,
                                carteCadeaux: valuedeux.cadeaux,
                                carteImgBackground: valuedeux.imgbackground,
                                carteImgIcon: valuedeux.imgicon,
                                carteQrCode: valuedeux.qrcode                                            
                            })
                        )
                      )

                      combinedData["apiRequest4"].map((value, index) => 
                        (
                            this.setState({
                                dataInscription: value.dinscription,
                                nomClient: value.nom,
                                prenomClient: value.prenom,
                                adresseClient: value.adresse,
                                emailClient: value.email,
                                telephoneClient: value.telephone,
                                carteTotal: value.nbcarteterminer,
                                pointageTotal: value.nbpointagetotal                     
                            })
                        )
                      ) 
                      
                      if(combinedData["apiRequest5"] === "#SLCTLISTECADEAUX#ECHEC")
                      {
          
                          this.setState({
                              carteStatutMsg: '10'
                          })
          
                      }
                      else
                      {
          
                          this.setState({
                              afflisteCadeaux: combinedData["apiRequest5"]
                          })
          
                      }                      

                      this.setState({
                        gainsClient: combinedData["apiRequest2"]                   
                      })

                      if(combinedData["apiRequest6"] === "#GTTPRSTATION#FAILED")
                      {

                          console.log(combinedData["apiRequest6"])


                      }
                      else
                      {

                          this.setState({
                              prestationsClients: combinedData["apiRequest6"],
                              loading: true                 
                          })

                      }

                      /* Refaire le check du pointage en attente (stateMessage = 5) */

                      fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=verificationPointage&id=' + idClient
                      + '&apikey=' + this.props.apikey)
                      .then((response) => response.json())
                      .then((response) => {
              
                          if(response === "#VERIFPOINTAGE#EXISTE")
                          {

                                this.setState({
                                    cartePointageMsg: '5'
                                })


                          }
                  
              
                      })
                      .catch(err => console.error(err))


                }

    
            }.bind(this));

    }

    addPointage()
    {

        var idClient = this.props.match.params.id

        if(this.state.selectedOption === null)
        {

            fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=checkCloturation&id=' + idClient
            + '&apikey=' + this.props.apikey)
            .then((response) => response.json())
            .then((response) => {
    
                switch (response) {
                    case '#CLOTURATION#SUCCESS':
                        console.log(response)
                        this.setState({
                            cartePointageMsg: '4'
                        })
    
                        setTimeout(() => window.location.href = "/voirclient/" + idClient,2500)
                        break;   
                    case '#CLOTURATION#NONECESSAIRE':
                        console.log(response)
                        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=pointage&identreprise=' + this.state.idEntreprise 
                        + '&idcarte=' + this.state.carteId
                        + '&idclient=' + idClient
                        + '&prestation=Null'
                        + '&prix=0'
                        + '&qrcode=' + this.state.carteQrCode
                        + '&apikey=' + this.props.apikey)
                        .then((response) => response.json())
                        .then((response) => {
                
                            switch (response) {
                                case "#CARTEUPTCODE#SUCCESS":
                                    console.log(response)
                                    this.setState({
                                        cartePointageMsg: '1'
                                    })
                
                                    setTimeout(() => window.location.href = "/voirclient/" + idClient,2500)
                                    break;
                                case "#CARTEUPTCODE#ECHEC":
                                    console.log(response)
                                    this.setState({
                                        cartePointageMsg: '2'
                                    })
                                    break; 
                                case "#ADDPOINTAGE#ECHEC":
                                    console.log(response)
                                    this.setState({
                                        cartePointageMsg: '2'
                                    })
                                    break;     
                                case "#DATACLT#ECHEC":
                                    console.log(response)
                                    this.setState({
                                        cartePointageMsg: '2'
                                    })
                                    break; 
                                case "#DATAENT#ECHEC":
                                    console.log(response)
                                    this.setState({
                                        cartePointageMsg: '2'
                                    })
                                    break; 
                                case "#CHECKPOINTAGE#EXISTE":
                                    console.log(response)
                                    this.setState({
                                        cartePointageMsg: '3'
                                    })
                                    break; 
                                default:
                                    break;
                            }
                    
                
                        })
                        .catch(err => console.error(err))
                        break;            
                    default:
                        break;
                }
    
    
        
    
            })
            .catch(err => console.error(err))

        }
        else
        {

            var myprestation = this.state.selectedOption.label

            var mysplitprestation = myprestation.split(" - ");

            fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=checkCloturation&id=' + idClient
            + '&apikey=' + this.props.apikey)
            .then((response) => response.json())
            .then((response) => {
    
                switch (response) {
                    case '#CLOTURATION#SUCCESS':
                        console.log(response)
                        this.setState({
                            cartePointageMsg: '4'
                        })
    
                        setTimeout(() => window.location.href = "/voirclient/" + idClient,2500)
                        break;   
                    case '#CLOTURATION#NONECESSAIRE':
                        console.log(response)
                        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=pointage&identreprise=' + this.state.idEntreprise 
                        + '&idcarte=' + this.state.carteId
                        + '&idclient=' + idClient
                        + '&prestation=' + mysplitprestation[0]
                        + '&prix=' + mysplitprestation[1].substring(0, mysplitprestation[1].length-1)
                        + '&qrcode=' + this.state.carteQrCode
                        + '&apikey=' + this.props.apikey)
                        .then((response) => response.json())
                        .then((response) => {
                
                            switch (response) {
                                case "#CARTEUPTCODE#SUCCESS":
                                    console.log(response)
                                    this.setState({
                                        cartePointageMsg: '1'
                                    })
                
                                    setTimeout(() => window.location.href = "/voirclient/" + idClient,2500)
                                    break;
                                case "#CARTEUPTCODE#ECHEC":
                                    console.log(response)
                                    this.setState({
                                        cartePointageMsg: '2'
                                    })
                                    break; 
                                case "#ADDPOINTAGE#ECHEC":
                                    console.log(response)
                                    this.setState({
                                        cartePointageMsg: '2'
                                    })
                                    break;     
                                case "#DATACLT#ECHEC":
                                    console.log(response)
                                    this.setState({
                                        cartePointageMsg: '2'
                                    })
                                    break; 
                                case "#DATAENT#ECHEC":
                                    console.log(response)
                                    this.setState({
                                        cartePointageMsg: '2'
                                    })
                                    break; 
                                case "#CHECKPOINTAGE#EXISTE":
                                    console.log(response)
                                    this.setState({
                                        cartePointageMsg: '3'
                                    })
                                    break; 
                                default:
                                    break;
                            }
                    
                
                        })
                        .catch(err => console.error(err))
                        break;            
                    default:
                        break;
                }
    
    
        
    
            })
            .catch(err => console.error(err))


        }







    }

    verifieEtatPointage()
    {


        if(this.state.cartePointageMsg === '1')
        {

            return <div className="alert alert-success">
        
                Le pointage a bien été initialiser. Votre client peut maintenant valider !
        
            </div>


        }
        else if (this.state.cartePointageMsg === '2') 
        {
            

            return <div className="alert alert-danger">
        
                Le pointage n'a pas pu être initialiser. Veuillez recommencer...
        
            </div>

        }
        else if (this.state.cartePointageMsg === '3') 
        {
            

            return <div className="alert alert-danger">
        
                Veuillez terminer le pointage en cours avant de recommencer...
        
            </div>

        }
        else if (this.state.cartePointageMsg === '4') 
        {
            

            return <div className="alert alert-danger">
        
                Limitation pointage atteinte, la carte été cloturer. Veuillez recrée une nouvelle carte.
        
            </div>

        }    
        else if (this.state.cartePointageMsg === '5') 
        {
            

            return <div className="alert alert-warning">
        
                <center>Votre client possède un pointage en attente...</center>
        
            </div>

        }    


    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
      }

    render() {

    let loadingdata;
    if(this.state.loading)
    {

        loadingdata = <div>

                        {this.verifieEtatPointage()}

                        <div className="container-fluid">


                                
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Fiche client</h1>
                            </div>





                        <hr/>

                        {/* DEBUT CODE */}

                        <div className="row">

                            <div className="col-md-12">
                            
                                <div className="row">
                                
                                    <div className="col-md-6 mb-4">
                                    <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Gains total sur client</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.gainsClient} €</div>
                                            </div>
                                            <div className="col-auto">
                                            <i className="fas fa-hand-holding-usd fa-2x"></i>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>  

                                    <div className="col-md-6 mb-4">
                                    <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Prestation total offerte au client</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.prestationsClients} €</div>
                                            </div>
                                            <div className="col-auto">
                                            <i className="fas fa-exchange-alt fa-2x"></i>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>                            
                                
                                </div>

                                <br/>
                            
                            </div>

                        </div>

                        <br/>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Date inscription : </td>
                                <td>{this.state.dataInscription}</td>
                            </tr>
                            <tr>
                                <td>Nom : </td>
                                <td>{this.state.nomClient}</td>
                            </tr>
                            <tr>
                                <td>Prénom : </td>
                                <td>{this.state.prenomClient}</td>
                            </tr>
                            <tr>
                                <td>Adresse : </td>
                                <td>{this.state.adresseClient}</td>
                            </tr>
                            <tr>
                                <td>Email : </td>
                                <td>{this.state.emailClient}</td>
                            </tr>
                            <tr>
                                <td>N° Téléphone : </td>
                                <td>{this.state.telephoneClient}</td>
                            </tr>
                            <tr>
                                <td>Carte total : </td>
                                <td>{this.state.carteTotal}</td>
                            </tr>
                            <tr>
                                <td>Pointage total : </td>
                                <td>{this.state.pointageTotal}</td>
                            </tr>
                            </tbody>
                        </table>                
                        <hr/>


                        {/* FIN CODE */}


                        </div>



        </div>

    }
    else
    {

        loadingdata =  <div className="styleLoader"><center><Loader 
                            type="Triangle"
                            color="#00BFFF"
                            height="100"	
                            width="100"
                        /> </center></div>


    }

    return (
        <div>

            <div id="wrapper">

                

                <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">

                    <Menu />

                    {loadingdata}

                </div>

                <Footer />

                </div>

            </div>

            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>

        </div>
    );
    }
}

export default Voirclient;
    