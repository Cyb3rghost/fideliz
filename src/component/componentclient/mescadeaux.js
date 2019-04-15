import React, { Component } from 'react';
import Configuration from '../fidconfig'

import Menu from './menuclient'
import Footer from '../footer'

class Mescadeaux extends Component {

    constructor(props){

        super(props)
        this.state = {
            cadeauxAttente: [],
            cadeauxRecu: [],
            statutConfirmationCadeaux: '',
            statutCadeauxAttente: '',
            statutCadeauxRecu: '',
        }

    }

    componentDidMount()
    {

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=afficheCadeauxRecu&id=' + this.props.idUserRecupClient
        + '&identreprise=' + this.props.idEntRecupClient
        + '&apikey=' + this.props.apikey)
        .then((response) => response.json())
        .then((response) => {

            console.log(response)

            if(response === "#AFFCADEAUXRECU#ECHEC")
            {

                this.setState({
                    statutCadeauxRecu: '2'
                })



            }
            else
            {

                this.setState({
                    cadeauxRecu: response,
                    statutCadeauxRecu: '1'
                })                

            }


    

        })
        .catch(err => console.error(err))        

    }

    afficheCadeauxRecu()
    {

        var QRCode = require('qrcode.react');

        if(this.state.statutCadeauxRecu === '1')
        {

            return this.state.cadeauxRecu.map(value => {
                return ( <div key={value.id}>
                    <div  className="wellCadeaux">
                        <div className="container-perso"><div className="row">
                    
                        <div className="col-md-2">
                        

                            <QRCode
                                value={value.code}
                                size={100}
                            />  
                        
                        
                        </div>
                        <div className="col-md-10">
                        
                            <b>Identifiant carte :</b> {value.idcarte} <br/>
                            <b>Cadeaux crée le :</b> {value.date} <br/>
                            <b>Cadeaux reçu le :</b> {value.datereceptioncadeaux} <br/>
                            <b>Cadeaux :</b> {value.cadeaux} <br/>
                            <b>Valeur : </b> {value.prix} €<br/>
                            <b>Statut :</b> {value.statut} <br/>
                        
                        </div>
                    
                    
                    
                    </div>
                    </div>
                </div>
                
                </div>
                        )
            })


        }
        else if (this.state.statutCadeauxRecu === '2') 
        {
            

            return <div className="msgErrorPerso">
                
                Vous n'avez reçu aucun cadeaux !
        
            </div>

        }



    }




  render() {

    return (
      <div>

            <div id="wrapper">

                

                <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">

                    <Menu title="Cadeaux fidélités" />

                    <div className="container-fluid">

                    <hr/>
                    
                    {/* DEBUT CODE */}

                    <div className="page-header">
                        <div className="container-perso">

                            <h1>• Cadeaux reçu... <br/></h1>
                            <p className="text-justify">Vous trouverez ici vos prestations terminées.</p>

                        </div>
                    </div>    

                    {this.afficheCadeauxRecu()}

                    {/* FIN CODE */}


                    </div>

                </div>

                <Footer />

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

export default Mescadeaux;
