import React, { Component } from 'react';
import Menu from './menu'

import gestioncomptewhite from '../images/gestionCompte-white.png'

class Gestioncompte extends Component {

    constructor(props){

        super(props)
        this.state = {
            cadeaux: [],
            maprestation: '',
            prix: '',
            statutListeCadeaux: ''
        }

    }

    componentDidMount()
    {


        fetch('http://127.0.0.1/fidapi/main.php?action=afficheListeCadeaux&id=' + this.props.idUserRecup)
        .then((response) => response.json())
        .then((response) => {

            console.log(response)

            if(response === "#SLCTLISTECADEAUX#ECHEC")
            {

                this.setState({
                    statutListeCadeaux: '1'
                })

            }
            else
            {

                this.setState({
                    cadeaux: response
                })

            }
            


    

        })
        .catch(err => console.error(err))             

    }

    ajoutPrestation()
    {

        alert('Prestation : ' + this.state.maprestation + '\nPrix : ' + this.state.prix)

        fetch('http://127.0.0.1/fidapi/main.php?action=ajoutCadeaux&id=' + this.props.idUserRecup + '&prestation=' + this.state.maprestation + '&prix=' + this.state.prix)
        .then((response) => response.json())
        .then((response) => {

            console.log(response)

            if(response === "#AJTCADEAUX#SUCCESS")
            {

                this.setState({
                    statutAjtCadeaux: '1'
                })

                setTimeout(() => window.location.href = "/gestionCompte",1000)

            }
            else if (response === "#AJTCADEAUX#ECHEC") {

                this.setState({
                    statutAjtCadeaux: '2'
                })

            }
            else if (response === "#AJTCADEAUX#EXISTE") {
            
                this.setState({
                    statutAjtCadeaux: '3'
                })

            }


    

        })
        .catch(err => console.error(err)) 


    }

    afficheStatutCadeaux()
    {

        if(this.state.statutAjtCadeaux === '1')
        {

            return <div className="msgSuccessPerso">
                
                Votre prestation a bien été ajouter !
    
            </div>


        }
        else if (this.state.statutAjtCadeaux === '2') 
        {
            

            return <div className="msgErrorPerso">
                
                Votre prestation n'a pas pu être ajouter ! Veuillez recommencer s'il vous plait.
        
            </div>

        }
        else if (this.state.statutAjtCadeaux === '3') 
        {
            

            return <div className="msgErrorPerso">
                
                Votre prestation existe déjà sous ce nom. 
        
            </div>

        }


    }

    desactiveCadeaux(idcadeaux)
    {

        alert(idcadeaux)

    }

    afficheListePrestation()
    {


        if(this.state.statutListeCadeaux === '1')
        {

            return <div className="msgErrorPerso">
                
                Vous n'avez enregistrer aucun cadeaux.
    
            </div>


        }
        else
        {
            
            return this.state.cadeaux.map(value => {
                return (
                            <tr>
                                <td>{value.prestation} </td>
                                <td>{value.prix} €</td>
                                <td><button class="btn btn-warning" onClick={() => this.desactiveCadeaux(value.id)} type="submit">Désactivation</button> - <button class="btn btn-danger" type="submit">Suppression</button></td>
                            </tr>
                        
                        )
            })
            

        }



        
    }

    render() {
      
      return (
        <div id="wrapper">
          
        <Menu />

        <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                    <a className="navbar-brand" href="#"></a>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                    <li className="active"><a href="#">Home</a></li>
                    <li><a href="#">Page 1</a></li>
                    <li><a href="#">Page 2</a></li>
                    <li><a href="#">Page 3</a></li>
                    </ul>
                </div>
        </nav>
        <div className="panelInfo">
            
            <div className="container-perso">
                <h2><img src={gestioncomptewhite} width="70" height="70" alt="Responsive image"/> GESTION DU COMPTE</h2>
            </div>
        
        </div>       

        {this.afficheStatutCadeaux()}  
        
        <div className="page-header">
            <div className="container-perso">

                    <h1>Configuration du compte entreprise <br/></h1>
                    <p className="text-justify">Cette espace vous permettras de gêrer les informations de votre compte entreprise.</p>

            </div>
        </div>

        <div className="form-inline">
            <center>
                <div className="form-group">
                    <label className="sr-only" for="exampleInputEmail3">Prestation : </label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Ma prestation" 
                        value={this.state.maprestation}
                        onChange={e => this.setState({maprestation: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <label className="sr-only">Prix : </label>
                    <input 
                        type="number" 
                        className="form-control" 
                        placeholder="Prix" 
                        value={this.state.prix}
                        onChange={e => this.setState({prix: e.target.value})}
                    />
                </div>
                <button type="submit" onClick={this.ajoutPrestation.bind(this)} className="btn btn-loginConnexion">Ajouter</button>
            </center>
        </div>

        <br/>
        <table class="table table-striped">
            <thead>
            <tr>
                
            </tr>
            </thead>
            <tbody>
                {this.afficheListePrestation()}
            </tbody>
        </table>                
        

        </div>
      );
    }
  }

export default Gestioncompte;