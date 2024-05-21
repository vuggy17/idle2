import '@idle/component/theme/global.css';

import { IdleContext } from '@idle/component/context';
import { RealtimeEventProvider } from '@idle/core/src/components/realtime-events/event-provider';
import { AuthSessionProvider } from '@idle/core/src/providers/auth-provider';
import { router } from '@idle/core/src/router';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

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
