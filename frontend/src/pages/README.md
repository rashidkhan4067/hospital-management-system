# Pages Directory Structure

This directory contains the page-level components for the application. To maintain scalability, follow these patterns:

## Patterns

1.  **Lazy Loading**: All pages in `App.jsx` should be imported using `React.lazy()`. This ensures that code is only loaded when needed.
2.  **Barrel Exports**: Each sub-directory should contain an `index.jsx` file that exports all pages within that directory.
3.  **Category Grouping**: Group pages logically into sub-folders (e.g., `auth/`, `admin/`, `public/`).
4.  **Separation of Concerns**: 
    - Pages should primarily handle layout and routing.
    - Complex business logic and reusable UI elements should be located in `src/components/features/` or `src/components/common/`.
5.  **Hooks**: Use custom hooks in `src/hooks/` for shared logic between pages.

## Current Categories

- `admin/`: Pages for administrative users.
- `auth/`: Authentication flow pages (Login, Register, etc.).
- `public/`: Information pages accessible to everyone.
- `appointments/`: Appointment management.
- `doctor/`: Doctor-specific dashboards.
- `patient/`: Patient-specific dashboards.
- `voice/`: Voice-related features.

## Adding a New Page

1. Create your component in the appropriate sub-folder.
2. Export it from the sub-folder's `index.jsx`.
3. Add a lazy import and a route in `src/App.jsx`.
