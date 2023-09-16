/**
 * @type {import('next').NextConfig}
 */

// const withPWA = require('next-pwa');
// const runtimeCaching = require('next-pwa/cache');
const { i18n } = require('./next-i18next.config');

const moduleExports = {
  api: {
    bodyParser: {
      sizeLimit: '1mb'
    }
  },
  // compiler: {
  //   removeConsole: {
  //     exclude: ['error', 'warn']
  //   }
  // },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: true
      }
    ];
  },
  i18n,
  // pwa: {
  //   disable: process.env.NODE_ENV === 'development',
  //   dest: 'public',
  //   runtimeCaching
  // },
  reactStrictMode: true,
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    // domains: ['127.0.0.1', 'digitaloceanspaces.com'],
    domains: ['exommercebuckernextapp.s3.eu-north-1.amazonaws.com', 'ecommersenextapp.s3.eu-north-1.amazonaws.com', '3056-2774-1581.s3-control.eu-north-1.amazonaws.com', '127.0.0.1', 'digitaloceanspaces.com'],


    path: '/_next/image',
    loader: 'default',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.digitaloceanspaces.com',
        port: '',
        pathname: '/**'
      }
    ]
  },
  env: {
    URL: 'https://myecomwebsite.vercel.app',
    GTAG_MEASUREMENT_ID: '',
    FB_APPID: '',
    // // DATABASE
    // POSTGRES_USER: 'doadmin',
    // POSTGRES_PASSWORD: 'AVNS_b_bPDDFxhgU4mPl21qW',
    // POSTGRES_DB: 'production',
    // PORT: 25060,
    // DATABASE_END_POINT:
    //   'db-postgresql-lon1-37795-do-user-9047386-0.b.db.ondigitalocean.com',
    URL: 'http://localhost:3001',
    POSTGRES_USER: 'postgres',
    POSTGRES_PASSWORD: 'postgres',
    POSTGRES_DB: 'ecommerce_development',
    PORT: 5433,
    DATABASE_END_POINT: '127.0.0.1',
    // S3 BUCKET
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    S3_REGION: process.env.S3_REGION,
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
    S3_ENDPOINT: process.env.S3_ENDPOINT
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
};

module.exports = moduleExports;

// module.exports = withSentryConfig(
//   withPWA(moduleExports),
//   SentryWebpackPluginOptions
// );
