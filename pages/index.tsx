import Head from 'next/head';
import React, { useRef, FormEvent } from 'react'
import { useQuery, useQueryClient } from 'react-query'
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Button, Box, Paragraph, Input } from 'theme-ui';

const styles = {
  'button':{
    variant:"buttons.primary",
  },
  index:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  } as any,
  form: {
    mt: '1rem',
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: '0.5rem',
    }
  } as any,
  input:{
    mt:'0.5rem',
    border: '1px solid grey',
    p: '0.6rem',
    '&:focus': {
      outline: 'none',
    }
  }
}


export default function Home() {
  const todos = useQuery({
    queryFn: () => [],
    queryKey: ['todos'],
    staleTime: Infinity
    // initialData: ['todo1', 'todo2'],
    // staleTime: 5000,
    // refetchInterval: 5000,
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
    <Box sx={styles.index}>
       <Head>
        <title>React Query</title>
      </Head>
      {todos.data?.map((todo, i) => (
        <p key={i}>{todo}</p>
      ))}
      <Box as="form" sx={styles.form} onSubmit={(e) => postTodo(e)}>
        <Input
          sx={styles.input}
          ref={todoRef}
          placeholder="your new todo"
          data-cy="todo-input"
        />

        <Box>
          <Button type="submit">
            Add new todo
          </Button>
          <Button
            onClick={() => clearTodos()}
            type="submit"
          >
            Remove todos
          </Button>
        </Box>


        {/* Non-nested component */}
        <Paragraph>Items in the todo list <Paragraph data-e2e="todo-length">{todos.data?.length}</Paragraph></Paragraph>

        {/* Nested component */}
        <Box>
          <Box>
            <Box>
              <Paragraph>Items in the todo list <Paragraph data-e2e="nested-todo-length">{todos.data?.length}</Paragraph></Paragraph>
            </Box>
          </Box>
        </Box>

      </Box>
    </Box>
  )
}
