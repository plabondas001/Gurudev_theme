/**
 * ⚠️  Tailwind v4 NOTE:
 * In Tailwind v4, this file is NOT the source of truth for colors.
 * Brand colors are defined in: src/index.css → @theme inline block
 *
 * To change the primary or secondary color, edit:
 *   src/index.css  →  --color-primary  and  --color-secondary
 *
 * Those two variables control:
 *   ✅ Navbar background         (bg-primary)
 *   ✅ Add to Cart button         (bg-primary)
 *   ✅ Brand badge on product card (bg-primary)
 *   ✅ Product title hover & price (text-primary)
 *   ✅ Favorite/heart button       (text-secondary)
 *   ✅ Category badge on product card (bg-secondary)
 */
module.exports = {
    theme: {
      extend: {
        colors: {
            // nav, btn and other colors (green)
          primary: "#31714f",

          // Category and Product Card heart color (purple)
          secondary: "#733394",
        },
      },
    },
  };