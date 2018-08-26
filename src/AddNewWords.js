import React, { Component } from "react";
import { Link } from 'react-router-dom';

let dataRef;

class AddNewWords extends Component{

    constructor(props){
        super(props);
        this.submitWords = this.submitWords.bind(this);
        this.state = {
            new_eng_word: '',
            new_nor_word: '',
            
        }
        
    }

    componentDidMount() {
        
        var database = window.firebase.database();
        dataRef = database.ref("/");
    }

    handleChange = e => {
        
        this.setState({
            [e.target.name] : e.target.value,
         })
       
    }

    submitWords(e) {

       var self = this;

        e.preventDefault();
        
        dataRef.push({
            english: this.state.new_eng_word,
            norwegian: this.state.new_nor_word
        }, function(error) {
            if (error) {
              alert("Sorry, there was an error")
            } else {
                alert("Successfully added")
                self.setState({
                    new_eng_word: '',
                    new_nor_word: '',
                })
            }
         }) 
    }    

    render(){
    return(
        <div className = "container-fluid">
        <div className = "row mt-5 ml-5">
                 <div className = "col-6 ">

                    <form onSubmit={this.submitWords}>
                   <div className = "form-group">
                        <h3 className ="headings">Add new words</h3>
                        <input
                        required
                        name = "new_eng_word"
                        type = "text"
                        onChange = {this.handleChange}
                        value = {this.state.new_eng_word}
                        className = "form-control forEng" 
                        placeholder = "english"
                        />

                        <input 
                        required
                        type = "text"
                        name = "new_nor_word"
                        onChange = {this.handleChange}
                        value = {this.state.new_nor_word}
                        className = "form-control forNor" 
                        placeholder = "norwegian"
                        />

                    </div>
                    <button type = "submit"  className="btn btn-light mb-2"> Add new definition </button>
                    </form>
                     <Link to={`/`}>
                       <button type="button" className="btn btn-dark mt-2"> Back </button>  
                    </Link>
                </div>
                </div> 


        </div>
    )
    }
}

export default AddNewWords;
