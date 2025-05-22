import React from "react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <div>
      <Link to="/">
        <img src="https://my-aws-bucket-5365.s3.ap-south-1.amazonaws.com/assets/logo.png" 
        width="60"/>
      </Link>
    </div>
  );
}

export default Logo;
