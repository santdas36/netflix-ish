import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import Rating from "@material-ui/lab/Rating";
import TextTruncate from "react-text-truncate";
import defaultImage from "./assets/default.jpg";
import numeral from "numeral";
import "./BigList.css";
import axios from './axios';
import requests, { imageBase } from './api';

function BigList({ fetchId, title, setMovieId, setLoading, type, notGradient }) {
  const [thisMovies, setThisMovies] = useState([]);

  useEffect(() => {
	const fetchData = async () => {
    		axios.get(fetchId).then((response) => {
      		setThisMovies(response.data.results);
    		}).catch((err) => errorOccurred(err));
	}
	
	fetchData();
  }, [fetchId]);

  const errorOccurred = (error) => {
	setLoading(false);
	alert('Something went wrong.');
	console.log(error.message);
  }

  const scrollHorizontally = (e) => {
    let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    e.target.scrollLeft -= (delta * 40);
    e.preventDefault();
  }

  const handleClick = (movie) => {
    movie.media_type = type;
    setMovieId(movie);
    setLoading(true);
  }

  const getReleaseYear = (date) => {
    let year = new Date(date);
    return year.getFullYear();
  }

  return (
    <div className={`list biglist ${!notGradient ? "bigList_gradient" : ""}`}>

			<div class="list__trending list__big">
				<h4>{title}</h4>
				<div onWheel={(e) => scrollHorizontally(e)} class="list__items list__items-big">
					{ thisMovies?.slice(0, 10).map((movie) =>
						(<div class="list__item" key={movie.id} onClick={() => handleClick(movie)}>
							<img loading="lazy" onError={(e) => {e.target.onerror = null; e.target.src = defaultImage }} src={`${imageBase}${movie.poster_path || movie.backdrop_path}`} />
							<div className="list__itemInfo">
								<h5 className="list__itemTitle">{movie.title || movie.original_title || movie.name || movie.original_name}<span className="list__itemYear">({getReleaseYear(movie.release_date || movie.first_air_date)})</span></h5>
								<TextTruncate
									line={2}
									element="p"
									containerClassName="list__itemOverview"
									truncateText="…"
									text={movie.tagline || movie.overview}
								/>
								<div className="list__rating">
									<Rating name="movie-rating" className="movieRating" value={(movie.vote_average / 2) || 0} precision={0.5} icon={<StarRoundedIcon fontSize="inherit" readOnly />}/>
									<small className="list__likes">{numeral(movie.vote_average / 2).format('0.0')}</small>
								</div>
							</div>
						</div>)
					)}
				</div>
			</div>

		</div>
  );
}

export default BigList;