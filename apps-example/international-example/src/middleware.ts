import { NextRequest, NextResponse } from 'next/server';
import { getLocale } from './@marulloc-shopify-nextapi/v24.01/services/shop/service';
import { createNegotiatorFromNextRequest } from './negitoator';

export type TDetectionStatus = 'hasLocale' | 'referrerLocale' | 'newly-assigned';

const setLocaleDetectionCookies = (response: NextResponse, entryCountry: string, detectionStatus: TDetectionStatus) => {
  response.cookies.set('detectedCountry', entryCountry, { path: '/', httpOnly: true, sameSite: 'strict' });
  response.cookies.set('detectionStatus', detectionStatus, { path: '/', httpOnly: true, sameSite: 'strict' });
};

const middleware = async (request: NextRequest) => {
  const { locales: supportedLocales, supportedCountries, supportedLanguages } = await getLocale();
  const entryCountry = request.geo?.country || 'not-detected'; // GeoIP를 통한 국가 코드 추출
  const { pathname } = request.nextUrl;

  // 지원되는 로케일이 현재 경로에 이미 있는지 확인
  const hasLocale = supportedLocales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
  if (hasLocale) {
    const response = NextResponse.next();
    setLocaleDetectionCookies(response, entryCountry, 'hasLocale');
    return response;
  }

  const referrer = request.headers.get('referer');
  const referrerLocale = supportedLocales.find(
    (locale) => referrer?.includes(`/${locale}/`) || referrer?.includes(`/${locale}`) || referrer === `/${locale}`,
  );

  // 내부 라우팅시 로케일 referrer(이전 페이지)의 로케일로 자동 배정
  if (referrerLocale) {
    request.nextUrl.pathname = `/${referrerLocale}${pathname === '/' ? '' : pathname}`;
    const response = NextResponse.redirect(request.nextUrl);
    setLocaleDetectionCookies(response, entryCountry, 'referrerLocale');
    return response;
  }

  // 로케일 정보가 아예 없는 경우, 신규 배정
  const country = supportedCountries.find((isoCode) => isoCode === entryCountry) || 'kr';
  const language = createNegotiatorFromNextRequest(request).language(supportedLanguages);
  const locale = `${country}-${language}`;

  request.nextUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  const response = NextResponse.redirect(request.nextUrl);
  setLocaleDetectionCookies(response, entryCountry, 'newly-assigned');
  return response;
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|default-alt-images/|favicon.ico).*)'],
  // matcher:
  //   '/:path((?!_next|favicon.ico|next.svg|vercel.svg|default/collection-0.png|default/collection-1.png|default/collection-2.png|default/collection-3.png|default/information.png).*)',
};

export default middleware;
