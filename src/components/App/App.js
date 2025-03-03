import React from "react";
import Game from "../Game/Game";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Game dataUrl={"image_relations.json"}/>
    </div>
  );
}

export default App;
