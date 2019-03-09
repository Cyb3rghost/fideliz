import React, { Component } from 'react';
import cookie from 'react-cookies'
import Configuration from './fidconfig'

import News from '../images/news.png'
import Update from '../images/update.png'

class Navbarup extends Component {

    constructor(props)
    {

        super(props)
        this.state = {

            nomSociete: '',
            logoEntreprise: ''

        }

    }

  componentDidMount()
  {

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=datadashboard&id=' + this.props.idEntreprise)
        .then((response) => response.json())
        .then((response) => {

            {response.map((value, index) => 
                (
                    this.setState({
                        nomSociete: value.nomsociete,
                        logoEntreprise: value.imgicon                
                    })
                )
            )}


        })
        .catch(err => console.error(err))


  }

  deconnexion()
  {

      cookie.remove("#FID#CO#SUCCESS")
      cookie.remove('#FID#CO#IDUSER')
      cookie.remove('#FID#CO#TYPECPT')
      cookie.remove('#FID#CO#CARTEBG')
      cookie.remove('#FID#CO#CARTEICON')
      window.location.href = "/"

  }

  render() {
    return (
      <div>

            <nav className="navbar navbar-expand navbar-light bg-gradient-perso topbar mb-4 static-top shadow">

            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars"></i>
            </button>

            <ul className="navbar-nav ml-auto">

                

                <li className="nav-item dropdown no-arrow mx-1">
                <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-bell fa-fw"></i>
                    <span className="badge badge-danger badge-counter">3+</span>
                </a>
                <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                    <center><h4 className="dropdown-header">
                     Centre de mise à jour
                    </h4></center>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                    <div className="mr-3">
                        <img width="40" height="40" src={News} />
                    </div>
                    <div>
                        <div className="small text-gray-500">VERSION : 1.0.0.2 - 11/02/2019</div>
                        <span className="font-weight-bold">TITRE 3 - NOUVELLE MAJ</span>
                    </div>
                    </a>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                    <div className="mr-3">
                        <img width="40" height="40" src={News} />
                    </div>
                    <div>
                        <div className="small text-gray-500">VERSION : 1.0.0.1 - 11/02/2019</div>
                        <span className="font-weight-bold">TITRE 2 - NOUVELLE MAJ</span>
                    </div>
                    </a>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                    <div className="mr-3">
                        <img width="40" height="40" src={News} />
                    </div>
                    <div>
                        <div className="small text-gray-500">VERSION : 1.0.0.0 - 11/02/2019</div>
                        <span className="font-weight-bold">TITRE 1 - NOUVELLE MAJ</span>
                    </div>
                    </a>
                    <a className="dropdown-item text-center small text-gray-500" href="#">Obtenir plus d'informations</a>
                </div>
                </li>

                <div className="topbar-divider d-none d-sm-block"></div>

                <li className="nav-item dropdown no-arrow">
                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="mr-2 d-none d-lg-inline">{this.state.nomSociete}</span>
                    <img className="img-profile rounded-circle" src={"http://127.0.0.1/fidapi/img/" + this.state.logoEntreprise} />
                </a>
                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                    <a className="dropdown-item" href="#">
                    <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                    Documentation
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#" onClick={this.deconnexion.bind(this)}>
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                    Déconnexion
                    </a>
                </div>
                </li>

            </ul>

            </nav>

      </div>
    );
  }
}

export default Navbarup;