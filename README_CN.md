# 简历生成器

一个简单而交互式的简历生成器，允许用户创建、编辑和管理多份简历。

[English Version](README.md)

## 新特性 (v0.0.3)

- 多个简历模板，并添加模板选择器
- 支持 JSON 格式的高级编辑模式
- 添加通知模态框，提供更好的用户反馈
- 实现国际化支持，添加中英文 README 文件

## 改进

- 优化项目结构，提高代码可维护性
- 重构 JavaScript 文件，实现功能模块化
- 改进 PDF 生成功能，解决内容跨页问题
- 优化简历编辑界面，增加更多可编辑字段
- 改进简历数据管理，新增默认简历数据结构

## 功能特点

- 创建和管理多份简历
- 直接在页面上编辑简历内容
- 添加和更新头像
- 使用 JSON 格式进行高级编辑
- 将简历下载为 PDF 格式，具有改进的页面布局
- 响应式设计
- 多个简历模板可选

## 快速开始

### 前提条件

- 现代网络浏览器（Chrome、Firefox、Safari 或 Edge）
- 本地 Web 服务器（例如 Node.js 的 http-server、Python 的 SimpleHTTPServer 或 VS Code 的 Live Server 扩展）

### 安装

1. 克隆仓库：
   ```
   git clone https://github.com/giao4giao/my-resume-demo.git
   ```

2. 进入项目目录：
   ```
   cd my-resume-demo
   ```

3. 设置本地 Web 服务器。例如，如果您安装了 Node.js，可以使用 http-server：
   ```
   npx http-server
   ```
   或者如果您使用 Python：
   ```
   python -m http.server
   ```

4. 打开浏览器并访问 `http://localhost:8080`（或您的服务器运行的端口）。

注意：由于项目结构的原因，直接在浏览器中打开 `index.html` 将无法正常工作。您必须使用 Web 服务器来正确运行应用程序。

## 使用说明

1. 点击"创建新简历"开始一份新的简历。
2. 从模板选择器中选择一个模板。
3. 通过点击文本字段来编辑简历内容。
4. 使用"添加/更改头像"按钮添加或更新头像。
5. 使用"高级编辑"按钮以 JSON 格式修改简历。
6. 使用"保存修改"按钮保存您的更改。
7. 使用"下载 PDF"按钮将您的简历下载为 PDF 格式。

## 最近更新

完整的更改列表，请查看 [CHANGELOG](CHANGELOG.md)。

## 贡献

欢迎贡献！请随时提交 Pull Request。

## 许可证

该项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。