import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Redirect, Route, BrowserRouter, Switch} from "react-router-dom";
import SearchPage from "./components/pages/SearchPage/SearchPage";
import CompanyDetails from "./components/CompanyDetails/CompanyDetails";
import {Container, Row} from "react-bootstrap";
import {useState} from "react";



function App() {

    let [ searchBarData , setSearchBarData ] = useState([])
    let keepSearchState = (arr) => setSearchBarData(arr)

  return (
    <div className="App">
      <BrowserRouter>
          <main>
              <Switch>
                  <Route exact path="/">
                      <Redirect to={"/homepage"}/>
                  </Route>
                  <Route exact path="/homepage">
                      <Container >
                          <Row >
                            <SearchPage handOffCallback={keepSearchState}/>
                          </Row>
                      </Container>
                  </Route>
                  <Route  path="/company-details/">
                      <Container >
                          <Row >
                              <SearchPage searchBarData={searchBarData} />
                              <CompanyDetails/>
                          </Row>
                      </Container>

                  </Route>
              </Switch>
          </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
