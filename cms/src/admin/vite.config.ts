import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  // @ts-ignore - Strapi uses old Vite API
  return mergeConfig(config, {
    resolve: {
      alias: {
        '@': '/src',
        // Force React 18 compatibility for Radix UI components
        'react': 'react',
        'react-dom': 'react-dom',
      },
    },
    optimizeDeps: {
      exclude: ['zod/v3', 'zod/v4'],
      include: [
        'react',
        'react-dom',
        '@radix-ui/react-tooltip',
      ],
      esbuildOptions: {
        external: ['zod/v3', 'zod/v4'],
      },
    },
    ssr: {
      noExternal: ['zod', '@radix-ui/react-tooltip'],
      external: ['zod/v3', 'zod/v4'],
    },
    // Add this to handle Radix UI properly
    build: {
      commonjsOptions: {
        include: [/node_modules/],
        transformMixedEsModules: true,
      },
    },
  });
};
