// react-country-flag.d.ts
declare module 'react-country-flag' {
  interface ReactCountryFlagProps {
    countryCode: string;
    svg?: boolean;
    style?: React.CSSProperties;
    title?: string;
    cdnUrl?: string;
    cdnSuffix?: string;
    alt?: string;
  }

  const ReactCountryFlag: React.FC<ReactCountryFlagProps>;
  export default ReactCountryFlag;
}
