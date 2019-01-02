import React, { Component } from 'react';
import Menu from './menu'
import logodashboard from '../images/logodashboard.png'

import carnet from '../images/carnet.png';
import ajout from '../images/ajout.png';

import dashboard from '../images/dashboard.png'
import profil from '../images/profil.png';
import carnet from '../images/carnet.png';
import ajout from '../images/ajout.png';
import clientavatar from '../images/adduser.png';
import userClient from '../images/adduser.png';

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
                    <h2><img src={carnet} width="70" height="70" alt="Responsive image"/> CARNET CLIENT</h2>
                </div>
        
            </div>                                  

                <div className="wellClient">
                        <div className="row">

                            <div className="col-md-10">                     
                         
                                Nombre de client : <p className="resizeNbClient">350</p><br/>
                                
                            
                            </div>

                            <div className="col-md-2">
                            
                                <img src={ajout} class="img-circle" width="100" height="100" alt="" /><br/>

                                <br/>                        
                            
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


            </div>
        );
    }
            
}

export default Client;