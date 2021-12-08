import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import BuildPage from './pages/BuildPage/BuildPage';
import Profile from './pages/Profile/Profile';
import Result from './pages/ResultPage/Result';
import Nav from './components/Nav/Nav';
import "./App.scss"


function App() {
  return (
    <div className="background">
      <BrowserRouter>
        <Nav/>
        <Switch>
          <Route path="/" exact component={HomePage}/>
          <Route path="/build" exact component={BuildPage}/>
          <Route path="/build/:modelId" component={BuildPage}/>
          <Route path="/profile/" exact component={Profile}/>
          <Route path="/profile/:userId" component={Profile}/>
          <Route path="/result/:id" component={Result}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
