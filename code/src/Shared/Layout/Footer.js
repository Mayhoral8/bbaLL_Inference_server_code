import React from "react";
import { FooterDiv, FooterCenter, Emails, IconDiv, Icon, FooterLinksDiv } from "./footer-style";
import { Link } from "react-router-dom";
import Subscribe from "../Subscribe/Subscribe";

const Footer = () => {
  return (
    <FooterDiv>
      <div className='footer-width'>
        <div className='top-section'>
          <Subscribe />
          <div className='contact'>
            <h3 className='footer-subtitle'>Contact Us</h3>
            <Emails>
              <li><span>General</span> : general@sportsinference.com</li>
              <li><span>Press</span> : press@sportsinference.com</li>
            </Emails>
          </div>
          <div className='contact'>
            <h3 className='footer-subtitle'>Follow Us</h3>
            <IconDiv>
              <Icon
                href="https://www.facebook.com/spibball"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fab fa-facebook"></i>
              </Icon>
              <Icon
                href="https://twitter.com/spi_bball"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fab fa-twitter"></i>
              </Icon>
              <Icon
                href="https://www.tiktok.com/@spi_bball"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fab fa-tiktok"></i>
              </Icon>
              <Icon
                href="https://www.instagram.com/spi_bball"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fab fa-instagram"></i>
              </Icon>
              <Icon
                href="https://www.pinterest.com/spi_bball"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fab fa-pinterest"></i>
              </Icon>
              <Icon
                href="https://www.tumblr.com/blog/spibball"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fab fa-tumblr"></i>
              </Icon>
            </IconDiv>
          </div>
        </div>

        <FooterCenter>
          <FooterLinksDiv>
            <Link to="/terms-of-use">Terms of Use</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
          </FooterLinksDiv>
          <div>&copy;{new Date().getFullYear()} Sports Inference, Inc. All Rights Reserved.</div>
        </FooterCenter>
      </div>
    </FooterDiv>
  );
};

export default Footer;
