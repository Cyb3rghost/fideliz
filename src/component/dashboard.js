import React, { Component } from 'react';
import logodashboard from '../images/logodashboard.png'
import Menu from './menu'

import dashboardwhite from '../images/dashboard-white.png'
import gestioncomptewhite from '../images/gestionCompte-white.png'
import userwhite from '../images/userwhite.png'
import clientwhite from '../images/client-user.png'
import logwhite from '../images/log-white.png'
import deconnexionwhite from '../images/deconnexion-white.png'

import dashboard from '../images/dashboard.png'
import profil from '../images/profil.png';
import carnet from '../images/carnet.png';
import userClient from '../images/adduser.png';

class Dashboard extends Component {

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
            default:
                break;
        }

    }

    render() {
      return (
        <div id="wrapper">
          
        <div id="sidebar-wrapper">
            <ul className="sidebar-nav">
                <li className="sidebar-brandz">
                    <a href="#">
                        FideliZ
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

        <br/>

        <div className="container-perso">
            <div className="row">
            
                <div className="col-md-4">

                    <div class="panel panel-default">
                        <div class="panel-heading">CLIENTS</div>
                        <div class="panel-body"><h1>350</h1></div>
                    </div>

                </div>
                <div className="col-md-4">
                
                    <div class="panel panel-default">
                        <div class="panel-heading">LIMITE DE CLIENTS</div>
                        <div class="panel-body"><h1>5 / 10 </h1></div>
                    </div>                
                
                
                </div>
                <div className="col-md-4">

                        <div class="panel panel-default">
                            <div class="panel-heading">LIMITE DE POINTAGES</div>
                            <div class="panel-body"><h1>10 / 15 </h1></div>
                        </div>                
                
                </div>

                <div className="col-md-4">

                    <div class="panel panel-default">
                        <div class="panel-heading">TYPE DE COMPTE</div>
                        <div class="panel-body"><h1>PREMIUM</h1></div>
                    </div>

                </div>
                <div className="col-md-4">
                
                    <div class="panel panel-default">
                        <div class="panel-heading">DEBUT ABONNEMENT</div>
                        <div class="panel-body"><h1>18/12/2018 </h1></div>
                    </div>                
                
                
                </div>
                <div className="col-md-4">

                        <div class="panel panel-default">
                            <div class="panel-heading">FIN ABONNEMENT</div>
                            <div class="panel-body"><h1>20/12/2018 </h1></div>
                        </div>                
                
                </div>


            </div>
        </div>


          
        </div>
      );
    }
  }

export default Dashboard;