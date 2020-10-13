import * as React from "react";
import { useState, useEffect } from "react";

import UserService from "../services/user.service";

const backgroundImage = require("../assets/todo-image.jpeg");
const imageStyle = {
  width: '100%',
  height: '800px',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'noRepeat',
  backgroundPosition: 'center'
};


const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="full-image-background" style={imageStyle}>
      <header className="jumbotron jumbotron-fluid">
        <div className="container d-flex flex-column justify-content-between align-items-center">
          <h1 className="display-4">{content}</h1>
          <span>- Making your life easier.</span>
          </div>
      </header>
    </div>
  );
};

export default Home;
