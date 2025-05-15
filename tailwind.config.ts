import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    extend: {
      outline: {
        arrow: ['2px solid #000', '2px'],
      },
      fontSize:{
        xxs: ["0.625rem", { lineHeight: "120%" }]
      },
      animation: {
        sliding: "sliding 30s linear infinite",
        backgroundCycle: 'backgroundCycle 6s ease-in-out infinite',
        backgroundCycleYellow: 'backgroundCycleYellow 6s ease-in-out infinite',
        boxShadowCycle: 'boxShadowCycle 1s ease-in-out infinite',
      },
      keyframes: {
        sliding: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        backgroundCycle: {
          '0%, 100%': { background: 'linear-gradient(90deg, #BFF776 0%, #BFF776 100%)'},
          '20%': {background: 'linear-gradient(90deg, #BFF776 0%, #76F5F7 100%)'},
          '40%': {background: 'linear-gradient(90deg, #76F5F7 0%, #76F5F7 100%)'},
          '60%': {background: 'linear-gradient(90deg, #76F5F7 0%, #BFF776 100%)'},
          '80%': {background: 'linear-gradient(90deg, #8CC642 0%, #8CC642 100%)'},
        },
        backgroundCycleYellow: {
          '0%, 100%': { background: 'linear-gradient(90deg, #FFED7B 0%, #FFED7B 100%)'},
          '20%': {background: 'linear-gradient(90deg, #FFED7B 0%, #76F5F7 100%)'},
          '40%': {background: 'linear-gradient(90deg, #76F5F7 0%, #76F5F7 100%)'},
          '60%': {background: 'linear-gradient(90deg, #76F5F7 0%, #FFED7B 100%)'},
          '80%': {background: 'linear-gradient(90deg, #F79D53 0%, #F79D53 100%)'},
        },
        boxShadowCycle:{
          '0%, 100%': { boxShadow: '#76f5f700 0 0 10px 20px' },
          '20%': { boxShadow: '#76f5f733 0 0 8px 15px' },
          '40%': { boxShadow: '#76f5f733 0 0 0px 10px'},
          '60%': { boxShadow: '#76f5f733 0 0 0px 0px'},
          '80%': { boxShadow: '#76f5f733 0 0 0px 10px'},
        }
      },
      fontFamily: {
        effraTrial: ["Effra Trial", "sans-serif"],
        montSerrat: ["Montserrat", "sans-serif"]
      },
    },
  },
};
