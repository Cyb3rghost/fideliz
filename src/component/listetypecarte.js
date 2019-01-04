import React, { Component } from 'react';

import Menu from './menu'

import fidelityCard from '../images/fidelitycard.png';
import loyaltyCard from '../images/loyaltycard.png';

class ListeTypeCarte extends Component {


    render() {
        var idClient = window.location.search.substring(4);
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
                  <h2><img src={fidelityCard} width="70" height="70" alt="Responsive image"/> LISTE TYPE DE CARTE</h2>
              </div>
          
          </div>         
  
          
          <div className="page-header">
              <div className="container-perso">
                    <h1>ETAPE 1 - Choix d'un type de carte <br/></h1>
                    <p className="text-justify">Un client sera automatiquement reliée à votre compte. Il disposera d'un accès à son compte client afin de pouvoir gêrer 
                    et effectuer ses pointages à chaque prestation. Il pourra également suivre l'évolution de son compte.</p>
              </div>
          </div>
          
          <br/>

          <div className="container-perso">
          <a href={'/ajoutcarte?id=' + idClient}><div className="wellAddCarte">
            
                    <div className="row">
                    
                        <div className="col-xs-10">
                        
                            <h1>CARTE DE FIDELITE</h1>
                        
                        </div>
                        <div className="col-xs-2">
                        
                            <center><img src={loyaltyCard} width="100" height="100" title="Carte de réduction" alt="Responsive image"/></center>
                        
                        </div>
                    
                    
                    </div>

            </div></a>

            <br/>

            <div className="wellAddCarte">
            
                    <div className="row">
                    
                        <div className="col-xs-10">
                        
                            <h1>CARTE DE REDUCTION</h1>
                        
                        </div>
                        <div className="col-xs-2">
                        
                            <center><img src={loyaltyCard} width="100" height="100" title="Carte de réduction" alt="Responsive image"/></center>
                        
                        </div>
                    
                    
                    </div>

            </div>

            <br/>

            <div className="wellAddCarte">
            
                    <div className="row">
                    
                        <div className="col-xs-10">
                        
                            <h1>CARTE CADEAUX</h1>
                        
                        </div>
                        <div className="col-xs-2">
                        
                            <center><img src={loyaltyCard} width="100" height="100" title="Carte de réduction" alt="Responsive image"/></center>
                        
                        </div>
                    
                    
                    </div>

            </div>


          </div>  
                         
          
            
          </div>
        );
      }
    }
  
  export default ListeTypeCarte;