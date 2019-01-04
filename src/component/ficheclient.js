import React, { Component } from 'react';
import Menu from './menu'

import userClient from '../images/adduser.png';
import addCarte from '../images/addcarte.png';

class Ficheclient extends Component {

    constructor(props)
    {

        super(props)
        this.state = {
            dataInscription: '',
            nomClient: '',
            prenomClient: '',
            adresseClient: '',
            emailClient: '',
            telephoneClient: '',
            carteTotal: '',
            pointageTotal: ''
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
                        carteTotal: value.nbcartetotal,
                        pointageTotal: value.nbpointagetotal                     
                    })
                )
              )}
    

        })
        .catch(err => console.error(err))

    }

    render() {
      var idClient = window.location.search.substring(4);
      return (
        <div id="wrapper">
          
        <Menu />

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
                <h2><img src={userClient} width="70" height="70" alt="Responsive image"/> FICHE CLIENT</h2>
            </div>
        
        </div>         

        
        <div className="page-header">
            <div className="container-perso">
                <div className="row">
                
                    <div className="col-xs-8">
                    
                        <h1>Informations sur le client <br/></h1>
                        <p className="text-justify">Un client sera automatiquement reliée à votre compte. Il disposera d'un accès à son compte client afin de pouvoir gêrer 
                        et effectuer ses pointages à chaque prestation. Il pourra également suivre l'évolution de son compte.</p>
                    
                    </div>
                    <div className="col-xs-4 cadreAddCarte">
                    
                        <a href={'/listetypecarte?id=' + idClient}><img src={addCarte} width="100" height="100" title="Ajouter une carte de fidélité" alt="Responsive image"/></a>

                    </div>
                
                </div>
            </div>
        </div>
        
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
        
          
        </div>
      );
    }
  }

export default Ficheclient;