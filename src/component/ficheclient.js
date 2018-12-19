import React, { Component } from 'react';
import Menu from './menu'

import userClient from '../images/adduser.png';

class Ficheclient extends Component {


    render() {
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
            <h1>Informations sur le client <br/></h1>
                <p className="text-justify">Un client sera automatiquement reliée à votre compte. Il disposera d'un accès à son compte client afin de pouvoir gêrer 
                et effectuer ses pointages à chaque prestation. Il pourra également suivre l'évolution de son compte.</p>
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
                <td align="center">18/12/2018</td>
            </tr>
            <tr>
                <td>Nom : </td>
                <td align="center">LEVENEUR</td>
            </tr>
            <tr>
                <td>Prénom : </td>
                <td align="center">Ludovic</td>
            </tr>
            <tr>
                <td>Adresse : </td>
                <td align="center">56 Bis Chemin du ruisseau 97421 La rivière</td>
            </tr>
            <tr>
                <td>Email : </td>
                <td align="center">ludovic.lvnr@gmail.com</td>
            </tr>
            <tr>
                <td>N° Téléphone : </td>
                <td align="center">0692 72 93 22</td>
            </tr>
            </tbody>
        </table>                
        
          
        </div>
      );
    }
  }

export default Ficheclient;