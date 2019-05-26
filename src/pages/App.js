import React, { Component } from 'react';

import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import '../resources/normalize.css';
import '../index.scss';
import routes from '../routes.js';

class App extends Component {
  render() {
    return (
      <div className='app'>
          {routes}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App)