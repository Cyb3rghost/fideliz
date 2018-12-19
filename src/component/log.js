import React, { Component } from 'react';
import Menu from './menu'


import logimg from '../images/log.png'


class Log extends Component {



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
                <h2><img src={logimg} width="70" height="70" alt="Responsive image"/> LOG</h2>
            </div>
        
        </div>         

        
        <table class="table table-striped">
                        <thead>
                        <tr>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>19/12/2018 - 09:07</td>
                            <td>LEVENEUR</td>
                            <td>Ludovic</td>
                            <td>Carte : #CF0001</td>
                        </tr>
                        <tr>
                            <td>19/12/2018 - 09:07</td>
                            <td>LEVENEUR</td>
                            <td>Ludovic</td>
                            <td>Carte : #CF0001</td>
                        </tr>
                        <tr>
                            <td>19/12/2018 - 09:07</td>
                            <td>LEVENEUR</td>
                            <td>Ludovic</td>
                            <td>Carte : #CF0001</td>
                        </tr>
                        <tr>
                            <td>19/12/2018 - 09:07</td>
                            <td>LEVENEUR</td>
                            <td>Ludovic</td>
                            <td>Carte : #CF0001</td>
                        </tr>
                        <tr>
                            <td>19/12/2018 - 09:07</td>
                            <td>LEVENEUR</td>
                            <td>Ludovic</td>
                            <td>Carte : #CF0001</td>
                        </tr>
                        <tr>
                            <td>19/12/2018 - 09:07</td>
                            <td>LEVENEUR</td>
                            <td>Ludovic</td>
                            <td>Carte : #CF0001</td>
                        </tr>




                        </tbody>
            </table>        
        

          
        </div>
      );
    }
  }

export default Log;