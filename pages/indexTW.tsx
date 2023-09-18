import React, { useRef, FormEvent } from 'react'
import { useQuery, useQueryClient } from 'react-query'

export default function Home() {
  const todos = useQuery('todos', () => [], {
    initialData: ['todo1', 'todo2'],
    // staleTime: 5000,
    // refetchOnWindowFocus:true,
  })

  const todoRef = useRef<HTMLInputElement>(null)

  const queryClient = useQueryClient()

  const postTodo = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (todoRef.current && todoRef.current.value) {
      queryClient.setQueryData('todos', [...todos.data!, todoRef.current.value])
    }
  }
  const clearTodos = () => {
      queryClient.setQueryData('todos', ()=>[])
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {todos.data?.map((todo, i) => (
        <p key={i}>{todo}</p>
      ))}
      <form className="mt-2 flex flex-col items-center" onSubmit={(e:any) => postTodo(e)}>
        <input
          className="my-1 border p-2"
          ref={todoRef}
          placeholder="your new todo"
        />

        <div>
          <button className="btn-primary" type="submit">
            Add new todo
          </button>
          <button
            className="btn-primary"
            onClick={() => clearTodos()}
            type="submit"
          >
            Remove todos
          </button>
        </div>
        <p>Items in the todo list {todos.data?.length}</p>
      </form>
    </div>
  )
}
