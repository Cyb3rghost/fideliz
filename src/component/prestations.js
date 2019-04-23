import React, { Component } from 'react';
import Configuration from './fidconfig'


import Menu from './menu'
import Footer from './footer'

import MaterialTable from 'material-table'
import Modal from 'react-responsive-modal';
import Select from 'react-select';

var ItemMultiple = [

];

class Prestations extends Component {

    constructor(props)
    {

        super(props)
        this.state = {
            cadeaux: [],
            cadeauxInactive: [],
            maprestation: '',
            maprestationGrp: '',
            prix: '',
            prixGrp: '',
            statutListeCadeaux: '',
            statutListeCadeauxInactive: '',
            gestionInterface: '1',
            celluleDesactivation: '0',
            cellulePrixTotal: '0',
            celluleNomPrestation: '',
            celluleGrp: '',
            activeDegroupage: false,
            open: false,
            openDeux: false,
            openTrois: false,
            openQuatre: false,
            selectedOption: null,
            totalMultiplePrix: '',
            lstProduitGrp: [],
            options: []
            
        }


    }

    componentDidMount()
    {

        var apiRequest1 = fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=afficheListeCadeaux&id=' + this.props.idUserRecup
        + '&apikey=' + this.props.apikey).then(function(response){ 
            return response.json()
          });
    
        var apiRequest2 = fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=afficheListeCadeauxInactive&id=' + this.props.idUserRecup
        + '&apikey=' + this.props.apikey).then(function(response){
                    return response.json()
        });

        var apiRequest3 = fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=selectionPrestation&identreprise=' + this.props.idUserRecup
        + '&apikey=' + this.props.apikey).then(function(response){
            return response.json()
        });

        var combinedData = {"apiRequest1":{},"apiRequest2":{},"apiRequest3":{}};

        Promise.all([apiRequest1,apiRequest2, apiRequest3])
        .then(function(values){
            combinedData["apiRequest1"] = values[0];
            combinedData["apiRequest2"] = values[1];
            combinedData["apiRequest3"] = values[2];

            console.log(combinedData["apiRequest1"])

            if(combinedData["apiRequest1"] === "#SLCTLISTECADEAUX#ECHEC")
            {

                this.setState({
                    statutListeCadeaux: '1'
                })

            }
            else
            {

                this.setState({
                    cadeaux: combinedData["apiRequest1"]
                })

            }

            console.log(combinedData["apiRequest2"])

            if(combinedData["apiRequest2"] === "#SLCTLISTECADEAUXINACTIF#ECHEC")
            {

                this.setState({
                    statutListeCadeauxInactive: '1'
                })

            }
            else
            {

                this.setState({
                    cadeauxInactive: combinedData["apiRequest2"],
                    
                })

            }

           this.setState({
               options: combinedData["apiRequest3"],
               loading: true
           })


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

      onOpenModalTrois = () => {
        this.setState({ openTrois: true });
      };
     
      
    onCloseModalTrois = () => {
        this.setState({ openTrois: false });
      };

      onOpenModalQuatre = () => {
        this.setState({ openQuatre: true });
      };
     
      
    onCloseModalQuatre = () => {
        this.setState({ openQuatre: false });
      };

    ajoutPrestation()
    {

        alert('Prestation : ' + this.state.maprestation + '\nPrix : ' + this.state.prix)

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=ajoutCadeaux&id=' + this.props.idUserRecup 
        + '&prestation=' + this.state.maprestation 
        + '&prix=' + this.state.prix
        + '&apikey=' + this.props.apikey)
        .then((response) => response.json())
        .then((response) => {

            console.log(response)

            if(response === "#AJTCADEAUX#SUCCESS")
            {

                this.onCloseModal()
                this.setState({
                    statutAjtCadeaux: '1'
                })
                
                setTimeout(() => window.location.href = "/prestations",1000)

            }
            else if (response === "#AJTCADEAUX#ECHEC") {

                this.onCloseModal()
                this.setState({
                    statutAjtCadeaux: '2'
                })

            }
            else if (response === "#AJTCADEAUX#EXISTE") {
            
                this.onCloseModal()
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

            return <div className="alert alert-success">
                
                Votre prestation a bien été ajouter !
    
            </div>


        }
        else if (this.state.statutAjtCadeaux === '2') 
        {
            

            return <div className="alert alert-danger">
                
                Votre prestation n'a pas pu être ajouter ! Veuillez recommencer s'il vous plait.
        
            </div>

        }
        else if (this.state.statutAjtCadeaux === '3') 
        {
            

            return <div className="alert alert-danger">
                
                Votre prestation existe déjà sous ce nom. 
        
            </div>

        }
        else if (this.state.statutAjtCadeaux === '4') 
        {
            

            return <div className="alert alert-success">
                
                 Votre prestation a bien été désactiver.
        
            </div>

        }
        else if (this.state.statutAjtCadeaux === '5') 
        {
            

            return <div className="alert alert-danger">
                
                 Votre prestation n'a pas été désactiver.
        
            </div>

        }
        else if (this.state.statutAjtCadeaux === '6') 
        {
            

            return <div className="alert alert-success">
                
                 Votre prestation a bien été activer.
        
            </div>

        }
        else if (this.state.statutAjtCadeaux === '7') 
        {
            

            return <div className="alert alert-danger">
                
                 Votre prestation n'a pas été activer.
        
            </div>

        }
        else if (this.state.statutAjtCadeaux === '8') 
        {
            

            return <div className="alert alert-success">
                
                 Votre prestation a bien été supprimer.
        
            </div>

        }
        else if (this.state.statutAjtCadeaux === '9') 
        {
            

            return <div className="alert alert-danger">
                
                 Votre prestation n'a pas été supprimer.
        
            </div>

        }
        else if (this.state.statutAjtCadeaux === '10') 
        {
            

            return <div className="alert alert-danger" role="alert">
                
                 Veuillez sélectionnez une prestation avant d'utiliser cette action.
        
            </div>

        }


    }

    activeCadeaux(idcadeaux)
    {

        if(idcadeaux === "0")
        {

            this.setState({

                statutAjtCadeaux: '10'

            })

        }
        else
        {

            fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=activePrestation&id=' + idcadeaux
            + '&apikey=' + this.props.apikey)
            .then((response) => response.json())
            .then((response) => {
    
                console.log(response)
    
                if(response === "#ENABLEGIFT#SUCCESS")
                {
    
                    this.setState({
                        statutAjtCadeaux: '6'
                    })
    
                    setTimeout(() => window.location.href = "/prestations",1000)
    
                }
                else if (response === "#ENABLEGIFT#ECHEC") {
    
                    this.setState({
                        statutAjtCadeaux: '7'
                    })
    
                }
    
    
        
    
            })
            .catch(err => console.error(err)) 

        }



    }

    desactiveCadeaux(idcadeaux)
    {

        if(idcadeaux === '0')
        {

                this.setState({

                    statutAjtCadeaux: '10'

                })


        }
        else
        {

            fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=desactivePrestation&id=' + idcadeaux
            + '&apikey=' + this.props.apikey)
            .then((response) => response.json())
            .then((response) => {
    
                console.log(response)
    
                if(response === "#DISABLEGIFT#SUCCESS")
                {
    
                    this.setState({
                        statutAjtCadeaux: '4'
                    })
    
                    setTimeout(() => window.location.href = "/prestations",1000)
    
                }
                else if (response === "#DISABLEGIFT#ECHEC") {
    
                    this.setState({
                        statutAjtCadeaux: '5'
                    })
    
                }
    
    
        
    
            })
            .catch(err => console.error(err)) 

        }



    }

    suppressionCadeaux(idcadeaux)
    {

        if(idcadeaux === "0")
        {

            this.setState({

                statutAjtCadeaux: '10'

            })

        }
        else
        {

            fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=suppressionPrestation&id=' + idcadeaux
            + '&apikey=' + this.props.apikey)
            .then((response) => response.json())
            .then((response) => {
    
                console.log(response)
    
                if(response === "#DELETEGIFT#SUCCESS")
                {
    
                    this.setState({
                        statutAjtCadeaux: '8'
                    })
    
                    setTimeout(() => window.location.href = "/prestations",1000)
    
                }
                else if (response === "#DELETE#ECHEC") {
    
                    this.setState({
                        statutAjtCadeaux: '9'
                    })
    
                }
    
    
        
    
            })
            .catch(err => console.error(err)) 

        }

    }
    
    afficheDegroupage()
    {

        if(this.state.activeDegroupage === true)
        {

            return <button type="button" onClick={this.onOpenModalTrois} title="Voir ou dégroupage du produit" className="btn btn-dark"><i className="fas fa-unlink"></i></button>

        }
        
    }

    appelDataGroupage(idcellule, dataPrix)
    {

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=afficheListeCadeauxGroupe&id=' + this.props.idUserRecup
        + '&idprestation=' + idcellule
        + '&apikey=' + this.props.apikey)
        .then((response) => response.json())
        .then((response) => {

            if(response === "#LISTECADEAUXGRP#ECHEC")
            {

                alert("Cette prestation n'est pas groupée.")

            }
            else
            {

                    this.setState({
                        lstProduitGrp: response,
                        cellulePrixTotal: dataPrix
                    })              

            }
    

        })
        .catch(err => console.error(err))


    }

    dissolutionGroupage(idproduitdegroupage)
    {

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=dissolutionGroupage&id=' + this.props.idUserRecup
        + '&idprestation=' + idproduitdegroupage
        + '&apikey=' + this.props.apikey)
        .then((response) => response.json())
        .then((response) => {

            if(response === "#DISSOLUTION#SUCCESS")
            {

                console.log(response)
                window.location.href ='/prestations'

            }
    

        })
        .catch(err => console.error(err)) 
        
        


    }

    appelModifierPrestation()
    {
        this.onOpenModalQuatre()
    }

    modifierPrestation(idPrestation, nomPrestation)
    {

        /*console.log(Configuration.hostnameManuelServer + 'fidapi/main.php?action=modificationProduit'
        + '&idprestation=' + idPrestation
        + '&nomprestation=' + this.state.celluleNomPrestation
        + '&prixprestation=' + this.state.cellulePrixTotal)*/
        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=modificationProduit'
        + '&idprestation=' + idPrestation
        + '&nomprestation=' + nomPrestation
        + '&prixprestation=' + this.state.cellulePrixTotal
        + '&apikey=' + this.props.apikey)
        .then((response) => response.json())
        .then((response) => {

            if(response === "#MDFPRODUIT#SUCCESS")
            {

                console.log(response)
                window.location.href ='/prestations'

            }
    

        })
        .catch(err => console.error(err))   

    }

    ajoutMultiple()
    {

        var RefonteItem = {
                label: this.state.maprestationGrp,
                prix: this.state.prixGrp
            };
        ItemMultiple.push(RefonteItem)

        var totalMultiple = 0;
        for (var i in ItemMultiple){
           totalMultiple += parseFloat(ItemMultiple[i].prix);
        }

        this.setState({
            maprestationGrp: '',
            totalMultiplePrix: totalMultiple,
            prixGrp: ''
        })

        console.log(ItemMultiple)

    }

    addGroupement(idProduitPrincipal, identreprise, apikey)
    {

        ItemMultiple.map( function(value) {
                
            fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=ajoutCadeauxGroupage' 
            + '&id=' + identreprise
            + '&idprincipalproduit=' + idProduitPrincipal
            + '&prestation=' + value.label 
            + '&prix=' + value.prix
            + '&apikey=' + apikey)
            .then((response) => response.json())
            .then((response) => {
    
                if(response === "#AJTCADEAUX#SUCCESS")
                {
    
                    console.log(response)
    
                }

                setTimeout(() => window.location.href = "/prestations",1500)
    
            })
            .catch(err => console.error(err)) 

        })

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=majProduitTotal'
        + '&idprincipalproduit=' + idProduitPrincipal
        + '&sommetotal=' + this.state.totalMultiplePrix
        + '&apikey=' + this.props.apikey)
        .then((response) => response.json())
        .then((response) => {

            if(response === "#MAJPRDTOTAL#SUCCESS")
            {

                console.log(response)
                this.onCloseModalDeux()

            }
            else if (response === "#MAJPRDTOTAL#FAILED") {

                console.log(response)

            }

        })
        .catch(err => console.error(err))


    }

    handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
    }

    getSumMultiple()
    {

        var totalMultiple = 0;
        for (var i in ItemMultiple){
           totalMultiple += parseFloat(ItemMultiple[i].prix);
        }

        this.setState({
            totalMultiplePrix: totalMultiple
        })

    }

  render() {
    const { open, openDeux, openTrois, openQuatre } = this.state;
    const { selectedOption } = this.state;

    let options = this.state.options.map(function (valux) {
            return { value: valux.id, label: valux.prestation + ' - ' + valux.prix + ' € ' }
    })

    const CSSDemoStyle_Content = {
        whiteSpace: 'pre'
    };

    return (
      <div>

            <div id="wrapper">



                <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">

                    <Menu title="Gestion des prestations" />

                    <div className="container-fluid">

                    {/* DEBUT CODE */}
                    
                    <div>
                                                        
                        <div className="card card-body bg-white">

                        <div className="row">
                        
                        <div className="col-md-6">
                        
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                
                            </div>
                            <br/>
                        
                        </div>
                        <div className="col-md-6">
                        
                        <button type="submit" onClick={this.onOpenModal} className="btn btn-dark btn-block"><i className="fas fa-exchange-alt"></i> Prestation simple</button> 
                        <button type="submit" onClick={this.onOpenModalDeux} className="btn btn-dark btn-block"><i className="fas fa-exchange-alt"></i> Prestations multiples</button>
                        
                    </div>

                        
                    
                    </div>

                    </div>

                        <br/>

                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Prestations actives</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Prestations inactives</a>
                            </li>
                        </ul>

                        {this.afficheStatutCadeaux()} 

                        <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        

                        <MaterialTable
                            columns={[
                            { title: 'Identifiant', field: 'id' },
                            { title: 'Prestation', field: 'prestation' },
                            { title: 'Prix', field: 'prix' },
                            { title: 'Prestation multiples', field: 'prdtgrp' },
                            ]}
                            data={ this.state.cadeaux.map( function(value) {
                        
                                if(value.prdtgrp === "0")
                                {

                                    var afficheProduitGrouper = ""

                                }
                                else if(value.prdtgrp === "1")
                                {

                                    var afficheProduitGrouper = "Produit groupé"

                                }

                                var addDataItems = { 
                                    id: value.id,
                                    prestation: value.prestation,
                                    prix: value.prix + ' €',
                                    prdtgrp: afficheProduitGrouper
                                }
                                
                                return addDataItems;


                            }) }
                            title="Prestations actives"
                            actions={[
                                {
                                  icon: 'file_copy',
                                  tooltip: 'Consultation du groupage de produits',
                                  onClick: (event, rowData) => {
                                    if(rowData.prdtgrp === "Produit groupé")
                                    {

                                        this.appelDataGroupage(rowData.id, rowData.prix)
                                        this.onOpenModalTrois()
                                        this.setState({ celluleDesactivation: rowData.id });

                                    }
                                    //alert('You clicked user ' + rowData.prdtgrp)
                                  },
                                  iconProps: {
                                    style: {
                                      fontSize: 30,
                                      color: 'green',
                                    },
                                  },
                                },
                                {
                                    icon: 'edit',
                                    tooltip: 'Edition du produit',
                                    onClick: (event, rowData) => {
                                        var prixe = rowData.prix.split(" ")
                                        console.log(prixe[0])
                                        this.setState({celluleNomPrestation: rowData.prestation, celluleGrp: rowData.prdtgrp, celluleDesactivation: rowData.id, cellulePrixTotal: prixe[0]})
                                        this.appelModifierPrestation()
                                    },
                                    iconProps: {
                                        style: {
                                          fontSize: 30,
                                          color: 'green',
                                        },
                                      },
                                },
                                {
                                    icon: 'clear',
                                    tooltip: 'Désactivation du produit',
                                    onClick: (event, rowData) => {
                                        this.desactiveCadeaux(rowData.id)
                                    },
                                    iconProps: {
                                        style: {
                                          fontSize: 30,
                                          color: 'orange',
                                        },
                                      },
                                },
                              ]}
                              options={{
                                actionsColumnIndex: -1,
                              }}
                        />
                        
                        
                        </div>
                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        
                        <MaterialTable
                            columns={[
                            { title: 'Identifiant', field: 'id' },
                            { title: 'Prestation', field: 'prestation' },
                            { title: 'Prix', field: 'prix' },
                            ]}
                            data={ this.state.cadeauxInactive.map( function(value) {
        
                                var addDataItems = { 
                                id: value.id,
                                prestation: value.prestation, 
                                prix: value.prix + ' €'
                                                    }
                                return addDataItems;
                            }) }

                            title="Prestations inactives"
                            actions={[
                                {
                                    icon: 'check',
                                    tooltip: 'Activation du produit',
                                    onClick: (event, rowData) => {
                                        this.activeCadeaux(rowData.id)
                                    },
                                    iconProps: {
                                        style: {
                                          fontSize: 30,
                                          color: 'green',
                                        },
                                      },
                                },
                                {
                                    icon: 'clear',
                                    tooltip: 'Suppression du produit',
                                    onClick: (event, rowData) => {
                                        this.suppressionCadeaux(rowData.id)
                                    },
                                    iconProps: {
                                        style: {
                                          fontSize: 30,
                                          color: 'red',
                                        },
                                      },
                                }
                            ]}
                            options={{
                               actionsColumnIndex: -1,
                            }}
                        />

                            {/*this.afficheListePrestationInactive()*/}
                        
                        </div>
                    </div>

                    </div>

                    {/* FIN CODE */}

                    <Modal open={open} onClose={this.onCloseModal} center>
                        <h2>Prestation simple</h2>
                        <hr/>
                        <form onSubmit={this.ajoutPrestation.bind(this)}>
                        <div className="form-inline">
                        <div className="form-group mb-2">
                            <label className="sr-only">Email</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Ma prestation" 
                                value={this.state.maprestation}
                                onChange={e => this.setState({maprestation: e.target.value})}
                            
                            />                        </div>
                        <div className="form-group mx-sm-3 mb-2">
                            <label className="sr-only">Password</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                placeholder="Prix" 
                                value={this.state.prix}
                                onChange={e => this.setState({prix: e.target.value})}
                            
                            />                        </div>
                            <button type="submit" className="btn btn-primary">Ajouter</button>
                        </div>
                        </form>
                    </Modal>

                    <Modal open={openDeux} onClose={this.onCloseModalDeux} center>
                        <h2>Prestations multiples</h2>
                        <hr/>
                        <label>Prestation global</label>
                        <Select
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={options}
                        /> 
                        <hr />
                        <p>Vous pouvez additionnez autant de prestation que vous voulez afin de créer une prestation groupée.</p>

                        <div className="row">
                        
                            <div className="col-md-11">

                            <div className="form-inline">
                                <div className="form-group mb-4">
                                    <label className="sr-only">Email</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Ma prestation" 
                                        value={this.state.maprestationGrp}
                                        onChange={e => this.setState({maprestationGrp: e.target.value})}
                                    
                                    />                        
                                </div>
                                <div className="form-group mx-sm-3 mb-4">
                                    <label className="sr-only">Password</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        placeholder="Prix" 
                                        value={this.state.prixGrp}
                                        onChange={e => this.setState({prixGrp: e.target.value})}
                                    />                        
                                </div>
                             </div>
                            
                            </div>
                            <div className="col-md-1">
                            
                                <button type="button" onClick={this.ajoutMultiple.bind(this)} className="btn btn-dark"><i className="fas fa-plus-circle"></i></button>
                            
                            </div>
                        
                        </div>
                        <hr/>
                        <p style={CSSDemoStyle_Content}>
                            {ItemMultiple.map( function(value) {
                
                                return `- ${value.label} : ${value.prix}\n`

                            })}
                        </p>
                        <p className="text-right">Nouvelle valeur total : {this.state.totalMultiplePrix} €</p>
                        <hr/>
                        <button type="button" align="center" onClick={() => this.addGroupement(this.state.selectedOption.value, this.props.idUserRecup, this.props.apikey)} className="btn btn-success">Création du groupement de produit</button>
                    </Modal>

                    <Modal open={openTrois} onClose={this.onCloseModalTrois} center>
                        <h2>Fiche prestation multiple</h2>
                        <hr/>
                        <p style={CSSDemoStyle_Content}>
                        {this.state.lstProduitGrp.map( function(value) {
                            
                            return `- ${value.prestation} : ${value.prix} €\n`

                        })}
                        </p>
                        <p className="text-right">Valeur total de la prestation : {this.state.cellulePrixTotal}</p>
                        <hr/>
                        <button type="button" onClick={() => this.dissolutionGroupage(this.state.celluleDesactivation)} className="btn btn-danger">Dissolution du groupage.</button>
                    </Modal>

                    <Modal open={openQuatre} onClose={this.onCloseModalQuatre} center>
                        <h2>Modifier votre prestation</h2>
                        <hr/>
                        <div className="form-inline">
                        <div className="form-group mb-2">
                            <label className="sr-only">Email</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Ma prestation" 
                                value={this.state.celluleNomPrestation}
                                onChange={e => this.setState({celluleNomPrestation: e.target.value})}
                            
                            />                        
                        </div>
                        {this.state.celluleGrp === '' &&
                        
                            <div className="form-group mx-sm-3 mb-2">
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    placeholder="Prix" 
                                    value={this.state.cellulePrixTotal}
                                    onChange={e => this.setState({cellulePrixTotal: e.target.value})}
                                />                        
                            </div>   

                        }
                        {this.state.celluleGrp === 'Produit groupé' &&
                        
                        <div className="form-group mx-sm-3 mb-2">
                            <input 
                                type="number" 
                                className="form-control" 
                                placeholder="Prix" 
                                value={this.state.cellulePrixTotal}
                                onChange={e => this.setState({cellulePrixTotal: e.target.value})}
                                disabled
                            />                        
                        </div>   

                    }

                            <button type="submit" onClick={() => this.modifierPrestation(this.state.celluleDesactivation, this.state.celluleNomPrestation)} className="btn btn-primary">Modifier la prestation</button>
                        </div>
                    </Modal>

                    </div>

                </div>

                <Footer />

                </div>

            </div>

      </div>
    );
  }
}

export default Prestations;
