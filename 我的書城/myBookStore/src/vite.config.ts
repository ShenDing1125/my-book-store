import fs from 'fs'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig, CommonServerOptions } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import dotenv, { DotenvParseOutput } from 'dotenv'

export default defineConfig((mode) => {
  const envFileName: string = '.env'
  const curEnvFileName = `${envFileName}.${mode.mode}`
  const envData = fs.readFileSync(path.join(process.cwd(), curEnvFileName))
  const envMap: DotenvParseOutput = dotenv.parse(envData)
  let server: CommonServerOptions = {}

  if (mode.mode === 'development') {
    server = {
      // host: envMap.VITE_HOST,
      // port: envMap.VITE_PORT,
      proxy: {
        [envMap.VITE_BASE_URL]: {
          target: envMap.VITE_PROXY_DOMAIN,
          changeOrigin: false,
          rewrite: (path) => path.replace(/^\/myBookStore/, ''),
        },
      },
    }
  } else if (mode.mode === 'production') {
    server = {
      host: envMap.VITE_HOST,
      port: parseInt(envMap.VITE_PORT, 10),
    }
  }

  const resolve = {
    alias: {
      '@assets': path.resolve(process.cwd(), './src/assets'),
    },
  }

  return {
    plugins: [vue(), tsconfigPaths()],
    server,
    resolve,
  }
})
