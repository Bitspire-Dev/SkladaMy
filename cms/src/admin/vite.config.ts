import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  return mergeConfig(config, {
    resolve: {
      alias: {
        '@': '/src',
        // React 18 + Zod 4 compatibility
        react: 'react',
        'react-dom': 'react-dom',
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom', '@radix-ui/react-tooltip', 'zod'],
    },
    ssr: {
      noExternal: ['zod', '@radix-ui/react-tooltip'],
    },
    build: {
      commonjsOptions: {
        include: [/node_modules/],
        transformMixedEsModules: true,
      },
    },
  });
};
