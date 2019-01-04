import React, { Component } from 'react';
import Menu from './menu'

import userClient from '../images/adduser.png';

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

            return <div className="msgSuccessPerso">
        
                Votre client {this.state.nomClient + ' ' + this.state.prenomClient} a bien été créer !
        
            </div>

        }
        else if (this.state.statutMsg === '0') 
        {
            

            return <div className="msgErrorPerso">
        
                Votre client {this.state.nomClient + ' ' + this.state.prenomClient} n'a pas été créer !
        
            </div>

        }
        else if (this.state.statutMsg === '2') 
        {
            

            return <div className="msgErrorPerso">
        
                Un client avec ces informations existe déjà. Vérifiez l'adresse email ou le mot de passe s'il vous plait. 
        
            </div>

        }


    }

    render() {
      return (
        <div id="wrapper">
          
        <Menu />

        <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                    <a className="navbar-brand" href="#"></a>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                    <li className="active"><a href="#">Home</a></li>
                    <li><a href="#">Page 1</a></li>
                    <li><a href="#">Page 2</a></li>
                    <li><a href="#">Page 3</a></li>
                    </ul>
                </div>
        </nav>
        <div className="panelInfo">
            
            <div className="container-perso">
                <h2><img src={userClient} width="70" height="70" alt="Responsive image"/> NOUVEAU CLIENT</h2>
            </div>
        
        </div>         

        {this.vrfInsertion()}
        
        <div className="page-header">
            <div className="container-perso">
                    <h1>Nouveau client <br/></h1>
                    <p className="text-justify">Un client sera automatiquement reliée à votre compte. Il disposera d'un accès à son compte client afin de pouvoir gêrer 
                    et effectuer ses pointages à chaque prestation. Il pourra également suivre l'évolution de son compte.</p>
            </div>
        </div>
        <div className="wellClient">
                        
                        
            <div className="form-horizontal">
                <div className="form-group">
                    <label className="col-sm-2 control-label">Nom</label>
                    <div className="col-sm-10">
                    <input 
                    type="text" 
                    value={this.state.nomClient}
                    onChange={e => this.setState({nomClient: e.target.value})}
                    className="form-control" 
                    placeholder="Nom"
                    />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Prénom</label>
                    <div className="col-sm-10">
                    <input 
                    type="text" 
                    value={this.state.prenomClient}
                    onChange={e => this.setState({prenomClient: e.target.value})}
                    className="form-control" 
                    placeholder="Prénom"
                    />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Adresse</label>
                    <div className="col-sm-10">
                    <input 
                    type="text" 
                    value={this.state.adresseClient}
                    onChange={e => this.setState({adresseClient: e.target.value})}
                    className="form-control" 
                    placeholder="Adresse"
                    />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">N° Téléphone</label>
                    <div className="col-sm-10">
                    <input 
                    type="text" 
                    value={this.state.telephoneClient}
                    onChange={e => this.setState({telephoneClient: e.target.value})}
                    className="form-control" 
                    placeholder="Numéro de téléphone"
                    />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Email</label>
                    <div className="col-sm-10">
                    <input 
                    type="email" 
                    value={this.state.emailClient}
                    onChange={e => this.setState({emailClient: e.target.value})}
                    className="form-control" 
                    placeholder="Email"
                    />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Mot de passe</label>
                    <div className="col-sm-10">
                    <input 
                    type="password" 
                    value={this.state.passwordClient}
                    onChange={e => this.setState({passwordClient: e.target.value})}
                    className="form-control" 
                    placeholder="Mot de passe"
                    />
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" onClick={this.ajoutClient.bind(this)} class="btn btn-loginConnexion btn-block">Ajouter</button>
                    </div>
                </div>
            </div>                            
            
        </div>


        
          
        </div>
      );
    }
  }

export default Nouveauclient;