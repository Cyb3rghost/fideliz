import React, { Component } from 'react';
import cookie from 'react-cookies'

class Deconnexion extends Component {

    deconnexion()
    {

        alert("Déconnexion en cours !");
        cookie.remove("#FID#CO#SUCCESS")

    }

    render() {
      return (
        <div>

            {this.deconnexion()}
          
        </div>
      );
    }
  }

export default Deconnexion;
