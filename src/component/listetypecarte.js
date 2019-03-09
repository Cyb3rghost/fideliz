import React, { Component } from 'react';
import Configuration from './fidconfig'

import Navbarup from './navbarup'
import loyaltyCard from '../images/loyaltycard.png';

import Menu from './menu'


class Listetypecarte extends Component {


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
            cartePointageMsg: ''

        }

    }

    componentDidMount()
    {

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=voirClient&id=' + this.props.idUserRecupClient)
        .then((response) => response.json())
        .then((response) => {

            {response.map((value, index) => 
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
              )}
    

        })
        .catch(err => console.error(err))

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=voirCarteClient&id=' + this.props.idUserRecupClient)
        .then((response) => response.json())
        .then((response) => {

            if(response === "#VOIRCARTE#NOEXIST")
            {

                this.setState({
                    carteStatutMsg: '1'                                      
                })
            }
            else
            {

                
                this.setState({
                    carteStatutMsg: '2'
                })

                {response.map((valuedeux, index) => 
                    (
                        this.setState({
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
                  )}


            }


    

        })
        .catch(err => console.error(err))

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=checkPointage&id=' + this.props.idUserRecupClient)
        .then((response) => response.json())
        .then((response) => {

            switch (response) {
                case '#CHKPOINTAGE#SUCCESS':
                    this.setState({
                        cartePointageMsg: '1'
                    })
                    break;          
                default:
                    break;
            }


    

        })
        .catch(err => console.error(err))



    }

    afficheCarte()
    {

        var QRCode = require('qrcode.react');

        if(this.state.carteStatutMsg === "1")
        {


            return <div className="msgErrorPerso">
        
            <center>Vous ne possédez pas de carte de fidélité.</center>
    
            </div>


        }
        else
        {

            return <div>
            <div className="container-perso">
                <div className="panelCarte">
                    <div id="personalizecarte">  
                        <img src={Configuration.hostnameManuelServer + 'fidapi/img/' + this.state.carteImgBackground} className="img-responsive" id="img1" alt="" /> 
                        <h2 id="positionDonnee">{this.state.carteNom} {this.state.cartePrenom} <br/><small>{this.state.carteDateCreation} - {this.state.carteNbPointage} / {this.state.carteLimitPointage} Pointages</small></h2>
                        <img src={Configuration.hostnameManuelServer + 'fidapi/img/' + this.state.carteImgIcon}  width="100" height="100" id="img2" className="img-rounded" alt="" />
                        <QRCode
                            value={this.state.carteQrCode}
                            size={100}
                            id="img3"
                        />
                    </div> 
                </div>  
            </div>
            <br/>
            {/*this.state.carteDateCreation
            this.state.carteNom
            this.state.cartePrenom
            this.state.carteNbPointage
            this.state.carteLimitPointage
            this.state.carteStatut
            this.state.carteCadeaux
            this.state.carteImgBackground
            this.state.carteImgIcon
            this.state.carteQrCode
            */}
            </div>

        }


    }

    confirmation()
    {

        var idClient = window.location.search.substring(4);


        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=checkDatePointage&idclient=' + this.props.idUserRecupClient
        + '&identreprise=' + this.props.idEntRecupClient)
        .then((response) => response.json())
        .then((response) => {

            switch (response) {
                case '#CHKDATEPTGE#SUCCESS':
                    console.log(response)
                    fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=checkCloturation&id=' + this.props.idUserRecupClient)
                    .then((response) => response.json())
                    .then((response) => {
            
                        switch (response) {
                            case '#CLOTURATION#SUCCESS':
                                console.log(response)
                                break;   
                            case '#CLOTURATION#NONECESSAIRE':
                                console.log(response)
                                fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=validationPointage&id=' + this.props.idUserRecupClient + '&idEntreprise=' + this.props.idEntRecupClient)
                                .then((response) => response.json())
                                .then((response) => {
                        
                                    switch (response) {
                                        case '#UPTENTREPRISE#SUCCESS':
                                            console.log(response)
                                            setTimeout(() => window.location.href = "/fichecoclient",1000)
                                            break;   
                                        case '#UPTENTREPRISE#ECHEC':
                                            console.log(response)
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
                    break;   
                case '#CHKDATEPTGE#NOEXIST':
                    console.log(response)
                    fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=checkCloturation&id=' + this.props.idUserRecupClient)
                    .then((response) => response.json())
                    .then((response) => {
            
                        switch (response) {
                            case '#CLOTURATION#SUCCESS':
                                console.log(response)
                                break;   
                            case '#CLOTURATION#NONECESSAIRE':
                                console.log(response)
                                fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=validationPointage&id=' + this.props.idUserRecupClient + '&idEntreprise=' + this.props.idEntRecupClient)
                                .then((response) => response.json())
                                .then((response) => {
                        
                                    switch (response) {
                                        case '#UPTENTREPRISE#SUCCESS':
                                            console.log(response)
                                            setTimeout(() => window.location.href = "/fichecoclient",1000)
                                            break;   
                                        case '#UPTENTREPRISE#ECHEC':
                                            console.log(response)
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
                    break;   
                case '#CHKDATEPTGE#ECHEC': 
                    console.log(response)
                    break;
                default:
                    break;
            }


    

        })
        .catch(err => console.error(err))


    }

    verifieEtatPointage()
    {


        if(this.state.cartePointageMsg === '1')
        {

            return <div className="msgSuccessPerso">
        
                Votre pointage est en attente ! <br/><button onClick={this.confirmation.bind(this)} class="btn btn-default" type="submit">Veuillez confirmer !</button>
        
            </div>


        }
        else if (this.state.cartePointageMsg === '2') 
        {
            

            return <div className="msgErrorPerso">
        
                Aucune carte de fidélité n'est liée à ce compte.
        
            </div>

        }
        


    }

    
  render() {
    var idClient = window.location.search.substring(4);

    return (
      <div>

            <div id="wrapper">

                <Menu />

                <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">

                    <Navbarup idEntreprise={this.props.idUserRecup} />

                    <div className="container-fluid">

                    <div className="row">

                            <div className="col-6">
                            
                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-gray-800">TYPE DE CARTE</h1>
                                </div>


                            </div>
                            <div className="col-6">
                                                        

                            </div>

                    </div>

                    <hr/>

                    {/* DEBUT CODE */}

                        {this.props.infoTypeCompte === "0" &&
                    
                                <div><a href={'/ajoutcarte?id=' + idClient}><div class="card">
                                <div class="card-body">

                                        <div className="row">

                                            <div className="col-8">
                                            
                                            <h1>CARTE DE FIDELITE</h1>
                                            
                                            </div>
                                            <div className="col-4">
                                            
                                                <img src={loyaltyCard} width="100" height="100" title="Carte de réduction" align="right" alt="Responsive image"/>

                                            
                                            </div>

                                        </div>

                                </div>
                            </div></a>

                            <br/></div>             
                        
                        }

                        {this.props.infoTypeCompte === "1" &&
                        
                            <div><a href={'/ajoutcarte?id=' + idClient}><div class="card">
                            <div class="card-body">

                                    <div className="row">

                                        <div className="col-8">
                                        
                                        <h1>CARTE DE FIDELITE</h1>
                                        
                                        </div>
                                        <div className="col-4">
                                        
                                            <img src={loyaltyCard} width="100" height="100" title="Carte de réduction" align="right" alt="Responsive image"/>

                                        
                                        </div>

                                    </div>

                            </div>
                        </div></a>

                        <br/>
                                
                        <div class="card">
                            <div class="card-body">

                                    <div className="row">

                                        <div className="col-8">
                                        
                                        <h1>CARTE DE REDUCTION</h1>
                                        
                                        </div>
                                        <div className="col-4">
                                        
                                            <img src={loyaltyCard} width="100" height="100" title="Carte de réduction" align="right" alt="Responsive image"/>

                                        
                                        </div>

                                    </div>

                            </div>
                        </div>

                        <br/>                    
                        
                        
                        
                        
                        
                        
                        
                        </div>             
                
                    }

                    {this.props.infoTypeCompte === "2" &&
                        
                        <div><a href={'/ajoutcarte?id=' + idClient}><div class="card">
                        <div class="card-body">

                                <div className="row">

                                    <div className="col-8">
                                    
                                    <h1>CARTE DE FIDELITE</h1>
                                    
                                    </div>
                                    <div className="col-4">
                                    
                                        <img src={loyaltyCard} width="100" height="100" title="Carte de réduction" align="right" alt="Responsive image"/>

                                    
                                    </div>

                                </div>

                        </div>
                    </div></a>

                    <br/>
                            
                    <div class="card">
                        <div class="card-body">

                                <div className="row">

                                    <div className="col-8">
                                    
                                    <h1>CARTE DE REDUCTION</h1>
                                    
                                    </div>
                                    <div className="col-4">
                                    
                                        <img src={loyaltyCard} width="100" height="100" title="Carte de réduction" align="right" alt="Responsive image"/>

                                    
                                    </div>

                                </div>

                        </div>
                    </div>

                    <br/>                    
                    
                    <div class="card">
                            <div class="card-body">

                                    <div className="row">

                                        <div className="col-8">
                                        
                                        <h1>CARTE CADEAUX</h1>
                                        
                                        </div>
                                        <div className="col-4">
                                        
                                            <img src={loyaltyCard} width="100" height="100" title="Carte cadeaux" align="right" alt="Responsive image"/>

                                        
                                        </div>

                                    </div>

                            </div>
                        </div>

                    <br/>                
                    
                    </div>             
            
                }
                    {/* FIN CODE */}


                    </div>

                </div>

                <footer className="sticky-footer bg-white">
                    <div className="container my-auto">
                    <div className="copyright text-center my-auto">
                        <span>Copyright &copy; Your Website 2019</span>
                    </div>
                    </div>
                </footer>

                </div>

            </div>

            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>

            <div className="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                    </div>
                    <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                    <div className="modal-footer">
                    <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <a className="btn btn-primary" href="login.html">Logout</a>
                    </div>
                </div>
                </div>
            </div>

      </div>
    );
  }
}

export default Listetypecarte;
