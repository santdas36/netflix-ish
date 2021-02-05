import React from "react";
import "./Footer.css";
import tmdbIcon from "./assets/tmdb.svg";

function Footer() {
  return (
    <div className="footer">
			<img src={tmdbIcon} />
			<p>
				<a href="https://dashsantosh.ga">@santdas36 </a> | <a href="https://github.com/santdas36"> GitHub</a>
			</p>
		</div>
  )
}
export default Footer;