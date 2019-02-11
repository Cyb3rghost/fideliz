import React, { Component } from 'react';
import { BrowserRouter as Redirect} from "react-router-dom";

import Navbarup from './navbarup'
import Menu from './menu'

class Nouveauclient extends Component {

    constructor(props)
    {

        super(props)
        this.state = {
            nomClient: '',
            prenomClient: '',
            adresseClient: '',
            telephoneClient: '',
            emailClient: '',
            passwordClient: '',
            statutMsg: ''
        }


    }

    componentDidMount()
    {

        if(this.props.infoTypeCompte === "0")
        {
            window.location.href = "/dashboard"
        }

    }

    ajoutClient()
    {

        const { nomClient, prenomClient, adresseClient, telephoneClient, emailClient, passwordClient } = this.state;

        fetch('http://127.0.0.1/fidapi/main.php?action=ajoutClient&id=' + this.props.idUserRecup
        + '&nomClient=' + nomClient 
        + '&prenomClient=' + prenomClient 
        + '&adresseClient=' + adresseClient
        + '&telephoneClient=' + telephoneClient
        + '&emailClient=' + emailClient
        + '&passwordClient=' + passwordClient)
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            if(response === "#AJTCLIENT#SUCCESS")
            {

                this.setState({
                    statutMsg: '1'
                })

            }
            else if (response === "#AJTCLIENT#ERROR") {

                this.setState({
                    statutMsg: '0'
                })
                
            }
            else if (response === "#AJTCLIENT#EXISTE") {

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

            return <div className="alert alert-success">
        
                Votre client {this.state.nomClient + ' ' + this.state.prenomClient} a bien été créer !
        
            </div>

        }
        else if (this.state.statutMsg === '0') 
        {
            

            return <div className="alert alert-danger">
        
                Votre client {this.state.nomClient + ' ' + this.state.prenomClient} n'a pas été créer !
        
            </div>

        }
        else if (this.state.statutMsg === '2') 
        {
            

            return <div className="alert alert-danger">
        
                Un client avec ces informations existe déjà. Vérifiez l'adresse email ou le mot de passe s'il vous plait. 
        
            </div>

        }


    }

  render() {
    return (
      <div>

            <div id="wrapper">

                <Menu />

                <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">

                    <Navbarup />

                    <div className="container-fluid">

                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 className="h3 mb-0 text-gray-800">Nouveau client</h1>
                    </div>

                    <hr/>

                    {/* DEBUT CODE */}
                    {this.vrfInsertion()}

                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Nom</label>
                        <div class="col-sm-10">
                        <input 
                            type="text" 
                            value={this.state.nomClient}
                            onChange={e => this.setState({nomClient: e.target.value})}
                            className="form-control" 
                            placeholder="Nom"
                         
                         />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Prénom</label>
                        <div class="col-sm-10">
                        <input 
                            type="text" 
                            value={this.state.prenomClient}
                            onChange={e => this.setState({prenomClient: e.target.value})}
                            className="form-control" 
                            placeholder="Prénom"
                        
                        />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Adresse</label>
                        <div class="col-sm-10">
                        <input 
                            type="text" 
                            value={this.state.adresseClient}
                            onChange={e => this.setState({adresseClient: e.target.value})}
                            className="form-control" 
                            placeholder="Adresse"
                        
                        />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">N° Téléphone</label>
                        <div class="col-sm-10">
                        <input 
                            type="text" 
                            value={this.state.telephoneClient}
                            onChange={e => this.setState({telephoneClient: e.target.value})}
                            className="form-control" 
                            placeholder="Numéro de téléphone"
                        
                        />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                        <input 
                            type="email" 
                            value={this.state.emailClient}
                            onChange={e => this.setState({emailClient: e.target.value})}
                            className="form-control" 
                            placeholder="Email"
                        
                        />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Mot de passe</label>
                        <div class="col-sm-10">
                        <input 
                            type="password" 
                            value={this.state.passwordClient}
                            onChange={e => this.setState({passwordClient: e.target.value})}
                            className="form-control" 
                            placeholder="Mot de passe"
                        
                        />
                        </div>
                    </div>
                    <div class="form-group row">
                        <div className="col-sm-8"></div>
                        <div class="col-sm-4">
                        <button class="btn btn-success btn-block" onClick={this.ajoutClient.bind(this)} type="button" id="button-addon2">Ajouter</button>
                        </div>
                    </div>


                    {/* FIN CODE */}


                    </div>

                </div>

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

export default Nouveauclient;
