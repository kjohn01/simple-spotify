import React, { Component } from 'react';
import './app.css';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nowPlaying: '',
      audio: null,
      isPlaying: false
    }
  }

  playAudio(previewURL) {
    let audio = new Audio(previewURL);
    if (this.state.isPlaying == false) {
      audio.play();
      this.setState({
        nowPlaying: previewURL,
        audio,
        isPlaying: true
      })
    }
    else {
      this.state.audio.pause();
      if (this.state.nowPlaying == previewURL) {
        this.setState({
          nowPlaying: '',
          audio: null,
          isPlaying: false
        })
      }
      else {
        audio.play();
        this.setState({
          nowPlaying: previewURL,
          audio,
          isPlaying: true
        })
      }
    }
  }

  render() {
    console.log('Gallery props:', this.props);
    const { tracks } = this.props;
    return(
      <div>
        {
          tracks.map((track, key) => {
            const trackImg = track.album.images[0].url
            return (
              <div className="track" key={key}>
                <img
                  src={trackImg}
                  alt="track-img"
                  className="track-img"
                />
                <div
                  className="track-play"
                  onClick={() => this.playAudio(track.preview_url)}
                >
                  <div className="track-play-inner">
                    {
                      this.state.nowPlaying === track.preview_url
                      ? <span>||</span>
                      : <span>&#9654;</span>
                    }
                  </div>
                </div>
                <p className="track-text">{track.album.name}</p>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Gallery;
