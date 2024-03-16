import { BaseTemplate } from '@/types/template';
import { atom } from 'recoil';

export const SelectedTemplateAtom = atom<BaseTemplate | null>({
  key: 'SelectedTemplateAtom',
  default: null,
});
