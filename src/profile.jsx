import React, { Component } from 'react';
import './app.css';

class Profile extends Component {
  render() {
    let artist = {
      name: '',
      followers: {
        total: ''
      },
      images: [{
        url: ''
      }],
      genres: []
    };
    if (this.props.artist !== null) {
      artist = this.props.artist;
    }
    return (
      <div className='profile'>
        <img src={artist.images[0].url} alt="profile-img" className='profile-img' />
        <div className='profile-info'>
          <div className='profile-name'>{artist.name}</div>
          <div className='profile-followers'>{artist.followers.total} followers</div>
          <div className='profile-genres'>
            {
              artist.genres.map((genres, key) => {
                return (
                  <span key={key}> {genres}</span>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;
