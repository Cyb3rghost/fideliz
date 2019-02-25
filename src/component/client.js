import React, { Component } from 'react';
import Loader from 'react-loader-spinner'

import Navbarup from './navbarup'
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
            loading: false
        }


    }

    componentDidMount()
    {

        var apiRequest1 = fetch('http://127.0.0.1/fidapi/main.php?action=compteNombreClient&id=' + this.props.idUserRecup).then(function(response){ 
            return response.json()
        });

        var apiRequest2 = fetch('http://127.0.0.1/fidapi/main.php?action=listeClient&id=' + this.props.idUserRecup).then(function(response){ 
            return response.json()
        });

        var combinedData = {"apiRequest1":{},"apiRequest2":{}};

        Promise.all([apiRequest1,apiRequest2])
        .then(function(values){
            combinedData["apiRequest1"] = values[0];
            combinedData["apiRequest2"] = values[1];

            this.setState({
                nombreClient: combinedData["apiRequest1"],             
            })

            if(combinedData["apiRequest2"] === "#LISTECLIENT#ECHEC")
            {

                this.setState({
                    statutMsg: '1'
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

        /*fetch('http://127.0.0.1/fidapi/main.php?action=compteNombreClient&id=' + this.props.idUserRecup)
        .then((response) => response.json())
        .then((response) => {

            this.setState({
                nombreClient: response                    
            })

        })
        .catch(err => console.error(err))

        fetch('http://127.0.0.1/fidapi/main.php?action=listeClient&id=' + this.props.idUserRecup)
        .then((response) => response.json())
        .then((response) => {

            if(response === "#LISTECLIENT#ECHEC")
            {

                this.setState({
                    statutMsg: '1'
                })

            }
            else
            {

                this.setState({
                    dataClient: response,
                    loading: true
                })

            }




        })
        .catch(err => console.error(err))*/


    }

    assocCompte()
    {

        fetch('http://127.0.0.1/fidapi/main.php?action=assoccompte&idEnt=' + this.props.idUserRecup
        + '&idusr=' + this.state.identifiantCompte)
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



        })
        .catch(err => console.error(err))

    }

    afficheStatut()
    {


        if(this.state.statutMsg === '2')
        {

            return <div className="msgSuccessPerso">
        
            <center>Le compte avec cette identifiant a bien était associé à votre entreprise.</center>
    
            </div>


        }
        else if (this.state.statutMsg === '3') 
        {
           
            return <div className="msgErrorPerso">
        
            <center>Le compte n'a pas pû être associer à cette entreprise.</center>
    
            </div>
            
        }
        else if (this.state.statutMsg === '4') 
        {
           
            return <div className="msgErrorPerso">
        
            <center>Ce client est déjà lié à cette entreprise.</center>
    
            </div>
            
        }
        else if (this.state.statutMsg === '5') 
        {
           
            return <div className="msgErrorPerso">
        
            <center>Cette identifiant n'est lié à aucun compte ou n'est pas un compte principal.</center>
    
            </div>
            
        }


    }

  render() {
    const { dataClient } = this.state;

    let loadingdata;
    if(this.state.loading)
    {

        loadingdata = <div>

                    <Navbarup idEntreprise={this.props.idUserRecup} />

                    <div className="container-fluid">

                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 className="h3 mb-0 text-gray-800">Carnet client</h1>
                    </div>

                    <hr/>

                    {/* DEBUT CODE */}


                    <div className="row">

                        <div className="col-8">
                        
                            <p>Nombre de client :</p><br/>
                            <h1>{this.state.nombreClient}</h1>
                        

                        </div>
                        <div className="col-4">
                        
                        {this.props.infoTypeCompte != "0" &&

                                <div><div class="input-group mb-3">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Identifiant utilisateur..." 
                                    value={this.state.identifiantCompte}
                                    onChange={(e) => this.setState({identifiantCompte: e.target.value})}
                                
                                />
                                <div class="input-group-append">
                                    <button class="btn btn-success" onClick={this.assocCompte.bind(this)} type="button" id="button-addon2">Association du compte</button>
                                </div>
                            </div>
                            <a href="/nouveauclient"><button class="btn btn-success btn-block" type="button" id="button-addon2">Nouveau client</button></a>  
                            </div>                

                        }

                        {this.props.infoTypeCompte === "0" && 

                            <div className="alert alert-danger" role="alert">
                                Vous n'êtes pas autoriser à ajouter des nouveaux clients.
                            </div> 
                        }


                        </div>

                    </div>

                    <hr/>

                    {this.afficheStatut()}

                    <table class="table table-striped">
                        <thead>
                        <tr>
                        </tr>
                        </thead>
                        <tbody>
                        {dataClient.map((value, index) => 
                            (<tr key={index}>
                                    <td>{value.nom}</td>
                                    <td>{value.prenom}</td>
                                    <td>{value.adresse}</td>
                                    <td>{value.telephone}</td>
                                    <td>{value.email}</td>
                                    <td><a href={'/voirclient/' + value.id}>Voir</a></td>
                                </tr>
                            )
                        )}
                        </tbody>
                    </table> 

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

                <Menu />

                <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">

                    {loadingdata}

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

export default Client;
