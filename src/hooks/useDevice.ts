import useWindowSize from './useWindowSize';

export const useDevice = (): 'mobile' | 'tablet' | 'desktop' => {
  const { width } = useWindowSize();

  const device =
    width! < 440
      ? 'mobile'
      : width! > 440 && width! < 1200
      ? 'tablet'
      : 'desktop';
  return device;
};
