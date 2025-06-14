# PLMA2 - Simple CRM

A lightweight CRM for “BD Reps” and “Admin” to manage company records, built as a React app for easy use with GitHub Pages.  
**All data is stored in the browser (localStorage).**

## Features

- Login for BD Reps and Admin (admin credentials preset).
- Company management: view, add activity, edit.
- Company summary table with sorting, most recent activity.
- Company details page with activity log.
- Admin panel for managing users, importing/exporting companies as CSV.
- No backend required.  
- Easy to run locally or deploy with GitHub Pages.

---

## Running locally

1. **Install Node.js** (https://nodejs.org/) if you don’t have it.
2. Clone this repository.
3. Install dependencies:
   ```
   npm install
   ```
4. Start local dev server:
   ```
   npm run dev
   ```
   The app will be available at http://localhost:5173 (or as instructed in your terminal).

## Deploying to GitHub Pages

1. Make sure your repo is named `PLMA2` and is published to GitHub.
2. Set the `base` in `vite.config.js` to `/PLMA2/` (already set).
3. Build the site:
   ```
   npm run build
   ```
4. Deploy to GitHub Pages:
   ```
   npm run deploy
   ```
   This will push the `dist/` folder to the `gh-pages` branch.
5. In your GitHub repo settings, set GitHub Pages to deploy from the `gh-pages` branch.

## GitHub Actions Workflow

A GitHub Actions workflow (`.github/workflows/deploy.yml`) is included to automatically deploy on push to main.

## Default Admin Login

- Username: `will@progresslearning.com`
- Password: `admin`

## Notes

- All data is stored in your browser. Clearing browser storage will delete all data.
- **This is not secure for production use.** For internal or demonstration use only.

## CSV Format

- Exported CSV will contain all company fields and only the most recent activity.
- To import, use a CSV matching the exported column names.

---

## File Structure

```
/
  src/
    components/
    utils/
    styles.css
    App.jsx, main.jsx
  public/
    index.html
  package.json
  vite.config.js
  README.md
  .github/workflows/deploy.yml
```

---

## Contributing

PRs and suggestions welcome!
