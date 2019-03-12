import React, { Component } from 'react';
import { BrowserRouter as Redirect} from "react-router-dom";
import Configuration from './fidconfig'

import Navbarup from './navbarup'
import Menu from './menu'

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Modal from 'react-responsive-modal';
import Select from 'react-select';

var ItemMultiple = [

];

const { SearchBar } = Search;
const columns = [{
    dataField: 'id',
    text: 'Identifiant',
    sort: true
  }, {
    dataField: 'prestation',
    text: 'Prestation',
  },{
    dataField: 'prix',
    text: 'Prix',
  },{
    dataField: 'multiple',
    text: 'Prestation multiples',
    events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {

          fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=afficheListeCadeauxGroupe&id=' + row.identreprise 
          + '&idprestation=' + row.id)
          .then((response) => response.json())
          .then((response) => {
  
              if(response === "#LISTECADEAUXGRP#ECHEC")
              {
  
                  alert("Cette prestation n'est pas groupée.")
  
              }
              else
              {

                var testInfo = response.map( function(value) {
            
                        return '- ' + value.prestation + ' : ' + value.prix + ' €\n' 

                })

                alert("La produit [" + row.prestation + "] regroupe : \n" +
                testInfo + '\n'
                + 'Valeur total : ' + row.prix )
                

              }
      
  
          })
          .catch(err => console.error(err))

        },
      }
  }];


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
            open: false,
            openDeux: false,
            selectedOption: null,
            totalMultiplePrix: '',
            options: []
            
        }


    }

    componentDidMount()
    {

        var apiRequest1 = fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=afficheListeCadeaux&id=' + this.props.idUserRecup).then(function(response){ 
            return response.json()
          });
    
        var apiRequest2 = fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=afficheListeCadeauxInactive&id=' + this.props.idUserRecup).then(function(response){
                    return response.json()
        });

        var apiRequest3 = fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=selectionPrestation&identreprise=' + this.props.idUserRecup).then(function(response){
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

    ajoutPrestation()
    {

        alert('Prestation : ' + this.state.maprestation + '\nPrix : ' + this.state.prix)

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=ajoutCadeaux&id=' + this.props.idUserRecup + '&prestation=' + this.state.maprestation + '&prix=' + this.state.prix)
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

            fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=activePrestation&id=' + idcadeaux)
            .then((response) => response.json())
            .then((response) => {
    
                console.log(response)
    
                if(response === "#ENABLEGIFT#SUCCESS")
                {
    
                    this.setState({
                        statutAjtCadeaux: '6'
                    })
    
                    setTimeout(() => window.location.href = "/gestioncompte",1000)
    
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

            fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=desactivePrestation&id=' + idcadeaux)
            .then((response) => response.json())
            .then((response) => {
    
                console.log(response)
    
                if(response === "#DISABLEGIFT#SUCCESS")
                {
    
                    this.setState({
                        statutAjtCadeaux: '4'
                    })
    
                    setTimeout(() => window.location.href = "/gestioncompte",1000)
    
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

            fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=suppressionPrestation&id=' + idcadeaux)
            .then((response) => response.json())
            .then((response) => {
    
                console.log(response)
    
                if(response === "#DELETEGIFT#SUCCESS")
                {
    
                    this.setState({
                        statutAjtCadeaux: '8'
                    })
    
                    setTimeout(() => window.location.href = "/gestioncompte",1000)
    
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


            
            return <ToolkitProvider
                keyField="id"
                data={ this.state.cadeaux.map( function(value) {
            
                    if(value.prdtgrp === '1')
                    {

                        var afficheMultiple = <i title="Voir les sous-produits" className="fas fa-copy"></i>

                    }
                    else if(value.prdtgrp === '0')
                    {

                        var afficheMultiple = ''

                    }

                    if(value.idprestation === '0')
                    {

                            var addDataItems = { 
                            id: value.id,
                            identreprise: value.identreprise,
                            prestation: value.prestation, 
                            prix: value.prix + ' €',
                            multiple: afficheMultiple
                                                }
                            return addDataItems;

                    }

                    
                    /*if(value.id = value.idprestation)
                    {

                        var addDataItemsDeux = { 
                            id: '',
                            prestation: value.prestation, 
                            prix: value.prix + ' €'
                                                }
                            return addDataItemsDeux;

                    }*/

                }) }
                columns={ columns }
                search
                >
                {
                    props => (
                    <div>
                        <div className="row">
                        
                            <div className="col-md-1">
                            
                                <button type="button" onClick={() => this.desactiveCadeaux(this.state.celluleDesactivation)} title="Désactivation du produit" className="btn btn-dark"><i className="fas fa-times"></i></button>

                            </div>
                            <div className="col-md-11">
                            
                                    <SearchBar { ...props.searchProps } />
                            
                            </div>
                        
                        </div>

                        
                        <hr />
                        <div className="bg-white">
                            <BootstrapTable 
                                { ...props.baseProps }
                                ref={ n => this.node = n }
                                filter={ filterFactory() }
                                pagination={ paginationFactory() }
                                selectRow={ {   mode: 'checkbox',
                                clickToSelect: true,
                                onSelect: (row) => {
                                  console.log(row.id);
                                  this.setState({
                                      celluleDesactivation: row.id
                                  })
                                  /*console.log(isSelect);
                                  console.log(rowIndex);
                                  console.log(e);*/
                                },
                                onSelectAll: (isSelect, rows, e) => {
                                  console.log(isSelect);
                                  console.log(rows);
                                  console.log(e);
                                }} }
                                
                                striped
                                hover
                                condensed
                            />
                        </div>
                    </div>
                    )
                }
            </ToolkitProvider>
            

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
            
            return <ToolkitProvider
            keyField="id"
            data={ this.state.cadeauxInactive.map( function(value) {
        
                var addDataItems = { 
                id: value.id,
                prestation: value.prestation, 
                prix: value.prix + ' €'
                                    }
                return addDataItems;
            }) }
            columns={ columns }
            search
            >
            {
                props => (
                <div>
                    <div className="row">
                    
                        <div className="col-md-1">
                        
                            <button type="button" onClick={() => this.activeCadeaux(this.state.celluleDesactivation)} title="Activation du produit" className="btn btn-dark"><i className="fas fa-check"></i></button>

                        </div>
                        <div className="col-md-1">
                        
                            <button type="button" onClick={() => this.suppressionCadeaux(this.state.celluleDesactivation)} title="Suppression du produit" className="btn btn-dark"><i className="fas fa-trash-alt"></i></button>
                        
                        </div>
                        <div className="col-md-10">
                        
                                <SearchBar { ...props.searchProps } />
                        
                        </div>
                    
                    </div>

                    
                    <hr />
                    <div className="bg-white">
                        <BootstrapTable 
                            { ...props.baseProps }
                            ref={ n => this.node = n }
                            filter={ filterFactory() }
                            pagination={ paginationFactory() }
                            selectRow={ {   mode: 'checkbox',
                            clickToSelect: true,
                            onSelect: (row) => {
                              console.log(row.id);
                              this.setState({
                                  celluleDesactivation: row.id
                              })
                              /*console.log(isSelect);
                              console.log(rowIndex);
                              console.log(e);*/
                            },
                            onSelectAll: (isSelect, rows, e) => {
                              console.log(isSelect);
                              console.log(rows);
                              console.log(e);
                            }} }
                            striped
                            hover
                            condensed
                        />
                    </div>
                </div>
                )
            }
        </ToolkitProvider>        
            

        }



        
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

    addGroupement(idProduitPrincipal, identreprise)
    {

        ItemMultiple.map( function(value) {
                
            fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=ajoutCadeauxGroupage' 
            + '&id=' + identreprise
            + '&idprincipalproduit=' + idProduitPrincipal
            + '&prestation=' + value.label 
            + '&prix=' + value.prix)
            .then((response) => response.json())
            .then((response) => {
    
                if(response === "#AJTCADEAUX#SUCCESS")
                {
    
                    console.log(response)
    
                }
    
            })
            .catch(err => console.error(err)) 

        })

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=majProduitTotal'
        + '&idprincipalproduit=' + idProduitPrincipal
        + '&sommetotal=' + this.state.totalMultiplePrix)
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

        return totalMultiple;

        this.setState({
            totalMultiplePrix: totalMultiple
        })

    }

  render() {
    const { open, openDeux } = this.state;
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

                <Menu />

                <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">

                    <Navbarup idEntreprise={this.props.idUserRecup} />

                    <div className="container-fluid">

                    {/* DEBUT CODE */}
                    
                    <div>
                                                        
                        <div class="card card-body bg-white">

                        <div className="row">
                        
                        <div className="col-md-6">
                        
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Gestion des prestations</h1>
                            </div>
                            <br/>
                        
                        </div>
                        <div className="col-md-6">
                        
                        <button type="submit" onClick={this.onOpenModal} className="btn btn-primary btn-block"><i class="fas fa-exchange-alt"></i> Prestation simple</button> 
                        <button type="submit" onClick={this.onOpenModalDeux} className="btn btn-primary btn-block"><i class="fas fa-exchange-alt"></i> Prestations multiples</button>
                        
                    </div>

                        
                    
                    </div>

                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Prestations actives</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Prestations inactives</a>
                        </li>
                        </ul>

                    </div>

                        <br/>
                        {this.afficheStatutCadeaux()} 
                        <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        

                            {this.afficheListePrestation()}
                        
                        
                        </div>
                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        

                            {this.afficheListePrestationInactive()}
                        
                        </div>
                    </div>

                    </div>

                    {/* FIN CODE */}

                    <Modal open={open} onClose={this.onCloseModal} center>
                        <h2>Prestation simple</h2>
                        <hr/>
                        <div class="form-inline">
                        <div class="form-group mb-2">
                            <label for="staticEmail2" class="sr-only">Email</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Ma prestation" 
                                value={this.state.maprestation}
                                onChange={e => this.setState({maprestation: e.target.value})}
                            
                            />                        </div>
                        <div class="form-group mx-sm-3 mb-2">
                            <label for="inputPassword2" class="sr-only">Password</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                placeholder="Prix" 
                                value={this.state.prix}
                                onChange={e => this.setState({prix: e.target.value})}
                            
                            />                        </div>
                            <button type="submit" onClick={this.ajoutPrestation.bind(this)} class="btn btn-primary">Ajouter</button>
                        </div>
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
                                    <label for="staticEmail2" className="sr-only">Email</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Ma prestation" 
                                        value={this.state.maprestationGrp}
                                        onChange={e => this.setState({maprestationGrp: e.target.value})}
                                    
                                    />                        
                                </div>
                                <div className="form-group mx-sm-3 mb-4">
                                    <label for="inputPassword2" className="sr-only">Password</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        placeholder="Prix" 
                                        value={this.state.prixGrp}
                                        onChange={e => this.setState({prixGrp: e.target.value})}
                                    />                        
                                </div>
                             </div>

                            {/*<Select
                                value={selectedOptionDeux}
                                onChange={this.handleChangeDeux}
                                options={options}
                            /> */}
                            
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
                        <button type="button" align="center" onClick={() => this.addGroupement(this.state.selectedOption.value, this.props.idUserRecup)} className="btn btn-success">Création du groupement de produit</button>
                    </Modal>

                    </div>

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

      </div>
    );
  }
}

export default Prestations;
