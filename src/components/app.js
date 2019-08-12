import React, { Component } from 'react'
import MovieSearch from './movieSearch'
import axios from 'axios'

const baseUrl = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ?
					'http://localhost/mdb/api/' :
					'http://koganas.com/tmdb/api/'

class App extends Component {

	constructor() {
		super()
		this.state = {
			list: this.getUpcomingMovies(),
			imgSettings: this.getImgSettings(),
			loading: true			
		}
	}

	getUpcomingMovies() {
		axios.get(baseUrl)
			.then( res => {
				const movies = res.data;
				this.setState({
					list: movies,
					loading: false
				})
			})
			.catch( err => {
				console.log('No movies found');
				return null;
			})
	}

	getImgSettings() {
		axios.get(baseUrl+'img/')
			.then( res => {
				const imgData = res.data;
				this.setState({
					imgSettings: imgData
				})
			})
			.catch( err => {
				console.log('No API config found');
				return null;
			})		
	}

	render() {
		return (
			<MovieSearch
				movies={this.state.list}
				img={this.state.imgSettings}
				loading={this.state.loading}
			/>
		)
	}
}

export default App;
