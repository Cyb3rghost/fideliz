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

            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">FideliZ <sup>2</sup></div>
            </a>

            <hr className="sidebar-divider my-0" />

            <li className="nav-item active">
                <a className="nav-link" href="/fichecoclient">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>Profil</span></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/mescadeaux">
                <i class="fas  fa-fw fa-gifts"></i>
                <span>Mes cadeaux fidélités</span></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/planningclient">
                <i className="fas fa-fw fa-calendar-alt"></i>
                <span>Mon planning</span></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#" onClick={this.deconnexion.bind(this)}>
                <i className="fas fa-fw fa-sign-out-alt"></i>
                <span>Déconnexion</span></a>
            </li>

            <hr className="sidebar-divider" />

            </ul>

      </div>
    );
  }
}

export default Menuclient;
