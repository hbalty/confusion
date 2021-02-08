import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardText, CardBody } from 'reactstrap';
import Menu from './components/MenuComponent.component';
import { DISHES } from './shared/dishes';


class App extends Component{

  constructor(props){
    super(props);

    this.state = {
      dishes: DISHES
    }
  }


  render() {
    return ( 
      <div className="container"> 
          <div className="row">
              <Menu dishes={DISHES}/>
          </div>
      </div>
  ); 
  }



}




export default App;
