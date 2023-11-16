/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        cupcake: {
          ...require("daisyui/src/theming/themes")["cupcake"],
          "--btn-text-case": "none",
          "--rounded-btn": "0.5rem",
          "--rounded-box": "0.5rem",
          "--padding-card": "1rem",
        },
      },
    ],
  },

  safelist: ["alert", "alert-error"],

  experimental: {
    componentIslands: true,
  },
};
