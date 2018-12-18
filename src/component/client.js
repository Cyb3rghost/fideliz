import React, { Component } from 'react';

import Menu from './menu'
import logodashboard from '../images/logodashboard.png'
<<<<<<< HEAD

import dashboardwhite from '../images/dashboard-white.png'
import gestioncomptewhite from '../images/gestionCompte-white.png'
import userwhite from '../images/userwhite.png'
import clientwhite from '../images/client-user.png'
import logwhite from '../images/log-white.png'
import deconnexionwhite from '../images/deconnexion-white.png'

=======
>>>>>>> 076d363ab8c0355033b4d94e010d1061230b4e87
import dashboard from '../images/dashboard.png'
import profil from '../images/profil.png';
import carnet from '../images/carnet.png';
import ajout from '../images/ajout.png';
import clientavatar from '../images/adduser.png';
<<<<<<< HEAD
import userClient from '../images/adduser.png';
=======
>>>>>>> 076d363ab8c0355033b4d94e010d1061230b4e87

class Client extends Component {

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
<<<<<<< HEAD
                break;   
            case '/voirclient':
                return <h2><img src={userClient} width="70" height="70" alt="Responsive image"/> FICHE CLIENT</h2>
                break;     
            case '/nouveauclient':
                return <h2><img src={userClient} width="70" height="70" alt="Responsive image"/> NOUVEAU CLIENT</h2>
                break;                
=======
                break;      
>>>>>>> 076d363ab8c0355033b4d94e010d1061230b4e87
            default:
                break;
        }

    }

    render() {
      return (
<<<<<<< HEAD
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
=======
        <div>
          
          <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                    <a className="navbar-brand" href="#"><img src={logodashboard} width="200" height="35" alt="Responsive image"/></a>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                    <li className="active"><a href="#">Home</a></li>
                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" href="#">Page 1
                        <span className="caret"></span></a>
                        <ul className="dropdown-menu">
                        <li><a href="#">Page 1-1</a></li>
                        <li><a href="#">Page 1-2</a></li>
                        <li><a href="#">Page 1-3</a></li>
                        </ul>
                    </li>
>>>>>>> 076d363ab8c0355033b4d94e010d1061230b4e87
                    <li><a href="#">Page 2</a></li>
                    <li><a href="#">Page 3</a></li>
                    </ul>
                </div>
<<<<<<< HEAD
        </nav>
        <div className="panelInfo">
            
            <div className="container-perso">
                {this.renderPanelTitle()}
            </div>
        
        </div>         
=======
            </nav> 
            <div className="panelInfo">
            
                <div className="container-perso">
                    {this.renderPanelTitle()}
                </div>
            
            </div> 
            <br/>
            <div className="container-perso">
            
                <div className="col-md-4">

                        <Menu />

                </div>
                <div className="col-md-8">
                
>>>>>>> 076d363ab8c0355033b4d94e010d1061230b4e87


                    <div className="wellClient">
                        <div className="row">

                            
<<<<<<< HEAD
                            <div className="col-xs-10">
=======
                            <div className="col-md-10">
>>>>>>> 076d363ab8c0355033b4d94e010d1061230b4e87
                            
                                
                                Nombre de client : <p className="resizeNbClient">350</p><br/>
                                
                            
                            </div>
<<<<<<< HEAD
                            <div className="col-xs-2">
                            
                                <a href="nouveauclient"><img src={ajout} class="img-circle" width="80" height="80" alt="" /></a><br/>
=======
                            <div className="col-md-2">
                            
                                <img src={ajout} class="img-circle" width="100" height="100" alt="" /><br/>
>>>>>>> 076d363ab8c0355033b4d94e010d1061230b4e87
                                <br/>                        
                            
                            </div>


                        </div>
                    </div>

<<<<<<< HEAD
                    <table class="table table-striped">
                        <thead>
                        <tr>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>LEVENEUR</td>
                            <td>Ludovic</td>
                            <td>56 Bis Chemin du ruisseau 97421 La rivière saint-louis</td>
                            <td>0692729322</td>
                            <td>ludovic.lvnr@gmail.com</td>
                            <td><a href="/voirclient">Voir</a> - Editez</td>
                        </tr>
                        <tr>
                            <td>LEVENEUR</td>
                            <td>Ludovic</td>
                            <td>56 Bis Chemin du ruisseau 97421 La rivière saint-louis</td>
                            <td>0692729322</td>
                            <td>ludovic.lvnr@gmail.com</td>
                            <td><a href="/voirclient">Voir</a> - Editez</td>
                        </tr>
                        <tr>
                            <td>LEVENEUR</td>
                            <td>Ludovic</td>
                            <td>56 Bis Chemin du ruisseau 97421 La rivière saint-louis</td>
                            <td>0692729322</td>
                            <td>ludovic.lvnr@gmail.com</td>
                            <td><a href="/voirclient">Voir</a> - Editez</td>
                        </tr>
                        </tbody>
                    </table>

=======
                    <a href="/voirclient"><div className="wellListeClient">
                    
                        <div className="row">
            
                            <div className="col-md-2">

                                
                                <img src={clientavatar} width="100" height="100" alt="" />
                                

                            </div>
                            <div className="col-md-10">

                            <p className="resizeNbListeClient">LEVENEUR Ludovic <br/></p>
                            <small>Date inscription : 17/12/2018 </small>

                            </div>


                        </div>                        
                    
                    </div></a>
                    <div className="wellListeClient">
                    
                        <div className="row">
            
                            <div className="col-md-2">

                                
                                <img src={clientavatar} width="100" height="100" alt="" />
                                

                            </div>
                            <div className="col-md-10">

                            <p className="resizeNbListeClient">LEVENEUR Ludovic <br/></p>
                            <small>Date inscription : 17/12/2018 </small>

                            </div>


                        </div>                        
                    
                    </div>
                    <div className="wellListeClient">
                    
                        <div className="row">
            
                            <div className="col-md-2">

                                
                                <img src={clientavatar} width="100" height="100" alt="" />
                                

                            </div>
                            <div className="col-md-10">

                            <p className="resizeNbListeClient">LEVENEUR Ludovic <br/></p>
                            <small>Date inscription : 17/12/2018 </small>

                            </div>


                        </div>                        
                    
                    </div>
                    <div className="wellListeClient">
                    
                        <div className="row">
            
                            <div className="col-md-2">

                                
                                <img src={clientavatar} width="100" height="100" alt="" />
                                

                            </div>
                            <div className="col-md-10">

                            <p className="resizeNbListeClient">LEVENEUR Ludovic <br/></p>
                            <small>Date inscription : 17/12/2018 </small>

                            </div>


                        </div>                        
                    
                    </div>
                    <div className="wellListeClient">
                    
                        <div className="row">
            
                            <div className="col-md-2">

                                
                                <img src={clientavatar} width="100" height="100" alt="" />
                                

                            </div>
                            <div className="col-md-10">

                            <p className="resizeNbListeClient">LEVENEUR Ludovic <br/></p>
                            <small>Date inscription : 17/12/2018 </small>

                            </div>


                        </div>                        
                    
                    </div>











                </div>
            
            </div>
>>>>>>> 076d363ab8c0355033b4d94e010d1061230b4e87
          
        </div>
      );
    }
  }

export default Client;