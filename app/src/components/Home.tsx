import * as React from "react";

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

  return (
    <div className="full-image-background" style={imageStyle}>
      <header className="jumbotron jumbotron-fluid">
        <div className="container d-flex flex-column justify-content-between align-items-center">
          <h1 className="display-4">TodoApp</h1>
          <span>- Apping up your life, Todo by Todo.</span>
          </div>
      </header>
    </div>
  );
};

export default Home;
