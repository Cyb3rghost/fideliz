import React, { Component } from 'react';
import Configuration from '../fidconfig'
import Select from 'react-select';

import Menu from './menuclient'
import Footer from '../footer'


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
            selectedOption: null,
            options: [],
            statutMsgMaj: ''

        }


    }

    componentDidMount()
    {

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=voirClient&id=' + this.props.idUserRecupClient
        + '&identreprise=' + this.props.idEntRecupClient
        + '&apikey=' + this.props.apikey)
        .then((response) => response.json())
        .then((response) => {

            response.map((value, index) => 
                (
                    this.setState({
                        nomClient: value.nom,
                        prenomClient: value.prenom,
                        adresseClient: value.adresse,
                        emailClient: value.email,
                        telephoneClient: value.telephone,     
                        ville: value.ville,
                        codepostal: value.codepostal               
                    })
                )
              )
    

        })
        .catch(err => console.error(err))

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=selectZonage'
        + '&apikey=' + this.props.apikey)
        .then((response) => response.json())
        .then((response) => {

            console.log(response)
            this.setState({
                options: response
            })

        })
        .catch(err => console.error(err))


    }

    majClient()
    {

        var separeInfos = this.state.selectedOption.label.split("/")
        var codepostal = separeInfos[0];
        var ville = separeInfos[1];

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=majClient&idclient=' + this.props.idUserRecupClient
        + '&nom=' + this.state.nomClient
        + '&prenom=' + this.state.prenomClient
        + '&email=' + this.state.emailClient
        + '&adresse=' + this.state.adresseClient
        + '&telephone=' + this.state.telephoneClient
        + '&codepostal=' + codepostal
        + '&ville=' + ville
        + '&apikey=' + this.props.apikey)
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
            + '&nouveaumdp=' + this.state.nouveauMdp
            + '&apikey=' + this.props.apikey)
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

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
      }

  render() {

    const { selectedOption } = this.state;

    let options = this.state.options.map(function (valux) {
            return { value: valux.codepostal, label: valux.codepostal + ' / ' + valux.ville }
    })

    return (
      <div>

            <div id="wrapper">

                

                <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">

                <Menu title="Editez votre profil" />

                    <div className="container-fluid">

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
                            <td>Code postal</td>
                            <td align="center">
                                {this.state.codepostal}
                            </td>
                            </tr>
                            <tr>
                            <td>Ville</td>
                            <td align="center">
                                {this.state.ville}
                            </td>
                            </tr>
                            <tr>
                            <td>Nouvelle localisation</td>
                            <td align="center">
                                <Select
                                    value={selectedOption}
                                    onChange={this.handleChange}
                                    options={options}
                                    placeholder="Code postal"
                                /> 
                            </td>
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

export default Editionclient;
