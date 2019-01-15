import React, { Component } from 'react';

import Menuclient from './menuclient'


import iconCadeaux from '../../images/mescadeaux.png'

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
        
        var idClient = window.location.search.substring(4);

        fetch('http://127.0.0.1/fidapi/main.php?action=afficheCadeauxAttente&id=' + idClient)
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

        fetch('http://127.0.0.1/fidapi/main.php?action=afficheCadeauxRecu&id=' + idClient)
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

        var idClient = window.location.search.substring(4);

        fetch('http://127.0.0.1/fidapi/main.php?action=confirmationCadeaux&id=' + idCadeaux)
        .then((response) => response.json())
        .then((response) => {

            switch (response) {
                case '#CONFIRMCADEAUX#SUCCESS':
                    this.setState({
                        statutConfirmationCadeaux: '1'
                    })

                    setTimeout(() => window.location.href = "/mescadeaux?id=" + idClient,1000)
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
                    
                        <div className="col-md-2">
                        

                            <QRCode
                                value={value.code}
                                size={100}
                            />  
                        
                        
                        </div>
                        <div className="col-md-10">
                        
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

            <Menuclient />

            <div className="panelInfo">
                
                <div className="container-perso">
                    <h2><img src={iconCadeaux} width="70" height="70" alt="Responsive image"/> CADEAUX FIDELITES</h2>
                </div>

            </div>         

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
          
        </div>
      );
    }
  }

export default Mescadeaux;






 