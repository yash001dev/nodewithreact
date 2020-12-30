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

//Chemist CRUD

    //Get Operation
    app.get('/api/chemist/get',(req,res)=>{
        const sqlSelect=
        "SELECT * FROM chemist";
    
        db.query(sqlSelect,(err,result)=>{
            res.send(result);
        })
    })

    //Post Operation
    app.post("/api/chemist/insert",(req,res)=>{
        console.log(req.body);
        const name=req.body.name;
        const shop_name=req.body.shop_name;
        const email=req.body.email;
        const number=req.body.number;
        const area=req.body.area;
        const city=req.body.city;
        

        const sqlInsert="INSERT INTO chemist(shop_name,name,email,number,area,city) VALUES (?,?,?,?,?,?)"
        db.query(sqlInsert,[shop_name,name,email,number,area,city],(err,result)=>{
           res.send(result);
        })
    });
    
    //Delete Operation
    app.delete("/api/doctor/delete/:chemistID",(req,res)=>{
        const chemistID=req.params.chemistID;
        const sqlDelete="DELETE FROM chemist where id=?";
        db.query(sqlDelete,chemistID,(err,result)=>{
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


//Mr CRUD
    //Get Operation
    app.get('/api/mr/get',(req,res)=>{
        const sqlSelect=
        "SELECT * FROM mr";
    
        db.query(sqlSelect,(err,result)=>{
            res.send(result);
        })
    })

    //Post Operation
    app.post("/api/mr/insert",(req,res)=>{
        console.log(req.body);
        const name=req.body.name;
        const email=req.body.email;
        const number=req.body.number;
        const area=req.body.area;
        const city=req.body.city;
        const doctor_id=req.body.doctor_id;
        const chemist_id=req.body.chemist_id;
        

        const sqlInsert="INSERT INTO chemist(name,email,number,area,city,doctor_id,chemist_id) VALUES (?,?,?,?,?,?)"
        db.query(sqlInsert,[shop_name,name,email,number,area,city,doctor_id,chemist_id],(err,result)=>{
           res.send(result);
        })
    });
    
    //Delete Operation
    app.delete("/api/mr/delete/:mrID",(req,res)=>{
        const mrID=req.params.mrID;
        const sqlDelete="DELETE FROM chemist where id=?";
        db.query(sqlDelete,mrID,(err,result)=>{
            if(err) console.log(err);
        })
    })

    




app.listen(3001,()=>{
    console.log('running on port 3001');
});
