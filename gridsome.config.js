// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Gridsome",
  plugins: [
    {
      use: "gridsome-plugin-pwa",
      options: {
        title: "The List",
        startUrl: "/",
        display: "standalone",
        statusBarStyle: "default",
        manifestPath: "manifest.json",
        disableServiceWorker: true,
        serviceWorkerPath: "service-worker.js",
        cachedFileTypes: "js,json,css,html,png,jpg,jpeg,svg",
        shortName: "The List",
        themeColor: "#666600",
        backgroundColor: "#48426d",
        icon: "src/favicon.png", // must be provided like 'src/favicon.png'
        msTileImage: "",
        msTileColor: "#666600",
        gcmSenderId: undefined,
      },
    },
  ],
};
