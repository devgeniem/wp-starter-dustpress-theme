var webpack                 = require("webpack");
var ExtractTextPlugin       = require("extract-text-webpack-plugin");
var autoprefixer            = require("autoprefixer");
var autoprefixerBrowsers    = ["> 1%", "last 2 versions", "Firefox ESR", "Opera 12.1"];
var env                     = process.env.NODE_ENV;
var plugins                 = [
    new ExtractTextPlugin("/../styles/main.css", {
        allChunks: true
    }),
];

// Minify on production.
if (env === "production") {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            compress: {
                unused: false
            }
        })
    );
}

module.exports = {
    entry: {
        main: __dirname + "/assets/scripts/main.js"
    },
    output: {
        path: __dirname + "/dist/scripts",
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style", "css")
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css!postcss!sass")
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf)(\?[a-z0-9=\.]+)?$/,
                loader: "file?name=../fonts/[name].[ext]"
            },
            {
                test: /\.(svg|gif|png|jpeg|jpg)(\?[a-z0-9=\.]+)?$/,
                loader: "file?name=../images/[name].[ext]"
            }
        ]
    },
    plugins: plugins,
    externals: {
        "jquery": "jQuery"
    },
    postcss: function () {
        return [autoprefixer({ browsers: autoprefixerBrowsers })];
    },
    watchOptions: {
        poll: 100
    }
};
