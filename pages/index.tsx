import React, { useRef, FormEvent } from 'react'
import { useQuery, useQueryClient } from 'react-query'

export default function Home() {
  const todos = useQuery('todos', () => [], {
    initialData: ['todo1', 'todo2'],
    staleTime: 5000,
    refetchOnWindowFocus:true,
  })

  const todoRef = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()

  const postTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (todoRef.current) {
      queryClient.setQueryData('todos', [...todos.data!, todoRef.current.value])
    }
  }
  const clearTodos = () => {
    if (todoRef.current) {
      queryClient.setQueryData('todos', [])
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-start py-20">
      {todos.data?.map((todo, i) => (
        <p key={i}>{todo}</p>
      ))}
      <form className="flex flex-col items-center space-y-6" onSubmit={(e) => postTodo(e)}>
        <input
          className="mt-5 border p-2 placeholder:text-gray-500 focus:outline-none"
          ref={todoRef}
          placeholder="your new todo"
        />

        <div className="space-x-2">
          <button
            type="submit"
            className="mt-5 rounded-lg bg-black p-2 text-white"
          >
            Add new todo
          </button>
          <button
            onClick={() => clearTodos()}
            className="mt-5 rounded-lg bg-black p-2 text-white"
          >
            Remove todos
          </button>
        </div>
        <p>Items in the todo list {todos.data?.length}</p>
      </form>
    </div>
  )
}
