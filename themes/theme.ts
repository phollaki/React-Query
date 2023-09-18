import type { Theme } from 'theme-ui'

export const theme: Theme = {
  fonts: {
    body: 'system-ui, sans-serif',
    heading: '"Avenir Next", sans-serif',
    monospace: 'Menlo, monospace',
  },
  colors: {
    primary:{
      text: '#000',
      background: '#fff',
    }
  },
  buttons:{
    primary:{
      color: 'white',
      backgroundColor:'black',
      borderRadius: '999px',
      p:"10px",
    }
  }
}