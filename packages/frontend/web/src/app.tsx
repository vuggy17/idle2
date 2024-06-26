import '@idle/component/theme/global.css';
import 'reflect-metadata';

import { IdleContext } from '@idle/component/context';
import { NotificationProvider } from '@idle/core/components/notification/notification-provider';
import {
  buildDecorators,
  configureCommonModule,
  configureImpl,
} from '@idle/core/modules';
import { AuthSessionProvider } from '@idle/core/providers/auth-provider';
import { router } from '@idle/core/router';
import { DI } from '@idle/infra';
import { LifecycleService } from '@idle/infra/modules/lifecycle/service';
import { Container } from 'inversify';
import { Provider } from 'inversify-react';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

const container = new Container();
configureCommonModule(container);
configureImpl(container);
container.load(buildDecorators());
const lifeCycle = container.get<LifecycleService>(DI.TOKENS.LifecycleService);
lifeCycle.applicationStart();
export default function Component() {
  return (
    <Suspense>
      <Provider key="idle-di" container={container}>
        <IdleContext>
          <AuthSessionProvider>
            <NotificationProvider>
              <RouterProvider fallbackElement="loading" router={router} />
            </NotificationProvider>
          </AuthSessionProvider>
        </IdleContext>
      </Provider>
    </Suspense>
  );
}
