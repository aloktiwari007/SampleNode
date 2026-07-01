module.exports = {

  apps: [

    {

      name: "node-web-app",

      script: "./app.js",

      instances: 1,

      exec_mode: "fork"

    }

  ]

}
