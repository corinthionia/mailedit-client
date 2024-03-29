import { BaseTemplateContents } from '@/types/template';
import { atom } from 'recoil';

export const BlocksAtom = atom<BaseTemplateContents[]>({
  key: 'BlocksAtom',
  default: [{ id: Date.now().toString(), isBlock: true, text: '' }],
});
