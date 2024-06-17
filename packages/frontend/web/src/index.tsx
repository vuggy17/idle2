import { setupGlobal } from '@idle/env/global';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './app';

function mountApp() {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
setupGlobal();
mountApp();
