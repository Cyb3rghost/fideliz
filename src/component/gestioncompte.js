import React, { Component } from 'react';
import Menu from './menu'

import gestioncomptewhite from '../images/gestionCompte.png'
import Footer from './footer'


class Gestioncompte extends Component {

    constructor(props){

        super(props)
        this.state = {
            cadeaux: [],
            cadeauxInactive: [],
            maprestation: '',
            prix: '',
            statutListeCadeaux: '',
            statutListeCadeauxInactive: '',
            activeClassTab: 'active',
            activeClassTabDeux: ''
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
        
        fetch('http://127.0.0.1/fidapi/main.php?action=afficheListeCadeauxInactive&id=' + this.props.idUserRecup)
        .then((response) => response.json())
        .then((response) => {

            console.log(response)

            if(response === "#SLCTLISTECADEAUXINACTIF#ECHEC")
            {

                this.setState({
                    statutListeCadeauxInactive: '1'
                })

            }
            else
            {

                this.setState({
                    cadeauxInactive: response
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
        else if (this.state.statutAjtCadeaux === '4') 
        {
            

            return <div className="msgSuccessPerso">
                
                 Votre prestation a bien été désactiver.
        
            </div>

        }
        else if (this.state.statutAjtCadeaux === '5') 
        {
            

            return <div className="msgErrorPerso">
                
                 Votre prestation n'a pas été désactiver.
        
            </div>

        }
        else if (this.state.statutAjtCadeaux === '6') 
        {
            

            return <div className="msgSuccessPerso">
                
                 Votre prestation a bien été activer.
        
            </div>

        }
        else if (this.state.statutAjtCadeaux === '7') 
        {
            

            return <div className="msgErrorPerso">
                
                 Votre prestation n'a pas été activer.
        
            </div>

        }
        else if (this.state.statutAjtCadeaux === '8') 
        {
            

            return <div className="msgSuccessPerso">
                
                 Votre prestation a bien été supprimer.
        
            </div>

        }
        else if (this.state.statutAjtCadeaux === '9') 
        {
            

            return <div className="msgErrorPerso">
                
                 Votre prestation n'a pas été supprimer.
        
            </div>

        }

    }

    activeCadeaux(idcadeaux)
    {

        fetch('http://127.0.0.1/fidapi/main.php?action=activePrestation&id=' + idcadeaux)
        .then((response) => response.json())
        .then((response) => {

            console.log(response)

            if(response === "#ENABLEGIFT#SUCCESS")
            {

                this.setState({
                    statutAjtCadeaux: '6'
                })

                setTimeout(() => window.location.href = "/gestionCompte",1000)

            }
            else if (response === "#ENABLEGIFT#ECHEC") {

                this.setState({
                    statutAjtCadeaux: '7'
                })

            }


    

        })
        .catch(err => console.error(err)) 

    }

    desactiveCadeaux(idcadeaux)
    {

        fetch('http://127.0.0.1/fidapi/main.php?action=desactivePrestation&id=' + idcadeaux)
        .then((response) => response.json())
        .then((response) => {

            console.log(response)

            if(response === "#DISABLEGIFT#SUCCESS")
            {

                this.setState({
                    statutAjtCadeaux: '4'
                })

                setTimeout(() => window.location.href = "/gestionCompte",1000)

            }
            else if (response === "#DISABLEGIFT#ECHEC") {

                this.setState({
                    statutAjtCadeaux: '5'
                })

            }


    

        })
        .catch(err => console.error(err)) 

    }

    suppressionCadeaux(idcadeaux)
    {

        fetch('http://127.0.0.1/fidapi/main.php?action=suppressionPrestation&id=' + idcadeaux)
        .then((response) => response.json())
        .then((response) => {

            console.log(response)

            if(response === "#DELETEGIFT#SUCCESS")
            {

                this.setState({
                    statutAjtCadeaux: '8'
                })

                setTimeout(() => window.location.href = "/gestionCompte",1000)

            }
            else if (response === "#DELETE#ECHEC") {

                this.setState({
                    statutAjtCadeaux: '9'
                })

            }


    

        })
        .catch(err => console.error(err)) 

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
                                <td><button class="btn btn-warning" onClick={() => this.desactiveCadeaux(value.id)} type="submit">Désactivation</button></td>
                            </tr>
                        
                        )
            })
            

        }



        
    }

    afficheListePrestationInactive()
    {


        if(this.state.statutListeCadeauxInactive === '1')
        {

            return <div className="msgErrorPerso">
                
                Vous n'avez enregistrer aucun cadeaux.
    
            </div>


        }
        else
        {
            
            return this.state.cadeauxInactive.map(value => {
                return (
                            <tr>
                                <td>{value.prestation} </td>
                                <td>{value.prix} €</td>
                                <td><button class="btn btn-success" onClick={() => this.activeCadeaux(value.id)} type="submit">Activation</button> - <button onClick={() => this.suppressionCadeaux(value.id)} class="btn btn-danger" type="submit">Suppression</button></td>
                            </tr>
                        
                        )
            })
            

        }



        
    }


    toggle()
    {

        if(this.state.activeClassTab === 'active')
        {

            this.setState({
                activeClassTab: '',
                activeClassTabDeux: 'active'
            })

        }
        else if(this.state.activeClassTabDeux === '')
        {

            this.setState({
                activeClassTab: 'active',
                activeClassTabDeux: ''
            })

        }
        else if(this.state.activeClassTabDeux === '')
        {

            this.setState({
                activeClassTab: '',
                activeClassTabDeux: 'active'
            })

        }
        else if(this.state.activeClassTabDeux === 'active')
        {

            this.setState({
                activeClassTab: 'active',
                activeClassTabDeux: ''
            })

        }


    }

    render() {
      
      return (
        <div>
          
        <Menu />

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

        <ul className="nav nav-tabs">
            <li className={this.state.activeClassTab}><a id="cibleHome" onClick={this.toggle.bind(this)} href="#home">Prestations actives</a></li>
            <li className={this.state.activeClassTabDeux}><a id="cibleMenu1" onClick={this.toggle.bind(this)} href="#menu1">Prestations inactives</a></li>
        </ul>

        <div className="tab-content">
            <div id="home" className="tab-pane fade in active">
                
                <div className="container-perso">
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
            </div>
            <div id="menu1" className="tab-pane">
                <div className="container-perso">
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            
                        </tr>
                        </thead>
                        <tbody>
                            {this.afficheListePrestationInactive()}
                        </tbody>
                    </table>  
                </div>
            </div>
        </div>  

        <Footer />

        </div>
      );
    }
  }

export default Gestioncompte;