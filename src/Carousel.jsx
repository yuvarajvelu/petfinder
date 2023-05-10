import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };
  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };
  handleClick = (e) => {
    this.setState({
      active: +e.target.dataset.index, //converting the value coming as string to number
    });
  };
  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((pic, ind) => (
            // eslint-disable-next-line
            <img
              key={ind}
              src={pic}
              data-index={ind}
              onClick={this.handleClick}
              alt="animal"
              className={ind == active ? "active" : ""}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
