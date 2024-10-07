module.exports = {
  plugins: [
    require("@fullhuman/postcss-purgecss")({
      content: ["./src/**/*.html", "./src/**/*.js"], // Adjust paths to your project structure
      css: ["./src/styles.css"],
    }),
  ],
};
