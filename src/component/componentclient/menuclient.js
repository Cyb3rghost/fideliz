import React, { Component } from 'react';
import cookie from 'react-cookies'


import userwhite from '../../images/adduser.png'
import cadeaux from '../../images/mescadeaux.png'
import deconnexionwhite from '../../images/deconnexion.png'
import calendrier from '../../images/calendar.png'


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

            <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                        <a className="navbar-brand" href="#">FIDELIZ</a>
                        </div>
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <a href={'/fichecoclient?id=' + idClient}><img src={userwhite} width="40" height="40" alt="Responsive image"/> Profil</a>
                            </li>
                            <li>
                                <a href={'/mescadeaux?id=' + idClient}><img src={cadeaux} width="40" height="40" alt="Responsive image"/> Mes cadeaux fidélités</a>
                            </li>
                            <li>
                                <a href={'/planningclient?id=' + idClient}><img src={calendrier} width="40" height="40" alt="Responsive image"/> Mon Planning</a>
                            </li>
                            <li>
                                <a href="#" onClick={this.deconnexion.bind(this)}><img src={deconnexionwhite} width="40" height="40" alt="Responsive image"/> Déconnexion</a>
                            </li>
                        </ul>
                    </div>
            </nav>
          
        </div>
      );
    }
  }

export default Menuclient;






 