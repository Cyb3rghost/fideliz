import React, { Component } from 'react';
import profil from '../images/profil.png'
import carnet from '../images/carnet.png'
import gestionCompte from '../images/gestionCompte.png'
import log from '../images/log.png'
import dashboard from '../images/dashboard.png'


class Menu extends Component {


    render() {
      return (
        <div>

                <a href="/dashboard"><div className="wellMenu">
                    
                    <div className="row">
                            <div className="col-xs-3">
                                <img src={dashboard} width="100" height="100" alt="" />
                            </div>
                            <div className="col-xs-9">
                                <h3>DASHBOARD<br/></h3>
                            </div>
                    </div>

                </div></a>

                <a href="/profil"><div className="wellMenu">
                    
                    <div className="row">
                            <div className="col-xs-3">
                                <img src={profil} width="100" height="100" alt="" />
                            </div>
                            <div className="col-xs-9">
                                <h3>Votre profil<br/></h3>Limite client : Illimité
                            </div>
                    </div>

                </div></a>

                <a href="/client"><div className="wellMenu">
                
                    <div className="row">
                            <div className="col-xs-3">
                                <img src={carnet} width="100" height="100" alt="" />
                            </div>
                            <div className="col-xs-9">
                                <h3>Client : 350 <br/></h3>Ajouter un nouveau client
                            </div>
                    </div>

                </div></a>

                <div className="wellMenu">
                
                    <div className="row">
                            <div className="col-xs-3">
                                <img src={gestionCompte} width="100" height="100" alt="" />
                            </div>
                            <div className="col-xs-9">
                                <h3>Gestion de compte <br/></h3> Etat du compte : Premium
                            </div>
                    </div>

                </div>

                <div className="wellMenu">
                
                    <div className="row">
                            <div className="col-xs-3">
                                <img src={log} width="100" height="100" alt="" />
                            </div>
                            <div className="col-xs-9">
                                <h3>Nombre de log : 300<br/></h3> Dernier log : 17/12/2018 - 15H00 - Ludovic LEVENEUR
                            </div>
                    </div>

                </div>            
  
          
        </div>
      );
    }
  }

export default Menu;






 