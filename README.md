# DiveSea — NFT Marketplace

Адаптивный лендинг NFT-аукциона, построенный на Next.js, с бесконечным слайдером карточек, данные для которых загружаются с CoinGecko API.

## Стек технологий

- Next.js 16 (App Router)
- React 19
- TypeScript
- SCSS Modules
- Framer Motion

## Запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Продакшн-сборка

```bash
npm run build
npm start
```

## Docker

```bash
docker build -t divesea .
docker run -p 3000:3000 divesea
```

## Возможности

- Адаптивная вёрстка (брейкпоинты: 375px, 1024px, 1440px, 1920px)
- Бесконечный горизонтальный слайдер NFT-карточек с поддержкой drag/swipe
- Таймеры обратного отсчёта на каждой карточке
- Фиксированный хедер с фоном, появляющимся при скролле
- Мобильное бургер-меню с анимированным оверлеем
- Серверная загрузка данных с CoinGecko API с фолбэком
