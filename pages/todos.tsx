import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Product } from './product'

function Todos() {
  const [clicked, setClicked] = useState(false)
  const todos = useQuery('todos', () => [],{
  })
  const products = useQuery('products', ()=>[],{
    initialData: () => [],
    staleTime: Infinity,
  })
  return (
    <div>
      {todos.data?.map((todo) => (
        <p>{todo}</p>
      ))}
      <p>Items in the todo list {todos.data?.length}</p>
      {clicked && products.data?.map((product: Product) => (
        <div>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
        </div>
      ))}
      <button onClick={()=>setClicked(!clicked)}>Click to render products</button>
    </div>
  )
}

export default Todos
