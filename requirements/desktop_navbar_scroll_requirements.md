# Desktop Navigation Bar Scroll Animation Requirements Document

## Project Overview
Implement dynamic scroll-based navbar height animation with proportional logo scaling and positioning on desktop screens.

## Current State Analysis
- **Navbar container**: `position: fixed` with inner div using `position: relative`
- **Inner div layout**: `display: flex` with `justify-content: space-between`
- **Content arrangement**: Logo on left, navigation links on right
- **Target**: Desktop screens only (mobile has separate hamburger implementation)

## Animation Specifications

### Initial State (Page Top / Scroll Position 0)
- **Navbar height**: 84px
- **Logo dimensions**: 136px tall
- **Logo positioning**: 
  - Out of normal document flow (use `position: absolute` or similar)
  - Top margin: 16px from navbar top
  - **Visual result**: Top 50% of logo (68px) sits within navbar, bottom 50% bleeds below navbar

### Scrolled State (User scrolls down)
- **Navbar height**: 48px (shrinks by 36px)
- **Logo dimensions**: 80px tall (shrinks by 56px)
- **Logo positioning**:
  - Maintain same positioning principle (half in navbar, half bleeding below)
  - Top margin: 8px (calculated to maintain 50/50 visual split)
  - **Visual result**: Top 50% of logo (40px) sits within navbar, bottom 50% bleeds below navbar

## Technical Requirements

### Scroll Detection
- **Trigger mechanism**: JavaScript scroll event listener on window
- **Threshold**: Animation should begin immediately when user starts scrolling (scroll position > 0)
- **Smooth transitions**: Use CSS transitions for height and size changes
- **Performance**: Throttle or debounce scroll events for optimal performance

### Animation Behavior
- **Transition duration**: Smooth animation (recommend 200-300ms)
- **Transition timing**: Use CSS `ease` or `ease-out` for natural feel
- **Properties to animate**:
  - Navbar height: 84px → 48px
  - Logo height: 136px → 80px  
  - Logo top margin: 16px → 8px
- **Reverse animation**: When scrolling back to top, smoothly return to initial state

### CSS Implementation Strategy
- **State classes**: Use JavaScript to toggle CSS classes (e.g., `.navbar-scrolled`)
- **CSS transitions**: Define transitions on the base elements, not the state classes
- **Logo positioning**: Ensure logo remains properly positioned relative to navbar during animation

## Positioning Details

### Logo Positioning Logic Analysis
**Initial State Breakdown**:
- Navbar: 84px height
- Logo: 136px height  
- Top margin: 16px
- **Visual result**: Logo extends from 16px to 152px (16px + 136px)
- **Within navbar**: Logo pixels from 16px to 84px = 68px visible (exactly half of 136px logo)
- **Below navbar**: Logo pixels from 84px to 152px = 68px bleeding below

### Proportional Scaling Calculations
**Scrolled State Requirements**:
- Navbar: 48px height
- Logo: 80px height
- **Maintain same visual proportion**: Half logo visible in navbar (40px), half bleeding below (40px)
- **Required top margin calculation**: 
  - For 40px of logo to be visible in 48px navbar: top margin = 48px - 40px = 8px
  - **Result**: 8px top margin positions logo from 8px to 88px
  - **Within navbar**: 8px to 48px = 40px visible
  - **Below navbar**: 48px to 88px = 40px bleeding

### Positioning Formula
**Consistent positioning logic**:
```
desired_visible_height = logo_height / 2
top_margin = navbar_height - desired_visible_height

Initial: top_margin = 84px - (136px / 2) = 84px - 68px = 16px ✓
Scrolled: top_margin = 48px - (80px / 2) = 48px - 40px = 8px ✓
```

### Final Positioning Specifications
- **Initial state**: 16px top margin (maintains 68px visible, 68px bleeding)
- **Scrolled state**: 8px top margin (maintains 40px visible, 40px bleeding)
- **Proportional consistency**: Always 50% of logo visible within navbar bounds

## JavaScript Requirements

### Event Handling
```javascript
// Pseudo-code structure
window.addEventListener('scroll', throttledScrollHandler);

function handleScroll() {
  const scrollPosition = window.scrollY;
  const navbar = document.querySelector('.navbar');
  
  if (scrollPosition > 0) {
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.remove('navbar-scrolled');
  }
}
```

### Performance Optimization
- **Throttling**: Limit scroll event frequency (recommend 16ms intervals for 60fps)
- **RequestAnimationFrame**: Use for smooth animations if direct CSS transitions insufficient
- **Debouncing**: Consider debouncing for final state changes

## CSS Implementation

### Base Styles
- **Navbar container**: Maintain existing `position: fixed`
- **Logo**: Use `position: absolute` for out-of-flow positioning
- **Transitions**: Apply to navbar height, logo dimensions, and logo positioning

### State Classes
- **Default state**: Base styles represent initial state
- **Scrolled state**: `.navbar-scrolled` class modifies dimensions and positioning

## Browser Compatibility
- **Target**: Modern browsers supporting CSS transitions
- **Fallback**: Ensure functionality works without animations on older browsers
- **Testing**: Verify smooth performance across different devices and browsers

## Deliverables Expected
1. **JavaScript**: Scroll detection and state management
2. **CSS**: Transition styles and state classes  
3. **HTML modifications**: Any necessary structural changes for positioning
4. **Performance considerations**: Throttled event handling implementation

## Testing Requirements
- **Scroll behavior**: Test smooth transitions when scrolling up and down
- **Performance**: Verify no scroll lag or janky animations
- **Edge cases**: Test rapid scrolling, mobile browsers (if applicable)
- **Visual verification**: Confirm logo positioning maintains intended 50/50 split ratio