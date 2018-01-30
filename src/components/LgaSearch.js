const React = require("react");
const ReactDOM = require("react-dom");
const styles = require("./LgaSearch.scss");

class LgaSearch extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log(event.target["0"].value);
    this.props.onLocaleIntent(event.target["0"].value);
  }

  render() {
    return ReactDOM.createPortal(
      <div className={styles.wrapper}>
        <form onSubmit={this.handleSubmit}>
          <input />
        </form>
        <div>{this.props.localGovernmentArea}</div>
      </div>,
      document.querySelector(".addressinput")
    );
  }
}

module.exports = LgaSearch;