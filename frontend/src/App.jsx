import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="w-[80%] m-auto">
      <Navbar />
      <hr />
      <Outlet />
    </div>
  );
}

export default App;
