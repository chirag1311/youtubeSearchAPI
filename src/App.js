import "./styles.css";

import React from "react";
import SearchBar from "../components/SearchBar";

export default function App() {
  return (
    <div className="container">
      <h1 className="title">Youtube Search</h1>
      <SearchBar />
    </div>
  );
}
