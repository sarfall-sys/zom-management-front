import flowbiteReact from "flowbite-react/plugin/tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ".flowbite-react\\class-list.json"
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          light: '#F8FAFC',
          dark: '#020617',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#0F172A',
        },
        text: {
          light: '#1F2937',
          dark: '#E5E7EB',
          mutedLight: '#6B7280',
          mutedDark: '#9CA3AF',
        },
        primary: {
          light: '#2563EB',
          dark: '#3B82F6',
        },
        border: {
          light: '#E5E7EB',
          dark: '#1E293B',
        },
      }
    },
  },
  plugins: [flowbiteReact],
}