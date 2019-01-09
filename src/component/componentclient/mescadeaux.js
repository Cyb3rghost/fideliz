import React, { Component } from 'react';

import Menuclient from './menuclient'


import iconCadeaux from '../../images/mescadeaux.png'

class Mescadeaux extends Component {

    constructor(props){

        super(props)
        this.state = {
            cadeauxAttente: []
        }

    }

    componentDidMount()
    {

        var idClient = window.location.search.substring(4);

        fetch('http://127.0.0.1/fidapi/main.php?action=afficheCadeauxAttente&id=' + idClient)
        .then((response) => response.json())
        .then((response) => {

            if(response === "#AFFCADEAUX#ECHEC")
            {

                console.log(response)
            }
            else
            {

                
                this.setState({
                    cadeauxAttente: response
                })
    
                console.log(this.state.cadeauxAttente)


            }




        })
        .catch(err => console.error(err))

    }

    afficheCadeauxAttente()
    {
        // SA BUG IL FAUT REVOIR
        var QRCode = require('qrcode.react');

        {this.state.cadeauxAttente.map((value, index) => 
            (
                <div>
                    <div key={index} className="wellCadeaux">
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
                            <b>Statut :</b> {value.statut} <br/>
                            <center><a class="btn btn-loginConnexion" href="#" role="button">Réclamation</a></center>
                        
                        </div>
                    
                    
                    
                    </div>
                    </div>
                </div>
                
                </div>
            )
          )}



    }



    render() {
      var idClient = window.location.search.substring(4);
      return (
        <div id="wrapper">

            <Menuclient />

            <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                        <a className="navbar-brand" href="#"></a>
                        </div>
                        <ul className="nav navbar-nav navbar-right">
                        <li className="active"><a href="#">Home</a></li>
                        <li><a href="#">Page 1</a></li>
                        <li><a href="#">Page 2</a></li>
                        <li><a href="#">Page 3</a></li>
                        </ul>
                    </div>
            </nav>
            <div className="panelInfo">
                
                <div className="container-perso">
                    <h2><img src={iconCadeaux} width="70" height="70" alt="Responsive image"/> CADEAUX FIDELITES</h2>
                </div>

            </div>         

            

            <div className="page-header">
                <div className="container-perso">

                    <h1>• En Attente... <br/></h1>
                    <p className="text-justify">Vous trouverez ici votre prestation en attente de réclamation, l'entreprise devras alors confirmer la validation
                    de la prestation en cours avant de pouvoir recrée une carte de fidélité.</p>

                </div>
            </div>    

            {this.afficheCadeauxAttente()}

            <div className="page-header">
                <div className="container-perso">

                    <h1>• Cadeaux reçu... <br/></h1>
                    <p className="text-justify">Vous trouverez ici vos prestations terminées.</p>

                </div>
            </div>    
  
          
        </div>
      );
    }
  }

export default Mescadeaux;






 