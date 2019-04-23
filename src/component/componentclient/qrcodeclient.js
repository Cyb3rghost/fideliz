import React, { Component } from 'react';
import QrReader from "react-qr-reader";
import Configuration from '../fidconfig'


class Qrcodeclient extends Component {

    constructor(props)
    {

        super(props)
        this.state = {
            result: "0"
        }
        this.handleScan = this.handleScan.bind(this);
    }

    handleScan(data) {
      if (this.state.result === "0" && data) {

        this.setState({
          result: "1"
        })

        var audio = new Audio();
        audio.src = "sons/bip.mp3"

        audio.play()

        /*console.log(Configuration.hostnameManuelServer + 'fidapi/main.php?action=pointageProductivite&id=' + this.props.idUserRecupClient 
        + '&identreprise=' + this.props.idEntRecupClient
        + '&qrcode=' + data)*/

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=pointageProductivite&id=' + this.props.idUserRecupClient 
        + '&identreprise=' + this.props.idEntRecupClient
        + '&qrcode=' + data
        + '&apikey=' + this.props.apikey)
        .then((response) => response.json())
        .then((response) => {

            switch (response) {
                case '#PRODUCTPOINTAGE#SUCCESS':
                    console.log(response)
                    setTimeout(() => window.location.href = "/fichecoclient",1500)
                    break;   
                case '#PRODUCTPOINTAGE#FAILED':
                    console.log(response)
                    break; 
                case '#CARTEFIDENT#DESACTIVE':
                    console.log(response)
                    alert("Impossible d'effectuer un pointage car la carte de l'entreprise est désactivé.")
                    break; 
                case '#LIMITPOINTAGE#ATTEIND':
                    console.log(response)
                    setTimeout(() => window.location.href = "/fichecoclient",1500)
                    break; 
                default:
                    break;
            }

        })
        .catch(err => console.error(err))
        
      }
    }


    handleError(err) {
      alert(err);
    }
    
  render() {

    return (
      <div>

            <div id="wrapper">


                <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">

                    <div className="container-fluid">

                    {/* DEBUT CODE */}

                    <center>
                    <QrReader
                      delay={500}
                      onError={this.handleError}
                      onScan={this.handleScan}
                      style={{ width: "100%", margin: '0 auto' }}
                      ref={(stream)=> {this.videoStream = stream}}
                    /></center>
                    {/* FIN CODE */}


                    </div>

                </div>

                </div>

            </div>

      </div>
    );
  }
}

export default Qrcodeclient;
