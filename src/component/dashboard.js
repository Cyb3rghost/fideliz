import React, { Component } from 'react';

import Navbarup from './navbarup'
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
            apikey: '',
            totalGainsClient: '',
            loading: false,
            testing: []
        }

    }

    componentDidMount()
    {

        var apiRequest1 = fetch('http://127.0.0.1/fidapi/main.php?action=datadashboard&id=' + this.props.idUserRecup).then(function(response){ 
            return response.json()
        });
        var apiRequest2 = fetch('http://127.0.0.1/fidapi/main.php?action=compteNombreClient&id=' + this.props.idUserRecup).then(function(response){
                    return response.json()
        });
        var apiRequest3 = fetch('http://127.0.0.1/fidapi/main.php?action=gainsTotalClient&ident=' + this.props.idUserRecup).then(function(response){
                    return response.json()
        });

        var combinedData = {"apiRequest1":{},"apiRequest2":{},"apiRequest3":{}};

        Promise.all([apiRequest1,apiRequest2, apiRequest3])
        .then(function(values){
            combinedData["apiRequest1"] = values[0];
            combinedData["apiRequest2"] = values[1];
            combinedData["apiRequest3"] = values[2];
            
            {combinedData["apiRequest1"].map((value) => 
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
                    apikey: value.apikey,
                    loading: true                         
                })
            )
            )}

            this.setState({
                totalClient: combinedData["apiRequest2"],  
                totalGainsClient: combinedData["apiRequest3"]            
            })

        }.bind(this));

    }

  render() {

    var LineChart = require("react-chartjs").Line;
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

    }

    let loadingdata;
    if(this.state.loading)
    {

        loadingdata = <div><Navbarup idEntreprise={this.props.idUserRecup} />
                        <div className="container-fluid">
                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                            <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
                        </div>

                        

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
                                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>

                            <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-success shadow h-100 py-2">
                                <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">DEBUT ABONNEMENT</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.debutAbo}</div>
                                    </div>
                                    <div className="col-auto">
                                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
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
                                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
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
                                    {this.state.typeCompte === '1' && 'Bronze'}
                                    {this.state.typeCompte === '2' && 'Argent'}
                                    {this.state.typeCompte === '3' && 'Or'}
                                    </div>
                                    </div>
                                    <div className="col-auto">
                                    <i className="fas fa-comments fa-2x text-gray-300"></i>
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
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">JOURS RESTANTS</div>
                                    <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{this.state.jRestants}</div>
                                    </div>
                                    <div className="col-auto">
                                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>

                            <div className="col-xl-9 mb-4">
                            <div className="card border-left-success shadow h-100 py-2">
                                <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">API KEY</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.apikey}</div>
                                    </div>
                                    <div className="col-auto">
                                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
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
                                    <i class="fas fa-hand-holding-usd fa-2x"></i>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>                           
                        
                        </div>

                        <div className="row">

                            <div className="col-xl-8 col-lg-7">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Earnings Overview</h6>
                                <div className="dropdown no-arrow">
                                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                    <div className="dropdown-header">Dropdown Header:</div>
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </div>
                                </div>
                                <div className="card-body">
                                <div className="chart-container">
                                    <LineChart data={chartData} options={chartOptions}/>
                                </div>
                                </div>
                            </div>
                            </div>

                            <div className="col-xl-4 col-lg-5">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Revenue Sources</h6>
                                <div className="dropdown no-arrow">
                                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                    <div className="dropdown-header">Dropdown Header:</div>
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </div>
                                </div>
                                <div className="card-body">
                                <div className="chart-container pt-4 pb-2">
                                    <DoughnutChart data={chartDataDougnhut} options={chartOptionsDougnhut}/>
                                </div>
                                <div className="mt-4 text-center small">
                                    <span className="mr-2">
                                    <i className="fas fa-circle text-primary"></i> Direct
                                    </span>
                                    <span className="mr-2">
                                    <i className="fas fa-circle text-success"></i> Social
                                    </span>
                                    <span className="mr-2">
                                    <i className="fas fa-circle text-info"></i> Referral
                                    </span>
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

                    <Menu />

                    <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        {loadingdata}

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

                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>

      </div>
    );
  }
}

export default Dashboard;
