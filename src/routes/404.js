import React, { Component } from 'react';
import '../sass/routes/404.scss'

class NotFound extends Component {
  render() {
    return (
      <div className="container">
        <div className="content">
           <h1 className="error-message">Sorry but the screen you are looking for does’t exists. Use the navigation to get out of here.</h1>
         </div>
         
      </div>
    );
  }
}

export default NotFound;
