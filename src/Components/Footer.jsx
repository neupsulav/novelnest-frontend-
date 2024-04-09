import React from "react";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { FiYoutube } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="footer">
      <div className="footerFirstpart">
        <div className="footerIcons">
          <CiFacebook />
          <FaInstagram />
          <CiTwitter />
          <FiYoutube />
        </div>
        <p>© NovelNest</p>
        <p>All Rights Reserved</p>
      </div>
      <div className="footerSecondPart">
        <p>
          Have a feedback?{" "}
          <span
            onClick={() => {
              navigate("/contactus");
            }}
          >
            GET IN TOUCH
          </span>
        </p>
        <p>
          <span>CONTACT</span>
          <span>TERM OF USE</span>
          <br />
          <span>PRIVACY POLICY</span>
          <span>COOKIES</span>
          <span>SETTINGS</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
