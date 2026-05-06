# Thai Alphabet · 泰语字母学习

移动端优先的泰语入门训练工具。覆盖 **辅音 / 元音 / 尾辅音 / 声调 / 拼读规则**。

## 功能

- **总览** — 44 辅音（中/高/低分类）、单/复合/特殊元音、声调符号与推导规则表。
- **选择题训练**
  - 模式 A：给字母，从 4 个读音里选正确答案。
  - 模式 B：给读音，选字母（同音辅音多选）。
- **Anki 记忆模式** — 知道 / 模糊 / 不知道，简化版 SM-2 SRS，进度持久化在 `localStorage`。
- **书写描红** — 字母半透明描红 + 触屏 / 鼠标书写画布，支持清空。
- **拼读输入** — 程序按拼读规则生成 *初辅音 + 元音 (+ 尾辅音 + 声调符号)* 合法音节；用户输入罗马音，提交后给出每一项解析与最终声调。可选启用：
  - 复合元音 `เ-ีย / เ-ือ / ัว`（`ัว` 接尾辅音时自动写为 `-ว-`）
  - **ห-引导规则**：`ห` 在单独低辅音 (ง ญ น ม ย ร ล ว) 前不发音，整个音节按 **高辅音** 推声调。

> 发音使用浏览器 Web Speech API（`lang=th-TH`），无需托管音频文件。

## 技术栈

- Next.js 14 App Router · TypeScript · Tailwind CSS
- 静态、纯前端，零后端依赖
- 适合部署到 Cloudflare Pages

## 数据结构

- `src/data/types.ts` — 类型定义
- `src/data/consonants.ts` — 44 辅音：分类、罗马音、mnemonic、初/尾辅音读音
- `src/data/vowels.ts` — 元音：分类、长短、罗马音
- `src/data/tones.ts` — 声调符号、5 声、`calculateTone()` 程序化推导
- `src/lib/syllable.ts` — 音节生成、罗马音化
- `src/lib/srs.ts` — SRS 算法
- `src/lib/tts.ts` — 浏览器泰语 TTS

## 开发

```bash
npm install
npm run dev
```

## 部署 Cloudflare Pages

本项目已配置为 **Next.js 静态导出**（`next.config.mjs` 中的 `output: "export"`），可直接作为静态站点部署，无需 Workers / SSR 适配器。

构建产物：`out/`

### 方式 1：Pages Dashboard（推荐）

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**。
2. 选择仓库 `Charlot316/ThaiAlphabet`。
3. 构建配置：
   - Framework preset: **Next.js (Static HTML Export)**（或选 None 也可）
   - Build command: `npm run build`
   - Build output directory: `out`
   - Node version (Environment variables): `NODE_VERSION = 20`
4. 保存并部署。后续 push 到 `main` 会自动重新构建。

### 方式 2：Wrangler CLI 直传

```bash
npm run build
npx wrangler pages deploy out --project-name=thai-alphabet
```

### 本地验证静态产物

```bash
npm run build
npx serve out
```
