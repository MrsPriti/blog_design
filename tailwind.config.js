import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
     
        fontFamily: {
          oxygen: `"Oxygen", sans-serif`,
          ubuntu: `"Ubuntu", sans-serif`,
          public: `"Public Sans", sans-serif`,
          fira: `"Fira Sans", sans-serif`,
          canterall: `"Cantarell", sans-serif`,
        },
    },
  },
  plugins: [],
});
