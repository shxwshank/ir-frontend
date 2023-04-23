import React from "react";
import axios from 'axios';
import './form.css';

class ContactForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        songname: '',
        artistname: '',
        lyrics: '',
        translated_lyrics: '',
        similarrity: [[,,0],[,,0],[,,0],[,,0]],
      };
      
  
      this.handleChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      
      this.setState({
        [name]: value
      });
      console.log('Change detected. State updated ' + name + ' = ' + value);
    }
    myfunction(){
      window.location.href = "/lyrics";
    }
    handleSubmit(event) {
      const { songname, artistname } = this.state;
      const details = {
        songname, 
        artistname,
      };
      console.log(details)
      axios
      .post('http://127.0.0.1:8000/api/store-data', details)
      .then(response => {
        console.log(response.data); // Do something with the response data
        this.setState({lyrics: response.data.lyrics});
        this.setState({translated_lyrics: response.data.translated_lyrics});
        this.setState({similarrity: response.data.recomsong});
      })
      .catch(err => {
        console.error(err);
      });
      alert('A form was submitted: ' + this.state.songname + ' // ' + this.state.artistname);
      event.preventDefault();
    }
  
    render() {
      return (
        <div className="App">
            <div className="divform">
                <form onSubmit={this.handleSubmit} className="form" >
                    <div className="form-group">
                        <div class="add-task">
                            <label for="nameImput">Song Name: </label>
                            <input type="text" name="songname" value={this.state.songname} onChange={this.handleChange} className="form-control" id="nameImput" placeholder="48" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div class="add-task">
                            <label for="artistImput">Artist Name: </label>
                            <input type="text" name="artistname"  value={this.state.artistname} onChange={this.handleChange} className="form-control" id="artistnameImput" placeholder="Shxwshank" />
                        </div>
                    </div>
                        <input type="submit" value="Submit" className="btn btn-primary"  />
                    {/* onClick={this.myfunction} */}
                </form>
            </div>
            <div className="alllyrics">
                <div className="lyrics">
                    <div className="card">
                        <h1>Lyrics</h1>
                        <p>{this.state.lyrics}</p>
                    </div>
                </div>
                <div className="translated_lyrics">
                    <div className="card">
                        <h1>Translated Lyrics</h1>
                        <p>{this.state.translated_lyrics}</p>
                    </div>
                </div>
                <div className="recommended">
                    <div className="card">
                        <h1>Recommended Songs</h1>
                        <div className="songscards">
                            {this.state.similarrity.map((song) =>{
                                return(
                                    <div className="single">
                                        <div className="son">Song Name:{song[0]}</div>
                                        <div className="art">Artist Name:{song[1]}</div>
                                        <div className="sim">Similarity Score:{song[2].toFixed(3)}</div>
                                        {/* {song.map((s) =>{return(<div>{s}</div>)})} */}
                                    </div>
                                )})}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
      )
      
    }
  }

export default ContactForm;