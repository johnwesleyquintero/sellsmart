export default {
  plugins: [
    require('postcss-import'),      // Import multiple CSS files like a wise sage
    require('tailwindcss')(),         // Tailwind magic to build responsive designs
    require('autoprefixer')(),        // Automatically add vendor prefixes for cross-browser harmony
    require('postcss-nested')(),      // Write nested CSS rules for cleaner syntax
    process.env.NODE_ENV === 'production' && 
      require('cssnano')({ preset: 'default' }), // Minify CSS in production for performance
  ].filter(Boolean),
};
