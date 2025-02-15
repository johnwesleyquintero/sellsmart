import postcssImport from 'postcss-import';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';
import cssnano from 'cssnano';

export default {
  plugins: [
    postcssImport,
    tailwindcss(),
    autoprefixer(),
    postcssNested(),
    process.env.NODE_ENV === 'production' ?
      cssnano({ preset: 'default' }) : false,
  ].filter(Boolean),
};
