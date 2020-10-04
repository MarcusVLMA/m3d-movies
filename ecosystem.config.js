module.exports = {
  apps : [{
    name: "db-service",
    script: "node ./bin/www",
    cwd: "./db-service",
    watch: true,
    ignore_watch : ["database/data"],
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }, {
    name: "gateway-service",
    script: "node ./bin/www",
    cwd: "./gateway-service",
    watch: true,
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
};