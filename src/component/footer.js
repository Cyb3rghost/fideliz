import React, { Component } from 'react';

class Footer extends Component {


  render() {
    return (
      <div>

            <footer className="sticky-footer bg-dark text-white">
                <div className="container my-auto">
                <div className="copyright text-center my-auto">
                    <span>&copy; 2019 Copyright | www.fidliz.com </span><br/>
                    <br/>
                    <span className="badge badge-light">Version : 1.0.0.0</span>
                </div>
                </div>
            </footer>

      </div>
    );
  }
}

export default Footer;
