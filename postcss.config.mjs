const config = {
    plugins: {
        "@csstools/postcss-global-data": {
            files: [
                "./src/css/custom-media.css",
            ],
        },
        "postcss-custom-media": {},
        "@tailwindcss/postcss": {},
    },
};

export default config;
