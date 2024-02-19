import { NextRequest, NextResponse } from 'next/server';
import { getLocale } from './@marulloc-shopify-nextapi/v24.01/services/shop/service';
import { createNegotiatorFromNextRequest } from './negitoator';

export type TDetectionStatus = 'hasLocale' | 'referrerLocale' | 'newly-assinged';

const middleware = async (request: NextRequest) => {
  const { locales: supportedLocales, supportedCountries, supportedLanguages } = await getLocale();
  const entryCountry = request.geo?.country || 'not-detected'; // GeoIP를 통한 국가 코드 추출

  // 지원되는 로케일이 현재 경로에 이미 있는지 확인
  const { pathname } = request.nextUrl;
  const hasLocale = supportedLocales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
  if (hasLocale) {
    const response = NextResponse.next();
    response.cookies.set('detectedCountry', entryCountry, { path: '/', httpOnly: true, sameSite: 'strict' });
    response.cookies.set('detectionStatus', 'hasLocale' as TDetectionStatus, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
    });
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
    response.cookies.set('detectedCountry', entryCountry, { path: '/', httpOnly: true, sameSite: 'strict' });
    response.cookies.set('detectionStatus', 'referrerLocale' as TDetectionStatus, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
    });
    return response;
  }

  // 국가코드, 언어코드 => 로케일 결정
  const country = supportedCountries.find((isoCode) => isoCode === entryCountry) || 'kr';
  const language = createNegotiatorFromNextRequest(request).language(supportedLanguages);
  const locale = `${country}-${language}`;

  // 요청된 URL에 로케일을 설정 ;
  request.nextUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;

  // 시스템에서 배정하기 전의 검출된 로케일을 쿠키에 담아서 컴포넌트에서 접근할 수 있도록 만들기
  const response = NextResponse.redirect(request.nextUrl);
  response.cookies.set('detectedCountry', entryCountry, { path: '/', httpOnly: true, sameSite: 'strict' });
  response.cookies.set('detectionStatus', 'newly-assinged' as TDetectionStatus, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
  });
  return response;
};

export const config = {
  matcher:
    '/:path((?!_next|favicon.ico|next.svg|vercel.svg|default/collection-0.png|default/collection-1.png|default/collection-2.png|default/collection-3.png|default/information.png).*)',
};

export default middleware;
