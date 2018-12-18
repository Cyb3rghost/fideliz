import React, { Component } from 'react';
import logodashboard from '../images/logodashboard.png'
import dashboard from '../images/dashboard.png'
import Menu from './menu'

import dashboardwhite from '../images/dashboard-white.png'
import gestioncomptewhite from '../images/gestionCompte-white.png'
import userwhite from '../images/userwhite.png'
import clientwhite from '../images/client-user.png'
import logwhite from '../images/log-white.png'
import deconnexionwhite from '../images/deconnexion-white.png'


import profil from '../images/profil.png';
import carnet from '../images/carnet.png';
import userClient from '../images/adduser.png';

class Nouveauclient extends Component {

    renderPanelTitle()
    {

        switch (window.location.pathname) {
            case '/dashboard':
                return <h2><img src={dashboard} width="70" height="70" alt="Responsive image"/> DASHBOARD</h2>
                break;
            case '/profil':
                return <h2><img src={profil} width="70" height="70" alt="Responsive image"/> PROFIL</h2>
                break; 
            case '/client':
                return <h2><img src={carnet} width="70" height="70" alt="Responsive image"/> CARNET CLIENT</h2>
                break;   
            case '/voirclient':
                return <h2><img src={userClient} width="70" height="70" alt="Responsive image"/> FICHE CLIENT</h2>
                break;     
            case '/nouveauclient':
                return <h2><img src={userClient} width="70" height="70" alt="Responsive image"/> NOUVEAU CLIENT</h2>
                break;  
            case '/modifclient':
                return <h2><img src={userClient} width="70" height="70" alt="Responsive image"/> MODIFICATION CLIENT</h2>
                break;               
            default:
                break;
        }

    }

    render() {
      return (
        <div id="wrapper">
          
        <div id="sidebar-wrapper">
            <ul className="sidebar-nav">
                <li className="sidebar-brand">
                    <a href="#">
                        FIDELIZ
                    </a>
                </li>
                <li>
                    <a href="/dashboard"><img src={dashboardwhite} width="40" height="40" alt="Responsive image"/> Dashboard</a>
                </li>
                <li>
                    <a href="/profil"><img src={userwhite} width="40" height="40" alt="Responsive image"/> Profil</a>
                </li>
                <li>
                    <a href="/client"><img src={clientwhite} width="40" height="40" alt="Responsive image"/> Clients</a>
                </li>
                <li>
                    <a href="/gestionCompte"><img src={gestioncomptewhite} width="40" height="40" alt="Responsive image"/> Gestion de compte</a>
                </li>
                <li>
                    <a href="/log"><img src={logwhite} width="40" height="40" alt="Responsive image"/> Gestion de log</a>
                </li>
                <li>
                    <a href="/deconnexion"><img src={deconnexionwhite} width="40" height="40" alt="Responsive image"/> Déconnexion</a>
                </li>
            </ul>
        </div>

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
                {this.renderPanelTitle()}
            </div>
        
        </div>         

        
        <div className="page-header">
            <div className="container-perso">
                    <h1>Nouveau client <br/></h1>
                    <p className="text-justify">Un client sera automatiquement reliée à votre compte. Il disposera d'un accès à son compte client afin de pouvoir gêrer 
                    et effectuer ses pointages à chaque prestation. Il pourra également suivre l'évolution de son compte.</p>
            </div>
        </div>
        <div className="wellClient">
                        
                        
            <form className="form-horizontal">
                <div className="form-group">
                    <label className="col-sm-2 control-label">Nom</label>
                    <div className="col-sm-10">
                    <input type="text" className="form-control" placeholder="Nom"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Prénom</label>
                    <div className="col-sm-10">
                    <input type="text" className="form-control" placeholder="Prénom"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Adresse</label>
                    <div className="col-sm-10">
                    <input type="text" className="form-control" placeholder="Adresse"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">N° Téléphone</label>
                    <div className="col-sm-10">
                    <input type="text" className="form-control" placeholder="Numéro de téléphone"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Email</label>
                    <div className="col-sm-10">
                    <input type="email" className="form-control" placeholder="Email"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Mot de passe</label>
                    <div className="col-sm-10">
                    <input type="password" className="form-control" placeholder="Mot de passe"/>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" class="btn btn-loginConnexion btn-block">Ajouter</button>
                    </div>
                </div>
            </form>                            
            
        </div>


        
          
        </div>
      );
    }
  }

export default Nouveauclient;