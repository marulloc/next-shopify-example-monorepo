import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

type TPortalConstants = 'menu-drawer' | 'cart-drawer' | 'search-modal' | 'locale-select-modal';

type TPortalValue = {
  portalName: TPortalConstants;
  isActive: boolean;
};
const atomPortalController = atom<Array<TPortalValue>>({
  key: 'atom-portal-controller',
  default: [
    { portalName: 'menu-drawer', isActive: false },
    { portalName: 'cart-drawer', isActive: false },
    { portalName: 'search-modal', isActive: false },
    { portalName: 'search-modal', isActive: false },
    { portalName: 'locale-select-modal', isActive: false },
  ],
});

export const useGetPortalRecole = (portalName: TPortalConstants) => {
  const portals = useRecoilValue(atomPortalController);
  const targetPortalStatus = portals.find((portal) => portal.portalName === portalName);

  return targetPortalStatus as TPortalValue;
};

export const useSetPortalRecoil = (portalName: TPortalConstants) => {
  const setPortals = useSetRecoilState(atomPortalController);

  const activate = (params?: { onlyOne?: boolean }) => {
    setPortals((portals) => {
      return portals.map((portal) => ({
        portalName: portal.portalName,
        isActive: portal.portalName === portalName ? true : params?.onlyOne ? false : portal.isActive,
      }));
    });
  };

  const deactivate = (params?: { allOff?: boolean }) => {
    setPortals((portals) => {
      return portals.map((portal) => ({
        portalName: portal.portalName,
        isActive: portal.portalName === portalName ? false : params?.allOff ? false : portal.isActive,
      }));
    });
  };

  return { activate, deactivate };
};

export const usePortalRecoil = (portalName: TPortalConstants) => {
  const [portals, setPortals] = useRecoilState(atomPortalController);

  const targetPortalStatus = portals.find((portal) => portal.portalName === portalName) as TPortalValue;

  const activate = (params?: { onlyOne?: boolean }) => {
    setPortals((portals) => {
      return portals.map((portal) => ({
        portalName: portal.portalName,
        isActive: portal.portalName === portalName ? true : params?.onlyOne ? false : portal.isActive,
      }));
    });
  };

  const deactivate = (params?: { allOff?: boolean }) => {
    setPortals((portals) => {
      return portals.map((portal) => ({
        portalName: portal.portalName,
        isActive: portal.portalName === portalName ? false : params?.allOff ? false : portal.isActive,
      }));
    });
  };

  return { ...targetPortalStatus, activate, deactivate };
};
