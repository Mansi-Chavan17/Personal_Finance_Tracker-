// tailwind.config.js
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      // Add other content paths as needed
    ],
    darkMode: 'class', // This enables the .dark class-based dark mode
    theme: {
      extend: {
        // You can add custom colors for dark mode here
        colors: {
          // Example custom colors
          primary: {
            light: '#4F46E5', // for light mode
            dark: '#818CF8',  // for dark mode
          },
        },
      },
    },
    plugins: [],
  }