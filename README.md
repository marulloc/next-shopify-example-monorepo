# Next-Shopify-Example-Monorepo

- **ChatGPT 가 생성한 Readme 입니다.**
- **[View Storefront Demo](https://shopify-storefront-monorepo-example-international-example.vercel.app/)**
- **[English README](https://github.com/marulloc/shopify-storefront-monorepo-example/blob/master/README-EN.md)**

<br/>

## Introduction

이 프로젝트는 Next.js와 Shopify API를 사용하여 구축된 글로벌 서비스용 custom storefront의 모노레포 예시입니다. 여러 스토어프론트를 하나로 묶어 효율적인 개발과 관리를 가능하게 하는 모노레포 구조를 채택하였습니다. 글로벌 사용자에게 최적화된 쇼핑 경험을 제공하기 위해 다양한 로케일 및 다국어 지원 기능을 구현하였습니다.

<br/>

## Structure

- `apps-example/international-example`: Next.js를 기반으로 한 다국어 및 다국적 기능을 지원하는 스토어프론트 예제 앱입니다.
- `packages/@marulloc-components-library`: 대화상자(Dialog)나 서랍(Drawer)과 같은 UI 컴포넌트를 쉽게 사용할 수 있도록 설계된 합성 컴포넌트 라이브러리입니다.
- `packages/@marulloc-shopify-next-api`: Shopify GraphQL API를 활용하여 다국적, 다국어 서비스를 용이하게 구현할 수 있도록 돕는 라이브러리입니다.

각 앱과 패키지는 독립적인 기능과 의존성을 가지며, 모노레포를 통해 효율적으로 관리됩니다.

<br/>

## Start

모노레포를 사용하기 위해 루트 디렉토리에서 다음 명령어로 의존성을 설치하고 프로젝트를 시작할 수 있습니다:

```sh
pnpm install
pnpm run dev --filter @marulloc-components-library
```

<br/>

## Packages

##### `@marulloc-components-library`

UI 컴포넌트들의 재사용성을 높이고, 일관된 디자인 패턴을 유지하기 위해 합성 컴포넌트 패턴을 사용합니다. 이 라이브러리는 개발자가 보다 쉽게 대화상자, 서랍 등의 UI 컴포넌트를 프로젝트에 통합할 수 있도록 합니다.

##### `@marulloc-shopify-next-api`

Shopify의 GraphQL API를 더욱 효과적으로활용할 수 있게 해주는 유틸리티와 타입을 제공합니다. 다국적 및 다국어 지원이 필요한 프로젝트에 특히 유용하며, API 응답을 간소화하고 개발자 친화적으로 만들어 줍니다.

<br/>

---

# International Example Storefront

이 프로젝트는 Next.js를 기반으로 하여 다국어 및 다국적 기능을 지원하는 맞춤형 스토어프론트입니다. Shopify GraphQL API의 강력한 기능을 활용하여 구축되었습니다.

<br/>

## Getting Started

프로젝트를 실행하려면 다음 명령어를 사용하세요:

```sh
pnpm run dev --filter international-example
```

#### Required !!

1. 프로젝트는 env.example 파일에 명시된 세 개의 환경 변수를 필요로 합니다.
2. Shopify API를 위한 맞춤형 라이브러리에 대한 자세한 정보는 모노레포 내의 @marulloc-shopify-next-api 프로젝트를 참고하세요.

<br/>

## Features

### 1. API Integration

Shopify GraphQL API를 바로 사용할 수도 있지만, 모노레포 공유 라이브러리에 위치한 제 맞춤형 라이브러리(@marulloc-shopify-next-api)를 통해 다국어 및 다국적 지원 기능을 강화할 수 있습니다. 이 라이브러리에는 API 응답 구조를 단순화하는 파서와 타입이 포함되어 있어, 개발자가 더 쉽게 작업할 수 있도록 해줍니다.

<br/>

### 2. Auto Multilingual and Multinational Support

Shopify가 GraphQL API의 @inContext 지시어를 통해 다국어 데이터를 제공하지만, 다른 콘텐츠를 위해서는 /dictionary를 직접 만들어 사용하고 있습니다.

로케일은 사용자의 브라우저 언어 설정과 geoIP를 기반으로 결정됩니다. Shopify에서 제공하는 사용 가능한 로케일은 API를 통해 가져옵니다. middleware.ts는 negotiator 라이브러리를 사용하여 로케일을 할당하고 리디렉션합니다. 이는 고정된 로케일 리스트에 의존하여 성능을 최적화합니다.

apps/[locale] 동적 라우팅은 경로가 지정될 때 로케일 컨텍스트(Recoil atoms로 구현됨)를 초기화합니다.

배송이나 화폐 단위에서 발생할 수 있는 차이를 사용자에게 알려주기 위해, geoIP의 불일치를 감지하고 사용자에게 해당 사항을 통지합니다. 클라이언트 측 쿠키 읽기는 apps/api/locale-detection API를 통해 처리됩니다.

<br/>

### 3. Dynamic Language Support

다양한 언어로 변수와 컴포넌트를 동적으로 삽입할 수 있도록 /dictionary/utils.tsx에 위치한 dictionaryReplace 함수를 통해 지원합니다.

<br/>

### 4. State Management with Recoil

Shopify API와 관련된 모든 컨텍스트는 로케일 정보를 저장하기 위한 atomLocale에 의존합니다.

cartAtom은 낙관적 UI 접근 방식을 사용하여 카트와 atom 효과를 통해 동기화합니다. 이는 로컬 스토리지와 Recoil의 상태 관리 기능을 활용하여 효율적이고 반응이 빠른 카트 경험을 제공합니다.

<br/>

### 5. Hooks Pattern

컴포넌트를 깔끔하고 유지보수가 쉽도록, 뷰 로직과 비즈니스 로직을 분리하기 위해 맞춤형 React 훅을 사용합니다.

<br/>

### 6. Styling with Tailwind CSS

프로젝트는 스타일링을 위해 Tailwind CSS를 사용하고 있으며, theme-constant.ts 파일에 정의된 일반적으로 사용되는 유틸리티 클래스 세트를 활용합니다. <SemanticBox /> 및 <Typography />와 같은 컴포넌트를 통해 스타일 변형을 사용하여 반복되는 클래스 사용을 최소화하고자 합니다.

---

Shopify API를 위한 맞춤형 라이브러리에 대한 자세한 정보는 모노레포 내의 @marulloc-shopify-next-api 프로젝트를 참고하세요.
