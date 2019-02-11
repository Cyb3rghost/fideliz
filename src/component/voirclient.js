import React, { Component } from 'react';

import pointage from '../images/pointage.png'
import calendrier from '../images/calendar.png'
import addCarte from '../images/addcarte.png'

import Navbarup from './navbarup'
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


            var idClient = window.location.search.substring(4);
            fetch('http://127.0.0.1/fidapi/main.php?action=voirClient&id=' + idClient)
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
    
            fetch('http://127.0.0.1/fidapi/main.php?action=voirCarteClient&id=' + idClient)
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

    }

    afficheCarte()
    {

        var QRCode = require('qrcode.react');

        if(this.state.carteStatutMsg === "1")
        {


            return <div className="msgErrorPerso">
        
            <center>Ce client ne possède pas de carte de fidélité.</center>
    
            </div>


        }
        else
        {

            return <div>
            <div className="container-perso"><div className="panelCarte">
                <div id="personalizecarte">  
                    <img src={'http://127.0.0.1/fidapi/img/' + this.state.carteImgBackground} className="img-responsive" id="img1" alt="" /> 
                    <h2 id="positionDonnee">{this.state.carteNom} {this.state.cartePrenom} <br/><small>{this.state.carteDateCreation} - {this.state.carteNbPointage} / {this.state.carteLimitPointage} Pointages</small></h2>
                    <img src={'http://127.0.0.1/fidapi/img/' + this.state.carteImgIcon}  width="100" height="100" id="img2" className="img-rounded" alt="" />
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

    addPointage()
    {

        var idClient = window.location.search.substring(4);


        fetch('http://127.0.0.1/fidapi/main.php?action=checkCloturation&id=' + idClient)
        .then((response) => response.json())
        .then((response) => {

            switch (response) {
                case '#CLOTURATION#SUCCESS':
                    console.log(response)
                    this.setState({
                        cartePointageMsg: '4'
                    })

                    setTimeout(() => window.location.href = "/voirclient?id=" + idClient,2500)
                    break;   
                case '#CLOTURATION#NONECESSAIRE':
                    console.log(response)
                    fetch('http://127.0.0.1/fidapi/main.php?action=pointage&identreprise=' + this.state.idEntreprise + '&idclient=' + idClient)
                    .then((response) => response.json())
                    .then((response) => {
            
                        switch (response) {
                            case "#CARTEUPTCODE#SUCCESS":
                                this.setState({
                                    cartePointageMsg: '1'
                                })
            
                                setTimeout(() => window.location.href = "/voirclient?id=" + idClient,2500)
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

    afficheActBouton()
    {

        var idClient = window.location.search.substring(4);

        if(this.state.carteStatutMsg != '2')
        {
            return <div><a href={'/listetypecarte?id=' + idClient}><img src={addCarte} width="100" height="100" title="Ajouter une carte de fidélité" alt="Responsive image"/></a>
            &nbsp;&nbsp;<a href={'/planning?id=' + idClient}><img src={calendrier} width="100" height="100" title="Gestion planning client" alt="Responsive image"/></a></div>
        }
        else if(this.state.carteStatutMsg === '2')
        {
            return <div><img src={pointage} width="100" height="100" onClick={this.addPointage.bind(this)} title="Pointé la carte de fidélité" alt="Responsive image"/>
                   &nbsp;&nbsp;<a href={'/planning?id=' + idClient}><img src={calendrier} width="100" height="100" title="Gestion planning client" alt="Responsive image"/></a></div>
        }


    }

    verifieEtatPointage()
    {


        if(this.state.cartePointageMsg === '1')
        {

            return <div className="msgSuccessPerso">
        
                Le pointage a bien été initialiser. Votre client peut maintenant valider !
        
            </div>


        }
        else if (this.state.cartePointageMsg === '2') 
        {
            

            return <div className="msgErrorPerso">
        
                Le pointage n'a pas pu être initialiser. Veuillez recommencer...
        
            </div>

        }
        else if (this.state.cartePointageMsg === '3') 
        {
            

            return <div className="msgErrorPerso">
        
                Veuillez terminer le pointage en cours avant de recommencer...
        
            </div>

        }
        else if (this.state.cartePointageMsg === '4') 
        {
            

            return <div className="msgErrorPerso">
        
                Limitation pointage atteinte, la carte été cloturer. Veuillez recrée une nouvelle carte.
        
            </div>

        }        


    }


  render() {
    return (
      <div>

            <div id="wrapper">

                <Menu />

                <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">

                    <Navbarup />

                    <div className="container-fluid">

                    <div className="row">

                            <div className="col-8">
                            
                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-gray-800">Fiche client</h1>
                                </div>


                            </div>
                            <div className="col-4">
                            
                                    {this.afficheActBouton()}
                            
                            </div>

                    </div>

                    {this.verifieEtatPointage()}

                    <hr/>

                    {/* DEBUT CODE */}

                    {this.afficheCarte()}
                    <br/>
                    <table class="table table-striped">
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

export default Voirclient;
