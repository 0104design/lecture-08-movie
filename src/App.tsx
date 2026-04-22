import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./routes/Home.tsx";
import Search from "./routes/Search.tsx";

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/search"} element={<Search />}/>
    </Routes>
  </BrowserRouter>
}

export default App;