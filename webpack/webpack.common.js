const path = require("path");

module.exports = {
    entry: path.resolve(__dirname, '..', './src/index.tsx'),
    resolve: { extensions: ['.tsx', '.ts', '.js'] },
    module: {
        rules: [
        {
            oneOf: [
                {
                    test: /\.(tsx|mjs|jsx|ts|js)$/,
                    exclude: /node_modules/,
                    use: {
                    loader: "babel-loader"
                    }
                }
            ]
        }
    ]
    }
};