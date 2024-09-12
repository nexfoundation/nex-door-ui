import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default ({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));
  return defineConfig({
    plugins: [vue()],
    server: {
      host: process.env.VITE_SERVER_HOST,
    }
  });
}
