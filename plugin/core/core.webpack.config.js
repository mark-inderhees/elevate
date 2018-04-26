const path = require("path");
const copy = require("copy-webpack-plugin");
const rootPath = path.join(__dirname, "../../");

module.exports = {
	mode: "development",
	entry: {
		content: path.join(__dirname, "./scripts/Content.ts"),
		boot: path.join(__dirname, "./scripts/Boot.ts"),
		background: path.join(__dirname, "./scripts/Background.ts"),
		installer: path.join(__dirname, "./scripts/Installer.ts")
	},
	output: {
		path: path.join(rootPath, "dist", "core"),
		filename: "[name].js"
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".css"],
		alias: {
			"fancyboxCss": path.join(__dirname, "./node_modules/fancybox/dist/css/jquery.fancybox.css")
		}
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules|modules[\\/]/,
					name: "vendors",
					chunks: "all"
				}
			}
		}
	},
	module: {
		noParse: /lodash/,
		rules: [
			{
				test: /\.ts?$/,
				use: {
					loader: "ts-loader",
					options: {
						configFile: "tsconfig.json"
					}
				},
				exclude: [/node_modules/, /specs/, /\.spec.ts?$/]
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
				loader: "url-loader",
				options: {
					limit: 10000
				}
			}
		]
	},
	plugins: [
		new copy([
			{
				from: "./icons",
				to: "icons"
			}
		])
	]
};
