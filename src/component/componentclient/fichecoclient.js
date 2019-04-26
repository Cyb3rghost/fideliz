import React, { Component } from 'react';

import Configuration from '../fidconfig'

import Menu from './menuclient'
import Footer from '../footer'
import Modal from 'react-responsive-modal';
import Rating from 'react-rating'

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
            nbpointage: '',
            pointageTotal: '',
            prestationsClients: '',
            rating: '0',
            open: false,

            listePointage: []

        }

    }



    componentDidMount()
    {

        const installGoogleAds = () => {
            const elem = document.createElement("script");
            elem.src =
              "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
            elem.async = true;
            elem.defer = true;
            document.body.insertBefore(elem, document.body.firstChild);
        };
        installGoogleAds();
        (window.adsbygoogle = window.adsbygoogle || []).push({});

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=voirClient&id=' + this.props.idUserRecupClient
        + '&identreprise=' + this.props.idEntRecupClient
        + '&apikey=' + this.props.apikey)
        .then((response) => response.json())
        .then((response) => {

            response.map((value, index) => 
                (
                    this.setState({
                        identifiantclient: value.id,
                        dataInscription: value.dinscription,
                        nomClient: value.nom,
                        prenomClient: value.prenom,
                        adresseClient: value.adresse,
                        emailClient: value.email,
                        telephoneClient: value.telephone,
                        nbpointage: value.nbpointage,
                        carteTotal: value.nbcarteterminer,
                        pointageTotal: value.nbpointagetotal,
                        rating: value.rating,
                        codepostal: value.codepostal,
                        ville: value.ville                     
                    })
                )
              )
    
              if(this.state.rating === '1')
              {

                this.setState({ open: true });

              }

        })
        .catch(err => console.error(err))

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=prestationsCadeauxClientsTotal&idclt=' + this.props.idUserRecupClient
        + '&identreprise=' + this.props.idEntRecupClient
        + '&apikey=' + this.props.apikey)
        .then((response) => response.json())
        .then((response) => {

            if(response === "#GTTPRSTATION#VIDE")
            {

                console.log(response)
                this.setState({
                    prestationsClients: '0'                   
                })

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

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=listePointageClient'
        + '&idclient=' + this.props.idUserRecupClient 
        + '&ident=' + this.props.idEntRecupClient
        + '&apikey=' + this.props.apikey)
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

    onOpenModal = () => {
        this.setState({ open: true });
    };
     
    onCloseModal = () => {
        this.setState({ open: false });

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=resetRatingClient'
        + '&idclient=' + this.props.idUserRecupClient
        + '&apikey=' + this.props.apikey)
        .then((response) => response.json())
        .then((response) => {

            console.log(response)
            
        })
        .catch(err => console.error(err))

    };

    /*confirmation() A GARDER SI ON REMET LA VALIDATION MANUELLE.
    {

        var audio = new Audio();
        audio.src = "sons/bip.mp3"

        audio.play()

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=checkCloturation&id=' + this.props.idUserRecupClient
        + '&apikey=' + this.props.apikey)
        .then((response) => response.json())
        .then((response) => {

            switch (response) {
                case '#CLOTURATION#SUCCESS':
                    console.log(response)
                    break;   
                case '#CLOTURATION#NONECESSAIRE':
                    console.log(response)
                    fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=validationPointage&id=' + this.props.idUserRecupClient 
                    + '&idEntreprise=' + this.props.idEntRecupClient
                    + '&apikey=' + this.props.apikey)
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


    }*/

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
                    <td>{valuedeux.finpointage}</td>
                    <td>{valuedeux.prestation}</td>
                    <td>{valuedeux.prix} €</td>
                </tr>
            )
            )


        }


    }

    getRating(value)
    {

        console.log('Note attribuée : ' + value)
        var Note = '0'
        var Today = new Date()

        switch (value) {
            case 1:
                Note = '0'
                break;
            case 2:
                Note = '2.5'
                break;  
            case 3:
                Note = '5'
                break;  
            case 4:
                Note = '7.5'
                break;
            case 5:
                Note = '10'
                break;    
            default:
                break;             
                
        }

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=notationClient'
        + '&identreprise=' + this.props.idEntRecupClient
        + '&idclient=' + this.props.idUserRecupClient
        + '&score=' + Note
        + '&date=' + Today
        + '&apikey=' + this.props.apikey)
        .then((response) => response.json())
        .then((response) => {

            console.log(response)
            if(response === "#NOTATION#SUCCESS")
            {

                fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=resetRatingClient'
                + '&idclient=' + this.props.idUserRecupClient)
                .then((response) => response.json())
                .then((response) => {
        
                    console.log(response)
                    if(response === "#RESETRATING#SUCCESS")
                    {
        
                        this.setState({ open: false })
        
                    }
        
                })
                .catch(err => console.error(err))

            }

        })
        .catch(err => console.error(err)) 


    }

  render() {
    const { open } = this.state;

    return (
      <div>

            <div id="wrapper">

                

                <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">

                    <Menu title="Fiche client" />

                    <div className="container-fluid">
                    
                    

                    <div className="row">
                    
                        <div className="col-md-6">

                            <br/>
                            <h3>BIENVENUE, {this.state.nomClient} {this.state.prenomClient}</h3>

                        </div>
                        <div className="col-md-6">

                            <br/>
                            <div align="right">
                            <a className="btn btn-dark" href={'/archives'} role="button"><i title="Visualisation des archives de carte" className="fab fa-cc-discover fa-4x"></i></a>
                            &nbsp;
                            <a className="btn btn-dark" href={'/logpointages'} role="button"><i title="Visualisation des pointages" className="fas fa-clipboard-list fa-4x"></i></a>
                            &nbsp;
                            <a className="btn btn-dark" href={'/editionclient'} role="button"><i title="Modification du profil" className="fas fa-cogs fa-4x"></i></a>
                            </div>                        

                        
                        </div>
                    
                    
                    </div>

                    <hr/>
                    {this.verifieEtatPointage()}

                    <div className="row">

                        <div className="col-md-12">

                            <button type="button" onClick={() => window.location.href='/qrcodeclient'} className="btn btn-dark btn-block"><i className="fas fa-qrcode"></i> QRCODE</button>

                            <br/>

                            <ins className='adsbygoogle'
                            style={{ display: 'block' }}
                            data-ad-client='ca-pub-6868568671322455'
                            data-ad-slot='7446486547'
                            data-ad-format='auto'></ins>

                            

                        </div>                           
                    </div>

                    <br/>

                    <div className="row">
                    
                        <div className="col-md-6">

                                <div className="col-md-12">
                                <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Economie réalisés sur les prestations</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.prestationsClients} €</div>
                                            </div>
                                            <div className="col-auto">
                                            <i className="fas fa-exchange-alt fa-2x"></i>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>  <br/>

                                <div className="col-md-12">

                                <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Nombre de pointage</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.nbpointage}</div>
                                            </div>
                                            <div className="col-auto">
                                            <i className="fas fa-exchange-alt fa-2x"></i>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>  <br/>

                        </div>
                        <div className="col-md-6">    
 
                                <div className="col-md-12">
                                <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Carte total</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.carteTotal}</div>
                                            </div>
                                            <div className="col-auto">
                                            <i className="fas fa-exchange-alt fa-2x"></i>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>  <br/>

                                <div className="col-md-12">
                                <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Pointage Total</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.pointageTotal}</div>
                                            </div>
                                            <div className="col-auto">
                                            <i className="fas fa-exchange-alt fa-2x"></i>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>  
                        
                        </div>
                    
                    </div>



                    {/* DEBUT CODE */}

                    <br/>

                    <div className="table-responsive">
                            <table className="table table-striped bg-white">
                                    <thead>
                                    <tr>
                                        
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td><b>ID Client :</b> </td>
                                        <td>{this.state.identifiantclient}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Inscription :</b> </td>
                                        <td>{this.state.dataInscription}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Nom :</b> </td>
                                        <td>{this.state.nomClient}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Prénom :</b> </td>
                                        <td>{this.state.prenomClient}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Adresse :</b> </td>
                                        <td>{this.state.adresseClient}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Code postal:</b> </td>
                                        <td>{this.state.codepostal}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Ville :</b> </td>
                                        <td>{this.state.ville}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Email :</b> </td>
                                        <td>{this.state.emailClient}</td>
                                    </tr>
                                    <tr>
                                        <td><b>N° Téléphone :</b> </td>
                                        <td>{this.state.telephoneClient}</td>
                                    </tr>
                                    </tbody>
                            </table>     
                        </div>

                    {/* FIN CODE */}


                    </div>

                </div>

                <Footer />
                
                </div>

            </div>

            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>

            <Modal open={open} onClose={this.onCloseModal} center>
                        <h2>Système de notation</h2>
                        <hr/>
                        <p>Prenez quelques secondes afin d'évaluer la qualité du travail
                            de votre prestataire. Cela lui permettra de s'améliorer et également
                            d'obtenir une meilleure visibilité.
                        </p>
                        <br/>
                        <center>        
                            <Rating
                                emptySymbol="far fa-star fa-2x"
                                fullSymbol="fas fa-star fa-2x"
                                onClick={this.getRating.bind(this)}
                            />
                        </center>
            </Modal>

      </div>
    );
  }
}

export default Fichecoclient;
