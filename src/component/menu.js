import React, { Component } from 'react';
import cookie from 'react-cookies'

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

            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">FideliZ <sup>2</sup></div>
            </a>

            <hr className="sidebar-divider my-0" />

            <li className="nav-item active">
                <a className="nav-link" href="/">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/profil">
                <i className="fas fa-fw fa-user-tie"></i>
                <span>Profil</span></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/client">
                <i className="fas fa-fw fa-users"></i>
                <span>Client</span></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/gestioncompte">
                <i className="fas fa-fw fa-cog"></i>
                <span>Gestion de compte</span></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/log">
                <i className="fas fa-fw fa-file-alt"></i>
                <span>Gestion de log</span></a>
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

export default Menu;
