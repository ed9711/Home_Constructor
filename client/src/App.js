import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import BuildPage from './pages/BuildPage/BuildPage';
import Profile from './pages/Profile/Profile';
import Result from './pages/ResultPage/Result';


function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={HomePage}/>
          <Route path="/build" component={BuildPage}/>
          <Route path="/build/:modelId" component={BuildPage}/>
          <Route path="/profile/:userId" component={Profile}/>
          <Route path="/result/:id" component={Result}/>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
