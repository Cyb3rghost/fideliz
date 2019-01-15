import React, { Component } from 'react';
import Menu from './menu'


import logimg from '../images/log.png'
import Footer from './footer'

class Log extends Component {



    render() {
      return (
        <div>
          
        <Menu />

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
        
            <Footer />
          
        </div>
      );
    }
  }

export default Log;