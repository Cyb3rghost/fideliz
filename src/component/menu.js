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
        window.location.href = "/"

    }

  render() {
    return (
      <div>

                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                            <a class="navbar-brand" href="#">FIDELIZ</a>
                            
                        </nav>
                        <nav class="navbar navbar-expand-lg navbar-white bg-white">
                            <a class="navbar-brand" href="#">{this.props.title}</a>
                            

                            <button class="navbar-toggler bg-dark" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon text"></span>
                            </button>
                        
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item active">
                                <a class="nav-link" href="/dashboard"><i className="fas fa-fw fa-tachometer-alt"></i> Dashboard <span class="sr-only">(current)</span></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/profil"><i className="fas fa-fw fa-user-tie"></i> Profil</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/client"><i className="fas fa-fw fa-users"></i> Clients</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/prestations"><i className="fas fa-fw fa-users"></i> Gestion de prestation</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/gestionCompte"><i className="fas fa-fw fa-cog"></i> Gestion de l'abonnement</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/log"><i className="fas fa-fw fa-file-alt"></i> Gestion des logs</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" onClick={this.deconnexion.bind(this)} href="#"><i className="fas fa-fw fa-sign-out-alt"></i> Déconnexion</a>
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
