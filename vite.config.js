import { defineConfig, loadEnv } from 'vite'
import vue                       from '@vitejs/plugin-vue'

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


export default ({ mode }) => {
    console.info('Build Mode:', mode)

    if (mode === 'lib') return envLib
    if (mode === 'example') return envExample

    // const url = loadEnv(mode, process.cwd()).VITE_BASEURL
    // switch (url) {
    //     case 'lib': // 打包库文件
    //         return lib
    //         break;
    //
    //     default: // 开发模式、生产模式
    //         return project(url)
    //         break;
    // }
}
