import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//import dictionary from './db/dictionary';
import Fuse from "fuse.js";
import AddNewWords from "./AddNewWords";

var options = {
    minMatchCharLength: 1,
	maxPatternLength: 32,
	location: 0,
	threshold: 0.0,
	keys: ["english"]
};

var fuse;

class Home extends Component {
	constructor(props) {

		super(props);

		this.handleChange = this.handleChange.bind(this);

		this.state = {
			english_word: "",
            norwegian_word: "",
            disabled: true
		};
	}

	componentWillMount() {}

	componentDidMount() {
		var self = this;
        var database = window.firebase.database();
        
		database.ref("/").once("value", function(snapshot) {
            self.setState({
                loading: false
            })
			var data = snapshot.val();
			let dictionary = [];
			for (var i in data) {
				dictionary.push(data[i]);
			}
            fuse = new Fuse(dictionary, options);
            
		});
	}

	componentWillReceiveProps(nextProps) {}

	handleChange = e => {
		e.preventDefault();

		this.setState({
			english_word: e.target.value
		});

		var searchWord = fuse.search(e.target.value);

		for (var i in searchWord) {
			console.log(searchWord[i].norwegian),
				this.setState({
					norwegian_word: searchWord[i].norwegian
				});

			console.log(this.state.norwegian_word);
		}
		if (e.target.value.length == 0) {
			this.setState({
				norwegian_word: ""
			});
		}
	};

	render() {
		return (
			<div className="container-fluid">
            <div className="row mt-5 ml-5">
            <div className= "col">
            <h2 className ="headingMain" > English - Norwegian dictionary</h2>
            </div>
            </div>
				<div className="row mt-5 ml-5">
					<div className="col-6">
						<form onSubmit={this.submitSearch}>
							<div className="form-group">
								<h3 className ="headings">Enter the english word</h3>
								<input
									required
									type="text"
									onChange={this.handleChange}
									value={this.state.english_word}
									className="form-control"
                                    placeholder="e.g. hi..."
                                    disabled={this.state.loading}
								/>
							</div>
						</form>

						<Link to={`/new`}>
							<button type="button" className="btn btn-light">
								Add new words
							</button>
						</Link>
					</div>

					<div className="col-6">
						<h3 className ="headings"> 
                        Translation
                        </h3>
						
                        <p className = "translationText"> {this.state.norwegian_word}
                        </p>
                        
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		app: state.app
	};
}

export default connect(
	mapStateToProps,
	{}
)(Home);
