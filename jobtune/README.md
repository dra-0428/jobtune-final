# ジョブチューニング（JobTune）

自分の性格特性から職業傾向を診断できる日本語対応Webアプリです。

## セットアップ方法

```bash
npm install
npm run dev
```

## 本番ビルドと公開

```bash
npm run build
```

出力された `dist/` フォルダを GitHub Pages または Render にデプロイしてください。

## 環境変数（必要に応じて）

```
VITE_PUBLIC_URL=https://your-domain.com
```

## 使用技術

- React + TypeScript + Vite
- Chart.js（レーダーチャート）
- html2canvas + jsPDF（PDF保存）
