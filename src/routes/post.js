import React, { Component } from 'react';
import ReadingTime from '../components/readingtime/';
import Logo from '../components/logo'
import { Redirect } from 'react-router-dom'
import './post.css';

class Post extends Component {
  constructor() {
    super();

    this.state = {
      imageClass: " post__image--not-loaded",
      isLoaded: false,
      isNotFound: false,
      postData: {},
    };
  }

  componentDidMount() {
    localStorage.setItem( 'visited-'+ window.location.pathname, true );

    //Fetch API request here
    fetch(
      'https://public-api.wordpress.com/rest/v1.1/sites/filippodt.blog/posts/' + this.props.match.params.id
    ).then( response => {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);

            switch( response.status ) {
              case 404:
                this.setState({ isNotFound: true, });
                break
              default:
                console.log("Redirect to the broke page");
                break
            }

            return;
          }

          // Examine the text in the response
          response.json().then( data => {
            console.log(data);

            this.setState({
              postData: data,
              isLoaded: true,
            });
          });
        }
      )
      .catch( err => {
        console.log('Fetch Error :-S', err);
      });
  }

  loadImage = () => {
    this.setState({
      imageClass: " post__image--loaded",
    });
  }

  render() {
    if( this.state.isNotFound ) {
      return <Redirect to='/404'/>;
    }

    return (
      <div>
        <h1 className="post__title">Title: { this.state.postData.title }<ReadingTime /></h1>

        <div className="container--image">
          <div className="post__imageWrapper">
            <Logo logoClass="post__imageLoader" />
            <img 
              className={ "post__image" + this.state.imageClass }
              onLoad={ this.loadImage }
              alt="Image"
              src="https://i1.wp.com/filippodt.blog/wp-content/uploads/2018/01/segmenting.jpg?fit=2782%2C1299&ssl=1" />
          </div>
        </div>

        <div className="container">
          <div className="content">
             <p>
             Cras posuere massa eu lacinia finibus. Sed id ultricies orci, ac pharetra odio. Mauris et enim a orci suscipit posuere eget vitae nulla. Vivamus pulvinar blandit tempus. Cras ultrices urna in tellus laoreet cursus. Pellentesque nec lacinia est. Proin non fermentum libero, quis scelerisque ligula. Sed non urna porta, malesuada eros at, placerat ante. Etiam sit amet dui nulla. Nulla facilisi.
             </p>
             <p>
             Nulla interdum ipsum id augue blandit, nec luctus massa sodales. Pellentesque ultricies hendrerit risus, quis malesuada nunc consequat eget. Cras mattis eleifend mollis. Morbi quis odio vel velit luctus aliquam. Vivamus blandit pretium justo, eu fringilla est gravida sed. Praesent sed pellentesque dui. Sed fermentum mauris eu massa tempor elementum. Aenean non ipsum at purus faucibus egestas maximus quis ante. Morbi at sem ornare, euismod nibh ac, congue dolor. Proin in erat eget enim commodo placerat. Aenean in quam quam. Vivamus condimentum dictum metus nec posuere. Integer eget dignissim nulla.
             </p>
           </div>
        </div>
      </div>
    );
  }
}

export default Post;
