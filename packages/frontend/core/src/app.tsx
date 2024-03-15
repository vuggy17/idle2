import { IdleContext } from '@idle/component/context';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

import { AuthSessionProvider } from './providers/auth-provider';
import { router } from './router';

function App() {
  return (
    <Suspense>
      <IdleContext>
        <AuthSessionProvider>
          <RouterProvider fallbackElement="loading" router={router} />
        </AuthSessionProvider>
      </IdleContext>
    </Suspense>
  );
}
export default App;
