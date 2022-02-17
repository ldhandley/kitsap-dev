const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "none",
  entry: "./dev-server/index.tsx",
  devtool: "inline-source-map",
  devServer: {
    static: './dev-server-dist',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.m?jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
      { 
        test: /\.tsx?$/, 
        include: [
          path.resolve(__dirname, "dev-server"),
          path.resolve(__dirname, "src")
        ],
        use: "ts-loader" 
      }
    ],
  },
  optimization: {
    nodeEnv: 'development',
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dev-server-dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./dev-server/index.html",
    }),
  ],
};
