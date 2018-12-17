import React, { Component } from 'react';

import Menu from './menu'
import logodashboard from '../images/logodashboard.png'
import dashboard from '../images/dashboard.png'
import profil from '../images/profil.png';
import carnet from '../images/carnet.png';
import ajout from '../images/ajout.png';
import clientavatar from '../images/adduser.png';

class Client extends Component {

    renderPanelTitle()
    {

        switch (window.location.pathname) {
            case '/dashboard':
                return <h2><img src={dashboard} width="70" height="70" alt="Responsive image"/> DASHBOARD</h2>
                break;
            case '/profil':
                return <h2><img src={profil} width="70" height="70" alt="Responsive image"/> PROFIL</h2>
                break; 
            case '/client':
                return <h2><img src={carnet} width="70" height="70" alt="Responsive image"/> CARNET CLIENT</h2>
                break;      
            default:
                break;
        }

    }

    render() {
      return (
        <div>
          
          <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                    <a className="navbar-brand" href="#"><img src={logodashboard} width="200" height="35" alt="Responsive image"/></a>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                    <li className="active"><a href="#">Home</a></li>
                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" href="#">Page 1
                        <span className="caret"></span></a>
                        <ul className="dropdown-menu">
                        <li><a href="#">Page 1-1</a></li>
                        <li><a href="#">Page 1-2</a></li>
                        <li><a href="#">Page 1-3</a></li>
                        </ul>
                    </li>
                    <li><a href="#">Page 2</a></li>
                    <li><a href="#">Page 3</a></li>
                    </ul>
                </div>
            </nav> 
            <div className="panelInfo">
            
                <div className="container-perso">
                    {this.renderPanelTitle()}
                </div>
            
            </div> 
            <br/>
            <div className="container-perso">
            
                <div className="col-md-4">

                        <Menu />

                </div>
                <div className="col-md-8">
                


                    <div className="wellClient">
                        <div className="row">

                            
                            <div className="col-md-10">
                            
                                
                                Nombre de client : <p className="resizeNbClient">350</p><br/>
                                
                            
                            </div>
                            <div className="col-md-2">
                            
                                <img src={ajout} class="img-circle" width="100" height="100" alt="" /><br/>
                                <br/>                        
                            
                            </div>


                        </div>
                    </div>

                    <a href="/voirclient"><div className="wellListeClient">
                    
                        <div className="row">
            
                            <div className="col-md-2">

                                
                                <img src={clientavatar} width="100" height="100" alt="" />
                                

                            </div>
                            <div className="col-md-10">

                            <p className="resizeNbListeClient">LEVENEUR Ludovic <br/></p>
                            <small>Date inscription : 17/12/2018 </small>

                            </div>


                        </div>                        
                    
                    </div></a>
                    <div className="wellListeClient">
                    
                        <div className="row">
            
                            <div className="col-md-2">

                                
                                <img src={clientavatar} width="100" height="100" alt="" />
                                

                            </div>
                            <div className="col-md-10">

                            <p className="resizeNbListeClient">LEVENEUR Ludovic <br/></p>
                            <small>Date inscription : 17/12/2018 </small>

                            </div>


                        </div>                        
                    
                    </div>
                    <div className="wellListeClient">
                    
                        <div className="row">
            
                            <div className="col-md-2">

                                
                                <img src={clientavatar} width="100" height="100" alt="" />
                                

                            </div>
                            <div className="col-md-10">

                            <p className="resizeNbListeClient">LEVENEUR Ludovic <br/></p>
                            <small>Date inscription : 17/12/2018 </small>

                            </div>


                        </div>                        
                    
                    </div>
                    <div className="wellListeClient">
                    
                        <div className="row">
            
                            <div className="col-md-2">

                                
                                <img src={clientavatar} width="100" height="100" alt="" />
                                

                            </div>
                            <div className="col-md-10">

                            <p className="resizeNbListeClient">LEVENEUR Ludovic <br/></p>
                            <small>Date inscription : 17/12/2018 </small>

                            </div>


                        </div>                        
                    
                    </div>
                    <div className="wellListeClient">
                    
                        <div className="row">
            
                            <div className="col-md-2">

                                
                                <img src={clientavatar} width="100" height="100" alt="" />
                                

                            </div>
                            <div className="col-md-10">

                            <p className="resizeNbListeClient">LEVENEUR Ludovic <br/></p>
                            <small>Date inscription : 17/12/2018 </small>

                            </div>


                        </div>                        
                    
                    </div>











                </div>
            
            </div>
          
        </div>
      );
    }
  }

export default Client;