import './index.css';

import { setupGlobal } from '@idle/env/global';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './app';

function mountApp() {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />,
    </React.StrictMode>,
  );
}

function main() {
  setupGlobal();
  mountApp();
}

try {
  main();
} catch (err) {
  console.error('Failed to bootstrap app', err);
}
