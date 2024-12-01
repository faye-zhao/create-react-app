import React, { useState, useEffect } from 'react';


const App = () => {
    const [data, setData] = useState([])
    const [input, setInput] = useState(null)
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const fetchData = async ()=>{
      const res = await fetch("https://swapi.dev/api/people/")
      const {count, next, previous, results} = res 
      const totalPages = Math.ceil(count/10)
      //const page = previous ? 
      setData(results)
      setTotalPages(totalPages)
    }

    useEffect(()=>{
       fetchData()
    }, [])

    if (data) {
       list = results/*.filter(v=>v.name.startsWith(input))*/.map(item=><div>{item.name}</div>)
    }
    const pagination = new Array(totalPages).fiill(0).map((val,index)=><span>{index}</span>)

    return <div>
      <input value={input} onChange={(e)=>{setInput(e.target.value)}}/>
      {list}
      {pagination}
    </div>
};

export default App;

const flattern = array => {
    const res = []
    const dfs = (arr)=> {
      arr.forEach(item=>{
        if (Array.isArray(item)) {
          dfs(item)
        } else {
          res.push(res)
        }
      }
    }
    dfs(array)
    return res
}