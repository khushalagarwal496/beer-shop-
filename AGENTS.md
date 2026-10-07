

## Frontend architecture
- Keep the beer storefront at the index route, with client-state dialogs for browsing and basket previews; this is a frontend-only experience without checkout or persistence.
- Define storefront styling and visual tokens in src/styles.css and expose interactive treatments through Button variants for consistency.
- Prebundle React and the storefront UI dependencies together in Vite to avoid dependency-generation swaps when an open preview first loads the controls.
