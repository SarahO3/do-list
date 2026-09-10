import { merge } from "webpack-merge";
import common from "./webpack.common.js";

// Take everything from common and add my development-specific settings.
export default merge(common, {
  mode: "development",

  devtool: "inline-source-map",

  devServer: {
    static: "./dist",
    port: 8080,
    open: true,
  },
});