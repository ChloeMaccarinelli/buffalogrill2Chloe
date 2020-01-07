import React, {Component, ReactPropTypes as PropTypes} from 'react';
import logo from './logo.svg';
import './App.css';

import User from './components/User';
import Hobby from './components/Hobby';
import TableRestaurant from "./app_modules/Table";
import ReactDOM from "react-dom";

class App extends Component {

  constructor(props) {
		super(props);

		this.state = {
			restaurants:[],
		};
	}


	
  addHobby() {
		let oldrestaurants = this.state.restaurants;
		this.setState({
			restaurants: oldrestaurants.concat(this.input.value)
    });
    
    this.input.value = "";
  }
  
  removeHobby(hobby) {
		/*
		let oldrestaurants = this.state.restaurants;
		let pos = this.state.restaurants.indexOf(hobby);
		oldrestaurants.splice(pos, 1);
		*/
	const oldrestaurants = this.state.restaurants.filter(
      (elem, index) => {
        return (elem !== hobby) ? elem : null;
      }
    );	
		
		this.setState({
			restaurants: oldrestaurants
		});
	}

    getDataFromServer() {

        let data;
        fetch('http://localhost:8080/api/restaurants')
            .then(response => {
                data = response.json(); // transforme le json texte en objet js
            })
            .then( () => { // data c'est le texte json de response ci-dessus
                let newrestaurants = [];
                data.then(resp => {
                    for (let i = 0; i < resp.data.length; i++) {
                        newrestaurants.push(resp.data[i]);
                    }
                    this.setState({
                        restaurants: newrestaurants
                    });
                });
            }).catch(err => {
        });
    }

  componentWillMount() {
    // on va chercher des donnees sur le Web avec fetch, comme
    // on a fait avec VueJS
    this.getDataFromServer();
  }

  render() {
    let list = this.state.restaurants.map(
			(el) => {
				return <li onClick={() => this.removeHobby(el)} key={el}>{el}</li>
			}
    );
    
    let listAvecComponent = 
				this.state.restaurants.map((el, index) => {
				return <Hobby 
								 name={el}
								 key={index} 
                 removeHobby={this.removeHobby.bind(this)} 
								 />
			}
    );

    return (

      <div className="App">

          <p>
            Nombre de restaurants : {this.state.restaurants.length}
          </p>

          <h2>Liste des restaurants :</h2>

        <TableRestaurant data={this.state}/>
      </div>
    );
  }
}

export default App;

