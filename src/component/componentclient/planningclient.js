import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import Loader from 'react-loader-spinner'

import "react-datepicker/dist/react-datepicker.css";

import Navbarupclient from './navbarupclient'
import Menu from './menuclient'


class Planningclient extends Component {

    constructor(props)
    {

        super(props)
        this.state = {
            loading: true
        }
        
    }
   

  render() {

    let loadingdata;
    if(this.state.loading)
    {

        loadingdata = <div>

                            <Navbarupclient idUser={this.props.idUserRecupClient} />

                            <div className="container-fluid">

                            <div className="row">

                                    <div className="col-8">
                                    
                                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                            <h1 className="h3 mb-0 text-gray-800">Gestion du planning</h1>
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

export default Planningclient;
