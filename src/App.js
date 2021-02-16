import './App.css';
import React, { Component } from 'react';
import MainComponent from './components/MainComponent.component';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore'


const store = ConfigureStore() ;

class App extends Component{

  
  render() {
    return ( 
      <BrowserRouter>
        <div> 
          <Provider store={store}> 
            <MainComponent />
          </Provider>
        </div>
      </BrowserRouter>
  ); 
  }



}




export default App;
