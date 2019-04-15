import React, { Component } from 'react';

import maintenance from '../images/maintenance.png'

class Maintenance extends Component {

  render() {

    if(this.props.etatmaintenance === "0")
    {

      window.location.href = "/"

    }

    return (
      <div>


        <div className="container">
            <br/>
            <div className="text-center">
                <p><img src={maintenance} className="img-fluid" alt="Fideliz en cours de maintenance" /><br/>
                <span className="badge badge-dark">Prochaine version : {this.props.version}</span></p>
                <div className="card">
                  <div className="card-body">
                    {this.props.objet}
                  </div>
                </div>
                <br/>
                <p>Veuillez nous excuser pour le désagrément.</p>
            </div>
        </div>




      </div>
    );
  }
}

export default Maintenance;
