import { IdleContext } from '@idle/component/context';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

import { RealtimeEventProvider } from './components/realtime-events/event-provider';
import { AuthSessionProvider } from './providers/auth-provider';
import { router } from './router';

function Component() {
  return (
    <Suspense>
      <IdleContext>
        <AuthSessionProvider>
          <RealtimeEventProvider>
            <RouterProvider fallbackElement="loading" router={router} />
          </RealtimeEventProvider>
        </AuthSessionProvider>
      </IdleContext>
    </Suspense>
  );
}
export default Component;
