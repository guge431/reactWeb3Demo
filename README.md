一个现代化的 React 应用程序，展示 Web3 集成，使用 Webpack 和 SWC 进行优化构建配置。

🚀 项目特性
React 19 - 最新版本的 React，支持现代 hooks 和特性
TypeScript 支持 - 完整的 TypeScript 配置，提供类型安全
Tailwind CSS - 实用优先的 CSS 框架，快速样式开发
Lucide 图标 - 美观、可定制的图标库
Markdown 支持 - React Markdown 集成，支持富文本内容
现代构建工具 - Webpack 5 配合 SWC 实现快速编译
代码质量 - ESLint 配合 Airbnb TypeScript 配置
测试就绪 - Jest 和 React Testing Library 测试环境
Cloudflare 集成 - KV 资源处理器，支持边缘部署
📦 技术栈
核心依赖
React 19.1.0
TypeScript
Tailwind CSS 3.4.17
Lucide React 0.511.0
构建工具
Webpack 5
SWC (Speedy Web Compiler)
PostCSS 配合 Autoprefixer
Terser 代码压缩
开发工具
ESLint 配合 Airbnb 配置
Webpack Dev Server
Bundle Analyzer 打包分析
热模块替换 (HMR)
🛠️ 安装说明
bash
# 克隆仓库
git clone <你的仓库地址>
cd react-web3-demo

# 安装依赖
npm install
🏃‍♂️ 快速开始
开发模式
启动开发服务器，支持热重载：

bash
npm start
应用将在 http://localhost:8080（或 webpack-dev-server 指定的端口）上运行。

构建项目
开发环境构建
bash
npm run build:dev
生产环境构建
bash
npm run build:prod
构建产物将生成在 dist/ 目录中。

运行测试
执行测试套件：

bash
npm test
📁 项目结构
react-web3-demo/
├── src/
│   ├── components/     # React 组件
│   ├── pages/         # 页面组件
│   ├── hooks/         # 自定义 React hooks
│   ├── utils/         # 工具函数
│   ├── styles/        # CSS 和 Tailwind 样式
│   └── types/         # TypeScript 类型定义
├── public/            # 静态资源
├── dist/              # 构建输出目录
├── webpack.config.js  # Webpack 配置
├── tailwind.config.js # Tailwind 配置
├── tsconfig.json      # TypeScript 配置
└── package.json       # 项目配置
⚙️ 配置说明
Webpack 配置
开发模式: 支持热重载、源码映射
生产模式: 代码压缩、资源优化、Tree Shaking
SWC 编译: 比 Babel 更快的 TypeScript/JavaScript 编译器
Tailwind CSS
项目使用 Tailwind CSS 进行样式开发，支持：

响应式设计
暗色模式
自定义主题配置
生产环境下的 CSS 优化
TypeScript
完整的 TypeScript 配置，包括：

严格类型检查
路径映射
React 类型支持
🔧 开发指南
添加新组件
bash
# 在 src/components 目录下创建新组件
mkdir src/components/YourComponent
touch src/components/YourComponent/index.tsx
touch src/components/YourComponent/YourComponent.module.css
使用 Tailwind CSS
tsx
// 使用 Tailwind 类名进行样式设计
<div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
  <h2 className="text-xl font-bold">标题</h2>
</div>
添加图标
tsx
import { Home, User, Settings } from 'lucide-react';

<Home className="w-6 h-6" />
<User size={24} />
<Settings color="blue" />
🚀 部署
Cloudflare Workers
项目包含 Cloudflare KV 资源处理器，支持部署到 Cloudflare Workers：

bash
# 构建生产版本
npm run build:prod

# 部署到 Cloudflare Workers
# (需要配置 wrangler.toml)
其他部署选项
Vercel: 支持零配置部署
Netlify: 静态站点部署
AWS S3: 静态资源托管
📝 可用脚本
命令	描述
npm start	启动开发服务器
npm run build:dev	开发环境构建
npm run build:prod	生产环境构建
npm test	运行测试
npm run eject	弹出 Create React App 配置
🤝 贡献指南
Fork 本仓库
创建特性分支 (git checkout -b feature/AmazingFeature)
提交更改 (git commit -m 'Add some AmazingFeature')
推送到分支 (git push origin feature/AmazingFeature)
开启 Pull Request
📄 许可证
本项目采用 MIT 许可证 - 查看 LICENSE 文件了解详情。

📞 联系方式
如有问题或建议，请通过以下方式联系：

创建 Issue
发送邮件至: your-email@example.com
⭐ 如果这个项目对你有帮助，请给它一个 star！

