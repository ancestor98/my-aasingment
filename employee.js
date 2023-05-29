const express= require("express")
const app= express();
 PORT= 3030;
 const fs= require("fs");
 app.use(express.json());
app.get('/',(req,res)=>{
    res.status(200).json({
    message:"welcome to my page"
 })
})


 const readData=()=>{
    const data=fs.readFileSync('./employeedata.json');
    return JSON.parse(data)
}
writeData=(data)=>{
    fs.writeFileSync("./employeedata.json",JSON.stringify(data))
}
// get all employess
app.get("/employees",(req,res)=>{
    const display= readData(); 
    res .status(200).json({
        status:"OK",
        data:display
    })
})
// add users 
app.post('/employer',(req,res)=>{
    const database=readData();
    const newuser= req.body
    newuser.id= database.paul.lenght+1;
    database.paul.push(user)
    writeData(data)
    res.status(200).json({
        status:"added",
        data: newuser
    })
})
//update 
app.put('/employee/:id',(req,res)=>{
    const database= readData()
    updated= req.body
    updatedid= parseInt(req.params.id)
    const position= database.paul.findindex((y)=>(y.id===updatedid))
    if(!position===-1){
        database.paul[position]={...database.paul[position],...updated}
        writeData(database)
        res.status(200).json(
            (database.paul[position])
        )
    }else{res.status(404).json({
        message:"update failed"
    })}
})// delete
app.delete('/employee/:id',(req,res)=>{
    const database= readData();
    const employeeid= parseInt(req.params.id)
    const index=database.paul.findindex((p)=>{p.id===employeeid})
    if(!database.paul[0]){
        const deletedrecord=database.paul[index]
    database.paul.splice(index,1);
    writeData(database)
    res.status(200).json({
        message:"deleted succsessfully"
    })
}else(
    res.status(404).json({
        message: "not found"
    })

)
})


 app.listen(PORT,()=>{
    console.log(`your code is working on port${PORT}`)
 })