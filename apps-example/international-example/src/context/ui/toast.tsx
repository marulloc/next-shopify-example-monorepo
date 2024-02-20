import { atom, useRecoilValue } from 'recoil';

const A = () => {
  return <div>A</div>;
};

const atomToastController = atom({
  key: 'atom-toast-controller',
  default: [<A key="1" />, <A key="12" />],
});

export const useGetToastList = () => {
  const toastList = useRecoilValue(atomToastController);

  return toastList;
};

export const useSetToastList = () => {};
