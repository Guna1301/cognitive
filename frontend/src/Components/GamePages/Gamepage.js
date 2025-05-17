import React from "react";
import "./Gamepage.css"; // Create a separate CSS file for styling
import AnagramCP from "./assests/Anagram_cp.jpg";
import ColourPatternCP from "./assests/ColourPatterns_cp.jpg.png";
import EmotionCP from "./assests/EmotionCover_pic.jpg";
import slidePuzzleCP from "./assests/slide puzzle.jpg";
import { useNavigate, Link } from "react-router-dom";

export default function Gamepage() {

  const navigate = useNavigate()

  return (
    <div className="gamepage-container">
      <h1 className="d-flex align-items-center justify-content-center mt-5">
        Activites
      </h1>
      <div className="row1">
        <div className="boxgamepage">
          <Link to="/AnagramGame">
          <img className="imganagram" src={AnagramCP}></img>
          </Link>
        </div>
        <div className="boxgamepage">
        <Link to="/ColourGame">
          <img className="imgcolourpattern" src={ColourPatternCP}></img>
        </Link>
        </div>
        <div className="boxgamepage">
        <Link to="/EmotionGame">
          <img className="imgemotion" src={EmotionCP}></img>
        </Link>
        </div>
      </div>

      <h1 className="d-flex align-items-center justify-content-center ">
        
      </h1>
      <div className="row1">
        <div className="boxgamepage">
        <Link to="/PuzzleGame">
          <img className="imgslide" src={slidePuzzleCP}></img>
        </Link>
        </div>
        <div className="boxgamepage">
        <Link to="/WackGame">
          <img className="wackamole" src={"https://img.gamedistribution.com/5905642773bc49738888210d0b2d3112-512x512.jpeg"}></img>
        </Link>
        </div>
      </div>
    </div>
  );
}

