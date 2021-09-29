import "./App.scss";
import React from "react";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import Card from "./components/card/Card";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      filteredPosts: [],
      inputValue: "",
    };
  }

  componentDidMount() {
    axios("https://615235804a5f22001701d687.mockapi.io/api/movies").then(
      (posts) => {
        this.setState({
          posts: posts.data,
          filteredPosts: posts.data,
        });
      }
    );
  }

  handleSearch = (e) => {
    const filteredPosts = this.state.posts.filter(
      (post) =>
        post.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        post.director.toLowerCase().includes(e.target.value.toLowerCase())
    );

    this.setState({
      inputValue: e.target.value,
      filteredPosts,
    });
  };

  setData = (data) => {
    this.setState({
      filteredPosts: data,
      posts: data,
    });
  };

  render() {
    return (
      <div className="App">
        <header>
          <a
            href="https://www.imdb.com/user/ur58116738/?ref_=nv_usr_prof_2"
            target="_blank"
            rel="noreferrer"
            title="IMDb :P"
          >
            <img
              src="https://cdn4.iconfinder.com/data/icons/logos-brands-5/24/imdb-512.png"
              alt="IMDb Logo"
            />
          </a>
          <div className="search__container">
            <AiOutlineSearch className="search__icon" />
            <input
              type="text"
              value={this.state.inputValue}
              onChange={this.handleSearch}
              placeholder="Search"
            />
          </div>
        </header>
        <Card data={this.state.filteredPosts} setData={this.setData} />
      </div>
    );
  }
}

export default App;
