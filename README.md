# Kubi Shop

Fullstack e-commerce приложение с каталогом товаров, фильтрами, пагинацией, авторизацией и корзиной.

## Стек

### Frontend

- React 19
- TypeScript
- Vite
- Redux Toolkit / RTK Query
- React Router
- Tailwind CSS
- Feature-Sliced Design структура

### Backend

- NestJS
- TypeScript
- Prisma
- PostgreSQL
- JWT авторизация
- Cookie-based refresh token

## Структура проекта

```txt
.
|-- backend/              # NestJS API
|   |-- prisma/           # Prisma schema, migrations, seed scripts
|   `-- src/              # Backend modules
|       |-- auth/
|       |-- basket/
|       |-- brand/
|       |-- category/
|       `-- products/
`-- frontend/
    `-- kubi-shop/        # React + Vite приложение
        `-- src/
            |-- app/
            |-- entities/
            |-- features/
            |-- pages/
            |-- shared/
            `-- widgets/
```

## Быстрый старт

### 1. Установить зависимости

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd frontend/kubi-shop
npm install
```

### 2. Настроить backend окружение

Создай файл `backend/.env` и добавь переменные:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE"
PORT=5000
JWT_ACCESS_SECRET="your-access-secret"
JWT_REFRESH_SECRET="your-refresh-secret"
```

Frontend сейчас обращается к API по адресу:

```txt
http://localhost:5000/
```

Поэтому для локальной разработки backend лучше запускать на `PORT=5000`.

### 3. Подготовить базу данных

Из папки `backend`:

```bash
npx prisma migrate dev
npx prisma generate
```

Если нужно заполнить базу тестовыми товарами:

```bash
npm run db:seed:products
```

### 4. Запустить проект

Backend:

```bash
cd backend
npm run start:dev
```

Frontend:

```bash
cd frontend/kubi-shop
npm run dev
```

После запуска frontend будет доступен по адресу, который покажет Vite. Обычно это:

```txt
http://localhost:5173
```

## Основные backend endpoints

### Auth

- `POST /auth/registration` - регистрация
- `POST /auth/login` - вход
- `POST /auth/refresh` - обновление токенов
- `POST /auth/logout` - выход
- `GET /auth/me` - текущий пользователь

### Products

- `GET /products` - все товары
- `GET /products/page?page=1&limit=12` - товары с пагинацией
- `GET /products/page/filters` - товары с фильтрами, ценой, сортировкой и пагинацией
- `GET /products/:id` - товар по id

### Category

- `GET /category` - все категории
- `GET /category/:slug` - категория по slug

### Brand

- `GET /brand` - все бренды
- `GET /brand/:slug` - бренд по slug

### Basket

Эндпоинты корзины защищены JWT guard.

- `GET /basket` - получить корзину пользователя
- `PATCH /basket/add` - добавить товар
- `PATCH /basket/updateQty` - изменить количество товара
- `DELETE /basket/product/:productId` - удалить товар из корзины
- `DELETE /basket` - очистить корзину

## Полезные команды

### Backend

```bash
npm run start:dev     # dev server
npm run build         # production build
npm run start:prod    # запуск dist/main
npm run lint          # eslint с автофиксами
npm run format        # prettier
npm run test          # unit tests
npm run test:cov      # tests coverage
```

### Frontend

```bash
npm run dev           # dev server
npm run build         # production build
npm run preview       # preview production build
npm run lint          # eslint
npm run lint:fix      # eslint с автофиксами
npm run format        # prettier
npm run format:check  # проверка форматирования
```

## Архитектура frontend

Frontend организован близко к Feature-Sliced Design:

- `app` - провайдеры, глобальные стили, корневой компонент
- `pages` - страницы приложения
- `widgets` - крупные самостоятельные блоки страниц
- `features` - пользовательские сценарии и интерактивная логика
- `entities` - бизнес-сущности: Product, Category, Brand и т.д.
- `shared` - переиспользуемые UI-компоненты, API helpers, конфиги и утилиты

## Заметки по разработке

- Backend включает CORS для `http://localhost:5173`.
- Refresh token хранится в httpOnly cookie.
- Для работы корзины нужен авторизованный пользователь.
- Общий API client на frontend находится в `frontend/kubi-shop/src/shared/api/baseApi.ts`.
