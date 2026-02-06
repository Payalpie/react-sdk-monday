/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      sidebar: '#23272B',
      sidebarActive: '#1976D2',
      sidebarText: '#FFFFFF',
      sidebarMuted: '#B0B0B0',
      background: '#F5F6FA',
      card: '#FFFFFF',
      accent: '#1976D2',
      accentLight: '#E3F2FD',
      border: '#E0E0E0',
      taskBlue: '#1976D2',
      taskGray: '#B0B0B0',
    },
  },
  plugins: [],
};
