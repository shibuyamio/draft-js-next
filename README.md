[Draft.js](https://draftjs.org/)をNext上で使えるようにするサンプル実装

- Draft.js `v0.11.0`
- Next.js `v12.1.0`
- TailwindCSS `v3.0.23`
- TypeScript

ブロックスタイル切り替えの使い勝手が微妙。

## Usage

```tsx
<Editor />
```

書きかけのデータをlocalstorageに保存します。

同一プロジェクト内で複数エディタを扱う場合はIDを指定してください。

```tsx
<Editor id="firstcontents" />
...
<Editor id="secondcontents" />
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```
