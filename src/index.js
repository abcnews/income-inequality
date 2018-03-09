const React = require("react");
const { render } = require("react-dom");
const spanify = require("spanify");

require("./lib/modernizr.js"); // Detect browser features

const PROJECT_NAME = "income-comparisons";
require("babel-polyfill"); // for async/await to work

const root = document.querySelector(`[data-${PROJECT_NAME}-root]`);

const scrollyteller = require("./lib/scrollyteller/src/index.js").loadOdysseyScrollyteller(
  "",
  "u-full",
  "mark"
);

function init() {
  spanify.hashify({ hashList: ["addressinput", "incomeinput"] }); // Turn anchor hash tags into divs
  console.log(scrollyteller);
  const App = require("./components/App");
  render(
    <App projectName={PROJECT_NAME} scrollyteller={scrollyteller} />,
    root
  );
}

init();

if (module.hot) {
  module.hot.accept("./components/App", () => {
    try {
      init();
    } catch (err) {
      const ErrorBox = require("./components/ErrorBox");
      render(<ErrorBox error={err} />, root);
    }
  });
}

if (process.env.NODE_ENV === "development") {
  console.debug(`[${PROJECT_NAME}] public path: ${__webpack_public_path__}`);
}

