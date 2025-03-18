---
title: "Branding Guidelines"
description: "Detailed guidelines for maintaining brand consistency."
category: "Branding"
order: 1
slug: "branding-guidelines"
---

# SellSmart Brand Guidelines 2025

## Introduction

Welcome to the brand guidelines for "SellSmart." This document provides a comprehensive guide to the visual and stylistic elements that define our brand, ensuring consistency and cohesiveness across all communications.

## Logo

### Primary Logo

The "SellSmart" logo represents professionalism and expertise in e-commerce. Its modern design reflects our commitment to helping clients succeed in the dynamic world of online sales with precision and reliability.

### Logo Variations

1. **Full Logo**: "SellSmart"
2. **Abbreviated Logo**: "SS"
3. **Alternative Spelling**: "SellSmart"

### Logo Usage

![Logo spacing example](/assets/logo-usage-examples.svg)

- **Area of Non-Interference**: Maintain clear space equal to 1/2 logo width on all sides
- **Minimum Size**: 
  - Print: 0.75" width
  - Digital: 54px width (1x), 108px (2x for retina)
- **Background Requirements**:
  ```css
  /* Transparent background (preferred) */
  .logo { background-color: transparent; }
  
  /* Light background */
  .logo { background-color: var(--neutral-light); }
  
  /* Dark background */
  .logo { background-color: var(--neutral-dark); }
  ```

### Unacceptable Usage

- Do not stretch, condense, or skew the logo.
- Use only the correct brand colors.
- Avoid placing lines, text, or art within the control space.
- Do not alter the size or arrangement of elements.
- Do not contain the logo within shapes that suggest it is part of the logo.
- Avoid backgrounds that obstruct visibility.

## Color Palette

### Primary Colors

# CSS Implementation Standards

## Core Variables

### Typography
```css
--font-primary: 'Roboto', sans-serif;  /* Heading text */
--font-secondary: 'Lato', sans-serif;  /* Body text */
```

### Color System
```css
/* Primary Colors */
--primary-blue: #3245ff; /* Logo blue */
--primary-purple: #bc52ee; /* Logo purple */
--primary-teal: #4FD1C5; /* Logo text color */
--primary-dark: #1a365d; /* Logo symbol color */

/* Neutral Palette */
--neutral-dark: #333333;    /* Primary text */
--neutral-medium: #666666;  /* Secondary text */
--neutral-light: #F5F5F5;   /* Backgrounds */

/* Accessibility */
--text-light: #f5f5f5;       /* Minimum 4.5:1 contrast on dark bg */

/* Button States */
--btn-primary-hover: #2638cc;
--btn-primary-active: #1a2ca3;
--btn-secondary-hover: #9a3bc7;
--btn-secondary-active: #7c2aa3;
```

### Logo Specifications
```css
--logo-blue: #3245ff;      /* Primary logo color */
--logo-purple: #bc52ee;    /* Secondary logo color */
--logo-text: #4FD1C5;      /* Logo typography */
--logo-symbol: #1a365d;    /* Graphical elements */
```

## Accessibility Requirements
1. **Contrast Ratios**:
   - Text elements must maintain minimum 4.5:1 contrast ratio
   - UI components require 3:1 contrast against adjacent colors
2. **Dark Mode Adaptation**:
   - Use `prefers-color-scheme` media queries
   - Maintain equivalent contrast ratios in dark theme
3. **State Visibility**:
   - Hover/focus states must have visible style changes
   - Interactive elements require clear :focus-visible styling

## Button Colors

### Primary Buttons
| Variable | Value | Description |
|----------|-------|-------------|
| `--btn-primary` | var(--primary-blue) | Main call-to-action buttons |
| `--btn-primary-hover` | `#005c91` | Hover state for primary buttons |
| `--btn-primary-active` | `#004d7a` | Active/pressed state for primary buttons |

### Secondary Buttons
| Variable | Value | Description |
|----------|-------|-------------|
| `--btn-secondary` | `#008B8B` | Secondary action buttons |
| `--btn-secondary-hover` | `#006d6d` | Hover state for secondary buttons |
| `--btn-secondary-active` | `#005858` | Active/pressed state for secondary buttons |

### Accent Buttons
| Variable | Value | Description |
|----------|-------|-------------|
| `--btn-accent` | `#bc52ee` | Accent/highlight buttons |
| `--btn-accent-hover` | `#a43dd3` | Hover state for accent buttons |
| `--btn-accent-active` | `#8c2bb8` | Active/pressed state for accent buttons |

### Disabled State
| Variable | Value | Description |
|----------|-------|-------------|
| `--btn-disabled` | `#cccccc` | Disabled button state |
| `--btn-disabled-text` | `#666666` | Text color for disabled buttons |

## Typography

### Primary Typeface

- **Roboto Regular**: Modern, versatile, and highly readable. It is the primary font for all communications.

### Secondary Typeface

- **Lato Regular**: Clean and elegant, used as a secondary font to complement Roboto.

## Photography

### Guidelines

- **Style**: Natural, colorful, crisp, and well-lit.
- **Avoid**: Staged or clichéd stock imagery, gimmicky effects, obvious digital manipulation, uninteresting compositions.
- **Focus**: Authenticity, storytelling, dynamic and energetic visuals, customer-centric approach, urban landscapes, diversity, and inclusivity.

## Iconography

### Principles

- Reflect core values.
- Use symbolism and representation.
- Maintain consistency and cohesion.
- Ensure simplicity and clarity.
- Prioritize adaptability and scalability.

## Data Visualization & Interactive Elements

- Use visuals to simplify complex data.
- Ensure interactive elements are intuitive and user-friendly.

## Video and Motion

- Create engaging and dynamic visual content.
- Maintain brand consistency across all motion graphics.

By adhering to these guidelines, "SellSmart" can effectively communicate its brand values and establish a strong, recognizable identity in the e-commerce industry.
