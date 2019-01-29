import React, { Component } from 'react';
import Menu from './menu'

import Footer from './footer'

import carnet from '../images/carnet.png';
import ajout from '../images/ajout.png';

class Client extends Component {

    constructor(props)
    {

        super(props)
        this.state = {
            nombreClient: '',
            identifiantCompte: '',
            statutMsg: '',
            dataClient: []
        }


    }

    componentDidMount()
    {


        fetch('http://127.0.0.1/fidapi/main.php?action=compteNombreClient&id=' + this.props.idUserRecup)
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
                    dataClient: response
                })

            }




        })
        .catch(err => console.error(err))


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
        return (
            <div>
          
            <Menu />    

            <div className="panelInfo">
            
                <div className="container-perso">
                    <h2><img src={carnet} width="70" height="70" alt="Responsive image"/> CARNET CLIENT</h2>
                </div>
        
            </div>   

            <div className="wellClient">
                        <div className="row">

                            <div className="col-md-8">                     
                         
                                Nombre de client : <p className="resizeNbClient">{this.state.nombreClient}</p><br/>
                                
                            
                            </div>

                            <div className="col-md-4 padCircle">
                            
                                <div className="input-group">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Identifiant utilisateur..." 
                                        value={this.state.identifiantCompte}
                                        onChange={(e) => this.setState({identifiantCompte: e.target.value})}
                                    />
                                    <span className="input-group-btn">
                                        <button className="btn btn-greenbutton" onClick={this.assocCompte.bind(this)} type="button">Associer un compte</button>
                                    </span>
                                </div><br/>
                                <a href="/nouveauclient"><button className="btn btn-block btn-greenbutton" type="button">Nouveau client</button></a>

                                <br/>                        
                            
                            </div>


                        </div>
            </div>

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
                                    <td><a href={"/voirclient?id=" + value.id}>Voir</a> - <a href={"/modifclient?id=" + value.id}>Editez</a></td>
                                </tr>
                            )
                        )}
                        </tbody>
                </table>            

            <Footer />

            </div>
        );
    }

}

export default Client;