import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import App from './App.tsx'
import './index.css'
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query.ts';


createRoot(document.getElementById('root')!).render(
  <MantineProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </MantineProvider>
)
