---
title: CSS Variables
---
# CSS Variables Documentation

This document provides an overview of the CSS variables used in the SellSmart project for consistent styling across the application.

---

## Font Variables

| Variable            | Value                  | Description                          |
|---------------------|------------------------|--------------------------------------|
| `--font-primary`    | `'Roboto', sans-serif` | Primary font used for headings       |
| `--font-secondary`  | `'Lato', sans-serif`   | Secondary font used for body text    |

---

## Color Variables

### Primary Colors (Logo-Inspired)
| Variable            | Value       | Description                          |
|---------------------|-------------|--------------------------------------|
| `--primary-blue`    | `#3245ff`   | Main brand color (logo blue)         |
| `--primary-purple`  | `#bc52ee`   | Secondary brand color (logo purple)  |
| `--primary-teal`    | `#4FD1C5`   | Accent color (logo text color)       |
| `--primary-dark`    | `#1a365d`   | Dark color (logo symbol color)       |

### Button Colors
| Variable                | Value       | Description                          |
|-------------------------|-------------|--------------------------------------|
| `--btn-primary`         | `#3245ff`   | Primary button color (logo blue)     |
| `--btn-primary-hover`   | `#2638cc`   | Hover state for primary button       |
| `--btn-primary-active`  | `#1a2ca3`   | Active state for primary button      |
| `--btn-secondary`       | `#bc52ee`   | Secondary button color (logo purple) |
| `--btn-secondary-hover` | `#9a3bc7`   | Hover state for secondary button     |
| `--btn-secondary-active`| `#7c2aa3`   | Active state for secondary button    |
| `--btn-accent`          | `#4FD1C5`   | Accent button color (logo teal)      |
| `--btn-accent-hover`    | `#3fb3a8`   | Hover state for accent button        |
| `--btn-accent-active`   | `#32958c`   | Active state for accent button       |
| `--btn-disabled`        | `#cccccc`   | Disabled button background           |
| `--btn-disabled-text`   | `#666666`   | Disabled button text color           |

### Text Colors
| Variable            | Value       | Description                          |
|---------------------|-------------|--------------------------------------|
| `--text-light`      | `#f5f5f5`   | Light text for dark backgrounds      |
| `--text-dark`       | `#1a365d`   | Dark text (logo symbol color)        |
| `--text-neutral`    | `#333333`   | Neutral dark text                   |

### Background Colors
| Variable            | Value       | Description                          |
|---------------------|-------------|--------------------------------------|
| `--bg-light`        | `#ffffff`   | Light background (white)             |
| `--bg-dark`         | `#1a365d`   | Dark background (logo symbol color)  |
| `--bg-neutral`      | `#f5f5f5`   | Light neutral background             |

### Neutral Colors
| Variable            | Value       | Description                          |
|---------------------|-------------|--------------------------------------|
| `--neutral-dark`    | `#333333`   | Dark neutral color for text          |
| `--neutral-medium`  | `#666666`   | Medium neutral color for borders     |
| `--neutral-light`   | `#f5f5f5`   | Light neutral color for backgrounds  |

---

## Logo Colors

| Variable            | Value       | Description                          |
|---------------------|-------------|--------------------------------------|
| `--logo-blue`       | `#3245ff`   | Blue color used in the logo          |
| `--logo-purple`     | `#bc52ee`   | Purple color used in the logo        |
| `--logo-text`       | `#4FD1C5`   | Text color used in the logo          |
| `--logo-symbol`     | `#1a365d`   | Symbol color used in the logo        |

---

## Example Usage

### Buttons
```css
.btn-primary {
  background-color: var(--btn-primary);
  color: var(--text-light);
}
.btn-primary:hover {
  background-color: var(--btn-primary-hover);
}
.btn-primary:active {
  background-color: var(--btn-primary-active);
}
```

### Text
```css
.text-dark {
  color: var(--text-dark);
}
.text-light {
  color: var(--text-light);
}
```

### Backgrounds
```css
.bg-dark {
  background-color: var(--bg-dark);
  color: var(--text-light);
}
.bg-light {
  background-color: var(--bg-light);
  color: var(--text-dark);
}
```

---

## Benefits of This Update
- **Brand Consistency**: All colors are derived from the logo, ensuring a cohesive brand identity.
- **Visual Harmony**: The colors work well together, creating a professional and modern look.
- **Scalability**: Using CSS variables makes it easy to update colors globally.

---
