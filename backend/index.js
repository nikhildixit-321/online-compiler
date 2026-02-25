const express = require('express');
const {generateFile} = require('./generateFile')
const app = express()
const {executeCpp} = require('./executeCpp')
const PORT = 8000;
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.get('/',(req,res)=>{
    res.send("hello world ")
})
app.post('/run',async (req,res)=>{
  const {language= "cpp",code}= req.body;
  if(code === undefined){
    return res.status(400).json({success:false,error:"Empty code body!"})
  }
  // need to generate a cpp file with content from the request
  const filepath = await generateFile(language,code)
  // we need to run the file and send the reponse 
  const output = await  executeCpp(filepath)
  return res.json({filepath,output})
  
})


app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}`);
})