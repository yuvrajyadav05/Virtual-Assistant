// import React from 'react'
import React, { createContext, useState } from 'react';
import run from '../gemini';
export const datacontext = createContext()

function UserContext({ children }) {
  let [speaking, setSpeaking] = useState(false)
  let [prompt, setPrompt] = useState("listening...")
  let [response, setResponse] = useState(false)
  function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = "en-IN";
    window.speechSynthesis.speak(text_speak);
  }
  async function aiResponse(prompt) {
    let text = await run(prompt)
    let newText = text.split("**") && text.split("*") && text.replace("google", "Yuvraj Yadav") && text.replace("Google", "Yuvraj Yadav")
    setPrompt(newText)
    speak(newText)
    setResponse(true)
    setTimeout(() => {
      setSpeaking(false)
    }, 4000)

  }


  let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  let recognition = new speechRecognition()
  recognition.onresult = (e) => {
    let currentIndex = e.resultIndex
    let transcript = e.results[currentIndex][0].transcript
    setPrompt(transcript)
    takeCommand(transcript.toLowerCase())
  }

  function takeCommand(command){
    if(command.includes("open") && command.includes("youtube")){
      window.open("https://www.youtube.com/","_blank")
      speak("Opening Youtube...")
      setResponse(true)
      setPrompt("Opening Youtube...")
      setTimeout(() => {
        setSpeaking(false)
      }, 4000)
    }else   if(command.includes("open") && command.includes("google")){
      window.open("https://www.google.com/","_blank")
      speak("Opening Google...")
      setResponse(true)
      setPrompt("Opening Google...")
      setTimeout(() => {
        setSpeaking(false)
      }, 4000)
    }else if(command.includes("time")){
      let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
      speak(time)
      setResponse(true)
      setPrompt(time)
      setTimeout(() => {
        setSpeaking(false)
      }, 4000)
    }else if(command.includes("date")){
        let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
        speak(date)
        setResponse(true)
        setPrompt(date)
        setTimeout(() => {
          setSpeaking(false)
        }, 4000)
      }
    else{
      aiResponse(command)
    }
  }

  let value = {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,
    setResponse
  }

  return (
    <div>
      <datacontext.Provider value={value}>
        {children}
      </datacontext.Provider>
    </div>
  )
}

export default UserContext
