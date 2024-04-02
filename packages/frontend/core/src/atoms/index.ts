import { atom } from 'jotai';

// this atom for select which auth modal to open
export type AuthAtom = {
  openModal: boolean;
  state: 'signIn' | 'signInWithEmail' | 'afterSignInWithEmail';
  email: string;
};

export const authAtom = atom<AuthAtom>({
  openModal: false,
  state: 'signInWithEmail',
  email: '',
});
