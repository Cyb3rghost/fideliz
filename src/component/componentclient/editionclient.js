import React, { Component } from 'react';
import Configuration from '../fidconfig'

import userClient from '../../images/adduser.png';

import Navbarupclient from './navbarupclient'
import Menu from './menuclient'


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

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=voirClient&id=' + this.props.idUserRecupClient)
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


        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=majClient&idclient=' + this.props.idUserRecupClient
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
            else if(response === "#MAJCLIENT#NOSOUCHE")
            {

                console.log(response)
                this.setState({
                    statutMsgMaj: '6'
                })

            }


        })
        .catch(err => console.error(err))

    }

    changeMDP()
    {

        if(this.state.nouveauMdp === this.state.retapeMdp)
        {

            fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=changeMdp&idclient=' + this.props.idUserRecupClient
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
                else if(response === "#MDFMDP#NOSOUCHE")
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
        
                Votre mot de passe n'a pas été modifier. (Ceci n'est pas votre compte principale.)
        
            </div>

        }
        else if (this.state.statutMsgMaj === '5') 
        {
            

            return <div className="msgErrorPerso">
        
                Les mots de passe ne sont pas identique.
        
            </div>

        }
        else if (this.state.statutMsgMaj === '6') 
        {
            

            return <div className="msgErrorPerso">
        
                Votre profil n'a pas été mis à jour. (Ceci n'est pas votre compte principale.)
        
            </div>

        }


    }

  render() {
    var idClient = window.location.search.substring(4);

    return (
      <div>

            <div id="wrapper">

                

                <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">

                <Menu />

                    <div className="container-fluid">

                    <div className="row">

                            <div className="col-8">
                            
                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-gray-800">Editez votre profil</h1>
                                </div>


                            </div>
                            <div className="col-4">
                                                        
                                

                            </div>

                    </div>

                    <hr/>
                    {this.afficheStatutMaj()}

                    {/* DEBUT CODE */}

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
                            <td><button class="btn btn-success btn-block" onClick={this.majClient.bind(this)} type="submit">Sauvegarder les modifications</button></td>
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
                            <td><button class="btn btn-success btn-block" onClick={this.changeMDP.bind(this)} type="submit">Sauvegarder les modifications</button></td>
                        </tr>
                        </tbody>
                    </table> 

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

export default Editionclient;
