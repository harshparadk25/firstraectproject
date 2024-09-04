import { useState , useCallback , useEffect , useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  const [length, setlength] = useState(8);

  const [numallowed , setnumber] = useState(false);

  const [charallowed , setchar] = useState(false);

  const [password , setPassword] = useState("");

  //refhook
  const copypassword = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,99);
    window.navigator.clipboard.writeText(password)
  },[password])
  const passwordRef = useRef(null)
  const passwordgenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numallowed) str +="0123456789"

    if (charallowed) str+="!@#$%^&*()_+{}~`"

    for(let i=1;i <= length;i++){
      let char  = Math.floor(Math.random() * str.length +1)
      pass += str.charAt(char)
    }
   
    setPassword(pass)

  },[length,numallowed,charallowed,setPassword])
  
  
  useEffect(()=>{
    passwordgenerator()
  },[length,charallowed,numallowed,passwordgenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>

        <h1 className='text-white text-center my-3 mx-5' >passwordgenerator</h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type='text'
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}/>

          <button onClick={copypassword} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex item-center gap-x-1'>
            <input
            type='range'
            min={6}
            max={100}
            value={length}
            className='curson-pointer'
            onChange={(e)=>{setlength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type='checkbox'
            defaultChecked={numallowed}
            id='numberInput'
            onChange={()=>{
              setnumber((prev) => !prev);
              }}
              /> 
              <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
            type='checkbox'
            defaultChecked={charallowed}
            id='characterInput'
            onChange={()=>{
              setchar((prev)=>!prev)
            }}/>
            <label htmlFor='characterInput'>Character</label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
