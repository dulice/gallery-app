import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import FileImage from './components/fileImage';
import Gallery from "./components/gallery";

function App() {
  return (
    <div className="App">
      <FileImage />
      <Gallery />
    </div>
  );
}

export default App;
