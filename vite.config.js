import { defineConfig } from 'vite'
import vue              from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    build  : {
        lib          : {
            entry   : 'src/components/draggablePanel/index.vue',
            name    : 'draggable-panel',
            fileName: (format) => `draggable-panel.${format}.js`,
        },
        sourcemap    : true,
        rollupOptions: {
            external: ['vue'],
            output  : {
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
    plugins: [vue()],
})
