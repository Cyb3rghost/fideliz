import React, { Component } from 'react';
import Loader from 'react-loader-spinner'
import Configuration from './fidconfig'
import validator from 'validator';
import Modal from 'react-responsive-modal';

import MaterialTable from 'material-table'

import Footer from './footer'
import Menu from './menu'

class Client extends Component {

    constructor(props)
    {

        super(props)
        this.state = {
            nombreClient: '',
            identifiantCompte: '',
            statutMsg: '',
            dataClient: [],
            emailClient: '',
            open: false,
            openDeux: false,
            value: '',
            loading: false
        }


    }

    componentDidMount()
    {

        var apiRequest1 = fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=compteNombreClient&id=' + this.props.idUserRecup
        + '&apikey=' + this.props.apikey).then(function(response){ 
            return response.json()
        });

        var apiRequest2 = fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=listeClient&id=' + this.props.idUserRecup
        + '&apikey=' + this.props.apikey).then(function(response){ 
            return response.json()
        });

        var combinedData = {"apiRequest1":{},"apiRequest2":{}};

        Promise.all([apiRequest1,apiRequest2])
        .then(function(values){
            combinedData["apiRequest1"] = values[0];
            combinedData["apiRequest2"] = values[1];

            this.setState({
                value: combinedData["apiRequest1"],             
            })

            if(combinedData["apiRequest2"] === "#LISTECLIENT#ECHEC")
            {

                this.setState({
                    statutMsg: '1',
                    loading: true
                })

            }
            else
            {

                this.setState({
                    dataClient: combinedData["apiRequest2"],
                    loading: true
                })

            }

        }.bind(this));

    }

    onOpenModal = () => {
        this.setState({ open: true });
    };
     
    onCloseModal = () => {
        this.setState({ open: false });
    };

    onOpenModalDeux = () => {
        this.setState({ openDeux: true });
    };
     
    onCloseModalDeux = () => {
        this.setState({ openDeux: false });
    };

    assocCompte(event)
    {

        event.preventDefault()

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=assoccompte&idEnt=' + this.props.idUserRecup
        + '&idusr=' + this.state.identifiantCompte
        + '&apikey=' + this.props.apikey)
        .then((response) => response.json())
        .then((response) => {

            console.log(response)
            if(response === "#ASSOC#SUCCESS")
            {

                this.setState({
                    statutMsg: '2'
                })

                setTimeout(() => window.location.href = "/client", 2500)

            }
            else if(response === "#ASSOC#FAILED")
            {

                this.setState({
                    statutMsg: '3'
                })

                setTimeout(() => window.location.href = "/client", 2500)

            }
            else if (response === "#ASSOC#EXIST") {

                this.setState({
                    statutMsg: '4'
                })

                setTimeout(() => window.location.href = "/client", 2500)

            }
            else if (response === "#ASSOC#NOEXIST") {
                
                this.setState({
                    statutMsg: '5'
                })

                setTimeout(() => window.location.href = "/client", 2500)
                
            }
            else if(response === "#LIMITCLIENT#ATTEIND")
            {
            
                this.setState({
                    statutMsg: '8'
                })

                setTimeout(() => window.location.href = "/client", 2500)
            
            }



        })
        .catch(err => console.error(err))

    }

    invitationClient(event)
    {

        event.preventDefault()

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=invitationClient&idEnt=' + this.props.idUserRecup
        + '&getemail=' + this.state.emailClient
        + '&apikey=' + this.props.apikey)
        .then((response) => response.json())
        .then((response) => {

            console.log(response)
            if(response === "#SENDINVIT#SUCCESS")
            {

                this.setState({
                    statutMsg: '6'
                })

                

            }
            else if(response === "#SENDINVIT#FAILED")
            {

                this.setState({
                    statutMsg: '7'
                })

                

            }



        })
        .catch(err => console.error(err))

    }

    afficheStatut()
    {



        if (this.state.statutMsg === '5') 
        {
           
            return <div className="alert alert-danger">
        
            <center>Cette identifiant n'est lié à aucun compte ou n'est pas un compte principal.</center>
    
            </div>
            
        }
        else if (this.state.statutMsg === '6') 
        {
           
            return <div className="alert alert-success">
        
            <center>Votre lien d'invitation a été envoyer avec succès.</center>
    
            </div>
            
        }
        else if (this.state.statutMsg === '7') 
        {
           
            return <div className="alert alert-danger">
        
            <center>Votre lien d'invitation n'a pas pu être envoyer.</center>
    
            </div>
            
        }


    }

    afficheStatutAssociation()
    {

        if(this.state.statutMsg === '2')
        {

            return <div className="alert alert-success">
        
            <center>Le compte avec cette identifiant a bien était associé à votre entreprise.</center>
    
            </div>


        }
        else if (this.state.statutMsg === '3') 
        {
           
            return <div className="alert alert-danger">
        
            <center>Le compte n'a pas pû être associer à cette entreprise.</center>
    
            </div>
            
        }
        else if (this.state.statutMsg === '4') 
        {
           
            return <div className="alert alert-success">
        
            <center>Ce client est déjà lié à cette entreprise.</center>
    
            </div>
            
        }
        else if (this.state.statutMsg === '8') 
        {
            
            return <div className="alert alert-danger">
        
                Votre compte ne vous permet pas d'associer un client supplémentaire. Pensez à upgrader votre compte.

            </div>

        }


    }

    startColor = '#4E73DF'; // cornflowerblue
    endColor = '#4E73DF'; // crimson

    render() {
        const { dataClient, open, openDeux } = this.state;

        const isEnabled = !validator.isEmpty(this.state.identifiantCompte) && validator.isNumeric(this.state.identifiantCompte)

        let loadingdata;
        if(this.state.loading)
        {
    
            loadingdata = <div>
    
                        <div className="container-fluid">
    
                        {/* DEBUT CODE */}
    
    
                        <div className="row">
    
                            <div className="col-md-8">
                            
                            <div className="col-md-6">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">CLIENTS</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.value}</div>
                                    </div>
                                    <div className="col-auto">
                                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>

                            
                            
    
                            </div>
                            <div className="col-md-4">
                            
                                <center>
                                    <div className="btn-group cadreBoutonGrouper" role="group" aria-label="Basic example">
                                        <button type="button" className="btn btn-secondary" title="Ajouter un nouveau client"><a href="/nouveauclient"><i className="fas fa-user-plus fa-3x"></i></a></button>
                                        <button type="button" className="btn btn-secondary" onClick={this.onOpenModal} title="Associé un compte client existant"><i className="fas fa-project-diagram fa-3x"></i></button>
                                        <button type="button" className="btn btn-secondary" onClick={this.onOpenModalDeux} title="Envoyer une invitation d'inscription"><i className="fas fa-envelope-open-text fa-3x"></i></button>
                                    </div>
                                </center>

                            {/*this.props.infoTypeCompte !== "0" &&
    
                                    <div><div class="input-group mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Identifiant utilisateur..." 
                                        value={this.state.identifiantCompte}
                                        onChange={(e) => this.setState({identifiantCompte: e.target.value})}
                                    
                                    />
                                    <div className="input-group-append">
                                        <button className="btn btn-dark" onClick={this.assocCompte.bind(this)} type="button" id="button-addon2">Association du compte</button>
                                    </div>
                                </div>
                                <a href="/nouveauclient"><button className="btn btn-dark btn-block" type="button" id="button-addon2">Nouveau client</button></a>  
                                </div>                
    
                            */}
    
                            {this.props.infoTypeCompte === "0" && 
    
                                <div className="alert alert-danger" role="alert">
                                    Vous n'êtes pas autoriser à ajouter des nouveaux clients.
                                </div> 
                            }
    
    
                            </div>
    
                        </div>
    
                        <hr/>
    
                        {this.afficheStatut()}
    

                        <br/>

                        <MaterialTable
                            columns={[
                                { title: 'Identifiant', field: 'id' },
                                { title: 'Nom', field: 'nom' },
                                { title: 'Prenom', field: 'prenom' },
                                { title: 'Email', field: 'email'},
                                { title: 'Telephone', field: 'telephone' },
                                { title: 'Adresse', field: 'adresse' },
                                { title: 'Code postal', field: 'codepostal' },
                                { title: 'Ville', field: 'ville' },
                            ]}
                            data={ dataClient.map( function(value) {
                            
                                var addDataItems = { 
                                id: value.id,
                                nom: value.nom,
                                prenom: value.prenom,
                                email: value.email,
                                telephone: value.telephone,
                                adresse: value.adresse,
                                codepostal: value.codepostal,
                                ville: value.ville
                                                    }
                                return addDataItems;
                            }) }
                            title="Liste de clients"
                            actions={[
                                {
                                    icon: 'remove_red_eye',
                                    tooltip: 'Voir la fiche client',
                                    onClick: (event, rowData) => {
                                        window.location.href = '/voirclient/' + rowData.id
                                    },
                                    iconProps: {
                                        style: {
                                          fontSize: 30,
                                          color: 'black',
                                        },
                                      },
                                }
                            ]}
                            options={{
                               actionsColumnIndex: -1,
                            }}
                        />
    
                        {/* FIN CODE */}
    
    
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
    
                        <Menu title="Carnet client" />

                        {loadingdata}

                        <Modal open={open} onClose={this.onCloseModal} center>
                            <h2>Association de compte</h2>
                            <hr/>
                            {this.afficheStatutAssociation()}
                            <p className="text-justify">Si un client possède déjà un compte sur la plateforme, il sera possible pour 
                            vous d'associer son identifiant à votre compte entreprise.</p>
                            <hr/>
                            <form onSubmit={this.assocCompte.bind(this)}>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Identifiant utilisateur..." 
                                    value={this.state.identifiantCompte}
                                    onChange={(e) => this.setState({identifiantCompte: e.target.value})}
                                
                                />
                                <br/>
                                <div className="input-group-append">
                                    <button className="btn btn-dark btn-block" disabled={!isEnabled} type="input">Association du compte</button>
                                </div>
                            </form>
                            
                        </Modal>


                        <Modal open={openDeux} onClose={this.onCloseModalDeux} center>
                            <h2>Envoyer un lien d'invitation</h2>
                            <hr/>
                            <p className="text-justify">Entrez l'adresse email afin que l'utilisateur puisse recevoir un lien d'invitation pour s'inscrire sur la plateforme.</p>
                            <hr/>
                            <form onSubmit={this.invitationClient.bind(this)}>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    placeholder="Adresse email..." 
                                    value={this.state.emailClient}
                                    onChange={(e) => this.setState({emailClient: e.target.value})}
                                
                                />
                                <br/>
                                <div className="input-group-append">
                                    <button className="btn btn-dark btn-block" type="input">Envoyer une invitation</button>
                                </div>
                            </form>
                            
                        </Modal>
    
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
    
    export default Client;
    