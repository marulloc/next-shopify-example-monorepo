import Negotiator from 'negotiator';
import { NextRequest } from 'next/server';

export const createNegotiatorFromNextRequest = (request: NextRequest) => {
  // NextRequest의 헤더를 { [key: string]: string | string[]; } 형태로 변환
  const headers: any = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  // 변환된 헤더를 사용하여 Negotiator 인스턴스 생성
  return new Negotiator({ headers });
};
