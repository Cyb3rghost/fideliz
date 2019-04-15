import React, { Component } from 'react';
import Configuration from './fidconfig'
import Select from 'react-select';

import Footer from './footer'
import Menu from './menu'

class Inscriptionclient extends Component {

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
            dateNaissance: '',
            statutMsg: '',
            selectedOption: null,
            options: []

        }


    }

    componentDidMount()
    {

        this.setState({
            emailClient: this.props.match.params.emailclt
        })

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

    ajoutClient(event)
    {

        const { nomClient, prenomClient, adresseClient, telephoneClient, emailClient, passwordClient, dateNaissance } = this.state;

        event.preventDefault();

        var separeInfos = this.state.selectedOption.label.split("/")
        var codepostal = separeInfos[0];
        var ville = separeInfos[1];

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=ajoutInvitationClient&id=' + this.props.match.params.identreprise
        + '&naissance=' + dateNaissance
        + '&nomClient=' + nomClient 
        + '&prenomClient=' + prenomClient 
        + '&adresseClient=' + adresseClient
        + '&telephoneClient=' + telephoneClient
        + '&emailClient=' + emailClient
        + '&passwordClient=' + passwordClient
        + '&codepostal=' + codepostal
        + '&ville=' + ville)
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            if(response === "#AJTCLIENT#SUCCESS")
            {

                this.setState({
                    statutMsg: '1'
                })

                setTimeout(() => window.location.href = "/connexionclient", 2500)

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
            else if(response === "#LIMITCLIENT#ATTEIND")
            {

                this.setState({
                    statutMsg: '3'
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
        
                Félicitation, l'utilisateur {this.state.nomClient + ' ' + this.state.prenomClient} a bien été créer ! Patientez...
        
            </div>

        }
        else if (this.state.statutMsg === '0') 
        {
            

            return <div className="alert alert-danger">
        
                L'utilisateur {this.state.nomClient + ' ' + this.state.prenomClient} n'a pas été créer !
        
            </div>

        }
        else if (this.state.statutMsg === '2') 
        {
            

            return <div className="alert alert-danger">
        
                Un client avec ces informations existe déjà. Vérifiez l'adresse email ou le mot de passe s'il vous plait. 
        
            </div>

        }
        else if (this.state.statutMsg === '3') 
        {
            

            return <div className="alert alert-danger">
        
                Le compte de l'entreprise ne vous permet pas de vous inscrire. (Le compte n'est pas upgrader.)

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

                    <Menu />

                    <div className="container-fluid">

                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 className="h3 mb-0 text-gray-800">Nouveau client</h1>
                    </div>

                    <hr/>

                    {/* DEBUT CODE */}
                    {this.vrfInsertion()}

                    <form onSubmit={this.ajoutClient.bind(this)} >
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Date de naissance</label>
                        <div class="col-sm-10">
                        <input 
                            type="date" 
                            value={this.state.dateNaissance}
                            onChange={e => this.setState({dateNaissance: e.target.value})}
                            className="form-control" 
                         />
                        </div>
                    </div>
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
                        <label for="inputPassword" class="col-sm-2 col-form-label">CodePostal / Ville</label>
                        <div class="col-sm-10">
                            <Select
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={options}
                                placeholder="Code postal"
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
                        <button type="submit" className="btn btn-success btn-block" >Ajouter</button>
                        </div>
                    </div>
                    </form>

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

export default Inscriptionclient;
