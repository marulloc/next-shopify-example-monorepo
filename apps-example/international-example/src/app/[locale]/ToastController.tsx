'use client';

import { useGetToastList } from '@/context/ui/toast';
import { useRecoilValue } from 'recoil';

const ToastController = () => {
  const Component = useGetToastList();

  return <>{Component}</>;
};

export default ToastController;
