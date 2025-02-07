import { useState, useCallback ,useEffect } from 'react'
import './App.css'

function App() {

  const [length, setLength]= useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback ( () =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += '0123456789'
    if (charAllowed) str += "!@#$%^&*"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed, setPassword, passwordGenerator])

  return (
    <>
    <h2>Password Generator</h2>
     <div className='main-div'>
      <div className='input-div'>
        <input
          type="text" 
          value={password}
          placeholder='password'
          readOnly
         />
         <button>copy</button>
      </div>
      <div className='range'>
        <input
          type="range" 
          min={8}
          max={100}
          value={length}
          onChange={(e) => {setLength(e.target.value)}}
        />
        <label>length:{length}</label>
      </div>
      <div className='number'>
        <input
         type="checkbox"
         defaultChecked = {numberAllowed}
         id = "numberInput"
         onChange={() => {
            setNumberAllowed((prev) => !prev)
         }}
         />
         <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className='char'>
        <input
          type="checkbox"
          id="charInput"
          defaultChecked = {charAllowed}
          onChange={() =>{
            setCharAllowed((prev) => !prev)
          }}
           />
        <label htmlFor="charInput">Characters</label>   
      </div>
     </div>
    </>
  )
}

export default App
