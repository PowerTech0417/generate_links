# generate_links

OTT 签名 + 短网址生成器（PWA）
- GitHub Pages URL: https://powertech0417.github.io/generate_links/
- 使用 `index.html` 生成签名链接并通过短链 Worker 创建短网址
- 支持 PWA 打包为 Android APK（通过 GitHub Actions + Bubblewrap）

## 部署步骤
1. 把仓库内容 push 到 `main` 分支。
2. Settings → Pages → Source: `main / (root)`，启用 Pages。
3. 若要自动构建 APK：
   - 在仓库 Secrets 中添加 `KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD`（用于签名）。
   - Actions 会在 push 后运行 `Build Android APK` 工作流，构建产物在 Actions 页面可下载。

## 图标
请将 `icon.svg` 转换为 `icon-512.png`（512×512）并上传到仓库根目录。
