# 项目工程化配置说明

## 修改的文件

### 根目录
1. `package.json` - 新增根目录配置，包含 ESLint、Prettier、Husky、lint-staged 等依赖
2. `.eslintrc.js` - ESLint 配置文件
3. `.prettierrc.js` - Prettier 配置文件
4. `.eslintignore` - ESLint 忽略文件
5. `.prettierignore` - Prettier 忽略文件
6. `.husky/pre-commit` - Git 预提交钩子

### 前端 (client/)
1. `package.json` - 更新依赖和脚本，添加 @craco/craco，升级 react-scripts 到 5.0.1
2. `craco.config.js` - CRACO 配置文件，用于路径别名和 webpack 配置（优化代码分割）
3. `tsconfig.json` - 配置路径别名 @ 指向 src
4. `.env.development` - 开发环境变量
5. `.env.production` - 生产环境变量
6. `src/API.ts` - 使用环境变量配置 API 地址
7. `src/App.tsx` - 使用路径别名 @ 导入组件
8. `src/App.test.tsx` - 更新测试用例
9. `src/API.test.ts` - 前端 API 函数测试（核心业务逻辑测试）

### 后端 (server/)
1. `package.json` - 更新依赖和脚本，添加 module-alias 和 vitest
2. `tsconfig.json` - 配置路径别名 @ 指向 src
3. `vitest.config.ts` - Vitest 测试配置文件
4. `src/app.ts` - 注册 module-alias 并使用路径别名
5. `src/routes/index.ts` - 使用路径别名
6. `src/utils/testUtils.ts` - 测试工具函数
7. `src/utils/testUtils.test.ts` - 测试用例
8. `src/controllers/todos/index.test.ts` - 后端控制器测试（核心业务逻辑测试）

## 如何验证配置生效

### 1. 安装依赖
```bash
npm install
```

### 2. 验证代码规范
```bash
# 运行 ESLint 检查
npm run lint

# 运行 Prettier 格式检查
npm run format:check

# 自动修复代码格式
npm run lint:fix
npm run format
```

### 3. 验证路径别名
- 前端：检查 `client/src/App.tsx` 中的导入语句是否使用 `@/` 开头
- 后端：检查 `server/src/app.ts` 和 `server/src/routes/index.ts` 中的导入语句是否使用 `@/` 开头

### 4. 验证环境变量
- 开发环境：在 `client/.env.development` 中配置 `REACT_APP_API_URL`
- 生产环境：在 `client/.env.production` 中配置 `REACT_APP_API_URL`
- 代码中通过 `process.env.REACT_APP_API_URL` 访问

### 5. 验证代码分割
- 运行 `npm run build:client` 检查构建产物
- 应该生成单独的 chunk 文件：
  - react.[hash].chunk.js（React 相关依赖）
  - axios.[hash].chunk.js（Axios 依赖）
  - vendors.[hash].chunk.js（其他第三方依赖）
  - common.[hash].chunk.js（公共代码）

## 运行测试的命令

### 前端测试
```bash
# 运行前端测试
npm run test:client
```

### 后端测试
```bash
# 运行后端测试
npm run test:server
```

### 运行所有测试
```bash
npm test
```

## 启动项目

### 后端
```bash
cd server
npm install
npm run build
npm start
```

### 前端
```bash
cd client
npm install
npm start
```

## Git 提交
提交代码时，Husky 会自动运行 lint-staged 检查代码格式。如果格式不符合要求，提交会被阻止并自动修复可修复的问题。
