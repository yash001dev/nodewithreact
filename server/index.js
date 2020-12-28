const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express()
const mysql=require('mysql')

const db=mysql.createPool({
    host:'localhost', 
    user:'root',
    password:'',
    database:'aviramedicure',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

// app.get('/api/get',(req,res)=>{
//     const sqlSelect=
//     "SELECT * FROM movie_reviews";

//     db.query(sqlSelect,(err,result)=>{
//         res.send(result);
//     })
// })

// app.post("/api/insert",(req,res)=>{

//     const movieName=req.body.movieName;
//     const movieReview=req.body.movieReview;

//     console.log("MovieReview:",movieReview);
//     const sqlInsert="INSERT INTO movie_reviews (movieName,movieReview) VALUES (?,?)"
//     db.query(sqlInsert,[movieName,movieReview],(err,result)=>{
//         console.log(result);
//     })
// });

// app.delete('/api/delete/:movieName',(req,res)=>{
//     const movieName=req.params.movieName;
//     const sqlDelete="DELETE FROM movie_reviews WHERE movieName=?";
//     db.query(sqlDelete,movieName,(err,result)=>{
//         if(err) console.log(err);
//     })
// })

// app.put('/api/update',(req,res)=>{
//     const review=req.body.movieReview
//     const name=req.body.movieName;
//     const sqlUpdate='UPDATE SET movie_reviews movieReview=? WHERE movieName=?'
//     db.query(sqlUpdate,[review,name],(err,result)=>{

//     })
// })

// For DEMO Purpose.
// app.get('/',(req,res)=>{

//     const sqlInsert="INSERT INTO movie_reviews (movieName,movieReview) VALUES('inception','good movie');"

//     db.query(sqlInsert,(err,result)=>{
//         res.send('hello Everyone');
//     })
    
// });


//Doctor CRUD

    //Get Operation
    app.get('/api/doctor/get',(req,res)=>{
        const sqlSelect=
        "SELECT * FROM doctor";
    
        db.query(sqlSelect,(err,result)=>{
            res.send(result);
        })
    })

    //Post Operation
    app.post("/api/doctor/insert",(req,res)=>{
        console.log(req.body);
        const name=req.body.name;
        const email=req.body.email;
        const number=req.body.number;
        const area=req.body.area;
        const city=req.body.city;

        const sqlInsert="INSERT INTO doctor(name,email,number,area,city) VALUES (?,?,?,?,?)"
        db.query(sqlInsert,[name,email,number,area,city],(err,result)=>{
            console.log(err);
        })
    });
    
    //Delete Operation
    app.delete("/api/doctor/delete/:doctorID",(req,res)=>{
        const doctorID=req.params.doctorID;
        const sqlDelete="DELETE FROM doctor where id=?";
        db.query(sqlDelete,doctorID,(err,result)=>{
            if(err) console.log(err);
        })
    })

    //Update Operation
    // app.put('/api/doctor/update',(req,res)=>{
    //     const review=req.body.movieReview
    //     const name=req.body.movieName;
    //     const sqlUpdate='UPDATE SET movie_reviews movieReview=? WHERE movieName=?'
    //     db.query(sqlUpdate,[review,name],(err,result)=>{
    
    //     })
    // })






app.listen(3001,()=>{
    console.log('running on port 3001');
});
