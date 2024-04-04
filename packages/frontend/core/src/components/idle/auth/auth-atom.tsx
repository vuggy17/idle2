import { atom } from 'jotai';

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
