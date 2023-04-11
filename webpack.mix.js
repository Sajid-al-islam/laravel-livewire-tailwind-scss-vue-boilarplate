const mix = require("laravel-mix");
require("mix-tailwindcss");

console.log("Mode: "+process.env.NODE_ENV);
if(process.env.NODE_ENV != "production"){
    mix.sourceMaps();
    mix.webpackConfig({
        devtool: "source-map",
    });
}
mix.js("resources/js/app.js", "public/js");
mix.js("resources/js/vue/backend/dashboard.js", "public/js/vue").vue({
    version: 2,
});

mix.sass("resources/scss/backend/backend.scss", "public/css", {
        sourceMap: true,
    })
    .sass("resources/scss/style.scss", "public/css")
    .options({
        postCss: [require("autoprefixer")],
    });

mix.postCss("resources/tailwind/tailwind.css", "public/css/tailwind", [
    require("tailwindcss"),
    require("autoprefixer"),
]);
