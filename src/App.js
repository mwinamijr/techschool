import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import BaseLayout from "./containers/Layout";
import BaseRouter from './routes';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container ">
          <BaseLayout>
            <BaseRouter />
          </BaseLayout>
        </div>
      </div>
    </Router>
  );
}

export default App;