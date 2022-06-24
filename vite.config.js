import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/

const envLib = defineConfig({
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

const envExample = defineConfig({
    base   : 'draggable-panel',
    build  : {
        outDir: 'example',
    },
    plugins: [vue()],
})

const envDevelopment = defineConfig({
    plugins: [vue()],
})


export default ({mode}) => {
    console.info('Build Mode:', mode)

    if (mode === 'development') return envDevelopment
    if (mode === 'lib') return envLib
    if (mode === 'example') return envExample
}
