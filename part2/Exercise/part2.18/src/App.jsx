import {useState, useEffect} from 'react'
import axios from 'axios'
// import './index.css'

// name
// capital
// area
// languages
// flag
const ShowDetails = ({country})=>{
  // console.log(Object.entries(country.languages).forEach(([k,v])=>console.log(v)))
  if(country.length===0) return null
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <p>Languages</p>
      <ul>
      {Object.entries(country.languages).map(([k,v])=><li>{v}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} width="200" height="200"/>
    </div>
  )
}
const Show = ({data,toSearch,show,setShow})=>{

  const specificHandler=(d)=>{
    console.log(d)
    setShow(d)
  }
  // console.log(data.filter(d=>d.name.common.search(toSearch)!==-1).map(d=>{d.name.common}))
  if(toSearch==='') return (<p>Nothing to show</p>)
  else{
    let resp=null
    const array = data.filter(d=>d.name.common.search(toSearch)!==-1)

    if(array.length==1){
      // setShow([])
      return (<ShowDetails country={array[0]}/>)
    }
    else if(array.length>10){ 
      // setShow([])
      return (<p>Too many matches specify another filter</p>)
    }
    else{

        return (
          <div>
          {array.map((d,i)=><p key={i}>{d.name.common} <button onClick={()=> specificHandler(d)}>show</button></p>)}
          </div>

        )
    }
    
  }
}
const App = () =>{
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [show, setShow] = useState([])

  useEffect(()=>{
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(response=>{
      setData(response.data)
    })
  },[])

  // const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/name/switzerland')
  // const data =request.then(response=>response.data)
  // console.log(data[0])

  const searchHandler = (event)=>{
    event.preventDefault()
    setSearch(event.target.value)
    setShow([])
    console.log(event.target.value)
  }

  return (
    <div>
      <div>
      find countries
      <input value={search} onChange={searchHandler}/>
      </div>
       <Show data={data} toSearch={search} show={show} setShow={setShow}/>
       <ShowDetails country={show}/>
    </div>
    
  )
}

export default App