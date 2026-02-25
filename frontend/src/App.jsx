import { useState } from "react"
import axios from 'axios'


function App() {
 const [code , setCode] = useState('')
 const [output,setOutput] = useState("")
 const handleSubmit = async ()=>{
  const payload ={
    language:"cpp",
    code
  };
  try {
    const {data} = await axios.post("http://localhost:8000/run",payload)
      setOutput(data.output)
    
  } catch (error) {
    console.log(error.response);
  }
 }
  return (
    <>
      <h1>online code compiler</h1>
      <textarea rows={20} cols={75} name="" id="" value = {code} onChange={(e)=>{setCode(e.target.value)}}></textarea>
      <br />
      <button onClick={handleSubmit}>submit</button>
      <h3>output</h3>
      <p>{output}</p>
    </>
  )
}

export default App
