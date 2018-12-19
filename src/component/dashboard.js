import React, { Component } from 'react';
import Menu from './menu'


import dashboard from '../images/dashboard.png'
<<<<<<< HEAD
=======
import profil from '../images/profil.png';
import carnet from '../images/carnet.png';
<<<<<<< HEAD
import userClient from '../images/adduser.png';
=======
<<<<<<< HEAD
import userClient from '../images/adduser.png';
=======
>>>>>>> 076d363ab8c0355033b4d94e010d1061230b4e87
>>>>>>> d39c98daaa5dc7991b671a1eb014003e74515d5e
>>>>>>> 0bb363c86623f1d0824b5abfa5c3ccf8bd82450e


<<<<<<< HEAD
=======
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d39c98daaa5dc7991b671a1eb014003e74515d5e
                break;   
            case '/voirclient':
                return <h2><img src={userClient} width="70" height="70" alt="Responsive image"/> FICHE CLIENT</h2>
                break;     
            case '/nouveauclient':
                return <h2><img src={userClient} width="70" height="70" alt="Responsive image"/> NOUVEAU CLIENT</h2>
                break;                
<<<<<<< HEAD
=======
=======
                break;      
>>>>>>> 076d363ab8c0355033b4d94e010d1061230b4e87
>>>>>>> d39c98daaa5dc7991b671a1eb014003e74515d5e
            default:
                break;
        }
>>>>>>> 0bb363c86623f1d0824b5abfa5c3ccf8bd82450e

class Dashboard extends Component {


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
                <h2><img src={dashboard} width="70" height="70" alt="Responsive image"/> DASHBOARD</h2>
            </div>
        
        </div>         
        <br/>

        <div className="container-perso">
            <div className="row">
            
                <div className="col-md-4">

                    <div class="panel panel-default">
                        <div class="panel-heading">CLIENTS</div>
                        <div class="panel-body"><h1>350</h1></div>
                    </div>

                </div>
                <div className="col-md-4">
                
                    <div class="panel panel-default">
                        <div class="panel-heading">LIMITE DE CLIENTS</div>
                        <div class="panel-body"><h1>5 / 10 </h1></div>
                    </div>                
                
                
                </div>
                <div className="col-md-4">

<<<<<<< HEAD
                        <div class="panel panel-default">
                            <div class="panel-heading">LIMITE DE POINTAGES</div>
                            <div class="panel-body"><h1>10 / 15 </h1></div>
                        </div>                
                
                </div>

                <div className="col-md-4">

                    <div class="panel panel-default">
                        <div class="panel-heading">TYPE DE COMPTE</div>
                        <div class="panel-body"><h1>PREMIUM</h1></div>
=======
<<<<<<< HEAD
        <br/>

        <div className="container-perso">
            <div className="row">
            
                <div className="col-md-4">

                    <div class="panel panel-default">
                        <div class="panel-heading">CLIENTS</div>
                        <div class="panel-body"><h1>350</h1></div>
>>>>>>> 0bb363c86623f1d0824b5abfa5c3ccf8bd82450e
                    </div>

                </div>
                <div className="col-md-4">
                
                    <div class="panel panel-default">
<<<<<<< HEAD
                        <div class="panel-heading">DEBUT ABONNEMENT</div>
                        <div class="panel-body"><h1>18/12/2018 </h1></div>
=======
                        <div class="panel-heading">LIMITE DE CLIENTS</div>
                        <div class="panel-body"><h1>5 / 10 </h1></div>
>>>>>>> 0bb363c86623f1d0824b5abfa5c3ccf8bd82450e
                    </div>                
                
                
                </div>
                <div className="col-md-4">

                        <div class="panel panel-default">
<<<<<<< HEAD
                            <div class="panel-heading">FIN ABONNEMENT</div>
                            <div class="panel-body"><h1>20/12/2018 </h1></div>
                        </div>                
                
                </div>


            </div>
        </div>
=======
                            <div class="panel-heading">LIMITE DE POINTAGES</div>
                            <div class="panel-body"><h1>10 / 15 </h1></div>
                        </div>                
                
                </div>

                <div className="col-md-4">
=======

<<<<<<< HEAD
=======
                                <div class="panel panel-default">
                                    <div class="panel-heading">VOS POINTAGES</div>
                                    <div class="panel-body"><h2> 350</h2></div>
                                </div>
                               
                            
                            </div>
                            <div className="col-md-4">
                            
                                <div class="panel panel-default">
                                    <div class="panel-heading">POINTAGES CLIENTS</div>
                                    <div class="panel-body"><h2> 350</h2></div>
                                </div>                            
                            
                            </div>                        
                        
                            <div className="col-md-4">
                            

                                <div class="panel panel-default">
                                    <div class="panel-heading">TYPE DE COMPTE</div>
                                    <div class="panel-body"><h2> Standard</h2></div>
                                </div>
                            
                            
                            </div>
                            <div className="col-md-4">
                            

                                <div class="panel panel-default">
                                    <div class="panel-heading">LIMITE DE CLIENT</div>
                                    <div class="panel-body"><h2> 5 / 10</h2></div>
                                </div>
                               
                            
                            </div>
                            <div className="col-md-4">
                            
                                <div class="panel panel-default">
                                    <div class="panel-heading">LIMITE DE POINTAGE</div>
                                    <div class="panel-body"><h2> 10 / 40</h2></div>
                                </div>                            
                            
                            </div>   

                            <div className="col-md-4">
                            

                                <div class="panel panel-default">
                                    <div class="panel-heading">CARTE TOTAL DE FIDELITE</div>
                                    <div class="panel-body"><h2> 150</h2></div>
                                </div>
                            
                            
                            </div>
                            <div className="col-md-4">
                            

                                <div class="panel panel-default">
                                    <div class="panel-heading">CARTE TOTAL DE REDUCTION</div>
                                    <div class="panel-body"><h2> 55</h2></div>
                                </div>
                               
                            
                            </div>
                            <div className="col-md-4">
                            
                                <div class="panel panel-default">
                                    <div class="panel-heading"></div>
                                    <div class="panel-body"><h2></h2></div>
                                </div>                            
                            
                            </div>


                        </div>
>>>>>>> 076d363ab8c0355033b4d94e010d1061230b4e87
>>>>>>> d39c98daaa5dc7991b671a1eb014003e74515d5e

                    <div class="panel panel-default">
                        <div class="panel-heading">TYPE DE COMPTE</div>
                        <div class="panel-body"><h1>PREMIUM</h1></div>
                    </div>

<<<<<<< HEAD
                </div>
                <div className="col-md-4">
                
                    <div class="panel panel-default">
                        <div class="panel-heading">DEBUT ABONNEMENT</div>
                        <div class="panel-body"><h1>18/12/2018 </h1></div>
                    </div>                
                
                
                </div>
                <div className="col-md-4">

                        <div class="panel panel-default">
                            <div class="panel-heading">FIN ABONNEMENT</div>
                            <div class="panel-body"><h1>20/12/2018 </h1></div>
                        </div>                
                
                </div>

>>>>>>> 0bb363c86623f1d0824b5abfa5c3ccf8bd82450e

            </div>
        </div>


=======
>>>>>>> d39c98daaa5dc7991b671a1eb014003e74515d5e
          
        </div>
      );
    }
  }

export default Dashboard;