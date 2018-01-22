module.exports = {
  apps: [
    {
      name: 'ai.ople.obsidian.shell',
      script: 'bin/www',
      watch: true,
      env: {
        PORT: 3001,
        NODE_ENV: 'development'
      },
      env_production: {
        PORT: 3013,
        NODE_ENV: 'production'
      }
    }
  ]
}
