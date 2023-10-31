import "./App.scss";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "./components/card/Card";
import { deleteMessages } from "./toastifyMessages";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      filteredPosts: [],
      inputValue: "",
      isLoading: true,
    };
  }

  // when the component is rendered get data
componentDidMount() {
  axios("https://615235804a5f22001701d687.mockapi.io/api/movies")
    .then((response) => {
      // HTTP isteği başarılı oldu
      this.setState({
        posts: response.data,
        filteredPosts: response.data,
        isLoading: false,
      });
    })
    .catch((error) => {
      // HTTP isteği hata verdi
      console.error("Hata oluştu: ", error);
      this.setState({
        isLoading: false,
      });
      // Hata durumunu kullanıcıya bildirebilirsiniz, örneğin toast ile
      toast.error("Veri alınamadı. Lütfen tekrar deneyin.");
    });
}

  handleSearch = (e) => {
    const filteredPosts = this.state.posts.filter(
      (post) =>
        post.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        post.director.toLowerCase().includes(e.target.value.toLowerCase())
    );

    this.setState({
      inputValue: e.target.value,
      filteredPosts: filteredPosts,
    });
  };

  setData = (data) => {
    this.setState({
      filteredPosts: data,
      posts: data,
    });
  };

  // deletes movie and updates data
  deleteItem = (movieID) => {
    const newPosts = this.state.posts.filter((item) => item.id !== movieID);
    this.setData(newPosts);

    // displays toast message randomly
    let random = Math.floor(Math.random() * 9);
    toast(deleteMessages[random]);
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
        {this.state.isLoading ? (
          <div className="loader__container">
            <div className="loader">
              <span></span>
              <span></span>
              <h3>Wait, loading...</h3>
            </div>
          </div>
        ) : (
          <Card
            data={this.state.filteredPosts}
            deleteItem={this.deleteItem}
          />
        )}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          transition={Flip}
          theme="dark"
        />
      </div>
    );
  }
}

export default App;
