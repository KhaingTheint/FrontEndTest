import React, { Component } from "react";
import "./WatchList.css";
import WatchMovie from "./WatchMovie.js";
import MovieBox from "./MovieBox.js";
import $ from "jquery";

class WatchList extends Component {
  state = { watchList: [] };
  constructor(props) {
    super(props);
    this.displayWatchlist = this.displayWatchlist.bind(this);
  }
  componentDidMount() {
    this.displayWatchlist();
  }
  //display the movies that are in watchlist
  displayWatchlist() {
    console.log("in display watchlist");
    var movieBoxes = [];
    var watchlist = [];
    var savedWatchlist = JSON.parse(localStorage.getItem("watchlist"));
    if (savedWatchlist) {
      watchlist = savedWatchlist;
    }
    watchlist.forEach(movie => {
      const movieBox = (
        <WatchMovie
          displayWatchlist={this.displayWatchlist}
          key={movie.id}
          movie={movie}
        />
      );
      movieBoxes.push(movieBox);
    });
    this.setState({ rows: movieBoxes });
  }
  //search movies by input keyword
  performSearch(searchTerm) {
    const urlString =
      "https://api.themoviedb.org/3/search/movie?api_key=4ccda7a34189fcea2fc752a6ee339500&query=" +
      searchTerm;

    $.ajax({
      url: urlString,
      success: searchResults => {
        console.log("fetch data success");
        const results = searchResults.results;
        var movieBoxes = [];
        results.forEach(movie => {
          movie.poster = "https://image.tmdb.org/t/p/w185" + movie.poster_path;
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
      this.displayWatchlist();
    } else {
      this.performSearch(searchTerm);
    }
  }
  render() {
    return (
      <div className="App">
        <div className="watchlist-title-box">
          My Watchlist
          <hr />
        </div>

        <input
          className="search-box"
          style={{
            fontSize: 20,
            display: "block",
            width: "95%",
            marginTop: 30,
            marginBottom: 20,
            borderTop: 0,
            borderLeft: 0,
            borderRight: 0,
            borderBottom: "0.3px solid #8091A5",
            marginLeft: "30px",
            backgroundColor: "#262d40",
            color: "white"
          }}
          onChange={this.searchChangeHandler.bind(this)}
          placeholder="Search..."
        />
        <div
          style={{
            position: "relative",
            height: "520px",
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

export default WatchList;
