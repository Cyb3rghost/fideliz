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

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=checkCloturation&id=' + this.props.idUserRecupClient)
        .then((response) => response.json())
        .then((response) => {

            switch (response) {
                case '#CLOTURATION#SUCCESS':
                    console.log(response)
                    break;   
                case '#CLOTURATION#NONECESSAIRE':
                    console.log(response)
                    fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=validationPointage&id=' + this.props.idUserRecupClient 
                    + '&idEntreprise=' + this.props.idEntRecupClient
                    + '&qrcode=' + data)
                    .then((response) => response.json())
                    .then((response) => {
            
                        switch (response) {
                            case '#UPTENTREPRISE#SUCCESS':
                                console.log(response)
                                this.setState({
                                    cartePointageMsg: '3'
                                })
                                setTimeout(() => window.location.href = "/fichecoclient",1500)
                                break;   
                            case '#VALIDATIONDIRECT#SUCCESS':
                                console.log(response)
                                this.setState({
                                    cartePointageMsg: '3'
                                })
                                setTimeout(() => window.location.href = "/fichecoclient",1500)
                                break; 
                            case '#UPTENTREPRISE#ECHEC':
                                console.log(response)
                                this.setState({
                                    cartePointageMsg: '4'
                                })
                                break;   
                            case '#VALIDATIONDIRECT#ECHEC':
                                console.log(response)
                                this.setState({
                                    cartePointageMsg: '4'
                                })
                                break;          
                            default:
                                break;
                        }
            
                    })
                    .catch(err => console.error(err))
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
                      style={{ width: "50%" }}
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
