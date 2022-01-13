import React from "react";
import "../styles.css";
import { API, CLOUDFRONT } from "../backend";
import Base from "./Base";
import Navigation from "./Navigation";

export default function Home() {
  console.log("API IS", API);
  console.log("Image CDN IS", CLOUDFRONT);

  return (
    <div>
      <Navigation/>
      <Base title1="Welcome to" title2="Ambrosia">
        <div className="row">
          <div className="col-4">
            <button className="btn btn-success">TEST</button>
          </div>
          <div className="col-4">
            <button className="btn btn-success">TEST</button>
          </div>
          <div className="col-4">
            <button className="btn btn-success">TEST</button>
          </div>
        </div>
      </Base>
    </div>
  );
}
