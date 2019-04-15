import React, { Component } from 'react';

import Menu from './menuclient'
import Footer from '../footer'
import Configuration from '../fidconfig'

class Archives extends Component {

    constructor(props)
    {

        super(props)
        this.state = {
            statutMsg: '',
            cartefidelite: []
        }

    }

    componentDidMount()
    {

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=consultationArchiveFidelite&idclient=' + this.props.idUserRecupClient
        + '&apikey=' + this.props.apikey)
        .then((response) => response.json())
        .then((response) => {

            console.log(response)
            if(response === "#LSTCARDFIDELITE#VIDE")
            {

                this.setState({
                    statutMsg: '1'
                })

            }
            else
            {

                this.setState({
                    cartefidelite: response
                })

            }

        })
        .catch(err => console.error(err))


    }

    afficheArchivesCarte()
    {

        if(this.state.statutMsg === '1')
        {

            return <div className="alert alert-warning">
            
            <center>Vous n'avez encore aucune carte en historique...</center>
            
            </div>


        }
        else
        {

            return <div className="row">
            {this.state.cartefidelite.map( function(value) {
                            
                return <div className="col-md-4">
                    <div className="panelCarte" onClick={() => alert(`Numéro de carte : ` + value.id 
                    + `\nDate de création : ` + value.datecreation
                    + `\nPropriétaire : ` + value.nom + ' ' + value.prenom
                    + `\nPointage : ` + value.nbpointage + ' / ' + value.limitpointage
                    + `\nCadeaux : ` + value.cadeaux
                    + `\nCode propriétaire : ` + value.qrcode)}> 
                        <img src={Configuration.hostnameManuelServer + 'fidapi/img/' + value.imgbackground} className="img-fluid" id="img5" alt="" />
                        <img src={Configuration.hostnameManuelServer + 'fidapi/img/' + value.imgicon}  className="img-fluid" id="img6" alt="" /> 
                    </div><br/>
                </div>

            })}
            </div> 


        }


    }

    render() {
    
        return (
          <div>
    
                <div id="wrapper">
    
                    
    
                    <div id="content-wrapper" className="d-flex flex-column">
    
                    <div id="content">
    
                        <Menu title="Consultation des archives" />
    
                        <div className="container-fluid">

                        <br/>

                        
                        {this.afficheArchivesCarte()}
                        
                              

                        </div>
    
                        {/* FIN CODE */}
    
    
                        
    
                    </div>
    
                    <Footer />
    
                    </div>
    
                </div>

    
          </div>
        );
      }
    }

export default Archives;
