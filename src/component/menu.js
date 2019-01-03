import React, { Component } from 'react';
import cookie from 'react-cookies'


import dashboardwhite from '../images/dashboard-white.png'
import gestioncomptewhite from '../images/gestionCompte-white.png'
import userwhite from '../images/userwhite.png'
import clientwhite from '../images/client-user.png'
import logwhite from '../images/log-white.png'
import deconnexionwhite from '../images/deconnexion-white.png'


class Menu extends Component {

    deconnexion()
    {

        cookie.remove("#FID#CO#SUCCESS")
        cookie.remove('#FID#CO#IDUSER')
        window.location.href = "/"

    }

    render() {
      return (
        <div>

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
                        <a href="#" onClick={this.deconnexion.bind(this)}><img src={deconnexionwhite} width="40" height="40" alt="Responsive image"/> Déconnexion</a>
                    </li>
                </ul>
            </div>          
  
          
        </div>
      );
    }
  }

export default Menu;






 