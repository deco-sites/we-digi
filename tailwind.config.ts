import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    extend: {
      outline: {
        arrow: ['2px solid #000', '2px'], // Adiciona outline customizado com espessura e cor
      },
      fontSize:{
        xxs: ["0.625rem", { lineHeight: "120%" }]
      },
      animation: {
        sliding: "sliding 30s linear infinite",
      },
      keyframes: {
        sliding: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      fontFamily: {
        effraTrial: ["Effra Trial", "sans-serif"],
        montSerrat: ["Montserrat", "sans-serif"]
      },
    },
  },
};
