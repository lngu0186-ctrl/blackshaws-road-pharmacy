# React performance audit

Use this file when reviewing rendering, data loading, and bundle behaviour.

## Check first

- Is the route mostly static, mostly dynamic, or mixed?
- Which components are client-only and why?
- Are there obvious sequential fetches that can be parallelised?
- Are large libraries imported at the top level when they are only needed in one interaction?

## Red flags

- Multiple `await` calls in series for unrelated requests.
- Large client components doing work that could be done server-side or outside render.
- Heavy maps, charts, editors, carousels, or modal systems loaded on first paint.
- Repeated derived calculations inside render without memoisation where it matters.
- Over-broad context providers causing avoidable rerenders.
- Huge image/video payloads above the fold.
- Third-party scripts injected globally without a good reason.

## Preferred fixes

### 1. Remove waterfalls

- Fetch unrelated data in parallel.
- Preload critical route data earlier where the framework allows it.
- Separate slow secondary data from above-the-fold content.

### 2. Reduce main-thread work

- Hoist constants and static config out of components.
- Memoise expensive transforms only when profiling suggests it matters.
- Split giant components into smaller units when state churn is local.

### 3. Improve bundle hygiene

- Lazy load modals, maps, rich text editors, and admin-only features.
- Import only the used parts of utility libraries.
- Avoid shipping server-only logic to the browser.

### 4. Improve media loading

- Use responsive images.
- Keep hero media compressed and dimensioned.
- Avoid autoplay video as the only path to communicating key content.

## What to report

- Bottleneck
- Why it matters
- Exact component/file area
- Smallest practical fix
- Expected payoff
