import React, { Component } from 'react';
import Loader from 'react-loader-spinner'
import Configuration from './fidconfig'
import Select from 'react-select';

import Footer from './footer'
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
            statutMsgMaj: '',
            codepostal: '',
            ville: '',
            selectedOption: null,
            options: [],
            loading: false

        }

    }

    componentDidMount()
    {


        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=datadashboard&id=' + this.props.idUserRecup
        + '&apikey=' + this.props.apikey)
        .then((response) => response.json())
        .then((response) => {

            response.map((value, index) => 
                (
                    this.setState({
                        nom: value.nom,
                        prenom: value.prenom,
                        email: value.email,
                        adresse: value.adresse,
                        nomSociete: value.nomsociete,
                        telephone: value.telephone, 
                        codepostal: value.codepostal,
                        ville: value.ville, 
                        loading: true                   
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

    majEntreprise()
    {

        var separeInfos = this.state.selectedOption.label.split("/")
        var codepostal = separeInfos[0];
        var ville = separeInfos[1];

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=majEntreprise&ident=' + this.props.idUserRecup
        + '&nom=' + this.state.nom
        + '&prenom=' + this.state.prenom
        + '&email=' + this.state.email
        + '&adresse=' + this.state.adresse
        + '&telephone=' + this.state.telephone
        + '&societe=' + this.state.nomSociete
        + '&codepostal=' + codepostal
        + '&ville=' + ville
        + '&apikey=' + this.props.apikey)
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

            fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=changeMdpEnt&ident=' + this.props.idUserRecup
            + '&oldmdp=' + this.state.actuelMdp
            + '&nouveaumdp=' + this.state.nouveauMdp
            + '&apikey=' + this.props.apikey)
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

    handleChangeSelect = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
      }

  render() {
    let loadingdata;
    const { selectedOption } = this.state;

    let options = this.state.options.map(function (valux) {
            return { value: valux.codepostal, label: valux.codepostal + ' / ' + valux.ville }
    })

    if(this.state.loading)
    {

        loadingdata = <div>

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
                                            <th scope="row">Code postal</th>
                                            <td align="center">
                                                {this.state.codepostal}
                                            </td>
                                            </tr>
                                            <tr>
                                            <th scope="row">Ville</th>
                                            <td align="center">
                                                {this.state.ville}
                                            </td>
                                            </tr>
                                            <tr>
                                            <th scope="row">Nouvelle localisation</th>
                                            <td align="center">
                                                <Select
                                                    value={selectedOption}
                                                    onChange={this.handleChangeSelect}
                                                    options={options}
                                                    placeholder="Code postal"
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


    }
    else
    {

        loadingdata =  <div className="styleLoader"><center><Loader 
                            type="Triangle"
                            color="#00BFFF"
                            height="100"	
                            width="100"
                        /> </center></div>

    }

    return (
      <div>

            <div id="wrapper">

                

                <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">

                    <Menu />

                    {loadingdata}

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

export default Modifprofil;
