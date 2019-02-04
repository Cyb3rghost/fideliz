import React, { Component } from 'react';

import Menu from './menu'

class Buttons extends Component {

  render() {
    return (
      <div>

            <div id="wrapper">

            <Menu />

            <div id="content-wrapper" className="d-flex flex-column">

            <div id="content">

                <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                    <i className="fa fa-bars"></i>
                </button>

                <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button">
                        <i className="fas fa-search fa-sm"></i>
                        </button>
                    </div>
                    </div>
                </form>

                <ul className="navbar-nav ml-auto">

                    <li className="nav-item dropdown no-arrow d-sm-none">
                    <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-search fa-fw"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                        <form className="form-inline mr-auto w-100 navbar-search">
                        <div className="input-group">
                            <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                                <i className="fas fa-search fa-sm"></i>
                            </button>
                            </div>
                        </div>
                        </form>
                    </div>
                    </li>

                    <li className="nav-item dropdown no-arrow mx-1">
                    <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-bell fa-fw"></i>
                        <span className="badge badge-danger badge-counter">3+</span>
                    </a>
                    <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                        <h6 className="dropdown-header">
                        Alerts Center
                        </h6>
                        <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="mr-3">
                            <div className="icon-circle bg-primary">
                            <i className="fas fa-file-alt text-white"></i>
                            </div>
                        </div>
                        <div>
                            <div className="small text-gray-500">December 12, 2019</div>
                            <span className="font-weight-bold">A new monthly report is ready to download!</span>
                        </div>
                        </a>
                        <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="mr-3">
                            <div className="icon-circle bg-success">
                            <i className="fas fa-donate text-white"></i>
                            </div>
                        </div>
                        <div>
                            <div className="small text-gray-500">December 7, 2019</div>
                            $290.29 has been deposited into your account!
                        </div>
                        </a>
                        <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="mr-3">
                            <div className="icon-circle bg-warning">
                            <i className="fas fa-exclamation-triangle text-white"></i>
                            </div>
                        </div>
                        <div>
                            <div className="small text-gray-500">December 2, 2019</div>
                            Spending Alert: We've noticed unusually high spending for your account.
                        </div>
                        </a>
                        <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                    </div>
                    </li>

                    <li className="nav-item dropdown no-arrow mx-1">
                    <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-envelope fa-fw"></i>
                        <span className="badge badge-danger badge-counter">7</span>
                    </a>
                    <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                        <h6 className="dropdown-header">
                        Message Center
                        </h6>
                        <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="dropdown-list-image mr-3">
                            <img className="rounded-circle" src="https://source.unsplash.com/fn_BT9fwg_E/60x60" alt="" />
                            <div className="status-indicator bg-success"></div>
                        </div>
                        <div className="font-weight-bold">
                            <div className="text-truncate">Hi there! I am wondering if you can help me with a problem I've been having.</div>
                            <div className="small text-gray-500">Emily Fowler · 58m</div>
                        </div>
                        </a>
                        <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="dropdown-list-image mr-3">
                            <img className="rounded-circle" src="https://source.unsplash.com/AU4VPcFN4LE/60x60" alt="" />
                            <div className="status-indicator"></div>
                        </div>
                        <div>
                            <div className="text-truncate">I have the photos that you ordered last month, how would you like them sent to you?</div>
                            <div className="small text-gray-500">Jae Chun · 1d</div>
                        </div>
                        </a>
                        <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="dropdown-list-image mr-3">
                            <img className="rounded-circle" src="https://source.unsplash.com/CS2uCrpNzJY/60x60" alt="" />
                            <div className="status-indicator bg-warning"></div>
                        </div>
                        <div>
                            <div className="text-truncate">Last month's report looks great, I am very happy with the progress so far, keep up the good work!</div>
                            <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                        </div>
                        </a>
                        <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="dropdown-list-image mr-3">
                            <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60" alt="" />
                            <div className="status-indicator bg-success"></div>
                        </div>
                        <div>
                            <div className="text-truncate">Am I a good boy? The reason I ask is because someone told me that people say this to all dogs, even if they aren't good...</div>
                            <div className="small text-gray-500">Chicken the Dog · 2w</div>
                        </div>
                        </a>
                        <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
                    </div>
                    </li>

                    <div className="topbar-divider d-none d-sm-block"></div>

                    <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">Valerie Luna</span>
                        <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                        <a className="dropdown-item" href="#">
                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        Profile
                        </a>
                        <a className="dropdown-item" href="#">
                        <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                        Settings
                        </a>
                        <a className="dropdown-item" href="#">
                        <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                        Activity Log
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                        Logout
                        </a>
                    </div>
                    </li>

                </ul>

                </nav>

                <div className="container-fluid">

                <h1 className="h3 mb-4 text-gray-800">Buttons</h1>

                <div className="row">

                    <div className="col-lg-6">

                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Circle Buttons</h6>
                        </div>
                        <div className="card-body">
                        <p>Use Font Awesome Icons (included with this theme package) along with the circle buttons as shown in the examples below!</p>
                        <div className="mb-2">
                            <code>.btn-circle</code>
                        </div>
                        <a href="#" className="btn btn-primary btn-circle">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="btn btn-success btn-circle">
                            <i className="fas fa-check"></i>
                        </a>
                        <a href="#" className="btn btn-info btn-circle">
                            <i className="fas fa-info-circle"></i>
                        </a>
                        <a href="#" className="btn btn-warning btn-circle">
                            <i className="fas fa-exclamation-triangle"></i>
                        </a>
                        <a href="#" className="btn btn-danger btn-circle">
                            <i className="fas fa-trash"></i>
                        </a>
                        <div className="mt-4 mb-2">
                            <code>.btn-circle .btn-sm</code>
                        </div>
                        <a href="#" className="btn btn-primary btn-circle btn-sm">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="btn btn-success btn-circle btn-sm">
                            <i className="fas fa-check"></i>
                        </a>
                        <a href="#" className="btn btn-info btn-circle btn-sm">
                            <i className="fas fa-info-circle"></i>
                        </a>
                        <a href="#" className="btn btn-warning btn-circle btn-sm">
                            <i className="fas fa-exclamation-triangle"></i>
                        </a>
                        <a href="#" className="btn btn-danger btn-circle btn-sm">
                            <i className="fas fa-trash"></i>
                        </a>
                        
                        <div className="mt-4 mb-2">
                            <code>.btn-circle .btn-lg</code>
                        </div>
                        <a href="#" className="btn btn-primary btn-circle btn-lg">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="btn btn-success btn-circle btn-lg">
                            <i className="fas fa-check"></i>
                        </a>
                        <a href="#" className="btn btn-info btn-circle btn-lg">
                            <i className="fas fa-info-circle"></i>
                        </a>
                        <a href="#" className="btn btn-warning btn-circle btn-lg">
                            <i className="fas fa-exclamation-triangle"></i>
                        </a>
                        <a href="#" className="btn btn-danger btn-circle btn-lg">
                            <i className="fas fa-trash"></i>
                        </a>
                        </div>
                    </div>

                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Brand Buttons</h6>
                        </div>
                        <div className="card-body">
                        <p>Google and Facebook buttons are available featuring each company's respective brand color. They are used on the user login and registration pages.</p>
                        <p>You can create more custom buttons by adding a new color variable in the <code>_variables.scss</code> file and then using the Bootstrap button variant mixin to create a new style, as demonstrated in the <code>_buttons.scss</code> file.</p>
                        <a href="#" className="btn btn-google btn-block"><i className="fab fa-google fa-fw"></i> .btn-google</a>
                        <a href="#" className="btn btn-facebook btn-block"><i className="fab fa-facebook-f fa-fw"></i> .btn-facebook</a>

                        </div>
                    </div>

                    </div>

                    <div className="col-lg-6">

                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Split Buttons with Icon</h6>
                        </div>
                        <div className="card-body">
                        <p>Works with any button colors, just use the <code>.btn-icon-split</code> className and the markup in the examples below. The examples below also use the <code>.text-white-50</code> helper className on the icons for additional styling, but it is not required.</p>
                        <a href="#" className="btn btn-primary btn-icon-split">
                            <span className="icon text-white-50">
                            <i className="fas fa-flag"></i>
                            </span>
                            <span className="text">Split Button Primary</span>
                        </a>
                        <div className="my-2"></div>
                        <a href="#" className="btn btn-success btn-icon-split">
                            <span className="icon text-white-50">
                            <i className="fas fa-check"></i>
                            </span>
                            <span className="text">Split Button Success</span>
                        </a>
                        <div className="my-2"></div>
                        <a href="#" className="btn btn-info btn-icon-split">
                            <span className="icon text-white-50">
                            <i className="fas fa-info-circle"></i>
                            </span>
                            <span className="text">Split Button Info</span>
                        </a>
                        <div className="my-2"></div>
                        <a href="#" className="btn btn-warning btn-icon-split">
                            <span className="icon text-white-50">
                            <i className="fas fa-exclamation-triangle"></i>
                            </span>
                            <span className="text">Split Button Warning</span>
                        </a>
                        <div className="my-2"></div>
                        <a href="#" className="btn btn-danger btn-icon-split">
                            <span className="icon text-white-50">
                            <i className="fas fa-trash"></i>
                            </span>
                            <span className="text">Split Button Danger</span>
                        </a>
                        <div className="my-2"></div>
                        <a href="#" className="btn btn-secondary btn-icon-split">
                            <span className="icon text-white-50">
                            <i className="fas fa-arrow-right"></i>
                            </span>
                            <span className="text">Split Button Secondary</span>
                        </a>
                        <div className="my-2"></div>
                        <a href="#" className="btn btn-light btn-icon-split">
                            <span className="icon text-gray-600">
                            <i className="fas fa-arrow-right"></i>
                            </span>
                            <span className="text">Split Button Primary</span>
                        </a>
                        <div className="mb-4"></div>
                        <p>Also works with small and large button classNamees!</p>
                        <a href="#" className="btn btn-primary btn-icon-split btn-sm">
                            <span className="icon text-white-50">
                            <i className="fas fa-flag"></i>
                            </span>
                            <span className="text">Split Button Small</span>
                        </a>
                        <div className="my-2"></div>
                        <a href="#" className="btn btn-primary btn-icon-split btn-lg">
                            <span className="icon text-white-50">
                            <i className="fas fa-flag"></i>
                            </span>
                            <span className="text">Split Button Large</span>
                        </a>
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

export default Buttons;
