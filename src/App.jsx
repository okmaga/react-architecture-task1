import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { NavBar } from "./components/NavBar";
import PageLoader from "./components/HOC/PageLoader";

function App() {
  return (
    <>
      <NavBar />
      <main className="main">
        <Routes>
          <Route path="/" element={<PageLoader page="Home" />} />
          <Route path="/login" element={<PageLoader page="Login" />} />
          <Route path="/characters">
            <Route index element={<PageLoader page="Characters" isPrivate />} />
            <Route
              path=":id"
              element={<PageLoader page="SingleCharacter" isPrivate />}
            />
          </Route>
          <Route path="/locations">
            <Route index element={<PageLoader page="Locations" isPrivate />} />
            <Route
              path=":id"
              element={<PageLoader page="SingleLocation" isPrivate />}
            />
          </Route>
          <Route path="/episodes">
            <Route index element={<PageLoader page="Episodes" isPrivate />} />
            <Route
              path=":id"
              element={<PageLoader page="SingleEpisode" isPrivate />}
            />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
