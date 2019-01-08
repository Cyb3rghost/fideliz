import React, { Component } from 'react';
import cookie from 'react-cookies'


import userwhite from '../../images/userwhite.png'
import deconnexionwhite from '../../images/deconnexion-white.png'


class Menuclient extends Component {

    deconnexion()
    {

        cookie.remove("#FID#COCLIENT#SUCCESS")
        cookie.remove('#FID#COCLIENT#IDUSER')
        window.location.href = "/connexionclient"

    }

    render() {
      var idClient = window.location.search.substring(4);
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
                        <a href={'/fichecoclient?id=' + idClient}><img src={userwhite} width="40" height="40" alt="Responsive image"/> Profil</a>
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

export default Menuclient;






 