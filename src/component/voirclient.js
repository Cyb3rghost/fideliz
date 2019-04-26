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

            var apiRequest2 = fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=gainsClient&ident=' + this.props.idUserRecup
            + '&idclt=' + idClient
            + '&apikey=' + this.props.apikey).then(function(response){ 
                return response.json()
            });

            var apiRequest3 = fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=prestationsCadeauxClientsTotal&idclt=' + idClient
            + '&identreprise=' + this.props.idUserRecup
            + '&apikey=' + this.props.apikey).then(function(response){ 
                return response.json()
            });

            var apiRequest4 = fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=voirClient&id=' + idClient
            + '&identreprise=' + this.props.idUserRecup
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

            var combinedData = {"apiRequest2":{},"apiRequest3":{},"apiRequest4":{},"apiRequest5":{},"apiRequest6":{}};

            Promise.all([apiRequest2,apiRequest3,apiRequest4,apiRequest5, apiRequest6])
            .then(function(values){
                combinedData["apiRequest2"] = values[0];
                combinedData["apiRequest3"] = values[1];
                combinedData["apiRequest4"] = values[2];
                combinedData["apiRequest5"] = values[3];
                combinedData["apiRequest6"] = values[4];

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

                  if(combinedData["apiRequest2"] === '#GTOTALCLT#VIDE')
                  {

                    this.setState({
                        gainsClient: '0'               
                      })

                  }
                  else
                  {

                    this.setState({
                        gainsClient: combinedData["apiRequest2"]                   
                    })

                  }



                  if(combinedData["apiRequest6"] === "#GTTPRSTATION#VIDE")
                  {

                    this.setState({
                        prestationsClients: '0',
                        loading: true              
                      })


                  }
                  else
                  {

                      this.setState({
                          prestationsClients: combinedData["apiRequest6"],
                          loading: true                 
                      })

                  }
    
            }.bind(this))

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

                        <div className="container-fluid">

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

                    <Menu title="Fiche client" />

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
    