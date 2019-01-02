import React, { Component } from 'react';
import logo from '../images/logo.png'

class Inscription extends Component {

    constructor(props)
    {

        super(props)
        this.state = {
            nomEntreprise: '',
            emailEntreprise: '',
            passwordEntreprise: '',
            retape: '',
            statueIns: '0'
        }

    }

    addInscription()
    {

        const {nomEntreprise, emailEntreprise, passwordEntreprise, retape} = this.state;

        if(passwordEntreprise === retape)
        {

            fetch('http://127.0.0.1/fidapi/main.php?action=inscription&nEntreprise=' + nomEntreprise + '&mailEntreprise=' + emailEntreprise + '&password=' + passwordEntreprise)
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

    checkmsg()
    {

        switch (this.state.statueIns) {
            case '1':
                return <div className="alert alert-warning">
                    <strong>Attention, </strong> les mots de passe ne sont pas identique.
                </div>
                break;
            case '2':
                return <div className="alert alert-success">
                    <strong>Inscription réussi !</strong>
                </div>
                break;
            case '3':
                return <div className="alert alert-danger">
                    <strong>Echec de l'inscription</strong>, veuillez recommencer !
                </div>
                break;
            case '4':
                return <div className="alert alert-danger">
                   Un compte avec ce nom d'entreprise ou cette adresse email existe déjà. Veuillez changer vos informations !
                </div>
                break;
            default:
                break;
        }

    }

    render() {
      return (
        <div className="App">
          
              <div className="col-md-4">
              
              
              
              </div>
              <div className="col-md-4">
              
                    <div className="wellLoginEntreprise">
                    

                        <img src={logo} class="img-responsive" alt="Logo - Fideliz" />
                        {this.checkmsg()}
                        <div className="form-group">
                            <label>Nom de l'entreprise</label>
                            <input 
                            type="text" 
                            value={this.state.nomEntreprise}
                            onChange={e => this.setState({nomEntreprise: e.target.value})}
                            className="form-control" 
                            placeholder="Nom de l'entreprise" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Adresse email</label>
                            <input 
                            type="email" 
                            value={this.state.emailEntreprise}
                            onChange={e => this.setState({emailEntreprise: e.target.value})}
                            className="form-control" 
                            placeholder="Email" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Mot de passe</label>
                            <input 
                            type="password" 
                            value={this.state.passwordEntreprise}
                            onChange={e => this.setState({passwordEntreprise: e.target.value})}
                            className="form-control" 
                            placeholder="Password" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Retapez</label>
                            <input 
                            type="password" 
                            value={this.state.retape}
                            onChange={e => this.setState({retape: e.target.value})}
                            className="form-control" 
                            placeholder="Retapez" 
                            />
                        </div>
                        <button type="submit" onClick={this.addInscription.bind(this)} className="btn btn-loginConnexion btn-block">Inscription</button>
                        <a href="/">Déjà un compte ? Cliquez-ici !</a>

                    
                    </div>
              
              </div>
              <div className="col-md-4">
              
              
              
              </div>            
  
          
        </div>
      );
    }
  }

export default Inscription;