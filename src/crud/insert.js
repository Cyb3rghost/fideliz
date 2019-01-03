import React, { Component } from 'react';

class Insertcrud extends Component {

    constructor(props){
        super(props)
        this.state = {
            TextInputName: '',
            TextInputEmail: '',
            MDFTextInputName: '',
            MDFTextInputEmail: '',
            MDFId: '',
            Vrflogin: false,
            products: [],
            oneuser: []
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

    ModifUsers()
    {

        const {MDFId, MDFTextInputName, MDFTextInputEmail} = this.state;

        fetch('http://127.0.0.1/crud/update.php?id=' + MDFId + '&nom=' + MDFTextInputName + '&email=' + MDFTextInputEmail)
        .then((response) => response.json()) // Transform the data into json
        .then((response) => {
            console.log(response);
        })
        .catch(err => console.error(err))

    }

    getAllUser()
    {

        return fetch('http://127.0.0.1/crud/viewuser.php')
                .then((response) => response.json()) // Transform the data into json
                .then((responseJson) => {
                // Create and append the li's to the ul
                    //console.log(responseJson)
                    this.setState({
                        products: responseJson
                    });

                })
                .catch(err => console.error(err))

    }

    getOneUser()
    {

        return fetch('http://127.0.0.1/crud/viewoneuser.php?id=4')
                .then((response) => response.json()) // Transform the data into json
                .then((responseJsonDeux) => {
                // Create and append the li's to the ul
                    console.log(responseJsonDeux)
                    {responseJsonDeux.map((value, index) => 
                        (
                            this.setState({
                                MDFId: value.id,
                                MDFTextInputName: value.nom,
                                MDFTextInputEmail: value.email
                            })
                        )
                    )}
                    /*this.setState({
                        MDFId: responseJsonDeux.id
                    });*/

                })
                .catch(err => console.error(err))  

    }

    verifLogin()
    {

        return fetch('http://127.0.0.1/crud/veriflogin.php?id=4')
                .then((response) => response.json()) // Transform the data into json
                .then((responseJsonDeux) => {
                // Create and append the li's to the ul
                    console.log('Login : ' + responseJsonDeux)
                    let statueLogin
                    if(responseJsonDeux === 1)
                    {
                        statueLogin = true;
                    }
                    else if(responseJsonDeux === 0)
                    {
                        statueLogin = false;
                    }

                    this.setState({
                        Vrflogin: statueLogin
                    })
                })
                .catch(err => console.error(err))          


    }

    deleteData(id)
    {

        return fetch('http://127.0.0.1/crud/delete.php?id=' + id)
        .then((response) => response.json()) // Transform the data into json
        .then((response) => {
            console.log(response);
        })
        .catch(err => console.error(err))

    }

    componentDidMount(){

        this.verifLogin();
        this.getAllUser();
        this.getOneUser();

    }

    render() {
      const { products, oneuser } = this.state;
      return (
        <div>
          <div className="container">
          <center>
          <h1>Méthode insertion</h1>
            <input type="text" value={this.state.TextInputName} onChange={e => this.setState({ TextInputName: e.target.value})} className="form-control" />
            <br/>
            <input type="email" value={this.state.TextInputEmail} onChange={e => this.setState({ TextInputEmail: e.target.value})} className="form-control" />
            <br/>
            <input type="submit" onClick={this.InsertUsers.bind(this)} className="btn btn-default btn-block" value="Envoyer" />
          </center>
          <br/>
          <div id="test">
          <h1>Méthode lecture et comptage & Suppresion</h1>
            Size  : {this.state.products.length}
            {products.map((value, index) => 
                (<div key={index}>{value.id} - {value.nom} - {value.email} - <a href="#" onClick={()=>this.deleteData(value.id)}>Supprimer</a><br/></div>)
            )}
          </div>

          <h1>Méthode Update</h1>
            <input type="text" value={this.state.MDFId} onChange={a => this.setState({MDFId: a.target.value})} className="form-control" />
            <br/>
            <input type="text" value={this.state.MDFTextInputName} onChange={a => this.setState({ MDFTextInputName: a.target.value})} className="form-control" />                    
            <br/>
            <input  type="email" value={this.state.MDFTextInputEmail} onChange={a => this.setState({ MDFTextInputEmail: a.target.value})} className="form-control" />
            <br/>
            <input type="submit" onClick={this.ModifUsers.bind(this)} className="btn btn-default btn-block" value="Modifier" />
            <br/>
            <h1>Vérif login</h1>
            <Login login={this.state.Vrflogin} />
            </div>
        </div>
      );
    }
  }

  class Login extends Component {


    render() {
        const isLoggedIn = this.props.login;

        return (
          <div>
              On vérifie si les données existe :  <br/>
              {
                  //isLoggedIn === false && <p>Vous êtes pas connecté</p>
                  isLoggedIn === false && 
                        <p>Vous êtes pas connecté</p>   
              }
              {
                  //isLoggedIn === false && <p>Vous êtes pas connecté</p>
                  isLoggedIn === true && 
                        <p>Vous êtes connecté</p>   
              }
              <br/>
          </div>
        );
      }    

  }

export default Insertcrud;