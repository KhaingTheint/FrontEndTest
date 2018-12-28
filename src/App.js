import React, { Component } from "react";
import "./App.css";
import "./FontStyle.css";
import { FaSistrix } from "react-icons/fa";

import MovieBox from "./components/MovieBox.js";

import $ from "jquery";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { rows: [], watchList: [] };
    this.pageCnt = 1;
  }

  componentDidMount() {
    this.filterMovie("popular");
  }
  // filter movies by popular, upcoming, now playing, top rated
  filterMovie(searchTerm) {
    var movieBoxes = [];
    this.setState({ rows: [] });
    for (let i = 1; i <= this.pageCnt; i++) {
      movieBoxes = [];
      const urlString =
        "https://api.themoviedb.org/3/movie/" +
        searchTerm +
        "?api_key=4ccda7a34189fcea2fc752a6ee339500&language=en-US&page=" +
        i;

      $.ajax({
        url: urlString,
        //eslint-disable-next-line
        success: searchResults => {
          const results = searchResults.results;
          results.forEach(movie => {
            movie.poster =
              "https://image.tmdb.org/t/p/w185" + movie.poster_path;
            var date = movie.release_date.split("-");
            movie.release_date = date[0];
            const movieBox = <MovieBox key={movie.id} movie={movie} />;
            movieBoxes.push(movieBox);
          });
          if (i === this.pageCnt) {
            this.setState({ rows: movieBoxes });
          }
        },
        error: (xhr, status, err) => {
          console.error("Failed to fetch data");
        }
      });
    }
  }
  // search movies by input keyword
  performSearch(searchTerm) {
    const urlString =
      "https://api.themoviedb.org/3/search/movie?api_key=4ccda7a34189fcea2fc752a6ee339500&query=" +
      searchTerm;

    $.ajax({
      url: urlString,
      success: searchResults => {
        const results = searchResults.results;
        var movieBoxes = [];
        results.forEach(movie => {
          movie.poster = "https://image.tmdb.org/t/p/w185" + movie.poster_path;
          var date = movie.release_date.split("-");
          movie.release_date = date[0];
          const movieBox = <MovieBox key={movie.id} movie={movie} />;
          movieBoxes.push(movieBox);
        });
        this.setState({ rows: movieBoxes });
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data");
      }
    });
  }
  searchChangeHandler(event) {
    const searchTerm = event.target.value;
    if (searchTerm.trim() === "") {
      this.filterMovie("popular");
    } else {
      this.performSearch(searchTerm);
    }
  }
  buttonHandler(event) {
    const searchTerm = event.target.id;
    this.filterMovie(searchTerm);
  }
  render() {
    return (
      <div className="App">
        <div className="title-box">
          All Movies
          <hr />
        </div>

        <br />
        <input
          className="search-box"
          style={{
            fontSize: 20,
            display: "block",
            width: "95%",
            marginTop: 0,
            borderTop: 0,
            borderLeft: 0,
            borderRight: 0,
            borderBottom: "0.3px solid #8091A5",
            marginLeft: "30px",
            backgroundColor: "#262d40",
            color: "white"
          }}
          onChange={this.searchChangeHandler.bind(this)}
          placeholder={<FaSistrix />}
          placeholder="Search..."
        />
        <div className="button-div">
          <button
            type="button"
            className="btn btn-outline-primary"
            id="popular"
            onClick={this.buttonHandler.bind(this)}
          >
            Popular
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            id="top_rated"
            onClick={this.buttonHandler.bind(this)}
          >
            Toprated
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            id="upcoming"
            onClick={this.buttonHandler.bind(this)}
          >
            Upcoming
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            id="now_playing"
            onClick={this.buttonHandler.bind(this)}
          >
            Playing
          </button>
        </div>
        <div
          style={{
            position: "relative",
            maxHeight: "430px",
            overflowY: "scroll",
            overflowX: "hidden"
          }}
        >
          {this.state.rows}
        </div>
      </div>
    );
  }
}

export default App;
