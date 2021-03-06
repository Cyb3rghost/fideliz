import React, { Component } from 'react';
import Configuration from './fidconfig'

import Footer from './footer'
import Menu from './menu'
import Loader from 'react-loader-spinner'


class Dashboard extends Component {

    constructor(props)
    {

        super(props)
        this.state = {
            totalClient: '',
            nbClient: '',
            limitClient: '',
            nbPointage: '',
            limitPointage: '',
            typeCompte: '',
            debutAbo: '',
            finAbo: '', 
            jRestants: '',
            totalGainsClient: '',
            scoreTotal: '',
            notationTotal: '',
            configuration: '',
            checkMaj: '0'

        }

    }

    componentDidMount()
    {

            var apiRequest1 = fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=datadashboard&id=' + this.props.idUserRecup
            + '&apikey=' + this.props.apikey).then(function(response){ 
                return response.json()
            });

            var apiRequest2 = fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=compteNombreClient&id=' + this.props.idUserRecup
            + '&apikey=' + this.props.apikey).then(function(response){
                        return response.json()
            });
            var apiRequest3 = fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=gainsTotalClient&ident=' + this.props.idUserRecup
            + '&apikey=' + this.props.apikey).then(function(response){
                        return response.json()
            });
            var apiRequest4 = fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=calculScoreEntreprise&identreprise=' + this.props.idUserRecup
            + '&apikey=' + this.props.apikey).then(function(response){
                return response.json()
            });

            var apiRequest5 = fetch(Configuration.hostnameManuelServer + 'fidapi/main.php?action=checkMaj&apikey=' + this.props.apikey).then(function(response){
                return response.json()
            });


            var combinedData = {"apiRequest1":{},"apiRequest2":{},"apiRequest3":{},"apiRequest4":{},"apiRequest5":{}};

            Promise.all([apiRequest1,apiRequest2, apiRequest3, apiRequest4, apiRequest5])
            .then(function(values){
                combinedData["apiRequest1"] = values[0];
                combinedData["apiRequest2"] = values[1];
                combinedData["apiRequest3"] = values[2];
                combinedData["apiRequest4"] = values[3];
                combinedData["apiRequest5"] = values[4];

                combinedData["apiRequest1"].map((value) => 
                (
                    this.setState({
                        nbClient: value.nbclient,
                        limitClient: value.limitclient,
                        nbPointage: value.nbpointage,
                        limitPointage: value.limitpointage,
                        typeCompte: value.typecompte,
                        debutAbo: value.debutabo,
                        finAbo: value.finabo, 
                        jRestants: value.jrestant,
                        configuration: value.configuration                      
                    })
                )
                )

                if(combinedData["apiRequest3"] === null)
                {

                    this.setState({
                        totalClient: combinedData["apiRequest2"],  
                        totalGainsClient: '0'            
                    })

                }
                else
                {

                    this.setState({
                        totalClient: combinedData["apiRequest2"],  
                        totalGainsClient: combinedData["apiRequest3"]            
                    })

                }



                combinedData["apiRequest4"].map((value) => 
                (
                    this.setState({
                        scoreTotal: value.score_total,
                        notationTotal: value.note_total,
                        loading: true                         
                    })
                )
                )

                if(combinedData["apiRequest5"] === "#CHECKMAJ#SUCCESS")
                {

                    this.setState({
                        checkMaj: '1'
                    })

                }

            }.bind(this));



    }

    calculScoreClassement()
    {

        if(this.state.scoreTotal === null && this.state.notationTotal === null)
        {

            return '0 / 10'

        }
        else
        {

            var obtenirScore = this.state.scoreTotal / this.state.notationTotal * 10
            return obtenirScore.toFixed(1) + ' / 10'

        }

    }

  render() {
    /*var LineChart = require("react-chartjs").Line;
    var DoughnutChart = require("react-chartjs").Doughnut;
    var chartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };
    var chartOptions = {

        ///Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines : true,
    
        //String - Colour of the grid lines
        scaleGridLineColor : "rgba(0,0,0,.05)",
    
        //Number - Width of the grid lines
        scaleGridLineWidth : 1,
    
        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,
    
        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,
    
        //Boolean - Whether the line is curved between points
        bezierCurve : true,
    
        //Number - Tension of the bezier curve between points
        bezierCurveTension : 0.4,
    
        //Boolean - Whether to show a dot for each point
        pointDot : true,
    
        //Number - Radius of each point dot in pixels
        pointDotRadius : 4,
    
        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth : 1,
    
        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius : 20,
    
        //Boolean - Whether to show a stroke for datasets
        datasetStroke : true,
    
        //Number - Pixel width of dataset stroke
        datasetStrokeWidth : 2,
    
        responsive : true

    }

    var chartDataDougnhut = [
        {
            value: 300,
            color:"#F7464A",
            highlight: "#FF5A5E",
            label: "Red"
        },
        {
            value: 50,
            color: "#46BFBD",
            highlight: "#5AD3D1",
            label: "Green"
        },
        {
            value: 100,
            color: "#FDB45C",
            highlight: "#FFC870",
            label: "Yellow"
        }
    ]

    var chartOptionsDougnhut = {
        //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke : true,
    
        //String - The colour of each segment stroke
        segmentStrokeColor : "#fff",
    
        //Number - The width of each segment stroke
        segmentStrokeWidth : 2,
    
        //Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout : 50, // This is 0 for Pie charts
    
        //Number - Amount of animation steps
        animationSteps : 100,
    
        //String - Animation easing effect
        animationEasing : "easeOutBounce",
    
        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate : true,
    
        responsive: true

    }*/

    let loadingdata;
    if(this.state.loading)
    {

        loadingdata = <div>
                    
                        <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-8">
                            
                            
                            </div>
                            <div className="col-md-4">
                            
                                <a href="/productivite" className="btn btn-sm btn-primary btn-block"><i className="fas fa-briefcase"></i> Mode fidélité</a>
                            
                            </div>
                        </div>

                        <br/>           

                        <div className="row">

                            <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">CLIENTS</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.totalClient}</div>
                                    </div>
                                    <div className="col-auto">
                                    <i className="fas fa-user fa-2x text-black-300"></i>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>

                            <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">LIMITATION CLIENTS</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.limitClient}</div>
                                    </div>
                                    <div className="col-auto">
                                    <i className="fas fa-users fa-2x text-black"></i>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>  

                            <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Pointage total reçu</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.nbPointage}</div>
                                    </div>
                                    <div className="col-auto">
                                    <i className="fas fa-hand-pointer fa-2x"></i>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>  

                            <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Limitation pointage</div>
                                    <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{this.state.limitPointage}</div>
                                    </div>
                                    <div className="col-auto">
                                    <i className="fas fa-hand-pointer fa-2x text-black-300"></i>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>


                        </div>

                        <div className="row">
                        
                        
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-success shadow h-100 py-2">
                                <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">DEBUT ABONNEMENT</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.debutAbo}</div>
                                    </div>
                                    <div className="col-auto">
                                    <i className="fas fa-calendar fa-2x text-black-300"></i>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>

                            <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-info shadow h-100 py-2">
                                <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">FIN ABONNEMENT</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.finAbo}</div>
                                    </div>
                                    <div className="col-auto">
                                    <i className="fas fa-calendar fa-2x text-black-300"></i>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>

                            <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-warning shadow h-100 py-2">
                                <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Type de compte</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                    {this.state.typeCompte === '0' && 'Normal'}
                                    {this.state.typeCompte === '1' && 'Essaie'}
                                    {this.state.typeCompte === '2' && 'Bronze'}
                                    {this.state.typeCompte === '3' && 'Argent'}
                                    {this.state.typeCompte === '4' && 'Or'}
                                    </div>
                                    </div>
                                    <div className="col-auto">
                                    <i className="fab fa-typo3 fa-2x text-black-300"></i>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        
                            <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">JOURS RESTANTS</div>
                                    <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{this.state.jRestants}</div>
                                    </div>
                                    <div className="col-auto">
                                    <i className="fas fa-calendar fa-2x text-black-300"></i>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>                        
                        
                        
                        
                        </div>

                        <div className="row">


                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Gains sur totalité clientèle</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.totalGainsClient} €</div>
                                    </div>
                                    <div className="col-auto">
                                    <i className="fas fa-hand-holding-usd fa-2x"></i>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>  

                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Score</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{this.calculScoreClassement()}</div>
                                    </div>
                                    <div className="col-auto">
                                    <i className="fas fa-star fa-2x"></i>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div> 

                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-warning shadow h-100 py-2">
                                <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                    <a href={this.props.urlmaj} target="_blank">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Centre de mise à jour</div>
                                    <div className="mb-0 font-weight-bold text-gray-800"><small>{this.state.checkMaj === "1" && <span className="badge badge-danger">Nouveau</span> } Version : {this.props.version} </small></div>
                                    </a>
                                    </div>
                                    <div className="col-auto">
                                    <i className="fas fa-cloud-upload-alt fa-2x"></i>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        


                        </div>

                    </div>
                    </div>
    }
    else
    {

        loadingdata =  <div className="styleLoader"><center><Loader 
                        type="Triangle"
                        color="#00BFFF"
                        height="100"	
                        width="100"
                    /> </center></div>

    }


    return (
        <div>
            
             <div id="wrapper">
  
                      <div id="content-wrapper" className="d-flex flex-column">
  
                      <div id="content">
  
                           <Menu title="Dashboard" />
  
                          {loadingdata}
  
                      </div>
  
                      <Footer />
  
                      </div>
  
                  </div>
  
                  <a className="scroll-to-top rounded" href="#page-top">
                      <i className="fas fa-angle-up"></i>
                  </a>
  
        </div>
      );
    }
  }
  
  export default Dashboard;
  