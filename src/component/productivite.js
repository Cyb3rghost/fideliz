import React, { Component } from 'react';
import Menu from './menu'
import Configuration from './fidconfig'
import Select from 'react-select';

import Footer from './footer'

class Productivite extends Component {

    constructor(props)
    {

        super(props)
        this.state = {
            qrcode: '',
            activation: '',
            selectedOption: null,
            afflisteCadeaux: [],
            prestation: '',
            prix: '',
            afficheDernierPointage: [],
            statut: ''

        }

    }

    componentDidMount()
    {

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=datadashboard&id=' + this.props.idUserRecup
        + '&apikey=' + this.props.apikey)
        .then((response) => response.json())
        .then((response) => {

            response.map((value) => 
            (
                this.setState({
                    qrcode: value.qrcode,
                    activation: value.activation,
                    prestation: value.prestation,
                    prix: value.prix                  
                })
            )
            )
    

        })
        .catch(err => console.error(err))

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=afficheListeCadeaux&id=' + this.props.idUserRecup
        + '&apikey=' + this.props.apikey)
        .then((response) => response.json())
        .then((response) => {

            this.setState({
                afflisteCadeaux: response
            })
    

        })
        .catch(err => console.error(err))

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=voirDernierPointageCarte&id=' + this.props.idUserRecup
        + '&apikey=' + this.props.apikey)
        .then((response) => response.json())
        .then((response) => {

            if(response === "#LASTPOINTAGE#VIDE")
            {

                console.log(response)

            }
            else
            {

                this.setState({
                    afficheDernierPointage: response
                })
    

            }


        })
        .catch(err => console.error(err))

    }

    handleChange = (selectedOption) => {

        var separePrestation = selectedOption.label.split(' - ')

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=updatePrestationEntreprise'
        + '&identreprise=' + this.props.idUserRecup
        + '&prestation=' + separePrestation[0]
        + '&prix=' + separePrestation[1].substring(0, separePrestation[1].length-1)
        + '&apikey=' + this.props.apikey)
        .then((response) => response.json())
        .then((response) => {

            if(response === "#UPENTPRESTA#SUCCESS")
            {

                console.log(response)
                this.setState({ selectedOption, prestation: separePrestation[0], prix: separePrestation[1].substring(0, separePrestation[1].length-1) });
                console.log(`Option selected:`, selectedOption);

            }
            else if(response === "#UPENTPRESTA#FAILED")
            {

                console.log(response)
                this.setState({ selectedOption, prestation: separePrestation[0], prix: separePrestation[1].substring(0, separePrestation[1].length-1) });
                console.log(`Option selected:`, selectedOption);

            }

        })
        .catch(err => console.error(err))



    }

    resetPointage()
    {

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=resetPointage'
        + '&identreprise=' + this.props.idUserRecup
        + '&apikey=' + this.props.apikey)
        .then((response) => response.json())
        .then((response) => {

            if(response === "#RESETPRESTA#SUCCESS")
            {

                console.log(response)
                this.setState({ selectedOption: null, prestation: 'Vide', prix: '0' });

            }
            else if(response === "#RESETPRESTA#FAILED")
            {

                console.log(response)
                this.setState({ selectedOption: null, prestation: 'Vide', prix: '0' });

            }

        })
        .catch(err => console.error(err))        


    }

    activeCarte()
    {

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=activeCarte&id=' + this.props.idUserRecup
        + '&apikey=' + this.props.apikey)
        .then((response) => response.json())
        .then((response) => {

            console.log(response)
            if(response === "#ENABLEDCARD#UPGRADE")
            {

                    this.setState({
                        statut: '1'
                    })

            }
            else if(response === "#ENABLEDCARD#SUCCESS")
            {

                setTimeout(() => window.location.href = "/productivite",250)

            }

            

        })
        .catch(err => console.error(err))


    }

    desactiveCarte()
    {

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=desactiveCarte&id=' + this.props.idUserRecup
        + '&apikey=' + this.props.apikey)
        .then((response) => response.json())
        .then((response) => {

            console.log(response)
            setTimeout(() => window.location.href = "/productivite",250)

        })
        .catch(err => console.error(err))


    }

    checkEtatCarte()
    {

        if(this.state.activation === '1')
        {


            return <div className="row">
                                        
                <div className="col-6">
                
                    
                    <h6>Etat de la carte : <span className="badge badge-success">Activé</span></h6>
                    
                
                </div>
                <div className="col-6 text-right">
                
                    <button type="button" onClick={this.desactiveCarte.bind(this)} className="btn btn-danger btn-sm">Désactivé</button>

                </div>
        
            </div>


        }
        else if(this.state.activation === '0')
        {

            return <div className="row">
                                        
                <div className="col-6">
                
                    
                    <h6>Etat de la carte : <span className="badge badge-danger">Désactivé</span></h6>
                    
                
                </div>
                <div className="col-6 text-right">
                
                    <button type="button" onClick={this.activeCarte.bind(this)}  className="btn btn-success btn-sm">Activé</button>

                </div>
        
            </div>


        }





    }

    afficheStatut()
    {

        if(this.state.statut === '1')
        {

            return <div className="alert alert-warning">
            
            <center>Vous ne pouvez pas activé votre carte car votre compte n'est pas upgrader.</center>

            </div>

        }


    }

  render() {

    var QRCode = require('qrcode.react');

    const { selectedOption } = this.state;

    let options = this.state.afflisteCadeaux.map(function (valux) {
            return { value: valux.id, label: valux.prestation + ' - ' + valux.prix + '€' }
    })

    return (
        <div>
            
             <div id="wrapper">
  
                      <div id="content-wrapper" className="d-flex flex-column">
  
                      <div id="content">
  
                           <Menu title="Mode fidélité" />

                            <div className="container">
                            
                                {this.afficheStatut()}

                                <div className="row">
                                    
                                    <div className="col-md-6">
                                    
                                        <center><QRCode
                                            value={this.state.qrcode}
                                            size={250}
                                            className="img-responsive"
                                        />
                                        <br/>
                                        <b>Prestation :</b> {this.state.prestation} - {this.state.prix} €</center>
                                        <br/>
                                        
                                    
                                    </div>
                                    <div className="col-md-6">
                                    
                                        <div className="panelCarte">
                                            <div id="personalizecarte">  
                                                <img src={Configuration.hostnameManuelServer + 'fidapi/img/' + this.props.bkdgCarte} className="img-fluid" id="img1" alt="" />
                                                <img src={Configuration.hostnameManuelServer + 'fidapi/img/' + this.props.iconCarte}  className="img-fluid" id="img2" alt="" /> 
                                            
                                            </div>  

                                        </div>
                                    </div>
                                
                                </div>

                                <div className="cadrePointage">
                                
                                    <div className="row">
                                    
                                        <div className="col-11">
                                        
                                            <Select
                                                style={{ width: 300 }}
                                                value={selectedOption}
                                                onChange={this.handleChange}
                                                options={options}
                                            />                                        
                                        
                                        </div>
                                        <div className="col-1">
                                        
                                            <button type="button" title="Aucune prestation" onClick={this.resetPointage.bind(this)} className="btn btn-dark"><i className="fas fa-times-circle"></i></button>
                                        
                                        </div>
                                    
                                    
                                    </div>

 
                                
                                
                                </div>

                                <div className="cadrePointage">
                                
                                    {this.checkEtatCarte()}

                                </div>

                                {this.state.afficheDernierPointage.map(function(value){

                                    return <div className="cadrePointage">
                                                                    
                                    <div className="row">

                                        <div className="col-6">
                                        
                                            <b>{value.client}</b><br/>
                                            <small>{value.prestation}</small>
                                            
                                        
                                        </div>
                                        <div className="col-6 text-right">
                                        
                                            <span className="badge badge-dark">{value.prix} €</span><br/>
                                            <small>{value.finpointage}</small>

                                        </div>

                                    </div>
                                    </div> 

                                })}

                                <br/>
                                <br/>

                            
                            </div>


                      </div>
  
                      <Footer />
  
                      </div>
  
                  </div>
  
                  <a className="scroll-to-top rounded" href="#page-top">
                      <i className="fas fa-angle-up"></i>
                  </a>
  
        </div>
    );
  }
}

export default Productivite;
