import { useCallback, useEffect, useRef, useState } from "react"

import { ThemeProvider } from './contexts/ThemeMode'

import Themebtn from './components/Themebtn';
import Card from './components/Card';

function App() {
   var [color,setcolor]=useState("black");

   let [size,setsize]=useState(12);
   let [allownum,setallownum]=useState(false);
   let [allowchar,setallowchar]=useState( false);
   let [password,setpassword]=useState(true);
   let [paste,setpaste]=useState("copy");
  const copy=useRef(null);

  const passwordgenerator = useCallback(()=>{  
  
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
   if(allownum) {
    str += "1234567890"
   }
   if(allowchar) {
    str += " !@#$%^&*()_+?></|}{[]=`~"
   }
   
  for(let i=1;i<= size;i++){
    let pank=Math.floor(Math.random() * str.length +1)
    pass += str.charAt(pank);
  }
  setpassword(pass)

  }
   ,[size,allownum,allowchar,setpassword])

    const copyclip=useCallback(()=>{
      
      window.navigator.clipboard.writeText(password);
      setpaste("copied");
      //  copy.current?.setSelectionRange(0,39);

    },[password])

   useEffect(()=>{
    passwordgenerator();
   },[size,allownum,allowchar,passwordgenerator]);



   const [themeMode,setthememode]=useState("light");

 const  lightTheme=()=>{
  return setthememode("light")
 }
 const derkTheme=()=>{
  return setthememode("dark")
 }


  //  change in theme
   useEffect(()=>{
    document.querySelector('html').classList.remove("light");
    document.querySelector('html').classList.remove("dark");
    document.querySelector('html').classList.add(themeMode);
  },[themeMode])
 


  
  return (
    < ThemeProvider value={{themeMode, lightTheme,derkTheme}}>

    <div  style={{background:color}} className="relative w-screen h-screen sm:h-screen sm:w-screen overflow-x-hidden" >
     
   
      <div    className=" absolute  flex left-[-33vw] lg:left-10 scale-50 lg:scale-105  gap-3 m-8 bg-slate-500 p-3 rounded-md  ">
       
        <div  onClick={()=>setcolor("red")}       className="bg-red-700 p-2 rounded-lg cursor-pointer ">RED</div>
        <div  onClick={()=>setcolor("green")}     className="bg-green-800 p-2 rounded-lg cursor-pointer">GREEN</div>
        <div  onClick={()=>setcolor("yellow")}    className="bg-yellow-500 p-2 rounded-lg cursor-pointer">YELLOW</div>
        <div  onClick={()=>setcolor("blue")}      className="bg-blue-700 p-2 rounded-lg cursor-pointer">BLUE</div>
        <div  onClick={()=>setcolor("orange")}    className="bg-orange-800 p-2 rounded-lg cursor-pointer">ORANGE</div>
        <div  onClick={()=>setcolor("white")}     className="bg-white p-2 rounded-lg cursor-pointer">WHITE</div>
        <div  onClick={()=>setcolor("black")}     className="bg-black p-2 rounded-lg text-gray-50 cursor-pointer">black</div>
      </div>
 <div className="w-full max-w-sm mx-auto flex justify-end mt-4 "><Themebtn/></div>
      {/* passwordd block */}

      <div className="absolute bg-slate-500 p-3 rounded-lg   top-28 scale-90 lg:scale-105  lg:left-[34vw]">
        <div className="text-center left-7">
          <h2 className="  text-yellow-300 font-bold">Password Generator</h2>
          <input   type="text"   value={password} readOnly className="font-bold rounded-md p-1 bg-slate-300  "
             ref={copy} />

        <button className="font-bold "
          onClick={copyclip}
          
              >{paste}</button>
        </div>

     <div className="flex gap-4 flex-wrap justify-center font-bold ">
      <input className="scale-110 cursor-pointer " type="range"  value={size} min={3} max={15}
      onChange={(e)=>{setsize(e.target.value),setpaste("copy")}}   />
      <p>length({size})</p>
    <div className="flex gap-1 ">
       <input type="checkbox" 
       defaultChecked={allownum}
       onChange={ ()=>{
        setallownum((prev) =>!prev)
       }
        } />
      <p>number</p>
      <input type="checkbox"  
       defaultChecked={allowchar}
       onChange={ ()=>{ setallowchar((prev) =>!prev) } } 
      />
      <p>character</p>
    </div>
     
     </div>

      </div>
   

    
    <div className='w-full mt-48'>
        <div className="w-full max-w-sm mx-auto"> <Card/></div>
       </div>
     </div> 
    </ThemeProvider>
  )
}

export default App
