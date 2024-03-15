import { atom } from 'jotai';

// this atom for select which auth modal to open
export type AuthAtom = {
  openModal: boolean;
  state: 'signIn';
};

export const authAtom = atom<AuthAtom>({
  openModal: true,
  state: 'signIn',
});
