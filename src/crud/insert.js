import React, { Component } from 'react';

class Insertcrud extends Component {

    constructor(props){
        super(props)
        this.state = {
            TextInputName: '',
            TextInputEmail: ''
        }

    }

    InsertUsers()
    {

        const {TextInputName} = this.state;
        const {TextInputEmail} = this.state;

        fetch('http://127.0.0.1/crud/insert.php?name=' + TextInputName + '&email=' + TextInputEmail)
        .catch(err => console.error(err))

        /*fetch('http://127.0.0.1/crud/insert.php?name=' + TextInputName + '&email=' + TextInputEmail, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                name: TextInputName,
                email: TextInputEmail
            })
          }).then((response) => response.json())
          .then((response) => {
              alert(response);
          }).catch((error) => {
              console.error(error);
          });*/


        alert("Hello ! \n Nom : " + TextInputName + " \n Email : " + TextInputEmail);

    }

    Viewuser()
    {

        return fetch('http://127.0.0.1/crud/viewuser.php')
                .then((response) => response.json())
                .then((responseJson) => {
                    
                })
                .catch(err => console.error(err))

    }

    render() {
      return (
        <div>
          <div className="container">
          <center>
          <h1>Hello</h1>
            <input type="text" value={this.state.TextInputName} onChange={e => this.setState({ TextInputName: e.target.value})} className="form-control" />
            <br/>
            <input type="email" value={this.state.TextInputEmail} onChange={e => this.setState({ TextInputEmail: e.target.value})} className="form-control" />
            <br/>
            <input type="submit" onClick={this.InsertUsers.bind(this)} className="btn btn-default btn-block" value="Envoyer" />
          </center>
          <br/>
          {this.Viewuser.bind(this)}
          </div>
        </div>
      );
    }
  }

export default Insertcrud;