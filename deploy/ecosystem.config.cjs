// PM2:  pm2 start deploy/ecosystem.config.cjs && pm2 save
module.exports = {
  apps: [
    {
      name: '4lancers-api',
      cwd: './server',
      script: 'src/index.js',
      instances: 1,
      env: { NODE_ENV: 'production' },
      max_memory_restart: '300M',
    },
  ],
}
