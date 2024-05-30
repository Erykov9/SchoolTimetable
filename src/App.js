import "./App.scss";
import Root from "./Root";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </div>
  );
}

export default App;
