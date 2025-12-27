# Habits for Good - Style Guide & UX Document
**Inspired by Duolingo Design System**

---

## Table of Contents
1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Shape Language](#shape-language)
5. [Component Library](#component-library)
6. [Iconography](#iconography)
7. [Illustration Guidelines](#illustration-guidelines)
8. [Animation & Motion](#animation-motion)
9. [Layout & Spacing](#layout-spacing)
10. [User Experience Guidelines](#ux-guidelines)
11. [Responsive Design](#responsive-design)
12. [Accessibility](#accessibility)

---

<a name="design-philosophy"></a>
## 1. Design Philosophy

### Core Principles

**Playful & Joyful**
Create an experience that makes building habits feel like play, not work. Use vibrant colors, friendly shapes, and delightful interactions to encourage daily engagement from children aged 5-8.

**Simple & Clear**
Every interface element should be immediately understandable to young children with limited reading skills. Visual hierarchy, clear labeling, and intuitive navigation are paramount.

**Encouraging & Positive**
Focus on celebrating progress rather than highlighting failures. When children miss a day, motivate them to restart their streak with gentle encouragement, never shame or negativity.

**Trustworthy & Safe**
Parents need to trust that their children are in a safe, ad-free environment where data is protected and the charitable mission is transparent.

### Design Mantras

- **"When in doubt, make it colorful"** - Embrace vibrancy
- **"Everything should bounce"** - Add life through micro-animations
- **"Keep it round"** - No sharp edges, only friendly curves
- **"Show, don't tell"** - Visual communication over text
- **"Celebrate every win"** - Positive reinforcement everywhere

---

<a name="color-system"></a>
## 2. Color System

### Primary Colors (Brand Identity)

**Feather Green** (Primary Brand Color)
- **Hex:** `#58CC02`
- **RGB:** rgb(88, 204, 2)
- **Usage:** Primary buttons, success states, campaign cards, main CTAs, streak indicators
- **Meaning:** Growth, health, vitality, achievement

**Mask Green** (Secondary Green)
- **Hex:** `#89E219`
- **RGB:** rgb(137, 226, 25)
- **Usage:** Backgrounds for mascot/character elements, hover states, lighter accents
- **Meaning:** Freshness, energy

### Secondary Colors (UI Accents - Duolingo Palette)

**Macaw** (Bright Blue)
- **Hex:** `#1CB0F6`
- **RGB:** rgb(28, 176, 246)
- **Usage:** Information badges, water habit tracking, secondary CTAs, contributor profile accents
- **Meaning:** Trust, clarity, calm

**Cardinal** (Bright Red)
- **Hex:** `#FF4B4B`
- **RGB:** rgb(255, 75, 75)
- **Usage:** Important alerts (not errors for kids), hearts/love indicators, high-energy moments
- **Meaning:** Excitement, importance, energy

**Bee** (Golden Yellow)
- **Hex:** `#FFC800`
- **RGB:** rgb(255, 200, 0)
- **Usage:** Medals, achievements, bonus lottery wins, sponsor gold tier
- **Meaning:** Achievement, reward, sunshine

**Fox** (Vibrant Orange)
- **Hex:** `#FF9600`
- **RGB:** rgb(255, 150, 0)
- **Usage:** Call-to-action accents, campaign urgency indicators, warmth
- **Meaning:** Energy, enthusiasm, warmth

**Beetle** (Purple)
- **Hex:** `#CE82FF`
- **RGB:** rgb(206, 130, 255)
- **Usage:** Special badges, cause categories (children), imagination themes
- **Meaning:** Creativity, magic, special moments

**Humpback** (Deep Blue)
- **Hex:** `#2B70C9`
- **RGB:** rgb(43, 112, 201)
- **Usage:** Sponsor dashboards, professional contexts, deep water tracking
- **Meaning:** Professionalism, depth, trust

### Neutral Colors

**Eel** (Dark Gray/Black)
- **Hex:** `#4B4B4B`
- **RGB:** rgb(75, 75, 75)
- **Usage:** Primary text, headings, important copy
- **Meaning:** Clarity, readability

**Wolf** (Medium Gray)
- **Hex:** `#777777`
- **RGB:** rgb(119, 119, 119)
- **Usage:** Secondary text, descriptions, metadata
- **Meaning:** Subtlety, supporting information

**Hare** (Light Gray)
- **Hex:** `#AFAFAF`
- **RGB:** rgb(175, 175, 175)
- **Usage:** Disabled states, dividers, borders
- **Meaning:** Inactive, boundaries

**Snow** (Pure White)
- **Hex:** `#FFFFFF`
- **RGB:** rgb(255, 255, 255)
- **Usage:** Primary backgrounds, cards, modals
- **Meaning:** Cleanliness, simplicity, space

**Swan** (Off-White)
- **Hex:** `#F7F7F7`
- **RGB:** rgb(247, 247, 247)
- **Usage:** Alternate backgrounds, sections
- **Meaning:** Soft separation

### Pastel Accents (Light Backgrounds)

**Mint** (Pastel Green)
- **Hex:** `#BFF199`
- **RGB:** rgb(191, 241, 153)
- **Usage:** Success notification backgrounds, habit completion confirmations
- **Meaning:** Gentle success

**Blush** (Pastel Pink)
- **Hex:** `#F7C8C9`
- **RGB:** rgb(247, 200, 201)
- **Usage:** Love/kindness habit themes, gentle notifications
- **Meaning:** Kindness, warmth

**Sky** (Pastel Blue)
- **Hex:** `#D4F1FF`
- **RGB:** rgb(212, 241, 255)
- **Usage:** Information cards, water habit backgrounds
- **Meaning:** Calmness, clarity

**Sunset** (Pastel Orange)
- **Hex:** `#FFE5CC`
- **RGB:** rgb(255, 229, 204)
- **Usage:** Evening routine reminders, warmth
- **Meaning:** Comfort, routine

### Color Usage Guidelines

**Do:**
- Use vibrant secondary colors for visual interest and delight
- Apply pastels as full-bleed backgrounds or card backgrounds
- Combine 2-3 colors maximum per component for clarity
- Use Feather Green for primary actions and success
- Maintain high contrast for text (Eel on Snow, Snow on Feather Green)

**Don't:**
- Never use pure gray (#808080) - it feels lifeless; use Wolf or Hare instead
- Avoid using white as a base color in illustrations (backgrounds are white)
- Don't mix too many colors in one illustration (3-4 max)
- Never use color alone to convey information (always pair with icons/text)
- Avoid red for error states with kids (use Cardinal for excitement, not punishment)

### Color Combinations

**High Energy (Campaign Cards):**
- Background: Bee `#FFC800`
- Text: Eel `#4B4B4B`
- Accent: Cardinal `#FF4B4B`

**Calming (Contributor Dashboard):**
- Background: Snow `#FFFFFF`
- Primary: Macaw `#1CB0F6`
- Accent: Feather Green `#58CC02`

**Achievement (Badges/Medals):**
- Gold: Bee `#FFC800`
- Silver: Hare `#AFAFAF`
- Bronze: Fox `#FF9600`
- Background: Swan `#F7F7F7`

---

<a name="typography"></a>
## 3. Typography

### Font Family

**Primary Font: DIN Rounded** (or similar rounded sans-serif alternative: Nunito, Quicksand, Varela Round)

**Why Rounded Fonts?**
Rounded letterforms are friendly, approachable, and feel less formal—perfect for engaging children and creating a playful atmosphere.

**Fallback Stack:**
```css
font-family: 'DIN Rounded', 'Nunito', 'Quicksand', 'Varela Round', 
             -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Type Scale

**Display (Hero Headlines)**
- **Size:** 48px / 3rem
- **Weight:** 800 (Extra Bold)
- **Line Height:** 1.1
- **Usage:** Homepage hero, campaign titles on detail pages
- **Color:** Eel `#4B4B4B`

**H1 (Page Titles)**
- **Size:** 36px / 2.25rem
- **Weight:** 700 (Bold)
- **Line Height:** 1.2
- **Usage:** Dashboard page titles, main headings
- **Color:** Eel `#4B4B4B`

**H2 (Section Headings)**
- **Size:** 28px / 1.75rem
- **Weight:** 700 (Bold)
- **Line Height:** 1.3
- **Usage:** Card titles, section dividers
- **Color:** Eel `#4B4B4B`

**H3 (Subsection Headings)**
- **Size:** 22px / 1.375rem
- **Weight:** 600 (Semi-Bold)
- **Line Height:** 1.4
- **Usage:** Component headings, card subtitles
- **Color:** Eel `#4B4B4B` or Wolf `#777777`

**Body Large**
- **Size:** 18px / 1.125rem
- **Weight:** 400 (Regular)
- **Line Height:** 1.6
- **Usage:** Important descriptions, call-out text
- **Color:** Eel `#4B4B4B`

**Body (Default)**
- **Size:** 16px / 1rem
- **Weight:** 400 (Regular)
- **Line Height:** 1.5
- **Usage:** Main body text, paragraphs, descriptions
- **Color:** Eel `#4B4B4B` or Wolf `#777777`

**Body Small**
- **Size:** 14px / 0.875rem
- **Weight:** 400 (Regular)
- **Line Height:** 1.5
- **Usage:** Supporting text, metadata, timestamps
- **Color:** Wolf `#777777`

**Caption**
- **Size:** 12px / 0.75rem
- **Weight:** 400 (Regular)
- **Line Height:** 1.4
- **Usage:** Small labels, disclaimer text, footnotes
- **Color:** Wolf `#777777` or Hare `#AFAFAF`

**Button Text**
- **Size:** 16px / 1rem
- **Weight:** 700 (Bold)
- **Line Height:** 1
- **Usage:** All button labels
- **Color:** Snow `#FFFFFF` on colored buttons, Eel `#4B4B4B` on light buttons

### Typography Guidelines for Kids (Ages 5-8)

**Reading Level Considerations:**
- Use simple, common words (1-2 syllables preferred)
- Short sentences (5-8 words maximum)
- Avoid jargon or complex terms
- Use active voice ("Tap to start!" not "Begin by tapping")

**Readability Best Practices:**
- Minimum body text size: 16px
- High contrast ratios (WCAG AAA: 7:1 for body text)
- Generous line spacing (1.5-1.6 line height)
- Short line lengths (45-60 characters max)
- Left-aligned text (never justified for kids)
- Ample whitespace around text blocks

**Tone & Voice:**
- Enthusiastic: "Awesome job!" "You did it!"
- Encouraging: "Try again tomorrow!" "Keep going!"
- Simple commands: "Drink water" "Go to bed early"
- Positive framing: "4 more days to badge!" not "You need 4 more days"

---

<a name="shape-language"></a>
## 4. Shape Language

### Core Design Principle: Everything Is Rounded

Inspired by Duolingo's shape philosophy, all visual elements in Habits for Good are built from three foundational shapes:

1. **Rounded Rectangle** (Most Common)
2. **Circle**
3. **Rounded Triangle**

**Why No Sharp Edges?**
- Sharp corners feel aggressive and unfriendly
- Rounded shapes are approachable and safe-feeling for children
- Curves create visual flow and guide the eye naturally
- Rounded elements feel more touchable on mobile devices

### Shape Guidelines

**Rounded Rectangles**
- **Border Radius:** 16px (standard), 24px (large cards), 8px (small elements)
- **Usage:** Buttons, cards, containers, input fields, badges
- **Proportion:** Vary the width-to-height ratio for visual interest (avoid squares)

**Circles**
- **Usage:** Avatar frames, icon containers, progress indicators, badges, dots
- **Consistency:** Always perfect circles (equal width/height)

**Rounded Triangles**
- **Usage:** Directional indicators, playful accents, mascot elements
- **Border Radius:** 4-8px on corners
- **Avoid:** Pointy tips; always round the vertices

### Visual Rhythm & Variation

Like a musical melody, illustrations and layouts should vary shape sizes to create interest:

**Avoid:** Same-sized shapes in a row (monotonous)
```
[■■■■■■] ← Boring, predictable
```

**Prefer:** Varied sizes with rhythm
```
[■ ■■ ■ ■■■ ■] ← Interesting, dynamic
```

**Application:**
- Campaign cards: Vary heights based on content
- Habit submission icons: Mix small, medium, large badges
- Dashboard widgets: Different proportions for different data types

### Shadow & Depth

**Elevation System** (Material Design inspired):
- **Level 0 (Flat):** `box-shadow: none` - Illustrations, icons
- **Level 1 (Subtle):** `box-shadow: 0 2px 4px rgba(75,75,75,0.1)` - Cards at rest
- **Level 2 (Raised):** `box-shadow: 0 4px 8px rgba(75,75,75,0.15)` - Hovered cards, dropdowns
- **Level 3 (Floating):** `box-shadow: 0 8px 16px rgba(75,75,75,0.2)` - Modals, tooltips
- **Level 4 (Lifted):** `box-shadow: 0 12px 24px rgba(75,75,75,0.25)` - Active dialogs, overlays

**Shadow Color:** Always use Eel `#4B4B4B` at low opacity (10-25%) for natural, soft shadows

### Stroke & Borders

**Illustration Borders:**
- **Width:** 3-4px for outlines
- **Color:** Eel `#4B4B4B` or color-specific darker shades
- **Style:** Consistent thickness throughout

**UI Borders:**
- **Width:** 1-2px
- **Color:** Hare `#AFAFAF` for dividers, Eel `#4B4B4B` for emphasis
- **Usage:** Sparingly; prefer shadows for separation

---

<a name="component-library"></a>
## 5. Component Library

### Buttons

**Primary Button** (Main Actions)
```
Background: Feather Green (#58CC02)
Text: Snow (#FFFFFF), Bold, 16px
Border Radius: 24px (pill-shaped)
Padding: 12px 32px
Height: 48px
Shadow: 0 4px 8px rgba(88,204,2,0.3)
Hover: Background → Mask Green (#89E219), lift (translate Y -2px)
Active: Scale down to 0.98
Disabled: Background → Hare (#AFAFAF), no shadow
```

**Secondary Button** (Less Important Actions)
```
Background: Macaw (#1CB0F6)
Text: Snow (#FFFFFF), Bold, 16px
Border Radius: 24px
Padding: 12px 32px
Height: 48px
Shadow: 0 4px 8px rgba(28,176,246,0.3)
Hover: Background darken 10%, lift
Active: Scale 0.98
```

**Tertiary Button** (Subtle Actions)
```
Background: Swan (#F7F7F7)
Text: Eel (#4B4B4B), Bold, 16px
Border: 2px solid Hare (#AFAFAF)
Border Radius: 24px
Padding: 12px 32px
Height: 48px
Shadow: none
Hover: Background → Snow (#FFFFFF), border → Eel (#4B4B4B)
```

**Icon Button** (Compact Actions)
```
Size: 48x48px
Background: Transparent → Hover: Swan (#F7F7F7)
Border Radius: 50% (circle)
Icon: 24x24px
Color: Eel (#4B4B4B)
```

**Large Button** (Hero CTAs)
```
Same as Primary but:
Height: 56px
Padding: 16px 48px
Font Size: 18px
Border Radius: 28px
```

### Cards

**Campaign Card** (Browse View)
```
Width: 100% (mobile), 320px (desktop)
Background: Snow (#FFFFFF)
Border Radius: 24px
Shadow: 0 4px 8px rgba(75,75,75,0.1)
Padding: 16px

Components:
- Hero Image: 100% width, 180px height, border-radius: 16px 16px 0 0
- Category Badge: Top-left overlay, 8px from edges
- Title: H3, 2 line max with ellipsis
- Cause Logo: 40x40px circle, bottom-right of image
- Stats Row: Icons + numbers (participants, days left, funding %)
- Progress Bar: 8px height, rounded, Feather Green fill
- Enroll Button: Full width, Primary button

Hover:
- Lift: translate Y -4px
- Shadow: 0 8px 16px rgba(75,75,75,0.15)
- Slight scale: 1.02
```

**Habit Submission Card** (Daily Check-in)
```
Width: 100%
Background: Gradient from Sky (#D4F1FF) to Snow (#FFFFFF)
Border Radius: 24px
Shadow: 0 2px 4px rgba(75,75,75,0.1)
Padding: 24px

Components:
- Habit Icon: 64x64px circle, colored background
- Habit Name: H2, Eel color
- Description: Body text, Wolf color
- Toggle Button: Large pill switch (60px width, 32px height)
- Smiley Rating: 4 emoji buttons (😄 😊 😐 😓)

Interaction:
- Toggle ON: Background → Mint (#BFF199), celebrate animation
- Toggle OFF: Background → Swan, no animation
```

**Dashboard Widget** (Stats Display)
```
Width: Flexible (grid layout)
Background: Snow (#FFFFFF)
Border Radius: 16px
Shadow: 0 2px 4px rgba(75,75,75,0.1)
Padding: 20px

Variants:
- Stat Counter: Large number (36px), small label (14px), icon (48x48px)
- Progress Ring: Circular progress (120px diameter), percentage in center
- List Widget: Scrollable list of items with icons
```

### Form Elements

**Text Input**
```
Width: 100%
Height: 48px
Background: Snow (#FFFFFF)
Border: 2px solid Hare (#AFAFAF)
Border Radius: 12px
Padding: 12px 16px
Font: Body (16px), Eel color

Focus:
- Border: 2px solid Macaw (#1CB0F6)
- Shadow: 0 0 0 4px rgba(28,176,246,0.1)

Error:
- Border: 2px solid Cardinal (#FF4B4B)
- Helper text: Caption, Cardinal color
```

**Dropdown/Select**
```
Same as Text Input but:
- Right icon: Chevron down, Eel color
- Dropdown panel: Border-radius: 12px, shadow level 3
- Option hover: Background → Swan (#F7F7F7)
- Option selected: Background → Mint (#BFF199), checkmark icon
```

**Checkbox** (Not recommended for kids; use toggles)
```
Size: 24x24px
Border: 2px solid Hare (#AFAFAF)
Border Radius: 6px
Checked: Background → Feather Green, white checkmark icon
```

**Toggle Switch** (Preferred for kids)
```
Width: 52px
Height: 32px
Border Radius: 16px (pill)
Background OFF: Hare (#AFAFAF)
Background ON: Feather Green (#58CC02)
Knob: 28x28px circle, Snow color, 2px margin
Animation: Slide + bounce (0.3s ease-out)
```

### Badges & Tags

**Category Badge**
```
Height: 28px
Padding: 6px 12px
Border Radius: 14px (pill)
Font: Bold, 12px
Background: Varies by category
Text: Snow (#FFFFFF)

Examples:
- Children: Beetle (#CE82FF)
- Food: Fox (#FF9600)
- Medical: Cardinal (#FF4B4B)
- Religious: Humpback (#2B70C9)
```

**Streak Badge**
```
Width: 80px
Height: 80px
Border Radius: 50% (circle)
Background: Radial gradient (Bee → Fox)
Border: 4px solid Snow (#FFFFFF)
Shadow: 0 4px 12px rgba(255,200,0,0.4)
Icon: Flame emoji or flame icon (48x48px)
Number: 24px, Bold, Snow color
```

**Achievement Badge** (Medals)
```
Size: 96x96px
Shape: Circle with ribbon tails (rounded triangles below)
Colors:
- Gold: Background → Bee (#FFC800), ribbon → Fox (#FF9600)
- Silver: Background → Hare (#AFAFAF), ribbon → Wolf (#777777)
- Bronze: Background → Fox (#FF9600), ribbon → Bee (#FFC800)
Icon: 48x48px in center (star, trophy, etc.)
Shadow: 0 6px 16px rgba(75,75,75,0.2)
```

### Navigation

**Top Navigation Bar**
```
Height: 64px
Background: Snow (#FFFFFF)
Border Bottom: 1px solid Hare (#AFAFAF)
Shadow: 0 2px 4px rgba(75,75,75,0.05)

Components:
- Logo: 40px height, left-aligned
- Nav Links: Body text, Wolf → Eel on hover
- User Avatar: 40x40px circle, right-aligned
- Notification Badge: 20x20px circle, Cardinal background, Snow text
```

**Bottom Navigation** (Mobile)
```
Height: 72px
Background: Snow (#FFFFFF)
Border Top: 1px solid Hare (#AFAFAF)
Shadow: 0 -2px 8px rgba(75,75,75,0.1)
Fixed Position: Bottom

Tab Items (5 max):
- Icon: 28x28px
- Label: Caption (12px)
- Active: Icon + label → Feather Green, bold
- Inactive: Icon + label → Wolf
- Padding: 12px
```

### Modals & Dialogs

**Modal Overlay**
```
Background: rgba(75,75,75,0.6) (Eel at 60% opacity)
Backdrop Blur: 4px (if supported)
Z-Index: 1000
```

**Modal Content**
```
Width: 90% (mobile), 480px max (desktop)
Background: Snow (#FFFFFF)
Border Radius: 24px
Shadow: 0 12px 32px rgba(75,75,75,0.3)
Padding: 32px

Components:
- Close Button: Top-right, icon button (X)
- Title: H2, center-aligned
- Content: Body text, center-aligned
- Actions: Button group, right-aligned or full-width (mobile)

Animation:
- Enter: Scale from 0.9 → 1, fade in (0.3s ease-out)
- Exit: Scale to 0.9, fade out (0.2s ease-in)
```

### Progress Indicators

**Linear Progress Bar**
```
Height: 8px
Width: 100%
Background: Swan (#F7F7F7)
Border Radius: 4px
Fill: Feather Green (#58CC02), gradient to Mask Green
Animation: Smooth fill (1s ease-out)
```

**Circular Progress** (Streak Indicator)
```
Size: 120px diameter
Track: 8px width, Swan (#F7F7F7)
Progress: 8px width, Feather Green (#58CC02)
Cap: Round
Center Content: Icon + number
Animation: Rotate stroke (1.5s ease-out)
```

**Loading Spinner**
```
Size: 48x48px
Border: 4px solid Swan (#F7F7F7)
Border-Top: 4px solid Feather Green (#58CC02)
Border Radius: 50%
Animation: Rotate 360° infinite (0.8s linear)
```

---

<a name="iconography"></a>
## 6. Iconography

### Icon Style

**Design Principles:**
- **Outline Style:** 2-3px stroke, rounded line caps
- **Filled Style:** For active/selected states
- **Rounded Corners:** All icons should have soft, rounded edges
- **Grid System:** Design on 24x24px or 48x48px grid
- **Optical Balance:** Visually center icons, not mathematically

### Icon Sizes

- **Extra Small:** 16x16px (inline with text)
- **Small:** 20x20px (buttons, form fields)
- **Medium:** 24x24px (default UI icons)
- **Large:** 32x32px (feature highlights)
- **Extra Large:** 48x48px (habit icons, major actions)
- **Hero:** 64-96px (empty states, onboarding)

### Habit Icon Library

Each habit should have a colorful, friendly icon:

**Water Habit**
- Icon: Water droplet or glass
- Background: Circular, Macaw (#1CB0F6)
- Style: Simple, 2-color (white droplet on blue)

**Sleep Habit**
- Icon: Crescent moon or sleeping face emoji
- Background: Circular, Beetle (#CE82FF)
- Style: Dreamy, soft

**Walking Habit**
- Icon: Footprints or sneaker
- Background: Circular, Feather Green (#58CC02)
- Style: Active, energetic

**Screen Time Habit**
- Icon: TV/tablet with X or clock
- Background: Circular, Fox (#FF9600)
- Style: Clear, not judgmental

**Reading Habit**
- Icon: Open book
- Background: Circular, Humpback (#2B70C9)
- Style: Inviting, knowledge-focused

**Vegetables Habit**
- Icon: Broccoli or carrot
- Background: Circular, Feather Green (#58CC02)
- Style: Appetizing, fun

**Kindness Habit**
- Icon: Heart or helping hands
- Background: Circular, Cardinal (#FF4B4B)
- Style: Warm, loving

**Brushing Teeth Habit**
- Icon: Toothbrush or smiling tooth
- Background: Circular, Sky (#D4F1FF)
- Style: Clean, happy

### UI Icon Set

**Navigation:**
- Home (house outline)
- Campaigns (flag or megaphone)
- Submit (checkmark in circle)
- Profile (person outline)
- Settings (gear)

**Actions:**
- Add (+)
- Remove (-)
- Edit (pencil)
- Delete (trash can)
- Search (magnifying glass)
- Filter (funnel)
- Share (share arrow)
- Download (down arrow + tray)

**Status:**
- Success (checkmark, Feather Green)
- Info (i in circle, Macaw)
- Warning (exclamation, Bee)
- Error (x in circle, Cardinal - use sparingly)

**Media:**
- Play (triangle)
- Pause (two bars)
- Stop (square)
- Volume (speaker)
- Image (picture frame)

### Icon Color Usage

**Default State:**
- Color: Wolf (#777777) or Eel (#4B4B4B)
- Background: Transparent or Swan (#F7F7F7)

**Active/Selected:**
- Color: Feather Green (#58CC02) or Snow (#FFFFFF) on colored backgrounds
- Background: Mint (#BFF199) circle or colored background

**Disabled:**
- Color: Hare (#AFAFAF)
- Opacity: 0.5

---

<a name="illustration-guidelines"></a>
## 7. Illustration Guidelines

### Illustration Philosophy

Inspired by Duolingo's whimsical style, illustrations should feel:
- **Playful:** Characters and objects have personality
- **Simple:** Built from basic rounded shapes
- **Colorful:** Use 2-4 bold colors per illustration
- **Friendly:** No scary or complex imagery

### Character Design

**Mascot** (Habits Hero - Similar to Duo the Owl)
- **Shape:** Rounded body, large circular head, small limbs
- **Colors:** Primary → Feather Green body, Bee accents, Eel outlines
- **Expression:** Always friendly, encouraging smile
- **Poses:** Jumping, celebrating, high-fiving, cheering
- **Floating Elements:** Feet slightly off ground (Duolingo's flutter effect)

**Child Characters** (Contributors)
- **Style:** Simple, diverse, rounded shapes
- **Proportions:** Large head (1:2 body ratio), short limbs
- **Features:** Minimal facial features, no complex details
- **Clothing:** Solid colors from secondary palette
- **Diversity:** Vary skin tones (use pastel versions of secondary colors)

### Object Illustrations

**Campaign Icons:**
- Food Bank: Bowl with steam (rounded shapes)
- Education: Stack of books with apple on top
- Medical: Red cross in rounded rectangle
- Environment: Tree with rounded canopy

**Achievement Illustrations:**
- Streak Flame: Rounded flame shape, gradient from Bee to Cardinal
- Trophy: Simple cup shape, Bee color with ribbons
- Star: Rounded 5-point star, Bee color with sparkles

### Illustration Rules

**Do:**
- Use 3 basic shapes: rounded rectangle, circle, rounded triangle
- Keep outlines consistent (3-4px stroke, Eel color)
- Add soft shadows below objects (offset 4px, Eel at 20% opacity)
- Use light pastels for large background areas
- Create visual rhythm by varying shape sizes
- Allow some elements to "float" slightly (not grounded)

**Don't:**
- Never use sharp, pointy edges
- Avoid gray tones (use colored neutrals instead)
- Don't over-detail (kids need simple, recognizable shapes)
- Never use white as a base color (backgrounds are white)
- Avoid more than 4 colors per illustration
- Don't make objects perfectly symmetrical (add character)

### Empty States

**No Campaigns Enrolled:**
- Illustration: Mascot looking at empty flag
- Text: "No campaigns yet! Let's find one!"
- CTA: "Browse Campaigns" button

**All Habits Submitted:**
- Illustration: Mascot celebrating with confetti
- Text: "Great job today! See you tomorrow!"
- Visual: Checkmarks, stars, sparkles

**Network Error:**
- Illustration: Mascot with confused expression, broken connection icon