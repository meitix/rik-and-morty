import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { HomePage, ResultPage, DetailsPage } from './pages';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApiContext } from './contexts/app-context';
import { ApiService } from './service';
import { ApiUrls } from './env';

const service = new ApiService(ApiUrls);

function App() {
  return (
    <ApiContext.Provider value={service}>
      <div className="container">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/character" component={ResultPage} />
            <Route path="/character/:id" component={DetailsPage} />
          </Switch>
        </BrowserRouter>
      </div>
    </ApiContext.Provider>
  );
}

export default App;
