import React, { Component } from 'react';

class Register extends Component {

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
      <div>

<div className="container">

        <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
            <div className="row">
            <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
            <div className="col-lg-7">
                <div className="p-5">
                <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">FIDELIZ <br/><small>Création d'un compte entreprise</small></h1>
                </div>
                {this.checkmsg()}
                <form className="user">
                    <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <input 
                        type="text" 
                        value={this.state.nomEntreprise}
                        onChange={e => this.setState({nomEntreprise: e.target.value})}
                        className="form-control form-control-user" 
                        placeholder="Nom de l'entreprise" 
                        
                        />
                    </div>
                    <div className="col-sm-6">
                        <input 
                        type="email" 
                        value={this.state.emailEntreprise}
                        onChange={e => this.setState({emailEntreprise: e.target.value})}
                        className="form-control form-control-user" 
                        placeholder="Email" 
                        
                        />
                    </div>
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            value={this.state.passwordEntreprise}
                            onChange={e => this.setState({passwordEntreprise: e.target.value})}
                            className="form-control form-control-user" 
                            placeholder="Password" 
                        
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            value={this.state.retape}
                            onChange={e => this.setState({retape: e.target.value})}
                            className="form-control form-control-user" 
                            placeholder="Retapez" 
                        
                        />
                    </div>
                    <button type="button" onClick={this.addInscription.bind(this)} class="btn btn-primary btn-user btn-block">Inscription</button>
                    <hr/>
                    <a href="/" className="btn btn-facebook btn-user btn-block">
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
