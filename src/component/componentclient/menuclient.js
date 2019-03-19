import React, { Component } from 'react';
import cookie from 'react-cookies'

class Menuclient extends Component {

    deconnexion()
    {

        cookie.remove("#FID#COCLIENT#SUCCESS")
        cookie.remove('#FID#COCLIENT#IDUSER')
        cookie.remove('#FID#COCLIENT#IDENT')
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
                    <a class="nav-link" href="/fichecoclient"><i className="fas fa-fw fa-tachometer-alt"></i> Profil <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/mescadeaux"><i class="fas  fa-fw fa-gifts"></i> Mes cadeaux fidélités</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/planningclient"><i className="fas fa-fw fa-calendar-alt"></i> Mon planning</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" onClick={this.deconnexion.bind(this)} href="#"><i className="fas fa-fw fa-sign-out-alt"></i> Déconnexion</a>
                    </li>
                </ul>
                </div>
            </nav>

      </div>
    );
  }
}

export default Menuclient;
