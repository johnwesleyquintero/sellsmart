import postcssImport from 'postcss-import';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';
import cssnano from 'cssnano';

const config = {
  plugins: [
    postcssImport,
    tailwindcss(),
    autoprefixer(),
    postcssNested(),
    process.env.NODE_ENV === 'production' ? cssnano({ preset: 'default' }) : null,
  ].filter(Boolean),
};

export default config;
