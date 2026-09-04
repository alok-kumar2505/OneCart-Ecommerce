import React, { useContext, useState, useEffect } from 'react'
import { userDataContext } from '../context/UserContext'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import open from "../assets/open.mp3"
import { FiMic } from 'react-icons/fi'

function Ai() {
  let {showSearch , setShowSearch} = useContext(shopDataContext)
  const { userData } = useContext(userDataContext); 

  let navigate = useNavigate()
  let [activeAi,setActiveAi] = useState(false)
  let openingSound = new Audio(open)
  const [recognition, setRecognition] = useState(null)

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      
      recog.onresult = (e) => {
        const transcript = e.results[0][0].transcript.trim();
        if(transcript.toLowerCase().includes("search") && transcript.toLowerCase().includes("open") && !showSearch){
          speak("opening search")
          setShowSearch(true) 
          navigate("/collection")
        }
        else if(transcript.toLowerCase().includes("search") && transcript.toLowerCase().includes("close") && showSearch){
          speak("closing search")
          setShowSearch(false) 
        }
        else if(transcript.toLowerCase().includes("collection") || transcript.toLowerCase().includes("collections") || transcript.toLowerCase().includes("product") || transcript.toLowerCase().includes("products") || transcript.toLowerCase().includes("shop")){
          speak("opening shop")
          navigate("/collection")
        }
        else if(transcript.toLowerCase().includes("about") || transcript.toLowerCase().includes("aboutpage") ){
          speak("opening about page")
          navigate("/about")
          setShowSearch(false) 
        }
        else if(transcript.toLowerCase().includes("home") || transcript.toLowerCase().includes("homepage") ){
          speak("opening home page")
          navigate("/")
          setShowSearch(false) 
        }
        else if(transcript.toLowerCase().includes("cart")  || transcript.toLowerCase().includes("kaat")  || transcript.toLowerCase().includes("caat") || transcript.toLowerCase().includes("bag")){
          speak("opening your bag")
          navigate("/cart")
          setShowSearch(false) 
        }
        else if(transcript.toLowerCase().includes("contact") || transcript.toLowerCase().includes("support")){
          speak("opening contact page")
          navigate("/contact")
          setShowSearch(false) 
        }
        else if(transcript.toLowerCase().includes("order") || transcript.toLowerCase().includes("myorders") || transcript.toLowerCase().includes("orders") || transcript.toLowerCase().includes("my order")){
          speak("opening your orders")
          navigate("/order")
          setShowSearch(false) 
        }
        else if(transcript.toLowerCase().includes("checkout") || transcript.toLowerCase().includes("place order")){
          speak("opening checkout")
          navigate("/placeorder")
          setShowSearch(false) 
        }
        else{
          toast.error("Command not recognized. Try 'cart', 'shop', or 'orders'.")
        }
      }

      recog.onend = () => {
        setActiveAi(false)
      }

      setRecognition(recog)
    }
  }, [navigate, showSearch, setShowSearch])

  if (!userData) {
    return null; 
  }

  function speak(message){
    let utterence=new SpeechSynthesisUtterance(message)
    window.speechSynthesis.speak(utterence)
  }

  return (
    <div className='fixed lg:bottom-8 md:bottom-10 bottom-24 right-8 z-50' onClick={()=>{
      if (recognition) {
        recognition.start();
        openingSound.play();
        setActiveAi(true);
      } else {
        toast.error("Voice commands are not supported in your browser.");
      }
    }}>
      <div className={`w-14 h-14 rounded-full bg-black text-white flex items-center justify-center cursor-pointer shadow-lg border-2 border-white transition-all duration-300 hover:scale-110 ${activeAi ? 'animate-pulse scale-110 bg-[#8B1B1B]' : ''}`}>
        <FiMic className={`w-6 h-6 ${activeAi ? 'text-white animate-bounce' : 'text-white'}`} />
      </div>
    </div>
  )
}

export default Ai
