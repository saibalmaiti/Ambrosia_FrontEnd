import React from "react";
import "../styles.css";
import { API, CLOUDFRONT } from "../backend";
import Base from "./Base";
import Navigation from "./Navigation";
import "./Home.css";

const Home = () => {
  console.log("API IS", API);
  console.log("Image CDN IS", CLOUDFRONT);

  const Processitem=(props)=>(
    <div className="col-lg-4 col-md-8">
        <div className="how-it-work-item ">
            <h4 className="title">
            <img src={props.src} alt="..." style={{height:"100px",width:"100px",padding:"10px"}}/>
            {props.title}
            </h4>
            <p>{props.body}</p>
        </div>
    </div>
  )

  return (
    <div>
      <Navigation/>
      <Base title1="Welcome to" title2="Ambrosia">
        <section className="how-it-work-area">
          <div className="contanier">
            <div className="how-it-work-box">
              {/* Title of The Section */}
              <div className="row justify-content-center" style={{marginBottom:"30px"}}>
                <div className="col-lg-6">
                  <div className="text-center">
                  <img src={String(CLOUDFRONT)+"banner/title-shape.png"} alt="..."/>
                    <h3>How it works</h3>
                    <p>The Process of our service</p>
                  </div>
                </div>
              </div>
              {/* Body of the Section */}
              <div className="row justify-content-center">
                <Processitem  src={String(CLOUDFRONT)+'banner/hiw_login.png'} title="Login To Account" body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis scelerisque sapien. Suspendisse euismod nulla quis pellentesque aliquam. Nulla facilisi. Suspendisse at dolor sapien. Nulla facilisi. Etiam pretium sed dolor sit amet consequat. Phasellus interdum lectus nec ullamcorper auctor."/>
                <Processitem  src={String(CLOUDFRONT)+'banner/hiw_cart.png'} title="Add Product to Cart" body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis scelerisque sapien. Suspendisse euismod nulla quis pellentesque aliquam. Nulla facilisi. Suspendisse at dolor sapien. Nulla facilisi. Etiam pretium sed dolor sit amet consequat. Phasellus interdum lectus nec ullamcorper auctor."/>
                <Processitem  src={String(CLOUDFRONT)+'banner/hiw_checkout.png'} title="Checkout and Order Placed" body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis scelerisque sapien. Suspendisse euismod nulla quis pellentesque aliquam. Nulla facilisi. Suspendisse at dolor sapien. Nulla facilisi. Etiam pretium sed dolor sit amet consequat. Phasellus interdum lectus nec ullamcorper auctor."/>
              </div>
            </div>
          </div>
        </section>
      </Base>
    </div>
  );
}

export default Home;
