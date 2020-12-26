const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express()
const mysql=require('mysql')

const db=mysql.createPool({
    host:'localhost', 
    user:'root',
    password:'',
    database:'cruddatabase',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/get',(req,res)=>{
    const sqlSelect=
    "SELECT * FROM movie_reviews";

    db.query(sqlSelect,(err,result)=>{
        res.send(result);
    })
})

app.post("/api/insert",(req,res)=>{

    const movieName=req.body.movieName;
    const movieReview=req.body.movieReview;

    console.log("MovieReview:",movieReview);
    const sqlInsert="INSERT INTO movie_reviews (movieName,movieReview) VALUES (?,?)"
    db.query(sqlInsert,[movieName,movieReview],(err,result)=>{
        console.log(result);
    })
});

app.delete('/api/delete/:movieName',(req,res)=>{
    const movieName=req.params.movieName;
    const sqlDelete="DELETE FROM movie_reviews WHERE movieName=?";
    db.query(sqlDelete,movieName,(err,result)=>{
        if(err) console.log(err);
    })
})

app.put('/api/update',(req,res)=>{
    const review=req.body.movieReview
    const name=req.body.movieName;
    const sqlUpdate='UPDATE SET movie_reviews movieReview=? WHERE movieName=?'
    db.query(sqlUpdate,[review,name],(err,result)=>{

    })
})

// For DEMO Purpose.
// app.get('/',(req,res)=>{

//     const sqlInsert="INSERT INTO movie_reviews (movieName,movieReview) VALUES('inception','good movie');"

//     db.query(sqlInsert,(err,result)=>{
//         res.send('hello Everyone');
//     })
    
// });

app.listen(3001,()=>{
    console.log('running on port 3001');
});
