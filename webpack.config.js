const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  target: 'web',
  mode: 'development',

  // 1. Ajuste o Entry Point conforme sua nova estrutura (src/js/index.js)
  entry: path.resolve(__dirname, "src", "js", "index.js"),

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    // Se for usar GitHub Pages, mantenha o nome do repositório aqui
    publicPath: "/"
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "dist")
    },
    port: 3000,
    open: true,
    liveReload: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
      favicon: path.resolve(__dirname, "src", "assets", "icons", "Dog-Duotone--Streamline-Phosphor.svg")
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets", "icons"),
          to: path.resolve(__dirname, "dist", "assets", "icons") // ← adicione /icons aqui
        }
      ]
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      // 3. Regra essencial para os ícones SVG e imagens aparecerem
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          // Isso mantém a pasta e o nome original dentro do dist
          filename: 'assets/icons/[name][ext]'
        }
      },
    ],
  },
};