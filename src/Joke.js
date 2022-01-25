import React, { Component } from 'react';
import "./Joke.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowUp,faArrowDown } from '@fortawesome/free-solid-svg-icons'

 class Joke extends Component {
   constructor(props) {
     super(props);
     this.state={}
     this.upVote= this.upVote.bind(this)
     this.downVote= this.downVote.bind(this)
   }
   upVote(){
     console.log('Increasing the Vote');
     this.props.upVoter(this.props.id);
    }
    downVote(){
      console.log('Decreasing the Vote');
      this.props.downVoter(this.props.id);
   }

  
  render() {
    let emoji = "🙂";
    if(this.props.vote<0){
    if(this.props.vote >= -5  ) emoji = "🤕"  
    else if(this.props.vote< -5 && this.props.vote >= -10  ) emoji = "😔"               
    else if(this.props.vote< -10 && this.props.vote >= -15  ) emoji = "😡"               
    else if(this.props.vote< -15 ) emoji = "☠️"   
    }
    else{
    if(this.props.vote <= 3  ) emoji = "☺️"  
    else if(this.props.vote<= 7 && this.props.vote > 3 ) emoji = "😃"               
    else if(this.props.vote<= 10 && this.props.vote > 7 ) emoji = "😁"               
    else emoji="🤣"                
    }            
    return <div className='Joke'>
      
      <div className="Joke-buttons">
        <FontAwesomeIcon icon={faArrowUp} onClick={this.upVote} className='fas fa-arrow-up'/>
        <span className='Joke-votes'>{this.props.vote}</span>
        <FontAwesomeIcon icon={faArrowDown} onClick={this.downVote} className='fas fa-arrow-down'/>
      </div>
      <div className="Joke-text">{this.props.text}</div>
      <div className="Joke-smiley">{emoji}</div>
      
  
    </div>;
  }
}
export default Joke;
