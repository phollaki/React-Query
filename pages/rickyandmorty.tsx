import React, { useState } from 'react'
import { useQuery } from 'react-query'

interface Character {
  id: number,
  name: string,
  status: string,
  species: string,
  type: string,
  gender: string,
  origin: {
    name: string,
    url: string,
  },
  location: {
    name: string,
    url: string,
  },
  image: string,
  episode: string[],
  url: string,
  created: string,
}

function rickyandmartin() {
  const [page, setPage] = useState(1);

  const fetchCharacters = async ({queryKey}:any) =>{
    const res = await fetch(`https://rickandmortyapi.com/api/character?page=${queryKey[1]}`)
    return res.json();
  }

  const { data, status, error} = useQuery(["characters",page],fetchCharacters,{
    staleTime: 30000,
  })
  if(status === "loading"){
    return <h2>Loading...</h2>
  }

  if(status === "error"){
    return <div>Something wrong happened {error} </div>
  }

  return (
    <div className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-screen-lg mx-auto space-y-5">
        <div className="flex justify-evenly">
          <button className="border p-2 border-gray-300" disabled={page === 1} onClick={()=>setPage((old)=>old-1)}>Prev Page</button>
          <button className="border p-2 border-gray-300" onClick={()=>setPage((old)=>old+1)}>Next Page</button>
        </div>
        <div className="grid grid-cols-2  gap-6">
          {data.results.map((character:Character)=>(
            <div className="flex space-x-5 bg-gray-800">
              <img className="h-44 w-44" src={character.image}/>
              <div className="flex flex-col justify-between p-5">
                <h1>Name: <b>{character.name}</b></h1>
                <h2>Type: {character.species}</h2>
                <h2>Status: <span className={character.status === "Alive" ? "text-green-400": character.status === "Dead" ? "text-red-400": "text-yellow-300"}>{character.status}</span></h2>
              </div>
            </div>
          ))}
       </div>
      </div>
    </div>
  )
}

export default rickyandmartin