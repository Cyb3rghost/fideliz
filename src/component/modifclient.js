import React, { Component } from 'react';
import logodashboard from '../images/logodashboard.png'
import dashboard from '../images/dashboard.png'
import Menu from './menu'
import profil from '../images/profil.png';
import carnet from '../images/carnet.png';
import userClient from '../images/adduser.png';

class Modifclient extends Component {

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
        }

    }

    render() {
      return (
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
            
                <div className="col-md-4">

                        <Menu />

                </div>
                <div className="col-md-8">

                        <div class="page-header">
                            <h1>Modification client <br/></h1>
                            <p className="text-justify">Un client sera automatiquement reliée à votre compte. Il disposera d'un accès à son compte client afin de pouvoir gêrer 
                            et effectuer ses pointages à chaque prestation. Il pourra également suivre l'évolution de son compte.</p>
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
                            <td align="center"><input type="text" className="form-control" placeholder="Nom"/></td>
                        </tr>
                        <tr>
                            <td>Prénom : </td>
                            <td align="center"><input type="text" className="form-control" placeholder="Prénom"/></td>
                        </tr>
                        <tr>
                            <td>Adresse : </td>
                            <td align="center"><input type="text" className="form-control" placeholder="Adresse"/></td>
                        </tr>
                        <tr>
                            <td>Email : </td>
                            <td align="center"><input type="email" className="form-control" placeholder="Email"/></td>
                        </tr>
                        <tr>
                            <td>N° Téléphone : </td>
                            <td align="center"><input type="text" className="form-control" placeholder="Numéro de téléphone"/></td>
                        </tr>
                        
                        </tbody>
                    </table> 
                    <button type="submit" class="btn btn-loginConnexion btn-block">Modification</button>                      

                </div>
            
            </div>
          
        </div>
      );
    }
  }

export default Modifclient;