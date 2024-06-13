import React from "react";
import "./Footer.scss";

const Footer: React.FC = (): JSX.Element => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p>
          Created by
          <a
            target="_blank"
            href="https://aulanchik.netlify.app"
            rel="noopener noreferrer"
          >
            Artyom Ulanchik
          </a>
        </p>
        <p>
          Powered by
          <a
            target="_blank"
            href="https://firebase.google.com"
            rel="noopener noreferrer"
          >
            Firebase
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
