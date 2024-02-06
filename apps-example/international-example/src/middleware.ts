import { NextRequest, NextResponse } from 'next/server';
import { getLocale } from './@marulloc-shopify-nextapi/v24.01/services/shop/service';
import { createNegotiatorFromNextRequest } from './negitoator';

const middleware = async (request: NextRequest) => {
  const { locales: supportedLocales, supportedCountries, supportedLanguages } = await getLocale();

  // 지원되는 로케일이 현재 경로에 이미 있는지 확인합니다.
  const { pathname } = request.nextUrl;
  const hasLocale = supportedLocales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
  if (hasLocale) return;

  console.log(pathname);
  // 국가코드 결정
  const entryCountry = request.geo?.country; // GeoIP를 통한 국가 코드 추출
  const country = supportedCountries.find((isoCode) => isoCode === entryCountry) || 'us';

  // 언어코드 결정
  const negotiator = createNegotiatorFromNextRequest(request);
  const language = negotiator.language(supportedLanguages);

  // 확정된 로케일
  const locale = `${country}-${language}`;

  // 요청된 URL에 로케일을 설정합니다.
  request.nextUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(request.nextUrl);
};

export const config = {
  matcher:
    '/:path((?!_next|favicon.ico|next.svg|vercel.svg|default/collection-0.png|default/collection-1.png|default/collection-2.png|default/collection-3.png|default/information.png).*)',
};

export default middleware;
