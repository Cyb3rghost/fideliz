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


            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/fichecoclient">FIDLIZ</a>
                
            </nav>
            <nav className="navbar navbar-expand-lg navbar-white bg-white">
                <a className="navbar-brand" href="/fichecoclient">{this.props.title}</a>
                

                <button className="navbar-toggler bg-dark" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon text"></span>
                </button>
            
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                    <a className="nav-link" href="/fichecoclient"><i className="fas fa-user"></i> Profil <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/mescadeaux"><i className="fas  fa-fw fa-gifts"></i> Mes cadeaux fidélités</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={this.deconnexion.bind(this)} href="/connexionclient"><i className="fas fa-sign-out-alt"></i> Déconnexion</a>
                    </li>
                </ul>
                </div>
            </nav>

      </div>
    );
  }
}

export default Menuclient;
