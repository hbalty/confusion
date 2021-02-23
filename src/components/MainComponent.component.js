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
import { addComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';



const mapStateToProps = state => { 
    return {
      dishes: state.dishes, 
      leaders: state.leaders, 
      promotions: state.promotions, 
      comments: state.comments,
    }
}



const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment ) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: (dishId) => {dispatch(fetchComments(dishId))},
  fetchPromos: () => {dispatch(fetchPromos())}
})
class MainComponent extends Component{
  constructor(props){
    super(props);
  }


  componentDidMount() {
    this.props.fetchComments();
    this.props.fetchDishes();
    this.props.fetchPromos();
    
  }
  

  
  render() {
    const HomePage = () => {
      console.log(this.props.promotions)
      return(
          <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promotionsLoading={this.props.promotions.isLoading}
              promotionsErrMess={this.props.promotions.errMess}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    }

    const DishWithId = ({match}) => {
      return(
          <DishdetailComponent dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            addComment={this.props.addComment}
            commentsErrMess={this.props.comments.errMess}
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
              <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
              <Redirect to="/home"/>
          </Switch>
        <Footer/>
      </div>
  ); 
  }



}




export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));

