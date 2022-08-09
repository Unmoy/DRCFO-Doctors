import React from "react";
import "./Consultation.css";
import image1 from "../../assets/images/c1.png";
import image2 from "../../assets/images/c2.png";
import image3 from "../../assets/images/c3.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
const Consultation = () => {
  return (
    <div className="consultation_carousel">
      <div>
        <h1>Online Video Consultation</h1>
        <p>
          Earn up too 1,20,000 with video consultation. Onboard Yourself Today
        </p>
      </div>
      <div className="carousel_wrapper">
        <Carousel
          showArrows={false}
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
        >
          <div>
            <img src={image1} alt="" />
          </div>
          <div>
            <img src={image2} alt="" />
          </div>
          <div>
            <img src={image3} alt="" />
          </div>
        </Carousel>
      </div>
      <div className="terms">
        <input type="checkbox" name="terms" id="" />
      </div>
      <div>
        <button>Continue</button>
      </div>
    </div>
  );
};

export default Consultation;
