import { NextRequest, NextResponse } from 'next/server';
import { getLocale } from './@marulloc-shopify-nextapi/v24.01/services/shop/service';
import { ToolkitLocale } from './@marulloc-shopify-nextapi/v24.01/services/@toolkit-types/toolkit-shop';
import Negotiator from 'negotiator';

function createNegotiatorFromNextRequest(request: NextRequest) {
  // NextRequest의 헤더를 { [key: string]: string | string[]; } 형태로 변환
  const headers: any = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  // 변환된 헤더를 사용하여 Negotiator 인스턴스 생성
  return new Negotiator({ headers });
}

const middleware = async (request: NextRequest) => {
  const { locales: supportedLocales, supportedCountries, supportedLanguages } = await getLocale();

  // 지원되는 로케일이 현재 경로에 이미 있는지 확인합니다.
  const { pathname } = request.nextUrl;
  const hasLocale = supportedLocales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
  if (hasLocale) return;

  const country = request.geo?.country; // GeoIP를 통한 국가 코드 추출

  // const negotiator = new Negotiator(request);
  const negotiator = createNegotiatorFromNextRequest(request);

  const countrySupport = supportedCountries.find((isoCode) => isoCode === country) || 'us';
  const languageSupport = negotiator.language(supportedLanguages);
  const locale = `${countrySupport}-${languageSupport}`;

  // 요청된 URL에 로케일을 설정합니다.
  request.nextUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(request.nextUrl);
};

export const config = {
  matcher: '/:path((?!_next|favicon.ico|next.svg|vercel.svg).*)',
};

export default middleware;
