const express= require('express')
const app= express();
PORT=3030
const fs= require('fs');
app.get('/',(req,res)=>{
  res.status(200).json({
    message:"welcome to my page"
  })
})
readData=()=>{
  const readData=fs.readFileSync('./blog.json',)
  return JSON.parse(readData)

}
writeData=(data)=>{
  fs.writeFileSync("./blog.json",JSON.stringify( data))
}
app.get('/users',(req,res)=>{
    const users=readData();
  res.status(200).json({
    status:'ok',
    message:users
  })
})

// now to get just one person
app.get("/user/:id",(req,res)=>{
  const database=readData();
  const userid= parseInt(req.params.id)
  const user= database.blog.find((i)=>(i.id===userid))
  if(!user){res.status(404).json({
    status:'404',
    massage:"not found"
  })
}else{
  res.status(200).json({
    status:'200',
    message:user
  })
}
})
// to creat new user
app.post("/user/",(req,res)=>{
  const database=readData();
  const update=req.body
  update.id=database.blog.length+1
  database.blog.push(database)
  writeData(database)


})// to creat  update user
app.post('/user/:id',(req,res)=>{
  const database=readData();
  const update= req.body
  const updateid= parseInt(req.params.id)
  index= database.blog.findindex((i)=>(i.id===updateid))
  
  if(!index===-1){
    data.paul[index]={...data.blog[index],...update}
    res.status(200).json({
      message:update
    })
  }else{
    res.status(404).json({
      message:"nothing found"
    })
  }
})
// delete user
app.delete("/userr/:id",(res,req)=>{
  const database= readData()
  const userid= parseInt(req.params.id)
  const index= database.blog.findindex((i)=>(i.id===userid))
  if(!index){res.status(404).json({
    mesage:`nothing was found`
  })
} else{
  const deleted= database.blog[index]
  database.blog.splice(index,1)
  writeData(database)
  res.status(200).json({
    message:"succsesfully deleted"

  })

}

})


app.listen(PORT,()=>{
  console.log(`this application is running on port:${PORT}`)
})