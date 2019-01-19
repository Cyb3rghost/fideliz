import React, { Component } from 'react';
import cookie from 'react-cookies'


import dashboardwhite from '../images/dashboard.png'
import gestioncomptewhite from '../images/gestionCompte.png'
import userwhite from '../images/profil.png'
import clientwhite from '../images/adduser.png'
import logwhite from '../images/log.png'
import deconnexionwhite from '../images/deconnexion.png'


class Menu extends Component {

    deconnexion()
    {

        cookie.remove("#FID#CO#SUCCESS")
        cookie.remove('#FID#CO#IDUSER')
        cookie.remove('#FID#CO#CARTEBG')
        cookie.remove('#FID#CO#CARTEICON')
        window.location.href = "/"

    }

    render() {
      return (
        <div>


            <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                        <a className="navbar-brand" href="#">FIDELIZ</a>
                        </div>
                        <ul className="nav navbar-nav navbar-right">
                        <li><a href="/dashboard"><img src={dashboardwhite} width="40" height="40" alt="Responsive image"/> Dashboard</a></li>
                        <li><a href="/profil"><img src={userwhite} width="40" height="40" alt="Responsive image"/> Profil</a></li>
                        <li><a href="/client"><img src={clientwhite} width="40" height="40" alt="Responsive image"/> Clients</a></li>
                        <li><a href="/gestionCompte"><img src={gestioncomptewhite} width="40" height="40" alt="Responsive image"/> Gestion de compte</a></li>
                        <li><a href="/log"><img src={logwhite} width="40" height="40" alt="Responsive image"/> Gestion de log</a></li>
                        <li><a href="#" onClick={this.deconnexion.bind(this)}><img src={deconnexionwhite} width="40" height="40" alt="Responsive image"/> Déconnexion</a></li>
                        </ul>
                    </div>
            </nav>

        </div>
      );
    }
  }

export default Menu;






 