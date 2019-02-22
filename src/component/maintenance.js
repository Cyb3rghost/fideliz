import React, { Component } from 'react';

import rocket from '../images/rocket.png'
import rocketInverse from '../images/rocket-invert.png'

class Maintenance extends Component {

  render() {
    return (
      <div>


        <div className="container">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <div className="text-center">
                <p><h1><img src={rocket} height="50" width="50" /> MAINTENANCE <img src={rocketInverse} height="50" width="50" /></h1><span className="badge badge-dark">Prochaine version : {this.props.version}</span></p>
                <p className="text-justify"><span className="badge badge-dark">Objet de la maintenance :</span> lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum <br/></p>
                <p>Veuillez nous excuser pour le désagrément.</p>
            </div>
        </div>




      </div>
    );
  }
}

export default Maintenance;
