import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

export type TPortalConstants = 'menu-drawer' | 'cart-drawer' | 'search-modal' | 'locale-select-modal';

export type TPortalValue = {
  portalName: TPortalConstants;
  isActive: boolean;
};
export const atomPortalController = atom<Array<TPortalValue>>({
  key: 'atom-portal-controller',
  default: [
    { portalName: 'menu-drawer', isActive: false },
    { portalName: 'cart-drawer', isActive: false },
    { portalName: 'search-modal', isActive: false },
    { portalName: 'search-modal', isActive: false },
    { portalName: 'locale-select-modal', isActive: false },
  ],
});
