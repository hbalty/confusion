import logo from './logo.svg';
import './App.css';

import { Navbar, NavbarBrand} from 'reactstrap'
import Menu from './components/MenuComponent.component';

function App() {
  return (
    <div className="App"> 
      <Navbar dark color="primary">
        <div className="container"> 
          <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
        </div>
      </Navbar>
      <Menu></Menu>
    </div>
  );
}

export default App;
