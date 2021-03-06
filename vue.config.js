const webpack = require("webpack");
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: "./",
  devServer: {
    open: true,
    proxy: {
      "/api": {
        target: "https://denphen.com/admin",
        pathRewrite: {
          "/api": "/",
        },
      },
    },
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery",
      }),
    ],
    resolve: {
      alias: {
        src: resolve("src"),
        api: resolve("src/api"),
        assets: resolve("src/assets"),
        images: resolve("src/assets/images"),
        components: resolve("src/components"),
        directives: resolve("src/directives"),
        filters: resolve("src/filters"),
        icons: resolve("src/icons"),
        layout: resolve("src/layout"),
        router: resolve("src/router"),
        store: resolve("src/store"),
        utils: resolve("src/utils"),
        views: resolve("src/views"),
        styles: resolve("src/styles"),
      },
    },
  },
  chainWebpack: (config) => {
    config.module.rules.delete("eslint");
    /**
     * @description: 
     */
    config.plugin('preload').tap(()=>[
      {
        rel:'preload',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include:'initial'
      }
    ]);
    config.plugins.delete('prefetch');
    /**
     * @description: 配置 svg icon
     */
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
    if (process.env.NODE_ENV != "development") {
      config
        .plugin("webpack-bundle-analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
    }
  },
};
