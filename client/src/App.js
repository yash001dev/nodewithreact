import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import React,{useState,useEffect} from "react";
import HomePage from './pages/homepage/homepage.component';

function App() {

  const [movieName,setMovieName]=useState('');
  const [review,setReview]=useState('');
  const [movieReviewList,setMovieList]=useState([]);

  useEffect(()=>{
    Axios.get('http://localhost:3001/api/get')
    .then((response)=>{
      setMovieList(response.data);
    })
  },[])

  const submitReview=()=>{
    Axios.post('http://localhost:3001/api/insert',{
      movieName:movieName,movieReview:review
    });
    
    setMovieList([...movieReviewList,{
      movieName:movieName,
      movieReview:review
    }
  ]);
  };

  const deleteReview=(movieName)=>{
    console.log("Delete:",movieName);
    Axios.delete(`http://localhost:3001/api/delete/${movieName}`);
  }

  return (
    <div className="App">
      {/* <h1>CRUD APPLICATION</h1>
      <div className="form">
        <label>Movie Name:</label>
        <input type="text" name="movieName" onChange={(e)=>setMovieName(e.target.value)}/>

        <label>Review:</label>
        <input type="text"
        name="review" onChange={(e)=>setReview(e.target.value)}/>

        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((data)=>{
          return (
            <div>
              <h1>{data.movieName}</h1>
              <p>{data.movieReview}</p>

              <button onClick={()=>deleteReview(data.movieName)}>Delete</button>
              <input type="text" id="updateInput"/>
              <button>Update</button>
            </div>
          )
        })}

      </div> */}
      <HomePage />
    </div>
  );
}

export default App;
