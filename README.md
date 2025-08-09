# Mello ☁️ - Mental Health Platform UI

A comforting, accessible, and Filipino-centered UI design for mental health service providers and users seeking support.

## 🌟 Design Philosophy

Mello is built around the principle of **emotional safety first**. Every design decision prioritizes creating a space where users feel welcome, unjudged, and supported.

### Core Design Principles

1. **Comforting and Safe** - Soft colors, friendly visuals, and emotional safety across all interactions
2. **Minimalist and Clean** - Clarity over clutter, generous whitespace, and simple typography
3. **Mobile-First & Intuitive** - Optimized for one-handed use with large tap targets
4. **Rounded and Soft UI** - Generous corner radii (16-24px) with subtle shadows and smooth animations
5. **Subtle Animation** - Gentle fade-ins and slide transitions that feel alive, not flashy
6. **Anonymous & Respectful UX** - Privacy-first approach with minimal personal data collection
7. **Filipino-Centered** - Native Filipino words and cultural touches that feel meaningful
8. **Accessible & Inclusive** - WCAG compliant with support for screen readers and keyboard navigation
9. **Gentle Monetization** - Coffee credits positioned as appreciation, not paywalls
10. **Emotionally Responsive** - Mood-aware interactions with easy exit options

## 🎨 Design System

### Color Palette

#### Light Theme
- **Primary**: `#667eea` (Soft purple-blue)
- **Secondary**: `#f093fb` (Gentle pink)
- **Background**: `#ffffff` (Pure white)
- **Surface**: `#f8fafc` (Very light gray)
- **Text Primary**: `#1e293b` (Dark slate)
- **Text Secondary**: `#64748b` (Medium slate)

#### Dark Theme
- **Background**: `#0f172a` (Deep navy)
- **Surface**: `#1e293b` (Dark slate)
- **Text Primary**: `#f1f5f9` (Light gray)
- **Text Secondary**: `#cbd5e1` (Medium gray)

### Typography

- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Base Size**: 16px
- **Line Height**: 1.6
- **Scale**: Modular scale with consistent ratios

### Spacing System

- **XS**: 0.5rem (8px)
- **SM**: 1rem (16px)
- **MD**: 1.5rem (24px)
- **LG**: 2rem (32px)
- **XL**: 3rem (48px)
- **2XL**: 4rem (64px)

### Border Radius

- **SM**: 8px
- **MD**: 16px
- **LG**: 24px
- **XL**: 32px

## 🚀 Features

### Core Services

1. **📝 Himpil** - Anonymous venting and community support
2. **🧑‍⚕️ Kalinga** - Professional mental health services
3. **☕ Tara Kape** - 1-on-1 conversations with listeners

### Interactive Elements

- **Theme Toggle** - Light/dark mode with smooth transitions
- **Mobile Menu** - Responsive navigation with accessibility features
- **Smooth Scrolling** - Gentle page navigation
- **Coffee Credits Modal** - Appreciation system for listeners
- **Scroll Animations** - Subtle reveal effects for content

### Accessibility Features

- **Screen Reader Support** - ARIA labels and live regions
- **Keyboard Navigation** - Full keyboard accessibility
- **Focus Management** - Clear focus indicators
- **Skip Links** - Quick navigation for assistive technology
- **Reduced Motion** - Respects user motion preferences
- **High Contrast** - Support for high contrast mode

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile-First Approach

- Large tap targets (minimum 48px)
- Card-based layouts
- Slide transitions
- One-handed interaction optimization

## 🛠️ Technical Implementation

### File Structure

```
UI/
├── index.html          # Main HTML structure
├── styles.css          # Complete CSS design system
├── script.js           # Interactive functionality
└── README.md           # Documentation
```

### Dependencies

- **Font Awesome 6.4.0** - Icons
- **Inter Font** - Typography
- **Vanilla JavaScript** - No framework dependencies

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎯 User Experience

### Emotional Safety Features

- **Gentle Color Transitions** - No jarring color changes
- **Smooth Animations** - 0.3s ease transitions
- **Easy Exit Options** - Escape key and click-outside to close
- **Privacy Indicators** - Clear anonymity messaging
- **Non-Triggering Content** - Careful language and imagery

### Filipino Cultural Integration

- **Native Language** - Himpil, Kalinga, Tara Kape
- **Cultural Metaphors** - Coffee as connection and care
- **Local Idioms** - "Salamat" in thank you messages
- **Respectful Tone** - Honorific and caring language

## 🔧 Customization

### Theme Variables

All colors, spacing, and typography are defined as CSS custom properties for easy customization:

```css
:root {
    --primary-color: #667eea;
    --spacing-md: 1.5rem;
    --font-family: 'Inter', sans-serif;
}
```

### Adding New Services

1. Add HTML structure in the services grid
2. Include appropriate icons and Filipino terminology
3. Maintain consistent card styling
4. Add accessibility attributes

### Extending Animations

Animations are built with CSS transitions and Intersection Observer API for performance:

```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
});
```

## 🚀 Getting Started

1. **Clone or download** the files
2. **Open `index.html`** in a modern web browser
3. **Test responsiveness** by resizing the browser window
4. **Try accessibility features** with keyboard navigation and screen readers

### Development

- **No build process required** - Pure HTML, CSS, and JavaScript
- **Live reload** - Simply refresh the browser to see changes
- **Cross-platform** - Works on Windows, macOS, and Linux

## 📊 Performance

### Optimizations

- **CSS Variables** - Efficient theme switching
- **Intersection Observer** - Performance-optimized animations
- **Minimal JavaScript** - Lightweight interactions
- **Optimized Images** - WebP format with fallbacks
- **Font Loading** - Google Fonts with display=swap

### Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🤝 Contributing

### Design Guidelines

1. **Maintain emotional safety** - Test with users in distress
2. **Follow accessibility standards** - WCAG 2.1 AA compliance
3. **Use Filipino cultural context** - Research local mental health needs
4. **Keep it simple** - Less is more for mental health interfaces

### Code Standards

- **Semantic HTML** - Proper heading hierarchy and landmarks
- **CSS Custom Properties** - Use design system variables
- **JavaScript Modules** - Organized, documented functions
- **Accessibility First** - ARIA labels and keyboard support

## 📞 Support

For questions about the design system or implementation:

- **Design Decisions** - Review the design principles above
- **Technical Issues** - Check browser compatibility
- **Accessibility** - Test with screen readers and keyboard navigation
- **Cultural Context** - Consult with Filipino mental health professionals

## 📄 License

This UI design is created for mental health support and community care. Please use responsibly and with appropriate mental health expertise.

---

**Made with ❤️ for the Filipino community**

*Mello - Your quiet space to vent, talk, and heal* 