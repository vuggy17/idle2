import { atom } from 'jotai';

import type { AuthProps } from './panels/components/panel';

export type AuthAtom = {
  openModal: boolean;
  state: AuthProps['state'];
  email: string;
};

export const authAtom = atom<AuthAtom>({
  openModal: false,
  state: 'signInWithEmail',
  email: '',
});
