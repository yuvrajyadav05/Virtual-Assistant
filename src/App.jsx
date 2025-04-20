import React from 'react'
import './App.css'
import va from  "./assets/ai.png"
import { CiMicrophoneOn } from "react-icons/ci";
import { useContext } from 'react'
import { datacontext } from './context/UserContext.jsx'
import speakimg from "./assets/speak.gif"
import aigif from "./assets/aiVoice.gif"

function App() {
  let {recognition,speaking,setSpeaking,prompt,response,setPrompt,setResponse}=useContext(datacontext)
  
  return (
    <div className="main">
      <img src={va} alt="" id="Googli" />
      <span>I'm Googli,Your Advanced Virtual Assistant  hi hihihih</span>
      {!speaking?  <button onClick={() => {
        setPrompt("listening...")
        setSpeaking(true)
        setResponse(false)
          recognition.start()
        }
      }>Click here <CiMicrophoneOn /></button>
      :
      <div className='response'>
        {!response?
        <img src={speakimg} alt="" id="speak"/>
        :
        <img src={aigif} alt="" id="aigif"/>
}
        <p>{prompt}</p>
      </div>
      }
     
    </div>
  )
}

export default App

