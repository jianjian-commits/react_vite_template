import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
// 为打包后的文件提供传统浏览器兼容性支持
import legacy from '@vitejs/plugin-legacy'
// 组件样式按需导入
import { createStyleImportPlugin, AntdResolve } from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy(),
    createStyleImportPlugin({
      resolves: [AntdResolve()],
      libs: [
        {
          libraryName: 'antd',
          esModule: true,
          resolveStyle: (name) => {
            return `antd/lib/${name}/style/index.less`
          },
        },
      ],
    }),
  ],
  resolve: {
    alias: [
      // 解决引入ProComponents报错
      {
        find: /^~/,
        replacement: '',
      },
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        // 不配置这个引入 procomponents报样式错
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#ff18c4', //设置antd主题色
        },
      },
    },
    modules: {
      generateScopedName: '[name]_[local]_[hash:base64:5]',
    },
  },
  server: {
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:8080",
    //     secure: false,
    //     rewrite: path => path.replace(/^\/api/, ""),
    //   },
    // },
  },
})
