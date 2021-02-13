import React, { Component } from 'react';
import Menu from './MenuComponent.component';
import DishdetailComponent from './DishdetailComponent';
import Header from './HeaderComponent'
import { DISHES } from '../shared/dishes';
import Footer from './FooterComponent';



class MainComponent extends Component{

  constructor(props){
    super(props);

    this.state = {
      dishes: DISHES, 
      selectedDish: null
    }
  }

  
  onDishSelect(dishId){
      this.setState({ selectedDish : dishId});
  }

  
  render() {
    console.log(this.state.selectedDish)
    return ( 
      <div>
        <Header/>
        <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
        <DishdetailComponent dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
        <Footer/>
      </div>
  ); 
  }



}




export default MainComponent;
