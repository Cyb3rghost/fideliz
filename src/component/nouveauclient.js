import React, { Component } from 'react';
import Menu from './menu'

import userClient from '../images/adduser.png';

class Nouveauclient extends Component {

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
                <h2><img src={userClient} width="70" height="70" alt="Responsive image"/> NOUVEAU CLIENT</h2>
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