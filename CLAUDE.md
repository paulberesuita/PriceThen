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
- Locked/premium states should still be navigable - show placeholder content, not dead ends
- Show meaningful placeholders, not just spinners or blank states
- Prefer earthy/warm grays over cool/blueish grays (e.g., Tailwind's stone palette)

### Debugging
- When debugging, ask clarifying questions rather than guessing
- Use browser DevTools (Network tab, Console) to identify root causes
- Look for patterns (repeated API calls, re-renders) not just errors

### SEO (for web projects)
- Use SEO-friendly URLs (not query params)
- Dynamic meta tags (title, description, Open Graph) for SPAs
- Sitemap with all indexable pages
- JSON-LD structured data where relevant
- Consider llms.txt for AI discoverability

### Git Workflow
- Commit after completing a feature, not after every tiny change
- Use descriptive commit messages summarizing the "why"
- Push when explicitly asked or when a logical milestone is reached

### Code Hygiene
- Keep the codebase clean - remove unused files, old schemas, seeds
- Don't add cache busters to imports - they cause more problems than they solve
- Be cautious with third-party listeners/polling that may cause unintended re-renders

### Deployment
- Deploy after each meaningful change for rapid iteration
- Verify changes work in production before proceeding

### Communication
- Concise responses - get to the point
- Show what changed, deploy, confirm
- Batch related changes into single deployments when possible
