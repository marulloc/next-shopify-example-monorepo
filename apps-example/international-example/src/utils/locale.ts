export const splitLocale = (locale: string): { countryCode: string; languageCode: string } => {
  const parts = locale.split('-');
  // 나눠진 부분이 두 개가 아닌 경우, 형식이 잘못된 것으로 간주하고 기본값을 설정합니다.
  if (parts.length !== 2) throw new Error('Invalid locale format');

  // 첫 번째 부분을 국가 코드로, 두 번째 부분을 언어 코드로 간주합니다.
  const [countryCode, languageCode] = parts;
  return { countryCode, languageCode };
};
