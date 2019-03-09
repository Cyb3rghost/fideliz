import React, { Component } from 'react';

import edition from '../../images/gestionCompteProfil.png'
import Configuration from '../fidconfig'

import Navbarupclient from './navbarupclient'
import Menu from './menuclient'


class Fichecoclient extends Component {

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
            prestationsClients: '',

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
            listePointage: []

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
                  )}

                  fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=listePointageClient&idfid=' + this.state.carteId
                  + '&idclient=' + this.props.idUserRecupClient 
                  + '&ident=' + this.props.idEntRecupClient)
                  .then((response) => response.json())
                  .then((response) => {
          
                      switch (response) {
                          case '#POINTAGE#VIDE':
                              console.log(response)
                              this.setState({
                                  cartePointageMsg: '5'
                              })
                              break;            
                          default:
                              console.log(response)
                              this.setState({
                                  listePointage: response
                              })
                              break;
                      }
          
                  })
                  .catch(err => console.error(err)) 


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


        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=prestationsCadeauxClientsTotal&idclt=' + this.props.idUserRecupClient)
        .then((response) => response.json())
        .then((response) => {

            if(response === "#GTTPRSTATION#FAILED")
            {

                console.log(response)


            }
            else
            {

                console.log(response)

                this.setState({
                    prestationsClients: response                    
                })

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
            </div>

        }


    }

    confirmation()
    {

        var audio = new Audio();
        audio.src = "sons/bip.mp3"

        audio.play()

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
                                this.setState({
                                    cartePointageMsg: '3'
                                })
                                setTimeout(() => window.location.href = "/fichecoclient",1500)
                                break;   
                            case '#UPTENTREPRISE#ECHEC':
                                console.log(response)
                                this.setState({
                                    cartePointageMsg: '4'
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

    verifieEtatPointage()
    {



        if (this.state.cartePointageMsg === '2') 
        {
            

            return <div className="alert alert-danger">
        
                Aucune carte de fidélité n'est liée à ce compte.
        
            </div>

        }
        else if (this.state.cartePointageMsg === '3') 
        {
            

            return <div className="alert alert-success">
        
                Votre pointage a bien été valider. Patientez...
        
            </div>

        }        
        else if (this.state.cartePointageMsg === '4') 
        {
            

            return <div className="alert alert-danger">
        
                Votre pointage n'a pas été valider.
        
            </div>

        }  


    }

    scannerPointage()
    {

        if(this.state.cartePointageMsg === '1')
        {

            if(navigator.getUserMedia){
                navigator.getUserMedia(
                {
                  video: true
                }, 
                function(localMediaStream){}, 
                function(err){
                  console.log('The following error occurred when trying to access the camera: ' + err); 
                }

            
              );
                return <div className="row">

                <div className="col-md-12">
                <div className="card border-left-success border-right-success shadow h-100 py-2">
                        <div className="card-body">
                        <center>Votre pointage est en attente ! <br/>
                              <button type="button" onClick={() => window.location.href='/qrcodeclient'} className="btn btn-dark"><i className="fas fa-qrcode"></i> QRCODE</button>
                        </center>
                        {/*<button onClick={this.confirmation.bind(this)} type="button" class="btn btn-dark">Veuillez confirmer !</button></center>*/}
                        </div>
                    </div>
                </div>                           
                </div>

              } else {
                console.log('Sorry, browser does not support camera access');

                return <div className="row">

                <div className="col-md-12">
                <div className="card border-left-success border-right-success shadow h-100 py-2">
                        <div className="card-body">
                        <center>Votre pointage est en attente ! <br/>
                            <button type="button" onClick={this.confirmation.bind(this)} className="btn btn-dark"><i className="fas fa-handshake"></i> Validation manuelle</button>
                        </center>
                        {/*<button onClick={this.confirmation.bind(this)} type="button" class="btn btn-dark">Veuillez confirmer !</button></center>*/}
                        </div>
                    </div>
                </div>                           
                </div>

              }


            


        }

    }

    afficheListePointage()
    {

        if(this.state.carteStatutMsg === '5')
        {

            return <div className="alert alert-danger">
        
                Aucun pointage à afficher.
        
            </div>

        }
        else
        {


            return this.state.listePointage.map((valuedeux, index) => 
            (
                <tr key={index}>
                    <td>{valuedeux.entreprise}</td>
                    <td>{valuedeux.departpointage}</td>
                    <td>{valuedeux.finpointage}</td>
                    <td>{valuedeux.prestation}</td>
                    <td>{valuedeux.prix}</td>
                </tr>
            )
            )


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

                    <Navbarupclient idUser={this.props.idUserRecupClient} />

                    <div className="container-fluid">

                    <div className="row">

                            <div className="col-8">
                            
                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-gray-800">Fiche client</h1>
                                </div>


                            </div>
                            <div className="col-4">
                                                        
                                <a href={'/editionclient'}><img src={edition} width="70" height="70" align="right" title="Editez votre profil" /></a>

                            </div>

                    </div>

                    <hr/>
                    {this.verifieEtatPointage()}
                    <br/>

                    <div className="row">
                    
                        <div className="col-md-6">
                        
                            {this.afficheCarte()}
                        
                        </div>
                        <div className="col-md-6">

                            {this.scannerPointage()}<br/>

                            <div className="row">

                            <div className="col-md-12">
                            <div className="card border-left-primary shadow h-100 py-2">
                                    <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Economie réalisés sur les prestations</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.prestationsClients} €</div>
                                        </div>
                                        <div className="col-auto">
                                        <i class="fas fa-exchange-alt fa-2x"></i>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>                           

                            </div>
                        
                        </div>
                    
                    </div>



                    {/* DEBUT CODE */}

                    <br/>

                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#infos" role="tab" aria-controls="infos" aria-selected="true">Informations sur votre profil</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#listepointages" role="tab" aria-controls="profile" aria-selected="false">Historique des pointages</a>
                        </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="infos" role="tabpanel" aria-labelledby="home-tab">
                        
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
                        
                        </div>
                        <div className="tab-pane fade" id="listepointages" role="tabpanel" aria-labelledby="profile-tab">

                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <td>Entreprise</td>
                                        <td>Départ pointage</td>
                                        <td>Fin pointage</td>
                                        <td>Prestation</td>
                                        <td>Prix</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {this.afficheListePointage()}
                                    </tbody>
                                </table>
                        
                        </div>
                    </div>
                                    


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

export default Fichecoclient;
