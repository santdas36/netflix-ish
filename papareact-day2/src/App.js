import React, { useState, useEffect } from "react";
import Header from "./Header";
import FeaturedMovie from "./FeaturedMovie";
import { Route, Redirect, useHistory } from "react-router-dom";
import List from "./List";
import BigList from "./BigList";
import Results from "./Results";
import Loading from "./Loading";
import Footer from "./Footer";
import Login from './Login';
import About from './About';
import Profile from './Profile';
import "./App.css";
import axios from './axios';
import {auth} from './firebase';
import requests, { imageLargeBase, imageBase, fetchMovie, fetchTV, fetchSearchString, fetchRecommendedMovies, fetchRecommendedTV, fetchSimilarMovies, fetchSimilarTV } from './api';

const listOneInit = {
	title: "Latest & Trending Movies",
	fetchId: requests.fetchTrendingMovies,
	type: 'movie',
  }
  const listTwoInit = {
	title: "Top Rated Series For You",
	fetchId: requests.fetchTrendingTV,
	type: 'tv',
  }

function App() {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState([]);
  const [featTitle, setFeatTitle] = useState("Today's Featured Film");
  const [truncLine, setTruncLine] = useState(2);
  const [videoId, setVideoId] = useState('');
  const [featuredCertification, setFeaturedCertification] = useState('');
  const [movieId, setMovieId] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [listOne, setListOne] = useState(listOneInit);
  const [listTwo, setListTwo] = useState(listTwoInit);
  const [firstRun, setFirstRun] = useState(true);
  const [user, setUser] = useState(null);
  let popularVisible = listOne === listOneInit;
  
    useEffect(()=> {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if(user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});
		
		return unsubscribe;
	}, []);
  
  const errorOccurred = (error) => {
	setLoading(false);
	alert('Something went wrong.');
	console.log(error.message);
  }
  
  const initRun = async () => {
  	setLoading(true);
  	setFirstRun(true);
	  axios.get(requests.fetchPopularMovies).then((response) => {
      	let tempMov = response.data.results;
      	setTopRatedMovies(tempMov);
      	let getFeatured = tempMov[Math.floor(Math.random() * tempMov.length)].id;
      	getMovieInfo(getFeatured);
      	setFeatTitle("Today's Featured Film");
	 	setLoading(false);
       }).catch((err) => errorOccurred(err));
	 }
	 
  const resetApp = () => {
  	setLoading(true);
  	setListOne(listOneInit);
  	setListTwo(listTwoInit);
  	setTimeout(() => initRun(), 1000);
  }
  
  const getMovieInfo = async (movieInfo) => {
    axios.get(fetchMovie(movieInfo)).then((response) => {
      setFeaturedMovie(response.data);
	 let releaseDates = response.data.release_dates.results;
	 for (let i = 0; i < releaseDates.length; i++) {
		if (releaseDates[i].iso_3166_1 === 'US' || releaseDates[i].iso_3166_1 === 'IN') {
			setFeaturedCertification(releaseDates[i].release_dates[0].certification);
			break;
		}
	 };
      let videos = response.data.videos.results;
      let vidId = videos[0].key;
	 if (!firstRun) {
	 	setListTwo({
			title: 'Similar Movies',
			fetchId: fetchSimilarMovies(movieInfo),
			type: 'movie',
	 	});
	 	setListOne({
			title: 'You May Also Like',
			fetchId: fetchRecommendedMovies(movieInfo),
			type: 'movie',
	 	});
	 }
	 setTimeout(()=>setFirstRun(false), 1000);
      setVideoId(vidId);
	 setLoading(false);
    }).catch((err) => errorOccurred(err));
  }
  const getTVInfo = async (movieInfo) => {
    axios.get(fetchTV(movieInfo)).then((response) => {
      setFeaturedMovie(response.data);
	 let contentRating = response.data.content_ratings.results;
	 for (let i = 0; i < contentRating.length; i++) {
		if (contentRating[i].iso_3166_1 === 'US') {
			setFeaturedCertification(contentRating[i].rating);
			break;
		}
	 };
      let videos = response.data.videos.results;
      let vidId = videos[0].key;
	 if (!firstRun) {
	 	setListTwo({
			title: 'Similar Series',
			fetchId: fetchSimilarTV(movieInfo),
			type: 'tv',
	 	});
	 	setListOne({
			title: 'You May Also Like',
			fetchId: fetchRecommendedTV(movieInfo),
			type: 'tv',
	 	});
	 }
	 setFirstRun(false);
      setVideoId(vidId);
	 setLoading(false);
    }).catch((err) => errorOccurred(err));
  }

  useEffect(() => {
	initRun();
  }, []);

  useEffect(() => {
    if (movieId.media_type === 'tv') {
      getTVInfo(movieId.id);
      setTruncLine(2);
      setFeatTitle('Series');
    }
    if (movieId.media_type === 'movie') {
      getMovieInfo(movieId.id);
      setTruncLine(2);
      setFeatTitle('Movie');
    }
    setTimeout(() => {
      window.scrollTo(0, 0);
      setShowResults(false);
    }, 100);
  }, [movieId]);

  useEffect(() => {
    if (searchResult[0]?.id) {
      setShowResults(true);
      setLoading(false);
    }
  }, [searchResult]);

  var overlayStyle = {
    backgroundImage: `url(${imageLargeBase}${featuredMovie.backdrop_path || featuredMovie.poster_path})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top right',
  }

  return (
    <div className="app">
		{loading && <Loading />}
		
		<Header setLoading={setLoading} resetApp={resetApp} popularVisible={popularVisible} setSearchResult={setSearchResult} />

		<Route path='/about'>
			<About/>
		</Route>
		
		<Route path='/login'>
			{user ? <Redirect to="/profile" /> : <Login/>}
		</Route>
		
		<Route path='/profile'>
			{user ? <Profile user={user}/> : <Redirect to="/login" />}
		</Route>
		
		<Route exact path='/'>
			<>
			{showResults ?
				<Results setLoading={setLoading} searchResult={searchResult} setMovieId={setMovieId} /> : 
				<FeaturedMovie featuredCertification={featuredCertification} overlayStyle={overlayStyle} title={featTitle} featuredMovie={featuredMovie} videoId={videoId} setTruncLine={setTruncLine} truncLine={truncLine} />}

			{popularVisible && <List setLoading={setLoading} setMovieId={setMovieId} />}
				<BigList notGradient={popularVisible} setLoading={setLoading} setMovieId={setMovieId} type={listOne.type} title={listOne.title} fetchId={listOne.fetchId}/>
				<BigList notGradient={true} setLoading={setLoading} setMovieId={setMovieId} type={listTwo.type} title={listTwo.title} fetchId={listTwo.fetchId}/>
			</>
		</Route>
		
		<Footer />

    </div>
  );
}

export default App;