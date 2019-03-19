import React, { Component } from 'react';
import Menu from './menu'
import Configuration from './fidconfig'
import Select from 'react-select';

class Productivite extends Component {

    constructor(props)
    {

        super(props)
        this.state = {
            qrcode: '',
            selectedOption: null,
            afflisteCadeaux: [],
            prestation: 'Null',
            prix: '0 €'

        }

    }

    componentDidMount()
    {

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=datadashboard&id=' + this.props.idUserRecup)
        .then((response) => response.json())
        .then((response) => {

            {response.map((value) => 
            (
                this.setState({
                    qrcode: value.qrcode                  
                })
            )
            )}
    

        })
        .catch(err => console.error(err))

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=afficheListeCadeaux&id=' + this.props.idUserRecup)
        .then((response) => response.json())
        .then((response) => {

            this.setState({
                afflisteCadeaux: response
            })
    

        })
        .catch(err => console.error(err))

    }

    handleChange = (selectedOption) => {

        var separePrestation = selectedOption.label.split(' - ')

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=updatePrestationEntreprise'
        + '&identreprise=' + this.props.idUserRecup
        + '&prestation=' + separePrestation[0]
        + '&prix=' + separePrestation[1].substring(0, separePrestation[1].length-1))
        .then((response) => response.json())
        .then((response) => {

            if(response === "#UPENTPRESTA#SUCCESS")
            {

                console.log(response)
                this.setState({ selectedOption, prestation: separePrestation[0], prix: separePrestation[1] });
                console.log(`Option selected:`, selectedOption);

            }
            else if(response === "#UPENTPRESTA#FAILED")
            {

                console.log(response)
                this.setState({ selectedOption, prestation: separePrestation[0], prix: separePrestation[1] });
                console.log(`Option selected:`, selectedOption);

            }

        })
        .catch(err => console.error(err))



    }

    resetPointage()
    {

        fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=resetPointage'
        + '&identreprise=' + this.props.idUserRecup)
        .then((response) => response.json())
        .then((response) => {

            if(response === "#RESETPRESTA#SUCCESS")
            {

                console.log(response)
                this.setState({ selectedOption: null, prestation: 'Null', prix: '0 €' });

            }
            else if(response === "#RESETPRESTA#FAILED")
            {

                console.log(response)
                this.setState({ selectedOption: null, prestation: 'Null', prix: '0 €' });

            }

        })
        .catch(err => console.error(err))        


    }


  render() {

    var QRCode = require('qrcode.react');

    const { selectedOption } = this.state;

    let options = this.state.afflisteCadeaux.map(function (valux) {
            return { value: valux.id, label: valux.prestation + ' - ' + valux.prix + '€' }
    })

    return (
        <div>
            
             <div id="wrapper">
  
                      <div id="content-wrapper" className="d-flex flex-column">
  
                      <div id="content">
  
                           <Menu title="Mode productivité" />

                            <div className="container">
                            
                                <div className="row">
                                    
                                    <div className="col-md-6">
                                    
                                        <center><QRCode
                                            value={this.state.qrcode}
                                            size={250}
                                            className="img-responsive"
                                        />
                                        <br/>
                                        <b>Prestation :</b> {this.state.prestation} - {this.state.prix}</center>
                                        <br/>
                                        
                                    
                                    </div>
                                    <div className="col-md-6">
                                    
                                        <div className="panelCarte">
                                            <div id="personalizecarte">  
                                                <img src={Configuration.hostnameManuelServer + 'fidapi/img/carddefault.jpg'} className="img-fluid" id="img1" alt="" />
                                                <img src={Configuration.hostnameManuelServer + 'fidapi/img/logodefault.png'}  className="img-fluid" id="img2" alt="" /> 
                                            
                                            </div>  

                                        </div>
                                    </div>
                                
                                </div>

                                <div className="cadrePointage">
                                
                                    <div className="row">
                                    
                                        <div className="col-11">
                                        
                                            <Select
                                                style={{ width: 300 }}
                                                value={selectedOption}
                                                onChange={this.handleChange}
                                                options={options}
                                            />                                        
                                        
                                        </div>
                                        <div className="col-1">
                                        
                                            <button type="button" title="Aucune prestation" onClick={this.resetPointage.bind(this)} className="btn btn-dark"><i className="fas fa-times-circle"></i></button>
                                        
                                        </div>
                                    
                                    
                                    </div>

 
                                
                                
                                </div>

                                <div className="cadrePointage">
                                
                                    <div className="row">
                                    
                                        <div className="col-6">
                                        
                                            <b>Ludovic LEVENEUR</b><br/>
                                            <small>Prestation qslkjqdlqjksd lqskjdqslkdj</small>
                                            
                                        
                                        </div>
                                        <div className="col-6 text-right">
                                        
                                            <span className="badge badge-dark">30,50 €</span><br/>
                                            <small>18/03/2019 - 11H58</small>

                                        </div>
                                    
                                    </div>
                                </div>
                                <div className="cadrePointage">
                                
                                    <div className="row">
                                    
                                        <div className="col-6">
                                        
                                            <b>Ludovic LEVENEUR</b><br/>
                                            <small>Prestation qslkjqdlqjksd lqskjdqslkdj</small>
                                            
                                        
                                        </div>
                                        <div className="col-6 text-right">
                                        
                                            <span className="badge badge-dark">30,50 €</span><br/>
                                            <small>18/03/2019 - 11H58</small>

                                        </div>
                                    
                                    </div>
                                </div>
                                <div className="cadrePointage">
                                
                                    <div className="row">
                                    
                                        <div className="col-6">
                                        
                                            <b>Ludovic LEVENEUR</b><br/>
                                            <small>Prestation qslkjqdlqjksd lqskjdqslkdj</small>
                                            
                                        
                                        </div>
                                        <div className="col-6 text-right">
                                        
                                            <span className="badge badge-dark">30,50 €</span><br/>
                                            <small>18/03/2019 - 11H58</small>

                                        </div>
                                    
                                    </div>
                                </div>
                                <div className="cadrePointage">
                                
                                    <div className="row">
                                    
                                        <div className="col-6">
                                        
                                            <b>Ludovic LEVENEUR</b><br/>
                                            <small>Prestation qslkjqdlqjksd lqskjdqslkdj</small>
                                            
                                        
                                        </div>
                                        <div className="col-6 text-right">
                                        
                                            <span className="badge badge-dark">30,50 €</span><br/>
                                            <small>18/03/2019 - 11H58</small>

                                        </div>
                                    
                                    </div>
                                </div>
                                <div className="cadrePointage">
                                
                                    <div className="row">
                                    
                                        <div className="col-6">
                                        
                                            <b>Ludovic LEVENEUR</b><br/>
                                            <small>Prestation qslkjqdlqjksd lqskjdqslkdj</small>
                                            
                                        
                                        </div>
                                        <div className="col-6 text-right">
                                        
                                            <span className="badge badge-dark">30,50 €</span><br/>
                                            <small>18/03/2019 - 11H58</small>

                                        </div>
                                    
                                    </div>
                                </div>







                                <br/>
                                <br/>

                            
                            </div>


                      </div>
  
                      <footer className="sticky-footer bg-dark text-white">
                          <div className="container my-auto">
                          <div className="copyright text-center my-auto">
                              <span>Copyright &copy; Your Website 2019</span>
                          </div>
                          </div>
                      </footer>
  
                      </div>
  
                  </div>
  
                  <a className="scroll-to-top rounded" href="#page-top">
                      <i className="fas fa-angle-up"></i>
                  </a>
  
        </div>
    );
  }
}

export default Productivite;
