import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
export default defineConfig({
    plugins: [
        uni(),
    ],
	types: [
		"@dcloudio/types",
		"uni-modules/uview-plus/types"
	],
    server: {
      proxy: {
        '/api/': {
          target: 'http://192.168.1.110:8000.com',
          changeOrigin: true,
        }
      },
    },
});