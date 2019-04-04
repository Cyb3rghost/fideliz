import React, { Component } from 'react';
import Configuration from './fidconfig'

class Register extends Component {

    constructor(props)
    {

        super(props)
        this.state = {
            nomEntreprise: '',
            emailEntreprise: '',
            passwordEntreprise: '',
            nom: '',
            prenom: '',
            adresse: '',
            telephone: '',
            sector: 'Coiffure',
            retape: '',
            isCheckedRGPD: false,
            statueIns: '0',
            getApiKey: ''
        }

    }

    addInscription(event)
    {

        const {nomEntreprise, emailEntreprise, nom, prenom, adresse, telephone, sector, passwordEntreprise, retape} = this.state;

        event.preventDefault();

        if(this.state.isCheckedRGPD)
        {

            if(passwordEntreprise === retape)
            {
    
                fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=inscription&nEntreprise=' + nomEntreprise 
                + '&mailEntreprise=' + emailEntreprise 
                + '&nom=' + nom 
                + '&prenom=' + prenom
                + '&adresse=' + adresse 
                + '&telephone=' + telephone
                + '&secteur=' + sector
                + '&password=' + passwordEntreprise
                + '&apikey=' + this.props.apikey)
                .then((response) => response.json())
                .then((response) => {
                    console.log(response)
                    if(response === "#INS#SUCCESS")
                    {
    
                        this.setState({
                            statueIns: '2'
                        })
    
                    }
                    else if (response === "#INS#ERROR") {
    
                        this.setState({
                            statueIns: '3'
                        })
                        
                    }
                    else if (response === "#INS#EXISTE") {
                        
                        this.setState({
                            statueIns: '4'
                        })
                        
                    }
    
                })
                .catch(err => console.error(err))
    
            }
            else
            {
    
                this.setState({
                    statueIns: '1'
                })
                console.log("#INS#MDPNONIDENTIQUE")
    
            }

        }
        else
        {

            this.setState({
                statueIns: '5'
            })

        }



    }

    checkmsg()
    {

        switch (this.state.statueIns) {
            case '1':
                return <div className="alert alert-warning">
                    <strong>Attention, </strong> les mots de passe ne sont pas identique.
                </div>
            case '2':
                return <div className="alert alert-success">
                    <strong>Inscription réussi !</strong>
                </div>
            case '3':
                return <div className="alert alert-danger">
                    <strong>Echec de l'inscription</strong>, veuillez recommencer !
                </div>
            case '4':
                return <div className="alert alert-danger">
                   Un compte avec ce nom d'entreprise ou cette adresse email existe déjà. Veuillez changer vos informations !
                </div>
            case '5':
                return <div className="alert alert-danger">
                    Vous devez accepter les conditions d'utilisations pour pouvoir vous inscrire.
                </div>
            default:
                break;
        }

    }

    handleChange(event) {
        this.setState({sector: event.target.value});
    }

    toggleChange(){

        this.setState({
            isCheckedRGPD: !this.state.isCheckedRGPD,
        });

    }

  render() {
    return (
      <div>

<div className="container">

        <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
            <div className="row">
            <div className="col-lg-12">
                <div className="p-5">
                <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">FIDELIZ <br/><small>Création d'un compte entreprise</small></h1>
                </div>
                {this.checkmsg()}
                <form onSubmit={this.addInscription.bind(this)} className="user">
                    <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <input 
                        type="text" 
                        value={this.state.nomEntreprise}
                        onChange={e => this.setState({nomEntreprise: e.target.value})}
                        className="form-control" 
                        placeholder="Nom de l'entreprise" 
                        
                        />
                    </div>
                    <div className="col-sm-6">
                        <input 
                        type="email" 
                        value={this.state.emailEntreprise}
                        onChange={e => this.setState({emailEntreprise: e.target.value})}
                        className="form-control" 
                        placeholder="Email" 
                        
                        />
                    </div>
                    </div>
                    <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <input 
                        type="text" 
                        value={this.state.nom}
                        onChange={e => this.setState({nom: e.target.value})}
                        className="form-control" 
                        placeholder="Votre nom" 
                        
                        />
                    </div>
                    <div className="col-sm-6">
                        <input 
                        type="text" 
                        value={this.state.prenom}
                        onChange={e => this.setState({prenom: e.target.value})}
                        className="form-control" 
                        placeholder="Votre prénom" 
                        
                        />
                    </div>
                    </div>
                    <div className="form-group">
                        <select className="form-control" onChange={this.handleChange.bind(this)} value={this.state.sector}>
                            <option value="Coiffure">Coiffure</option>
                            <option value="Pizzeria">Pizzeria</option>
                            <option value="Snack-Bar">Snack-Bar</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            value={this.state.adresse}
                            onChange={e => this.setState({adresse: e.target.value})}
                            className="form-control" 
                            placeholder="Votre adresse" 
                        
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            value={this.state.telephone}
                            onChange={e => this.setState({telephone: e.target.value})}
                            className="form-control" 
                            placeholder="Votre téléphone" 
                        />
                    </div>
                    <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <input 
                            type="password" 
                            value={this.state.passwordEntreprise}
                            onChange={e => this.setState({passwordEntreprise: e.target.value})}
                            className="form-control" 
                            placeholder="Password" 
                        
                        />
                    </div>
                    <div className="col-sm-6">
                        <input 
                            type="password" 
                            value={this.state.retape}
                            onChange={e => this.setState({retape: e.target.value})}
                            className="form-control" 
                            placeholder="Retapez" 
                        
                        />
                    </div>
                    </div>
                    <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="checkbox" 
                            checked={this.state.isCheckedRGPD}
                            onChange={this.toggleChange.bind(this)}
                        />
                        <label className="form-check-label">
                            J'accepte les <a href="/conditions-utilisations">conditions d'utilisations</a>
                        </label>
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-primary btn-block">Inscription</button>
                    <hr/>
                    <a href="/" className="btn btn-facebook btn-block">
                     Déjà un compte ? Cliquez-ici !
                    </a>
                </form>
                </div>
            </div>
            </div>
        </div>
        </div>

        </div>

      </div>
    );
  }
}

export default Register;
