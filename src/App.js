import "./styles.css";

import React from "react";
import InputKeyword from "../components/InputKeyword";

export default function App() {
  return (
    <div className="container">
      {/* <img className="logo" src = "" alt="Youtube Logo"/> */}
      <h1 className="title">Youtube Search</h1>
      <InputKeyword />
    </div>
  );
}
