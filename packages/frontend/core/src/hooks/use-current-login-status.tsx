import { useSession } from './use-session';

export function useCurrentLoginStatus() {
  const session = useSession();
  return session.status;
}
