import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import viteSvgIcons from 'vite-plugin-svg-icons'

export default ({ mode }) => {
  const isRelease = mode === 'production'
  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver({
          importStyle: 'sass',
        })],
      }),
      viteSvgIcons({
        // Specify the icon folder to be cached
        iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
        // Specify symbolId format
        symbolId: 'svg-[dir]-[name]',
      }),
    ],
    build: {
      // minify: false,
      // cssCodeSplit: false,
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: true,
          drop_debugger: true,
        },
      },
      reportCompressedSize: !isRelease,
      chunkSizeWarningLimit: 2000,
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        styles: resolve(__dirname, 'src/styles'),
        store: resolve(__dirname, 'src/store'),
        hooks: resolve(__dirname, 'src/hooks'),
        components: resolve(__dirname, 'src/components'),
        utils: resolve(__dirname, 'src/utils'),
        api: resolve(__dirname, 'src/api'),
        process: 'process/browser',
        stream: 'stream-browserify',
        zlib: 'browserify-zlib',
        util: 'util',
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: (content, loaderContext) => {
            return `
              @use "styles/mixins.scss" as *;
              @use "styles/element.scss" as *;
            ` + content
          },
        },
      },
    },
    server: {
      port: 3002,
      host: '0.0.0.0',
      proxy: {
        '/devApi': {
          target: 'http://13.214.254.61:9999',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/devApi/, '/'),
        },
      },
      // hmr: {
      //   overlay: false,
      // },
    },
    define: {
      // 'process.env': {},
      // global: {},
      // Buffer: {},
    },
  })
}
