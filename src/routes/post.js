import React, { Component } from 'react';

class Post extends Component {
  render() {
    return (
      <div className="container">
        <div className="content">
           <h1>{ `Fetching...${this.props.match.params.slug}` }:${this.props.match.params.id}</h1>
           <p>
           Cras posuere massa eu lacinia finibus. Sed id ultricies orci, ac pharetra odio. Mauris et enim a orci suscipit posuere eget vitae nulla. Vivamus pulvinar blandit tempus. Cras ultrices urna in tellus laoreet cursus. Pellentesque nec lacinia est. Proin non fermentum libero, quis scelerisque ligula. Sed non urna porta, malesuada eros at, placerat ante. Etiam sit amet dui nulla. Nulla facilisi.
           </p>
           <p>
           Nulla interdum ipsum id augue blandit, nec luctus massa sodales. Pellentesque ultricies hendrerit risus, quis malesuada nunc consequat eget. Cras mattis eleifend mollis. Morbi quis odio vel velit luctus aliquam. Vivamus blandit pretium justo, eu fringilla est gravida sed. Praesent sed pellentesque dui. Sed fermentum mauris eu massa tempor elementum. Aenean non ipsum at purus faucibus egestas maximus quis ante. Morbi at sem ornare, euismod nibh ac, congue dolor. Proin in erat eget enim commodo placerat. Aenean in quam quam. Vivamus condimentum dictum metus nec posuere. Integer eget dignissim nulla.
           </p>
         </div>
      </div>
    );
  }
}

export default Post;
