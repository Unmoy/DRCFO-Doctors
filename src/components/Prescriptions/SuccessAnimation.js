import React from "react";
import Lottie from "react-lottie";
import * as animationData from "./SuccessAnimation.json";
const SuccessAnimation = () => {
  const defaultOptions = {
    loop: 0,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
};

export default SuccessAnimation;
