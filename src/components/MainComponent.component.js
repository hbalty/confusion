import React, { Component } from 'react';
import Menu from './MenuComponent.component';
import Home from './HomeComponent';
import Header from './HeaderComponent'
import Contact from './ContactComponent';
import About from './AboutusComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import DishdetailComponent from './DishdetailComponent';
import { connect } from 'react-redux';
// action 
import { addComment } from '../redux/ActionCreators'

const mapStateToProps = state => { 
    return {
      dishes: state.dishes, 
      leaders: state.dishes, 
      promotions: state.promotions, 
      comments: state.comments
    }
}



const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment ) => dispatch(addComment(dishId, rating, author, comment))
})
class MainComponent extends Component{
  constructor(props){
    super(props);
  }


  

  
  render() {
    const HomePage = () => {
      return <Home
        dish={this.props.dishes.filter((dish) => dish.featured)[0]}
        promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
        leader={this.props.leaders.filter((leader) => leader.featured)[0]}
      />
    }

    const DishWithId = ({match}) => {
      return(
          <DishdetailComponent dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            addComment={this.props.addComment}
            />
      );
    };



    return ( 
      <div>
        <Header/>
          <Switch> 
              <Route path="/home" component={HomePage} />
              <Route exact path="/menu" component={ () => <Menu dishes={this.props.dishes }/>}/>
              <Route exact path="/aboutus" component={ () => <About leaders={this.props.leaders }/>}/>
              <Route path='/menu/:dishId' component={DishWithId} />
              <Route exact path="/contactus" component={Contact}/>
              <Redirect to="/home"/>
          </Switch>
        <Footer/>
      </div>
  ); 
  }



}




export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));

