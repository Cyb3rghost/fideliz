import React, { Component } from 'react';

import Menu from './menu'

import fidelityCard from '../images/fidelitycard.png';
import backgroundCarte from '../images/backgroundCarte.jpg';
import logoCarte from '../images/logocarte.png';
import qrCode from '../images/qrcode.png';

import Footer from './footer'

class Ajoutcarte extends Component {

    constructor(props)
    {

        super(props)
        this.state = {

            dateDuJour: '',
            limitPointage: '',
            cadeaux: '',
            statutMsg: '',
            afflisteCadeaux: []

        }


    }

    componentDidMount()
    {

        var d = new Date();
        var date = d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear()
        var idClient = window.location.search.substring(4);

        this.setState({
            dateDuJour: date
        })

        fetch('http://127.0.0.1/fidapi/main.php?action=afficheListeCadeaux&id=' + this.props.idUserRecup)
        .then((response) => response.json())
        .then((response) => {

            console.log(response)

            if(response === "#SLCTLISTECADEAUX#ECHEC")
            {

                this.setState({
                    statutListeMsg: '3'
                })

            }
            else
            {

                this.setState({
                    afflisteCadeaux: response
                })

            }
            
    

        })
        .catch(err => console.error(err)) 

    }

    addCarte()
    {

        const { limitPointage, cadeaux } = this.state;
        const { idUserRecup, infosCarte, infosCarteIcon } = this.props;
        var idClient = window.location.search.substring(4);

        fetch('http://127.0.0.1/fidapi/main.php?action=creationCarte&id=' + idClient
        + '&imgfondcarte=' + infosCarte 
        + '&imgiconcarte=' + infosCarteIcon
        + '&pointage=' + limitPointage
        + '&cadeaux=' + cadeaux)
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            if(response === "#AJTCARTE#SUCCESS")
            {

                this.setState({
                    statutMsg: '1'
                })

                setTimeout(() => window.location.href = "/voirclient?id=" + idClient,2500)
                //setTimeout(window.location.href = "/voirclient?id=" + idClient, 5000);

            }
            else if (response === "#AJTCARTE#ERROR") {

                this.setState({
                    statutMsg: '0'
                })
                
            }
            else if (response === "#AJTCARTE#EXISTE") {

                this.setState({
                    statutMsg: '2'
                })
                
            }

        })
        .catch(err => console.error(err))

    }

    vrfInsertion()
    {

        if(this.state.statutMsg === '1')
        {

            return <div className="msgSuccessPerso">
        
                La carte de fidélité a bien été créer ! Patientez...
        
            </div>


        }
        else if (this.state.statutMsg === '0') 
        {
            

            return <div className="msgErrorPerso">
        
                La carte de fidélité n'a pas été créer !
        
            </div>

        }
        else if (this.state.statutMsg === '2') 
        {
            

            return <div className="msgErrorPerso">
        
                Le client possède déjà une carte de fidélité. 
        
            </div>

        }


    }

    afficheListePrestation()
    {


        if(this.state.statutMsg === '3')
        {

            return <option>Aucun cadeaux à afficher !</option>


        }
        else
        {
            
            return this.state.afflisteCadeaux.map(value => {
                return (
                            <option>{value.prestation} - {value.prix} €</option>
                        )
            })
            

        }



        
    }


    render() {
        var QRCode = require('qrcode.react');
        return (
          <div>
            
          <Menu />
  
          <div className="panelInfo">
              
              <div className="container-perso">
                  <h2><img src={fidelityCard} width="70" height="70" alt="Responsive image"/> Création de carte</h2>
              </div>
          
          </div>         
  
          {this.vrfInsertion()}
          
          <div className="page-header">
              <div className="container-perso">
                    <h1>ETAPE 2 - Création de la carte <br/></h1>
                    <p className="text-justify">Un client sera automatiquement reliée à votre compte. Il disposera d'un accès à son compte client afin de pouvoir gêrer 
                    et effectuer ses pointages à chaque prestation. Il pourra également suivre l'évolution de son compte.</p>
              </div>
          </div>
          
          <br/>

          <div className="container-perso">

            <div className="wellAddCarte">
                <div className="panelCarte">
                    <div id="personalizecarte">  
                        <img src={backgroundCarte} className="img-responsive" id="img1" alt="" />
                        <img src={logoCarte}  width="100" height="100" id="img2" className="img-rounded" alt="" />
                        <QRCode
                            value=""
                            size={100}
                            id="img3"
                        />  
                    
                    </div> 
                </div>  
                <br/>
                    
                                
                <label>Date : </label> {this.state.dateDuJour}
                <br/>
                <label>Image de fond : </label> {this.props.infosCarte}
                <br/>
                <label>Icône : </label> {this.props.infosCarteIcon} <br/>
                <br/>
                <div class="form-group">
                    <label>Limitation pointage : </label>
                    <select class="form-control"
                    value={this.state.limitPointage}
                    placeholder="Select"
                    onChange={e => this.setState({limitPointage: e.target.value})}>
                        <option value="" disabled selected>Select your option</option>
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                        <option>25</option>
                        <option>30</option>
                        <option>35</option>
                        <option>40</option>
                        <option>45</option>
                        <option>50</option>
                        <option>60</option>
                        <option>70</option>
                        <option>80</option>
                        <option>90</option>
                        <option>100</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Cadeaux : </label>
                    <select class="form-control"
                    value={this.state.cadeaux}
                    onChange={e => this.setState({cadeaux: e.target.value})}>>
                        <option value="" disabled selected>Select your option</option>
                        {this.afficheListePrestation()}
                    </select>
                </div>
                <button onClick={this.addCarte.bind(this)} className="btn btn-loginConnexion btn-block" type="submit">Création de la carte</button>
    
            </div>
                    
                     


          </div>  
                         
          <Footer />
            
          </div>
        );
      }
    }
  
  export default Ajoutcarte;