import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
// 为打包后的文件提供传统浏览器兼容性支持
import legacy from '@vitejs/plugin-legacy'
// 组件样式按需导入
import { createStyleImportPlugin, AntdResolve } from 'vite-plugin-style-import'
// 压缩文件
// import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'

import buildConfig from './config/build'

// TODO 区分dev 还是 build 分别使用不同的插件
// TODO build时候loadsh包过大 500+k，进行懒加载
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy(),
    createStyleImportPlugin({
      resolves: [AntdResolve()],
      libs: [
        {
          // 样式按需导入  优化！！
          libraryName: 'antd',
          esModule: true,
          resolveStyle: (name) => {
            return `antd/lib/${name}/style/index.less`
          },
        },
      ],
    }),
    // viteCompression({
    //   deleteOriginFile: true,
    // }),
    visualizer({
      open: true,
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
  // ant样式变量 https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
  css: {
    preprocessorOptions: {
      less: {
        // 不配置这个引入 procomponents报样式错
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#005ce6',
          '@border-radius-base': '4px',
          '@heading-color': '#ff18c4',
          '@link-color': '#ff18c4',
          '@border-color-base': '#edf1f6',
        },
      },
    },
    modules: {
      generateScopedName: '[name]_[local]_[hash:base64:5]',
    },
  },
  server: {
    open: true,
    proxy: {
      '/api': {
        target: 'https://edge-api.meiqia.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    ...buildConfig,
  },
})
