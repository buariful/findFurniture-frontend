import logo from "./logo.svg";
import "./App.css";
import { Button } from "@material-tailwind/react";
import Abc from "./component/Abc";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="bg-red-500 text-green-600">
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button>Button</Button>
        <Abc />
      </header>
    </div>
  );
}

export default App;
