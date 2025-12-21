# Claude Code Project Guidelines

## Development Style

### Iteration Approach
- Make small, incremental changes and deploy frequently
- Test changes visually after each deployment before moving on
- When issues are reported via screenshots, address them precisely
- Keep logic/code intact when hiding UI elements (for potential future use)

### UI/UX Preferences
- Clean, minimal interfaces - remove unnecessary UI clutter
- Prefer subtle visual effects over bold/intrusive ones
- Animations should be gentle (pulse, fade) rather than aggressive (spin, bounce)
- Avoid verbose status text - let visual indicators speak for themselves
- Ensure proper spacing between UI elements

### Design Aesthetic
- Neutral color palette with off-white backgrounds (#f5f5f0)
- Dark text (#171717) for high contrast readability
- Rounded corners on cards and buttons (rounded-full, rounded-2xl)
- Soft shadows for depth without harshness
- White cards/containers that feel lightweight

### Code Style
- Vanilla JavaScript with ES6 modules preferred
- Centralized state management with setter functions
- Modular file organization - separate concerns into dedicated files
- Tailwind CSS for utility styling
- Custom CSS for animations and complex component styles

### Architecture
- Cloudflare Pages for hosting
- Cloudflare D1 for database
- Cloudflare R2 for media storage
- API routes in `functions/api/` directory

### Deployment
- Deploy after each meaningful change for rapid iteration
- Verify changes work in production before proceeding

### Communication
- Concise responses - get to the point
- Show what changed, deploy, confirm
- Batch related changes into single deployments when possible
