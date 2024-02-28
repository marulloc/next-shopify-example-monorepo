import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { TPortalConstants, TPortalValue, atomPortalController } from '../context/portal-atoms';
import { useCallback, useMemo } from 'react';

/**
 *
 * @param portalName
 * @returns
 */
export const useGetPortalRecole = (portalName: TPortalConstants) => {
  const portals = useRecoilValue(atomPortalController);
  const targetPortalStatus = useMemo(
    () => portals.find((portal) => portal.portalName === portalName),
    [portalName, portals],
  );

  if (!targetPortalStatus) throw Error(`Cannot found Portal(named ${portalName})`);
  return targetPortalStatus as Readonly<TPortalValue>;
};

/**
 *
 * @param portalName
 * @returns
 */
export const useSetPortalRecoil = (portalName: TPortalConstants) => {
  const setPortals = useSetRecoilState(atomPortalController);

  const activate = useCallback(
    (params?: { onlyOne?: boolean }) => {
      setPortals((portals) => {
        return portals.map((portal) => ({
          portalName: portal.portalName,
          isActive: portal.portalName === portalName ? true : params?.onlyOne ? false : portal.isActive,
        }));
      });
    },
    [portalName, setPortals],
  );

  const deactivate = useCallback(
    (params?: { allOff?: boolean }) => {
      setPortals((portals) => {
        return portals.map((portal) => ({
          portalName: portal.portalName,
          isActive: portal.portalName === portalName ? false : params?.allOff ? false : portal.isActive,
        }));
      });
    },
    [portalName, setPortals],
  );

  return { activate, deactivate } as const;
};

/**
 *
 * @param portalName
 * @returns
 */
export const usePortalRecoil = (portalName: TPortalConstants) => {
  const [portals, setPortals] = useRecoilState(atomPortalController);

  const targetPortalStatus = useMemo(
    () => portals.find((portal) => portal.portalName === portalName),
    [portalName, portals],
  );

  const activate = useCallback(
    (params?: { onlyOne?: boolean }) => {
      setPortals((portals) => {
        return portals.map((portal) => ({
          portalName: portal.portalName,
          isActive: portal.portalName === portalName ? true : params?.onlyOne ? false : portal.isActive,
        }));
      });
    },
    [portalName, setPortals],
  );

  const deactivate = useCallback(
    (params?: { allOff?: boolean }) => {
      setPortals((portals) => {
        return portals.map((portal) => ({
          portalName: portal.portalName,
          isActive: portal.portalName === portalName ? false : params?.allOff ? false : portal.isActive,
        }));
      });
    },
    [portalName, setPortals],
  );

  if (!targetPortalStatus) throw Error(`Cannot found Portal(named ${portalName})`);
  return [targetPortalStatus as TPortalValue, { activate, deactivate }] as const;
};
