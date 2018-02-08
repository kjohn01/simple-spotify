import React, { Component } from 'react';
import { Button, FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './profile';
import Gallery from './gallery';
import styles from './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: []
    }
  }

  search(query) {
    const BASE_URL = 'https://api.spotify.com/v1/';
    const AUTH_TOKEN = 'BQDdNrYoZrwIVXsT1WjL4u7wjPI4GwqzLP4KlciqBt4dONZHzWGRDYe1rJGnjWIHVjtrDZ1SV8cO0cKswdxV4uIPVI0964VBQkfT69iKFcYf58dCXBiptIOkrkpq8c1jUPMgeULYSFAfyP3qi7mV_UlMouDfeOxu';
    let FETCH_URL = `${BASE_URL}search?q=${this.state.query}&type=artist&limit=1&`;
    const ALBUM_URL = `${BASE_URL}artists/`;
    fetch(FETCH_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`
      }
     })
    .then(response => response.json())
    .then(json => {
      const artist = json.artists.items[0];
      this.setState({artist});

      FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
      fetch(FETCH_URL, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`
        }
       })
       .then(response => response.json())
       .then(json => {
         const { tracks } = json;
         this.setState({tracks});
         // console.log(this.state.tracks);
       })
    });

  }

  render() {
    return (
      <div className="App">
        <h1 className="App-title">Spotify app</h1>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an artist..."
              value={this.state.query}
              onChange={event => {this.setState({ query: event.target.value })}}
              onKeyPress={event => {
                if(event.key === 'Enter') {
                  this.search()
                }
              }}
             />
           <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist !== null
          ? <div>
              <Profile
                artist={this.state.artist}
              />
              <Gallery
                tracks={this.state.tracks}
              />
            </div>
          : <div></div>
        }
      </div>
    );
  }
}

export default App;
