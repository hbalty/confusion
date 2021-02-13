import './App.css';
import React, { Component } from 'react';
import MainComponent from './components/MainComponent.component';
import { BrowserRouter } from 'react-router-dom';


class App extends Component{


  render() {
    return ( 
      <BrowserRouter>
        <div> 
          <MainComponent />
        </div>
      </BrowserRouter>
  ); 
  }



}




export default App;
