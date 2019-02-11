import React, { Component } from 'react';

import Navbarup from './navbarup'
import Menu from './menu'

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
            apikey: ''
        }

    }

    componentDidMount()
    {

        alert('Secure : ' + this.props.loggedIn + '\nId : ' + this.props.idUserRecup + '\nType de Compte : ' + this.props.infoTypeCompte)

        fetch('http://127.0.0.1/fidapi/main.php?action=datadashboard&id=' + this.props.idUserRecup)
        .then((response) => response.json())
        .then((response) => {

            {response.map((value, index) => 
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
                        apikey: value.apikey                        
                    })
                )
              )}
    

        })
        .catch(err => console.error(err))

        fetch('http://127.0.0.1/fidapi/main.php?action=compteNombreClient&id=' + this.props.idUserRecup)
        .then((response) => response.json())
        .then((response) => {

            this.setState({
                totalClient: response                    
            })

        })
        .catch(err => console.error(err))


    }


  render() {
    return (
      <div>

            <div id="wrapper">

                <Menu />

                <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">

                    <Navbarup idEntreprise={this.props.idUserRecup} />

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
                            <div className="chart-area">
                                <canvas id="myAreaChart"></canvas>
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
                            <div className="chart-pie pt-4 pb-2">
                                <canvas id="myPieChart"></canvas>
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

            <div className="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                    </div>
                    <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                    <div className="modal-footer">
                    <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <a className="btn btn-primary" href="login.html">Logout</a>
                    </div>
                </div>
                </div>
            </div>

      </div>
    );
  }
}

export default Dashboard;
