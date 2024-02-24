'use client';

type TProps = {
  detectedCountry: { name: string; isoCode: string };
  currentCountry: { name: string; isoCode: string };
  currentLanguage: { name: string; isoCode: string };
};

const Child = ({ detectedCountry, currentCountry, currentLanguage }: TProps) => {
  console.log('>>>> clinet >>>> detectedCountry >>>> \n', detectedCountry);
  console.log('>>>> clinet >>>> currentCountry >>>> \n', currentCountry);
  console.log('>>>> clinet >>>> currentLanguage >>>> \n', currentLanguage);
  return null;
};

export default Child;
