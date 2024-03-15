import { AppSidebar } from '../app-sidebar';
import { RoomList } from '../room-list';

/**
 * wrap App sidebar and other components, logics
 *
 */
export function RootAppSidebar() {
  return (
    <AppSidebar>
      <RoomList />
    </AppSidebar>
  );
}
