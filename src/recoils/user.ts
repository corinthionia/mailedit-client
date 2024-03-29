import { UserMetaData } from '@/types/user';
import { atom } from 'recoil';

export const UserAtom = atom<UserMetaData>({
  key: 'UserAtom',
  default: {
    email: '',
    name: '',
  },
});
