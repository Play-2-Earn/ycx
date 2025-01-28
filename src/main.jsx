import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { LeadProvider } from './Context/LeadContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LeadProvider>
    <App />
    </LeadProvider>
  </StrictMode>
);
