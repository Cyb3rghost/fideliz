import React, { Component } from 'react';
import cookie from 'react-cookies'

class Menu extends Component {

    deconnexion()
    {

        cookie.remove("#FID#CO#SUCCESS")
        cookie.remove('#FID#CO#IDUSER')
        cookie.remove('#FID#CO#TYPECPT')
        cookie.remove('#FID#CO#CARTEBG')
        cookie.remove('#FID#CO#CARTEICON')
        cookie.remove('#FID#CO#APIKEY')
        window.location.href = "/"

    }

  render() {
    return (
      <div>

                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <a className="navbar-brand" href="/dashboard">FIDLIZ</a>
                            
                        </nav>
                        <nav className="navbar navbar-expand-lg navbar-white bg-white">
                            <a className="navbar-brand" href="/dashboard">{this.props.title}</a>
                            

                            <button className="navbar-toggler bg-dark" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon text"></span>
                            </button>
                        
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active">
                                <a className="nav-link" href="/dashboard"><i className="fas fa-fw fa-tachometer-alt"></i> Dashboard <span className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/profil"><i className="fas fa-fw fa-user-tie"></i> Profil</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/client"><i className="fas fa-fw fa-users"></i> Clients</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/prestations"><i className="fas fa-fw fa-users"></i> Gestion de prestation</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/gestionCompte"><i className="fas fa-fw fa-cog"></i> Gestion de l'abonnement</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/log"><i className="fas fa-fw fa-file-alt"></i> Gestion des logs</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={this.deconnexion.bind(this)} href="/"><i className="fas fa-fw fa-sign-out-alt"></i> Déconnexion</a>
                                </li>
                            </ul>
                            </div>
                        </nav>

                        <br/>

      </div>
    );
  }
}

export default Menu;
