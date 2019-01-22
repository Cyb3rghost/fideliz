import React, { Component } from 'react';
import Menuclient from './menuclient'

import userClient from '../../images/adduser.png';

class Editionclient extends Component {

    constructor(props)
    {

        super(props)
        this.state = {

            nomClient: '',
            prenomClient: '',
            adresseClient: '',
            emailClient: '',
            telephoneClient: '',
            actuelMdp: '',
            nouveauMdp: '',
            retapeMdp: '',
            statutMsgMaj: ''

        }


    }

    componentDidMount()
    {

        var idClient = window.location.search.substring(4);
        fetch('http://127.0.0.1/fidapi/main.php?action=voirClient&id=' + this.props.idUserRecupClient)
        .then((response) => response.json())
        .then((response) => {

            {response.map((value, index) => 
                (
                    this.setState({
                        nomClient: value.nom,
                        prenomClient: value.prenom,
                        adresseClient: value.adresse,
                        emailClient: value.email,
                        telephoneClient: value.telephone,                    
                    })
                )
              )}
    

        })
        .catch(err => console.error(err))


    }

    majClient()
    {


        fetch('http://127.0.0.1/fidapi/main.php?action=majClient&idclient=' + this.props.idUserRecupClient
        + '&nom=' + this.state.nomClient
        + '&prenom=' + this.state.prenomClient
        + '&email=' + this.state.emailClient
        + '&adresse=' + this.state.adresseClient
        + '&telephone=' + this.state.telephoneClient)
        .then((response) => response.json())
        .then((response) => {

            if(response === "#MAJCLIENT#SUCCESS")
            {

                console.log(response)
                this.setState({
                    statutMsgMaj: '1'
                })

            }
            else if(response === "#MAJCLIENT#FAILED")
            {

                console.log(response)
                this.setState({
                    statutMsgMaj: '2'
                })

            }

        })
        .catch(err => console.error(err))

    }

    changeMDP()
    {

        if(this.state.nouveauMdp === this.state.retapeMdp)
        {

            fetch('http://127.0.0.1/fidapi/main.php?action=changeMdp&idclient=' + this.props.idUserRecupClient
            + '&oldmdp=' + this.state.actuelMdp
            + '&nouveaumdp=' + this.state.nouveauMdp)
            .then((response) => response.json())
            .then((response) => {
    
                if(response === "#MDFMDP#SUCCESS")
                {
    
                    console.log(response)
                    this.setState({
                        statutMsgMaj: '3',
                        actuelMdp: '',
                        nouveauMdp: '',
                        retapeMdp: ''
                    })
    
                }
                else if(response === "#MDFMDP#FAILED")
                {
    
                    console.log(response)
                    this.setState({
                        statutMsgMaj: '4',
                        actuelMdp: '',
                        nouveauMdp: '',
                        retapeMdp: ''
                    })
    
                }
                else if(response === "#MDFMDP#NOEXIST")
                {
    
                    console.log(response)
                    this.setState({
                        statutMsgMaj: '4',
                        actuelMdp: '',
                        nouveauMdp: '',
                        retapeMdp: ''
                    })
    
                }
    
            })
            .catch(err => console.error(err))


        }
        else
        {

            this.setState({
                statutMsgMaj: '5',
                actuelMdp: '',
                nouveauMdp: '',
                retapeMdp: ''
            })

        }







    }

    afficheStatutMaj()
    {


        if(this.state.statutMsgMaj === '1')
        {

            return <div className="msgSuccessPerso">
        
                Votre profil a bien été mis à jour.
        
            </div>


        }
        else if (this.state.statutMsgMaj === '2') 
        {
            

            return <div className="msgErrorPerso">
        
                Votre profil n'a pas été mis à jour.
        
            </div>

        }
        else if (this.state.statutMsgMaj === '3') 
        {
            

            return <div className="msgSuccessPerso">
        
                Votre mot de passe a bien été modifier.
        
            </div>

        }
        else if (this.state.statutMsgMaj === '4') 
        {
            

            return <div className="msgErrorPerso">
        
                Votre mot de passe n'a pas été modifier.
        
            </div>

        }
        else if (this.state.statutMsgMaj === '5') 
        {
            

            return <div className="msgErrorPerso">
        
                Les mots de passe ne sont pas identique.
        
            </div>

        }

    }

    render() {
        return (
          <div>
  
              <Menuclient />
  
              <div className="panelInfo">
                  
                    <div className="container-perso">
                        <h2><img src={userClient} width="70" height="70" alt="Responsive image"/> EDITEZ VOTRE PROFIL</h2>
                    </div>
  
              </div>         

              {this.afficheStatutMaj()}
              <br/>

                <br/>
                <table class="table table-striped">
                    <thead>
                    <tr>
                        
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Nom : </td>
                        <td><input 
                        type="text" 
                        className="form-control" 
                        value={this.state.nomClient} 
                        onChange={(e) => this.setState({nomClient: e.target.value})}
                        /></td>
                    </tr>
                    <tr>
                        <td>Prénom : </td>
                        <td><input type="text" 
                        className="form-control" 
                        value={this.state.prenomClient} 
                        onChange={(e) => this.setState({prenomClient: e.target.value})}
                        /></td>
                    </tr>
                    <tr>
                        <td>Adresse : </td>
                        <td><input 
                        type="text" 
                        className="form-control" 
                        value={this.state.adresseClient} 
                        onChange={(e) => this.setState({adresseClient: e.target.value})}
                        /></td>
                    </tr>
                    <tr>
                        <td>Email : </td>
                        <td><input 
                        type="text" 
                        className="form-control" 
                        value={this.state.emailClient} 
                        onChange={(e) => this.setState({emailClient: e.target.value})}
                        /></td>
                    </tr>
                    <tr>
                        <td>N° Téléphone : </td>
                        <td><input 
                        type="text" 
                        className="form-control" 
                        value={this.state.telephoneClient} 
                        onChange={(e) => this.setState({telephoneClient: e.target.value})}
                        /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><button class="btn btn-greenbutton btn-block" onClick={this.majClient.bind(this)} type="submit">Sauvegarder les modifications</button></td>
                    </tr>
                    </tbody>
                </table> 

                <br/>

                <table class="table table-striped">
                    <thead>
                    <tr>
                        
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Mot de passe actuel : </td>
                        <td><input 
                        type="password" 
                        className="form-control" 
                        value={this.state.actuelMdp} 
                        onChange={(e) => this.setState({actuelMdp: e.target.value})}
                        required /></td>
                    </tr>
                    <tr>
                        <td>Nouveau mot de passe : </td>
                        <td><input type="password" 
                        className="form-control" 
                        value={this.state.nouveauMdp} 
                        onChange={(e) => this.setState({nouveauMdp: e.target.value})}
                        required /></td>
                    </tr>
                    <tr>
                        <td>Retapez le mot de passe : </td>
                        <td><input 
                        type="password" 
                        className="form-control" 
                        value={this.state.retapeMdp} 
                        onChange={(e) => this.setState({retapeMdp: e.target.value})}
                        required /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><button class="btn btn-greenbutton btn-block" onClick={this.changeMDP.bind(this)} type="submit">Sauvegarder les modifications</button></td>
                    </tr>
                    </tbody>
                </table> 

            
          </div>
        );
      }
    }
  
export default Editionclient;
  