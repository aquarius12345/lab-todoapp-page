import './App.css';
import Form from './components/Form';
import Login from './components/Login';
import { Switch, Route } from 'react-router-dom';
import Sign from './components/Sign';

function App() {
  return (
    <div className="App">
      
      <Switch>
        <Route exact path = '/' component={Form} /> 
        <Route exact path = '/login' render={(props) => <Login {...props}/>} />
        <Route exact path = '/sign'  render={(props) => <Sign {...props}/>} />
      </Switch>

    </div>
  );
}

export default App;
