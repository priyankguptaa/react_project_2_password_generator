import { useState, useCallback ,useEffect, useRef } from 'react'
import './App.css'

function App() {

  const [length, setLength]= useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null)

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

  const copyToClipBoard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])
   
  
  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed, setPassword, passwordGenerator])


  return (
    <>
    <div className='outer_div'>
      <h1>Password Generator</h1>     
      <div className='input_div'>
        <input
          type="text" 
          value={password}
          placeholder='password'
          readOnly
          ref = {passwordRef}
         />
         <button
         onClick={copyToClipBoard}
         >copy</button>
      </div>
      <div className='sub_div'>
        <div className='range'>
          <input
            type="range" 
            min={1}
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
    </div>    
    </>
  )
}

export default App
