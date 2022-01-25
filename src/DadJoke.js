import React, { Component } from 'react';
import axios from "axios"
import Joke from "./Joke"
import "./Loader.css"
import "./DadJoke.css"
 class DadJoke extends Component {
     constructor(props) {
         super(props);
         this.state = {jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),Votes:[0,0,0,0,0,0,0,0,0,0], isLoading:JSON.parse(window.localStorage.getItem("isloading") || true)}
         this.upVoter = this.upVoter.bind(this);
         this.downVoter = this.downVoter.bind(this);
         this.handleClick = this.handleClick.bind(this);
         this.Shuffler= this.Shuffler.bind(this);
        //  console.log(this.state);
     }
      componentDidMount() {
        //  console.log('In Component Did Mount');
        this.Shuffler();
     }

     async Shuffler(){
      //  console.log("Shuffling");
      //  console.log(this.state.jokes.length);
      while(this.state.jokes.length<10){
        let res = await axios.get(` https://icanhazdadjoke.com/`,{headers:{Accept : 'application/json'}});
        // console.log(res.data.joke);
        // console.log(this.state.jokes.includes(res.data.joke));
        if(!this.state.jokes.includes(res.data.joke)){
        this.setState(st=>({
          jokes:[...st.jokes,res.data]
        }))
          if(this.state.jokes.length===9){
            this.setState({isLoading:false})
          }
        }
        }
        setTimeout(()=>{ 
            // console.log("Adding to the LOcak Storage")
          // window.localStorage.setItem("Jokes","HI");
          // console.log(JSON.stringify(this.state.Jokes));
          window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
          window.localStorage.setItem("isloading", this.state.isLoading)
        

          // window.localStorage.setItem("Jokes",JSON.stringify(this.state.jokes));
        },1000)
     }
    //  componentDidUpdate(){
    //  }

     upVoter(idx){    
      let vote = this.state.Votes;
      vote[idx] = vote[idx]+1;
      this.setState({Votes:[...vote]})
     }
     downVoter(idx){    
      let vote = this.state.Votes;
      vote[idx] = vote[idx]-1;
      this.setState({Votes:[...vote]})
     }

     handleClick(){
      this.setState({jokes:[],Votes:[0,0,0,0,0,0,0,0,0,0],isLoading:true})
      setTimeout(()=>{ 
        
        this.Shuffler();
      },500)
      
    }
  render() {
    // const sortJoke = this.state.jokes.sort((a,b)=> ())
    const Jokes = this.state.jokes.map((j,idx)=>(<Joke text={j.joke} vote={this.state.Votes[idx]} key={idx} id={idx} upVoter={this.upVoter} downVoter={this.downVoter}/>));

     
    return <div>
      { this.state.isLoading? 
      <div className="cs-loader">
      <div className="cs-loader-inner">
        <label>●</label>
        <label>●</label>
        <label>●</label>
        <label>●</label>
        <label>●</label>
        <label>●</label>
      </div>
    </div> : <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title"><span>Dad</span> Jokes </h1>
          <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' alt="Dad Jokes" />
          <button className="JokeList-getmore"onClick={this.handleClick}>Shuffle!!</button>
        </div>
        <div className="JokeList-jokes">
          {Jokes}
        </div>
        </div>
    }
    </div>;
  }
}

export default DadJoke
