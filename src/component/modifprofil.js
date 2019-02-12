import React, { Component } from 'react';
import axios from 'axios';

import Navbarup from './navbarup'
import Menu from './menu'

class Modifprofil extends Component {

    constructor(props)
    {

        super(props)
        this.state = {
            nom: '',
            prenom: '',
            email: '',
            adresse: '',
            nomSociete: '',
            telephone: '',
            actuelMdp: '',
            retapeMdp: '',
            nouveauMdp: '',
            statutMsgMaj: ''

        }

    }

    componentDidMount()
    {


        fetch('http://127.0.0.1/fidapi/main.php?action=datadashboard&id=' + this.props.idUserRecup)
        .then((response) => response.json())
        .then((response) => {

            {response.map((value, index) => 
                (
                    this.setState({
                        nom: value.nom,
                        prenom: value.prenom,
                        email: value.email,
                        adresse: value.adresse,
                        nomSociete: value.nomsociete,
                        telephone: value.telephone,                     
                    })
                )
              )}
    

        })
        .catch(err => console.error(err))


    }

    majEntreprise()
    {


        fetch('http://127.0.0.1/fidapi/main.php?action=majEntreprise&ident=' + this.props.idUserRecup
        + '&nom=' + this.state.nom
        + '&prenom=' + this.state.prenom
        + '&email=' + this.state.email
        + '&adresse=' + this.state.adresse
        + '&telephone=' + this.state.telephone
        + '&societe=' + this.state.nomSociete)
        .then((response) => response.json())
        .then((response) => {

            if(response === "#MAJENT#SUCCESS")
            {

                console.log(response)
                this.setState({
                    statutMsgMaj: '1'
                })

            }
            else if(response === "#MAJENT#FAILED")
            {

                console.log(response)
                this.setState({
                    statutMsgMaj: '2'
                })

            }
            else if(response === "#ENT#NOEXIST")
            {

                console.log(response)
                this.setState({
                    statutMsgMaj: '3'
                })

            }


        })
        .catch(err => console.error(err))

    }

    changeMDP()
    {

        if(this.state.nouveauMdp === this.state.retapeMdp)
        {

            fetch('http://127.0.0.1/fidapi/main.php?action=changeMdpEnt&ident=' + this.props.idUserRecup
            + '&oldmdp=' + this.state.actuelMdp
            + '&nouveaumdp=' + this.state.nouveauMdp)
            .then((response) => response.json())
            .then((response) => {
    
                if(response === "#MDFMDP#SUCCESS")
                {
    
                    console.log(response)
                    this.setState({
                        statutMsgMaj: '5',
                        actuelMdp: '',
                        nouveauMdp: '',
                        retapeMdp: ''
                    })
    
                }
                else if(response === "#MDFMDP#FAILED")
                {
    
                    console.log(response)
                    this.setState({
                        statutMsgMaj: '6',
                        actuelMdp: '',
                        nouveauMdp: '',
                        retapeMdp: ''
                    })
    
                }
                else if(response === "#MDFMDP#NOSOUCHE")
                {
    
                    console.log(response)
                    this.setState({
                        statutMsgMaj: '7',
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
                statutMsgMaj: '4',
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

            return <div className="alert alert-success" role="alert">
        
                Votre profil a bien été mis à jour.
        
            </div>


        }
        else if (this.state.statutMsgMaj === '2') 
        {
            

            return <div className="alert alert-danger" role="alert">
        
                Votre profil n'a pas été mis à jour.
        
            </div>

        }
        else if (this.state.statutMsgMaj === '3') 
        {
            

            return <div className="alert alert-success" role="alert">
        
                Ce compte entreprise n'existe pas.
        
            </div>

        }
        else if (this.state.statutMsgMaj === '4') 
        {
            

            return <div className="alert alert-danger">
        
                    Les mots de passe ne sont pas identique.
        
            </div>

        }
        else if (this.state.statutMsgMaj === '5') 
        {
            

            return <div className="alert alert-success">
        
                Votre mot de passe a bien été modifier.
        
            </div>

        }
        else if (this.state.statutMsgMaj === '6') 
        {
            

            return <div className="alert alert-danger">
        
                Votre mot de passe n'a pas été modifier.
        
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

                    <Navbarup idEntreprise={this.props.idUserRecup} />

                    {this.afficheStatutMaj()}

                    <div className="container-fluid">

                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 className="h3 mb-0 text-gray-800">Modification de votre profil entreprise</h1>
                    </div>

                    <h2>{this.state.nom}</h2>
                    <small>{this.state.prenom}</small>

                    <hr/>

                    <div class="card shadow mb-4">
                                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-primary">Informations sur votre profil</h6>
                                    
                                </div>
                                <div class="card-body">

                                    <table class="table">
                                        <thead>
                                            <tr>
                                            
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                            <th scope="row">Nom</th>
                                            <td align="center">
                                            <input 
                                                type="text" 
                                                value={this.state.nom}
                                                onChange={e => this.setState({nom: e.target.value})}
                                                className="form-control" 
                                            />
                                            
                                            </td>
                                            </tr>
                                            <tr>
                                            <th scope="row">Prénom</th>
                                            <td align="center">
                                            <input 
                                                type="text" 
                                                value={this.state.prenom}
                                                onChange={e => this.setState({prenom: e.target.value})}
                                                className="form-control" 
                                            />
                                            
                                            </td>
                                            </tr>
                                            <tr>
                                            <th scope="row">Email</th>
                                            <td align="center">
                                            <input 
                                                type="text" 
                                                value={this.state.email}
                                                onChange={e => this.setState({email: e.target.value})}
                                                className="form-control" 
                                            />
                                            
                                            </td>
                                            </tr>
                                            <tr>
                                            <th scope="row">Adresse</th>
                                            <td align="center">
                                            <input 
                                                type="text" 
                                                value={this.state.adresse}
                                                onChange={e => this.setState({adresse: e.target.value})}
                                                className="form-control" 
                                            />
                                            
                                            </td>
                                            </tr>
                                            <tr>
                                            <th scope="row">Nom de la société</th>
                                            <td align="center">
                                            <input 
                                                type="text" 
                                                value={this.state.nomSociete}
                                                onChange={e => this.setState({nomSociete: e.target.value})}
                                                className="form-control" 
                                            />
                                            
                                            </td>
                                            </tr>
                                            <tr>
                                            <th scope="row">Numéro de téléphone</th>
                                            <td align="center">
                                            <input 
                                                type="text" 
                                                value={this.state.telephone}
                                                onChange={e => this.setState({telephone: e.target.value})}
                                                className="form-control" 
                                            />
                                            
                                            </td>
                                            </tr>
                                            <tr>
                                            <th scope="row"></th>
                                            <td><button type="button" onClick={this.majEntreprise.bind(this)} class="btn btn-success btn-block">Sauvegarder les modifications</button></td>
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

                                </div>
                    </div>

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

export default Modifprofil;
