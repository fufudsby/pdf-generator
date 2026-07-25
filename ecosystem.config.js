module.exports = {
  apps: [
    {
      name: 'pdf-generator',
      script: 'build/index.js',
      exec_mode: 'fork',
      max_memory_restart: '1G',
      instances: 1,
      autorestart: true,
      interpreter: 'node@16.19.0',
    },
  ],
}
