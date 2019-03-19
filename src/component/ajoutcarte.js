import React, { Component } from 'react';
import Configuration from './fidconfig'

import Navbarup from './navbarup'
import Menu from './menu'
import fidelityCard from '../images/fidelitycard.png';
import backgroundCarte from '../images/backgroundCarte.jpg';
import logoCarte from '../images/logocarte.png';

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
        var idClient = this.props.match.params.id

        this.setState({
            dateDuJour: date
        })

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=afficheListeCadeaux&id=' + this.props.idUserRecup)
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
        var idClient = this.props.match.params.id

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=creationCarte&id=' + idClient
        + '&imgfondcarte=' + this.props.bkdgCarte
        + '&imgiconcarte=' + this.props.iconCarte
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

                setTimeout(() => window.location.href = "/voirclient/" + idClient,2500)
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
    var idClient = this.props.match.params.id
    var QRCode = require('qrcode.react');

    return (
      <div>

            <div id="wrapper">

                

                <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">

                    <Menu />

                    <div className="container-fluid">

                    <div className="row">

                            <div className="col-6">
                            
                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-gray-800">Création de carte</h1>
                                </div>


                            </div>
                            <div className="col-6">
                                                        

                            </div>

                    </div>

                    {this.vrfInsertion()}

                    <hr/>

                    {/* DEBUT CODE */}

                    <div className="container">
                    
                        <div className="panelCarte">
                        <div id="personalizecarte">  
                            <img src={Configuration.hostnameManuelServer + 'fidapi/img/' + this.props.bkdgCarte} className="img-responsive" id="img1" alt="" />
                            <img src={Configuration.hostnameManuelServer + 'fidapi/img/' + this.props.iconCarte}  className="img-responsive" id="img2" className="img-rounded" alt="" />
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
                    <button onClick={this.addCarte.bind(this)} className="btn btn-success btn-block" type="submit">Création de la carte</button>
    

                    
                    
                    </div>

                    {/* FIN CODE */}


                    </div>

                </div>

                <br/>

                <footer className="sticky-footer bg-white">
                    <div className="container my-auto">
                    <div className="copyright text-center my-auto">
                        <span>Copyright &copy; Your Website 2019</span>
                    </div>
                    </div>
                </footer>

                </div>

            </div>

            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>

            <div className="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                    </div>
                    <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                    <div className="modal-footer">
                    <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <a className="btn btn-primary" href="login.html">Logout</a>
                    </div>
                </div>
                </div>
            </div>

      </div>
    );
  }
}

export default Ajoutcarte;
