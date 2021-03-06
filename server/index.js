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
        console.log("delete is called...");
        console.log(doctorID);
        const sqlDelete="DELETE FROM doctor where id=?";
        db.query(sqlDelete,doctorID,(err,result)=>{
            if(err) console.log(err);
        })
    })

    //Update Operation
    app.put('/api/doctor/update',(req,res)=>{
        
        console.log(req.body);
        const id=req.body.id;
        const name=req.body.name;
        
        const email=req.body.email;
        const number=Number(req.body.number);
        console.log("Number:",number);
        const area=req.body.area;
        const city=req.body.city;
        
        const sqlUpdate='UPDATE doctor SET name=?,email=?,number=?,area=?,city=? WHERE id=?'
        db.query(sqlUpdate,[name,
        email,number,area,city,id],(err,result)=>{
            if(err) console.log(err.message);
        })
    })

//Chemist CRUD

    //Get Operation
    app.get('/api/chemist/get',(req,res)=>{
        const sqlSelect=
        "SELECT * FROM chemist";
        console.log("chemist select is called...");
        db.query(sqlSelect,(err,result)=>{
            console.log("result:",result);
            res.send(result);
        })
    })

    //Post Operation
    app.post("/api/chemist/insert",(req,res)=>{
        console.log("BODY:");
        console.log(req.body);
        const name=req.body.name;
        const shop_name=req.body.shop_name;
        const email=req.body.email;
        const number=req.body.number;
        const area=req.body.area;
        const city=req.body.city;
        

        const sqlInsert="INSERT INTO chemist(shop_name,name,email,number,area,city) VALUES (?,?,?,?,?,?)"
        db.query(sqlInsert,[shop_name,name,email,number,area,city],(err,result)=>{
           if(err) console.log(err.message);
        })
    });
    
    //Delete Operation
    app.delete("/api/chemist/delete/:chemistID",(req,res)=>{
        const chemistID=req.params.chemistID;
        console.log("delete is called...");
        console.log(chemistID.toString());
        const sqlDelete="DELETE FROM chemist where id=?";
        db.query(sqlDelete,chemistID,(err,result)=>{
            if(err) console.log(err);
        })
    })

    // Update Operation
    app.put('/api/chemist/update',(req,res)=>{
        
        console.log(req.body);
        const id=req.body.id;
        const name=req.body.name;
        const shop_name=req.body.shop_name;
        const email=req.body.email;
        const number=Number(req.body.number);
        console.log("Number:",number);
        const area=req.body.area;
        const city=req.body.city;
        
        const sqlUpdate='UPDATE chemist SET name=?,shop_name=?,email=?,number=?,area=?,city=? WHERE id=?'
        db.query(sqlUpdate,[name,shop_name,
        email,number,area,city,id],(err,result)=>{
            if(err) console.log(err.message);
        })
    })


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
        const number=Number(req.body.number);
        const area=req.body.area;
        const city=req.body.city;
        const doctor_id=req.body.doctor_id;
        const chemist_id=req.body.chemist_id;
        

        const sqlInsert="INSERT INTO mr(name,email,number,area,city) VALUES (?,?,?,?,?)"
        db.query(sqlInsert,[name,email,number,area,city],(err,result)=>{
           if(err) console.log(err);
        })

        
    var energy = doctor_id.join();
    console.log("ENERGY:",energy);


    var energy1 = chemist_id.join();
    console.log("ENERGY:",energy1);


    const sqlSelect="SELECT id from mr where email=?";
    let resultData=0;
    setTimeout(()=>{
        db.query(sqlSelect,email,(err,result)=>{
            console.log("RESULT:",result[0].id);
            resultData=result[0].id
            if(err) console.log(err.message);
         });
    },3000)
    
    
    setTimeout(()=>{
    
        const sqlInsert="INSERT INTO mrtoDoctor (mr_id,doctor_id) VALUES (?,?)"
        db.query(sqlInsert,[resultData,energy],(err,result)=>{
                if(err) console.log(err);
         });
    },6000);
    setTimeout(()=>{
    
        const sqlInsert="INSERT INTO mrToChemist (mr_id,chemist_id) VALUES (?,?)"
        db.query(sqlInsert,[resultData,energy1],(err,result)=>{
                if(err) console.log(err);
         });
    },6000);
    });
    
    //Delete Operation
    app.delete("/api/mr/delete/:mrID",(req,res)=>{
        const mrID=req.params.mrID;
        const sqlDelete="DELETE FROM mr where id=?";
        db.query(sqlDelete,mrID,(err,result)=>{
            if(err) console.log(err);
        })
    })


    app.put('/api/mr/update',(req,res)=>{
        
        console.log("REQUEST BODY:",req.body);
        const id=req.body.id;
        const name=req.body.name;
        const doctor_id=req.body.doctor_id;
        const chemist_id=req.body.chemist_id;
        const email=req.body.email;
        const number=Number(req.body.number);
        console.log("Number:",number);
        const area=req.body.area;
        const city=req.body.city;
        
        var energy = doctor_id.join();
        console.log("ENERGY:",energy);


        var energy1 = chemist_id.join();
        console.log("ENERGY:",energy1);

        const sqlUpdate='UPDATE mr SET name=?,email=?,number=?,area=?,city=? WHERE id=?'
        db.query(sqlUpdate,[name,
        email,number,area,city,id],(err,result)=>{
            if(err) console.log(err.message);
        })

        const sqlUpdate2='UPDATE mrToDoctor SET doctor_id=? WHERE mr_id=?'
        db.query(sqlUpdate2,[energy,id],(err,result)=>{
            if(err) console.log(err.message);
        })

        const sqlUpdate3='UPDATE mrToChemist SET chemist_id=? WHERE mr_id=?'
        db.query(sqlUpdate3,[energy1,id],(err,result)=>{
            if(err) console.log(err.message);
        })

    })

//Senior CRUD
app.get('/api/senior/get',(req,res)=>{
    const sqlSelect=
    "SELECT * FROM senior";

    db.query(sqlSelect,(err,result)=>{
        res.send(result);
    })
})

//Post Operation
app.post("/api/senior/insert",async (req,res)=>{
    console.log("INSERT OPERATION:",req.body);
    const name=req.body.name;
    const email=req.body.email;
    const number=Number(req.body.number);
    const area=req.body.area;
    const city=req.body.city;
    const mr_id=req.body.mr_id;
    
     const sqlInsert="INSERT INTO senior(name,email,number,area,city) VALUES (?,?,?,?,?)"
     
     db.query(sqlInsert,[name,email,number,area,city],(err,result)=>{
       if(err) console.log("Insert senior record",err);
    })

    //JOIN
    
    var energy = mr_id.join();
    console.log("ENERGY:",energy);


    const sqlSelect="SELECT id from senior where email=?";
    let resultData=0;
    setTimeout(()=>{
        db.query(sqlSelect,email,(err,result)=>{
            console.log("RESULT:",result[0].id);
            resultData=result[0].id
            if(err) console.log(err.message);
         });
    },3000)
    
    
    setTimeout(()=>{
    
        const sqlInsert="INSERT INTO seniortomr(senior_id,mr_id) VALUES (?,?)"
        db.query(sqlInsert,[resultData,energy],(err,result)=>{
                if(err) console.log(err);
         });
    },6000);
});

//Delete Operation
app.delete("/api/senior/delete/:seniorID",(req,res)=>{
    const seniorID=req.params.seniorID;
    const sqlDelete="DELETE FROM senior where id=?";
    db.query(sqlDelete,seniorID,(err,result)=>{
        if(err) console.log(err);
    })
})


app.put('/api/senior/update',(req,res)=>{
    
    console.log("REQUEST BODY:",req.body);
    const id=req.body.id;
    const name=req.body.name;
    const mr_id=req.body.mr_id;
    const email=req.body.email;
    const number=Number(req.body.number);
    console.log("Number:",number);
    const area=req.body.area;
    const city=req.body.city;
    
    const sqlUpdate='UPDATE senior SET name=?,email=?,number=?,area=?,city=?,mr_id=? WHERE id=?'
    db.query(sqlUpdate,[name,
    email,number,area,city,mr_id,id],(err,result)=>{
        if(err) console.log(err.message);
    })
})



app.listen(3001,()=>{
    console.log('running on port 3001');
});

//SeniorToMr CRUD

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
        console.log("delete is called...");
        console.log(doctorID);
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

//SeniorToMr CRUD

    //Get Operation
    app.get('/api/seniorToMr/get',(req,res)=>{
        const sqlSelect=
        "SELECT * FROM seniorToMr";
        console.log("chemist select is called...");
        db.query(sqlSelect,(err,result)=>{
            console.log("result:",result);
            res.send(result);
        })
    })

    app.get('/api/seniorToMr/get/:seniorID',(req,res)=>{
        const id=req.params.seniorID
        console.log(id);
        const sqlSelect=
        "SELECT * FROM seniorToMr where senior_id=?";
        console.log("chemist select is called...");
        db.query(sqlSelect,id,(err,result)=>{
            console.log("result:",result);
            res.send(result);
        })
    })


    
    //Delete Operation
    app.delete("/api/seniorToMr/delete/:chemistID",(req,res)=>{
        const chemistID=req.params.chemistID;
        console.log("delete is called...");
        console.log(chemistID.toString());
        const sqlDelete="DELETE FROM senior where id=?";
        db.query(sqlDelete,chemistID,(err,result)=>{
            if(err) console.log(err);
        })
        setTimeout(()=>{
            const sqlDelete="DELETE FROM seniorToMr where senior_id=?";
            db.query(sqlDelete,chemistID,(err,result)=>{
            if(err) console.log(err);
        })
      },100)
    })

    // Update Operation
    app.put('/api/seniorToMr/update',(req,res)=>{
        
        console.log(req.body);
        const id=req.body.id;
        const name=req.body.name;
        const email=req.body.email;
        const number=Number(req.body.number);
        console.log("Number:",number);
        const area=req.body.area;
        const city=req.body.city;

        const mr_id=req.body.mr_id;
        var energy = mr_id.join();
        console.log("ENERGY:",energy);
        

        const sqlUpdate='UPDATE senior SET name=?,email=?,number=?,area=?,city=? WHERE id=?'
        db.query(sqlUpdate,[name,
        email,number,area,city,id],(err,result)=>{
            if(err) console.log(err.message);
        })

        setTimeout(()=>{
            console.log("ID:",id);
            const sqlInsert="Update seniorToMr SET mr_id=? where senior_id=?"
            db.query(sqlInsert,[energy,id],(err,result)=>{
                    if(err) console.log(err);
             });
        },6000);

    })



//MrToDoctor

//Get Operation
app.get('/api/mrToDoctor/get',(req,res)=>{
    const sqlSelect=
    "SELECT * FROM mrToDoctor";
    console.log("chemist select is called...");
    db.query(sqlSelect,(err,result)=>{
        console.log("result:",result);
        res.send(result);
    })
})

app.get('/api/mrToDoctor/get/:mrID',(req,res)=>{
    const id=req.params.mrID
    console.log(id);
    const sqlSelect=
    "SELECT * FROM mrToDoctor where mr_id=?";
    console.log("chemist select is called...");
    db.query(sqlSelect,id,(err,result)=>{
        console.log("result:",result);
        res.send(result);
    })
})



//Delete Operation
app.delete("/api/mrToDoctor/delete/:chemistID",(req,res)=>{
    const chemistID=req.params.chemistID;
    console.log("delete is called...");
    console.log(chemistID.toString());
    const sqlDelete="DELETE FROM senior where id=?";
    db.query(sqlDelete,chemistID,(err,result)=>{
        if(err) console.log(err);
    })
    setTimeout(()=>{
        const sqlDelete="DELETE FROM mrToDoctor where mr_id=?";
        db.query(sqlDelete,chemistID,(err,result)=>{
        if(err) console.log(err);
    })
  },100)
})

// Update Operation
app.put('/api/mrToDoctor/update',(req,res)=>{
    
    console.log(req.body);
    const id=req.body.id;
    const name=req.body.name;
    const email=req.body.email;
    const number=Number(req.body.number);
    console.log("Number:",number);
    const area=req.body.area;
    const city=req.body.city;

    const mr_id=req.body.mr_id;
    var energy = mr_id.join();
    console.log("ENERGY:",energy);
    

    const sqlUpdate='UPDATE senior SET name=?,email=?,number=?,area=?,city=? WHERE id=?'
    db.query(sqlUpdate,[name,
    email,number,area,city,id],(err,result)=>{
        if(err) console.log(err.message);
    })

    setTimeout(()=>{
        console.log("ID:",id);
        const sqlInsert="Update mrToDoctor SET doctor_id=? where mr_id=?"
        db.query(sqlInsert,[energy,id],(err,result)=>{
                if(err) console.log(err);
         });
    },6000);

})


//MrToChemist

//Get Operation
app.get('/api/mrToChemist/get',(req,res)=>{
    const sqlSelect=
    "SELECT * FROM mrToChemist";
    console.log("chemist select is called...");
    db.query(sqlSelect,(err,result)=>{
        console.log("result:",result);
        res.send(result);
    })
})

app.get('/api/mrToChemist/get/:mrID',(req,res)=>{
    const id=req.params.mrID;
    console.log(id);
    const sqlSelect=
    "SELECT * FROM mrToChemist where mr_id=?";
    console.log("chemist select is called...");
    db.query(sqlSelect,id,(err,result)=>{
        console.log("result:",result);
        res.send(result);
    })
})



//Delete Operation
app.delete("/api/mrToChemist/delete/:chemistID",(req,res)=>{
    const chemistID=req.params.chemistID;
    console.log("delete is called...");
    console.log(chemistID.toString());
    const sqlDelete="DELETE FROM senior where id=?";
    db.query(sqlDelete,chemistID,(err,result)=>{
        if(err) console.log(err);
    })
    setTimeout(()=>{
        const sqlDelete="DELETE FROM mrToChemist where mr_id=?";
        db.query(sqlDelete,chemistID,(err,result)=>{
        if(err) console.log(err);
    })
  },100)
})

// Update Operation
app.put('/api/mrToChemist/update',(req,res)=>{
    
    console.log(req.body);
    const id=req.body.id;
    const name=req.body.name;
    const email=req.body.email;
    const number=Number(req.body.number);
    console.log("Number:",number);
    const area=req.body.area;
    const city=req.body.city;

    const mr_id=req.body.mr_id;
    let energy = mr_id.join();
    console.log("ENERGY:",energy);
    

    const sqlUpdate='UPDATE senior SET name=?,email=?,number=?,area=?,city=? WHERE id=?'
    db.query(sqlUpdate,[name,
    email,number,area,city,id],(err,result)=>{
        if(err) console.log(err.message);
    })

    setTimeout(()=>{
        console.log("ID:",id);
        const sqlInsert="Update mrToChemist SET chemist_id=? where mr_id=?"
        db.query(sqlInsert,[energy,id],(err,result)=>{
                if(err) console.log(err);
         });
    },6000);

})

//Task Get Operation

// app.get('/api/task/get:mrID',(req,res)=>{
//     const id=req.params.mrID;
//     console.log("TASK IS CALLED....");
//     const sqlSelect = 
//     "SELECT * from mrToDoctor where mr_id =?"
  
//     db.query(sqlSelect,id,(err,result)=>{
//         console.log("result:",result);
//         res.send(result);
//     })

// })
//City CRUD

    //Get Operation
    app.get('/api/city/get',(req,res)=>{
        console.log("CITY IS CALLED...");
        const sqlSelect=
        "SELECT * FROM city";
        db.query(sqlSelect,(err,result)=>{
            res.send(result);
        })
    })

    //Post Operation
    app.post("/api/city/insert",(req,res)=>{
        
        console.log(req.body);
        const name=req.body.city;
        // const email=req.body.email;
        // const number=req.body.number;
        // const area=req.body.area;
        // const city=req.body.city;

        const sqlInsert="INSERT INTO city(city_name) VALUES (?)"
        db.query(sqlInsert,name,(err,result)=>{
            console.log(err);
        })
    });
    
    //Delete Operation
    app.delete("/api/city/delete/:doctorID",(req,res)=>{
        const doctorID=req.params.doctorID;
        console.log("delete is called...");
        console.log(doctorID);
        const sqlDelete="DELETE FROM city where city_id=?";
        db.query(sqlDelete,doctorID,(err,result)=>{
            if(err) console.log(err);
        })
    })

    //Update Operation
    app.put('/api/city/update',(req,res)=>{
        
        console.log(req.body);
        const id=req.body.id;
        const name=req.body.city;
        
        
        const sqlUpdate='UPDATE city SET city_name=? WHERE city_id=?'
        db.query(sqlUpdate,[name,id],(err,result)=>{
            if(err) console.log(err.message);
        })
    })

//WorkPlace CRUD

//Get Operation
app.get('/api/workplace/get',(req,res)=>{
    const sqlSelect=
    "SELECT * FROM workplace";



    db.query(sqlSelect,(err,result)=>{
        res.send(result);
    })
})

//Post Operation
app.post("/api/workplace/insert",(req,res)=>{
    
    console.log(req.body);
    const name=req.body.workplace;
    // const email=req.body.email;
    // const number=req.body.number;
    // const area=req.body.area;
    // const city=req.body.city;

    const sqlInsert="INSERT INTO workplace(workplace_name) VALUES (?)"
    db.query(sqlInsert,name,(err,result)=>{
        console.log(err);
    })
});

//Delete Operation
app.delete("/api/workplace/delete/:doctorID",(req,res)=>{
    const doctorID=req.params.doctorID;
    console.log("delete is called...");
    console.log(doctorID);
    const sqlDelete="DELETE FROM workplace where workplace_id=?";
    db.query(sqlDelete,doctorID,(err,result)=>{
        if(err) console.log(err);
    })
})

//Update Operation
app.put('/api/workplace/update',(req,res)=>{
    
    console.log(req.body);
    const id=req.body.id;
    const name=req.body.workplace;
    
    
    const sqlUpdate='UPDATE workplace SET workplace_name=? WHERE workplace_id=?'
    db.query(sqlUpdate,[name,id],(err,result)=>{
        if(err) console.log(err.message);
    })
})

//Worktype CRUD

    //Get Operation
    app.get('/api/worktype/get',(req,res)=>{
        console.log("worktype IS CALLED...");
        const sqlSelect=
        "SELECT * FROM worktype";
        db.query(sqlSelect,(err,result)=>{
            res.send(result);
        })
    })

    //Post Operation
    app.post("/api/worktype/insert",(req,res)=>{
        
        console.log("WORKTYPE NAME:",req.body);
        
        const name=req.body.worktype;
        // const email=req.body.email;
        // const number=req.body.number;
        // const area=req.body.area;
        // const worktype=req.body.worktype;

        const sqlInsert="INSERT INTO worktype(worktype_name) VALUES (?)"
        db.query(sqlInsert,name,(err,result)=>{
            console.log(err);
        })
    });
    
    //Delete Operation
    app.delete("/api/worktype/delete/:doctorID",(req,res)=>{
        const doctorID=req.params.doctorID;
        console.log("delete is called...");
        console.log(doctorID);
        const sqlDelete="DELETE FROM worktype where worktype_id=?";
        db.query(sqlDelete,doctorID,(err,result)=>{
            if(err) console.log(err);
        })
    })

    //Update Operation
    app.put('/api/worktype/update',(req,res)=>{
        
        console.log(req.body);
        const id=req.body.id;
        const name=req.body.worktype;
        
        
        const sqlUpdate='UPDATE worktype SET worktype_name=? WHERE worktype_id=?'
        db.query(sqlUpdate,[name,id],(err,result)=>{
            if(err) console.log(err.message);
        })
    })

//Holiday CRUD
//City CRUD

    //Get Operation
    app.get('/api/holiday/get',(req,res)=>{
        console.log("holiday IS CALLED...");
        const sqlSelect=
        "SELECT * FROM holiday";
        db.query(sqlSelect,(err,result)=>{
            res.send(result);
        })
    })

    //Post Operation
    app.post("/api/holiday/insert",(req,res)=>{
        
        console.log(req.body);
        const name=req.body.holiday;
        
        
        const sqlInsert="INSERT INTO holiday(holiday_name) VALUES (?)"
        db.query(sqlInsert,name,(err,result)=>{
            console.log(err);
        })
    });
    
    //Delete Operation
    app.delete("/api/holiday/delete/:doctorID",(req,res)=>{
        const doctorID=req.params.doctorID;
        console.log("delete is called...");
        console.log(doctorID);
        const sqlDelete="DELETE FROM holiday where holiday_id=?";
        db.query(sqlDelete,doctorID,(err,result)=>{
            if(err) console.log(err);
        })
    })

    //Update Operation
    app.put('/api/holiday/update',(req,res)=>{
        
        console.log(req.body);
        const id=req.body.id;
        const name=req.body.holiday;
        
        
        const sqlUpdate='UPDATE holiday SET holiday_name=? WHERE holiday_id=?'
        db.query(sqlUpdate,[name,id],(err,result)=>{
            if(err) console.log(err.message);
        })
    })


//Get Operation
app.get('/api/mrToDoctor/get',(req,res)=>{
    const sqlSelect=
    "SELECT * FROM mrToDoctor";
    console.log("chemist select is called...");
    db.query(sqlSelect,(err,result)=>{
        console.log("result:",result);
        res.send(result);
    })
})

app.get('/api/mrToDoctor/get/:mrID',(req,res)=>{
    const id=req.params.mrID
    console.log(id);
    const sqlSelect=
    "SELECT * FROM mrToDoctor where mr_id=?";
    console.log("chemist select is called...");
    db.query(sqlSelect,id,(err,result)=>{
        console.log("result:",result);
        res.send(result);
    })
})



//Delete Operation
app.delete("/api/mrToDoctor/delete/:chemistID",(req,res)=>{
    const chemistID=req.params.chemistID;
    console.log("delete is called...");
    console.log(chemistID.toString());
    const sqlDelete="DELETE FROM senior where id=?";
    db.query(sqlDelete,chemistID,(err,result)=>{
        if(err) console.log(err);
    })
    setTimeout(()=>{
        const sqlDelete="DELETE FROM mrToDoctor where mr_id=?";
        db.query(sqlDelete,chemistID,(err,result)=>{
        if(err) console.log(err);
    })
  },100)
})

// Update Operation
app.put('/api/mrToDoctor/update',(req,res)=>{
    
    console.log(req.body);
    const id=req.body.id;
    const name=req.body.name;
    const email=req.body.email;
    const number=Number(req.body.number);
    console.log("Number:",number);
    const area=req.body.area;
    const city=req.body.city;

    const mr_id=req.body.mr_id;
    var energy = mr_id.join();
    console.log("ENERGY:",energy);
    

    const sqlUpdate='UPDATE senior SET name=?,email=?,number=?,area=?,city=? WHERE id=?'
    db.query(sqlUpdate,[name,
    email,number,area,city,id],(err,result)=>{
        if(err) console.log(err.message);
    })

    setTimeout(()=>{
        console.log("ID:",id);
        const sqlInsert="Update mrToDoctor SET mr_id=? where dr_id=?"
        db.query(sqlInsert,[energy,id],(err,result)=>{
                if(err) console.log(err);
         });
    },6000);

})


//MrToChemistToTask

//Get Operation
app.get('/api/mrToChemist/get',(req,res)=>{
    const sqlSelect=
    "SELECT * FROM mrToChemist";
    console.log("chemist select is called...");
    db.query(sqlSelect,(err,result)=>{
        console.log("result:",result);
        res.send(result);
    })
})

app.get('/api/mrToChemist/get/:mrID',(req,res)=>{
    const id=req.params.mrID;
    console.log(id);
    const sqlSelect=
    "SELECT * FROM mrToChemist where mr_id=?";
    console.log("chemist select is called...");
    db.query(sqlSelect,id,(err,result)=>{
        console.log("result:",result);
        res.send(result);
    })
})



//Delete Operation
app.delete("/api/mrToChemist/delete/:chemistID",(req,res)=>{
    const chemistID=req.params.chemistID;
    console.log("delete is called...");
    console.log(chemistID.toString());
    const sqlDelete="DELETE FROM senior where id=?";
    db.query(sqlDelete,chemistID,(err,result)=>{
        if(err) console.log(err);
    })
    setTimeout(()=>{
        const sqlDelete="DELETE FROM mrToChemist where mr_id=?";
        db.query(sqlDelete,chemistID,(err,result)=>{
        if(err) console.log(err);
    })
  },100)
})

// Update Operation
app.put('/api/mrToChemist/update',(req,res)=>{
    
    console.log(req.body);
    const id=req.body.id;
    const name=req.body.name;
    const email=req.body.email;
    const number=Number(req.body.number);
    console.log("Number:",number);
    const area=req.body.area;
    const city=req.body.city;

    const mr_id=req.body.mr_id;
    var energy = mr_id.join();
    console.log("ENERGY:",energy);
    

    const sqlUpdate='UPDATE senior SET name=?,email=?,number=?,area=?,city=? WHERE id=?'
    db.query(sqlUpdate,[name,
    email,number,area,city,id],(err,result)=>{
        if(err) console.log(err.message);
    })

    setTimeout(()=>{
        console.log("ID:",id);
        const sqlInsert="Update mrToChemist SET mr_id=? where chemist_id=?"
        db.query(sqlInsert,[energy,id],(err,result)=>{
                if(err) console.log(err);
         });
    },6000);

})


//CRUD OF mrtochemisttotask and mrtodoctortotask

//Get Operation
app.get('/api/task/doctor/get',(req,res)=>{
    console.log("holiday IS CALLED...");
    const sqlSelect=
    "SELECT * FROM mrToDoctorToTask";
    db.query(sqlSelect,(err,result)=>{
        res.send(result);
    })
})

app.get('/api/task/chemist/get',(req,res)=>{
    console.log("Doctor IS CALLED...");
    const sqlSelect=
    "SELECT * FROM mrToChemistToTask";
    db.query(sqlSelect,(err,result)=>{
        res.send(result);
    })
});

    //INSERT
    app.post("/api/task/doctor/insert",(req,res)=>{
        
        const task=req.body.task;
        const variable_id=req.body.variable_id;
        const select_mr=req.body.select_mr;
        const doctor_name=req.body.doctor_name;
        const data_range=req.body.data_range;
        
        
        // const name=req.body.worktype;
        // const email=req.body.email;
        // const number=req.body.number;
        // const area=req.body.area;
        // const worktype=req.body.worktype;

        const sqlInsert="INSERT INTO mrtoDoctortotask(mr_id,doctor_id,task,date_range) VALUES (?,?,?,?)"
        db.query(sqlInsert,[select_mr,doctor_name,task,data_range],(err,result)=>{
            console.log(err);
        })
        
        
    });

    app.post("/api/task/chemist/insert",(req,res)=>{
        
        const task=req.body.task;
        const variable_id=req.body.variable_id;
        const select_mr=req.body.select_mr;
        const doctor_name=req.body.doctor_name;
        const data_range=req.body.data_range;
        
        
        // const name=req.body.worktype;
        // const email=req.body.email;
        // const number=req.body.number;
        // const area=req.body.area;
        // const worktype=req.body.worktype;

        const sqlInsert="INSERT INTO mrtoChemisttotask(mr_id,chemist_id,task,date_range) VALUES (?,?,?,?)"
        db.query(sqlInsert,[select_mr,doctor_name,task,data_range],(err,result)=>{
            console.log(err);
        })
    });

    //Delete Operation
    app.delete("/api/task/chemist/delete",(req,res)=>{
        const chemist_ID=req.body.chemist_id;
        const select_mr=req.body.select_mr;

        console.log("delete is called...");
        console.log(chemist_ID);
        const sqlDelete="DELETE FROM mrtoChemisttotask where mr_id=? and chemist_id=?";
        db.query(sqlDelete,[select_mr,chemist_ID],(err,result)=>{
            if(err) console.log(err);
        })
    })

    //Delete 2 Operation
    app.delete("/api/task/doctor/delete",(req,res)=>{
        const doctor_ID=req.body.doctor_id;
        const select_mr=req.body.select_mr;

        console.log("delete is called...");
        console.log(doctor_ID);
        const sqlDelete="DELETE FROM mrtoDoctortotask where mr_id=? and doctor_id=?";
        db.query(sqlDelete,[select_mr,doctor_ID],(err,result)=>{
            if(err) console.log(err);
        })
    })


    











