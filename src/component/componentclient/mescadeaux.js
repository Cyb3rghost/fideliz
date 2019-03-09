import React, { Component } from 'react';
import Configuration from '../fidconfig'

import Navbarupclient from './navbarupclient'
import Menu from './menuclient'

class Mescadeaux extends Component {

    constructor(props){

        super(props)
        this.state = {
            cadeauxAttente: [],
            cadeauxRecu: [],
            statutConfirmationCadeaux: '',
            statutCadeauxAttente: '',
            statutCadeauxRecu: '',
        }

    }

    componentDidMount()
    {

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=afficheCadeauxAttente&id=' + this.props.idUserRecupClient)
        .then((response) => response.json())
        .then((response) => {

            console.log(response)

            if(response === "#AFFCADEAUX#ECHEC")
            {

                this.setState({
                    statutCadeauxAttente: '2'
                })



            }
            else
            {

                this.setState({
                    cadeauxAttente: response,
                    statutCadeauxAttente: '1'
                })                

            }


        })
        .catch(err => console.error(err))

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=afficheCadeauxRecu&id=' + this.props.idUserRecupClient)
        .then((response) => response.json())
        .then((response) => {

            console.log(response)

            if(response === "#AFFCADEAUXRECU#ECHEC")
            {

                this.setState({
                    statutCadeauxRecu: '2'
                })



            }
            else
            {

                this.setState({
                    cadeauxRecu: response,
                    statutCadeauxRecu: '1'
                })                

            }


    

        })
        .catch(err => console.error(err))        

    }

    envoieConfirmation(idCadeaux)
    {

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=confirmationCadeaux&id=' + idCadeaux)
        .then((response) => response.json())
        .then((response) => {

            switch (response) {
                case '#CONFIRMCADEAUX#SUCCESS':
                    this.setState({
                        statutConfirmationCadeaux: '1'
                    })

                    setTimeout(() => window.location.href = "/mescadeaux?id=" + this.props.idUserRecupClient,1000)
                    break;
                case '#CONFIRMCADEAUX#ECHEC':
                    this.setState({
                        statutConfirmationCadeaux: '2'
                    })                    
                    break;            
                default:
                    break;
            }
    

        })
        .catch(err => console.error(err))

    }

    checkStatutConfirmation()
    {

        if(this.state.statutConfirmationCadeaux === '1')
        {

            return <div className="msgSuccessPerso">
                
                Vous venez de confirmer que la prestation a bien été effectuer. Patientez...
    
            </div>


        }
        else if (this.state.statutConfirmationCadeaux === '2') 
        {
            

            return <div className="msgErrorPerso">
                
                Votre cadeau n'a pas pu être confirmer. Veuillez recommencer !
        
            </div>

        }

    }

    afficheCadeauxAttente()
    {

        var QRCode = require('qrcode.react');

        if(this.state.statutCadeauxAttente === '1')
        {

            return this.state.cadeauxAttente.map(value => {
                return ( <div key={value.id}>
                    <div  className="wellCadeaux">
                        <div className="container-perso"><div className="row">
                    
                        <div className="col-xs-2">
                        

                            <QRCode
                                value={value.code}
                                size={100}
                            />  
                        
                        
                        </div>
                        <div className="col-xs-10">
                        
                            <b>Identifiant carte :</b> {value.idcarte} <br/>
                            <b>Cadeaux crée le :</b> {value.date} <br/>
                            <b>Cadeaux :</b> {value.cadeaux} <br/>
                            <b>Valeur : </b> {value.prix} €<br/>
                            <b>Statut :</b> {value.statut} <br/>
                            <center><button class="btn btn-loginConnexion" onClick={() => this.envoieConfirmation(value.id)} type="submit">Confirmation</button></center>
                        
                        </div>
                    
                    
                    
                    </div>
                    </div>
                </div>
                
                </div>
                        )
            })


        }
        else if (this.state.statutCadeauxAttente === '2') 
        {
            

            return <div className="msgErrorPerso">
                
                Vous n'avez pas de cadeaux en attente !
        
            </div>

        }



    }


    afficheCadeauxRecu()
    {

        var QRCode = require('qrcode.react');

        if(this.state.statutCadeauxRecu === '1')
        {

            return this.state.cadeauxRecu.map(value => {
                return ( <div key={value.id}>
                    <div  className="wellCadeaux">
                        <div className="container-perso"><div className="row">
                    
                        <div className="col-md-2">
                        

                            <QRCode
                                value={value.code}
                                size={100}
                            />  
                        
                        
                        </div>
                        <div className="col-md-10">
                        
                            <b>Identifiant carte :</b> {value.idcarte} <br/>
                            <b>Cadeaux crée le :</b> {value.date} <br/>
                            <b>Cadeaux reçu le :</b> {value.datereceptioncadeaux} <br/>
                            <b>Cadeaux :</b> {value.cadeaux} <br/>
                            <b>Valeur : </b> {value.prix} €<br/>
                            <b>Statut :</b> {value.statut} <br/>
                        
                        </div>
                    
                    
                    
                    </div>
                    </div>
                </div>
                
                </div>
                        )
            })


        }
        else if (this.state.statutCadeauxRecu === '2') 
        {
            

            return <div className="msgErrorPerso">
                
                Vous n'avez reçu aucun cadeaux !
        
            </div>

        }



    }




  render() {
    var idClient = window.location.search.substring(4);
    var QRCode = require('qrcode.react');

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
                                    <h1 className="h3 mb-0 text-gray-800">Cadeaux fidélité</h1>
                                </div>


                            </div>
                            <div className="col-4">
                                                        
                                

                            </div>

                    </div>

                    <hr/>
                    
                    {/* DEBUT CODE */}
 
                    {this.checkStatutConfirmation()}

                    <div className="page-header">
                        <div className="container-perso">

                            <h1>• En Attente... <br/></h1>
                            <p className="text-justify">Vous trouverez ici votre prestation en attente de réclamation, l'entreprise devras alors confirmer la validation
                            de la prestation en cours avant de pouvoir recrée une carte de fidélité. <b>Attention :</b> Confirmer votre cadeau uniquement quand la prestation à été réaliser !</p>

                        </div>
                    </div>    

                    {this.afficheCadeauxAttente()}

                    <div className="page-header">
                        <div className="container-perso">

                            <h1>• Cadeaux reçu... <br/></h1>
                            <p className="text-justify">Vous trouverez ici vos prestations terminées.</p>

                        </div>
                    </div>    

                    {this.afficheCadeauxRecu()}

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

export default Mescadeaux;
