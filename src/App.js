import Homepage from "./components/home/HomePage";
import Wallpaper from "./components/home/Wallpaper";
import Restaurant from "./components/restaurant/Restaurant";
import SearchPage from "./components/search/SearchPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <main className="container-fluid p-lg-0 px-5 px-sm-5 main">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/quick-search" element={<SearchPage />} />
          <Route path="/restaurant/:id" element={<Restaurant />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
