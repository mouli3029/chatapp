import './App.css';
import {BrowserRouter as Router,Switch,Route, BrowserRouter} from 'react-router-dom'
import Home from './components/Home';
import Chat from './components/Chat';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/room' component={Chat} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
