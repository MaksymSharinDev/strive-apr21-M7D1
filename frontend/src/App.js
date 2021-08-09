import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Redirect, Route, BrowserRouter, Switch} from "react-router-dom";
import SearchPage from "./components/pages/SearchPage/SearchPage";
import CompanyDetails from "./components/CompanyDetails/CompanyDetails";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <main>
              <Switch>
                  <Route exact path="/">
                      <Redirect to={"/homepage"}/>
                  </Route>
                  <Route exact path="/homepage">
                      <SearchPage/>
                  </Route>
                  <Route exact path="/company-details">
                      <CompanyDetails/>
                  </Route>
              </Switch>
          </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
