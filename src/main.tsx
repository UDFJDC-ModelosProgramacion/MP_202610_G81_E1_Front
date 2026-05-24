import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'

const rootElement = document.getElementById('root');
if (import.meta.env.DEV) {
  import('./mocks/browser')
    .then(({ worker }) => {
      worker.start();
    })
    .catch(() => {});
}

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}