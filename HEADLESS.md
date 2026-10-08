# Headless portfolio backend

## Local development

WordPress is available at http://localhost:8888 and its projects endpoint is
http://localhost:8888/wp-json/wp/v2/projects. React's `frontend/.env` points to
this local API. Start MAMP's Apache and MySQL servers, then run
`./start-wordpress.ps1` in PowerShell after restarting your computer. Keep that
terminal open. Apache forwards root requests to this PHP server on port 8001;
the bundled Apache PHP module could not open the workspace's PHP files.

The local `.htaccess` uses root paths. For deployment under `/portfolio/`, use
`RewriteBase /portfolio/` and `RewriteRule . /portfolio/index.php [L]` instead,
or let the live WordPress Permalinks settings regenerate its rules.

This workspace is the WordPress backend. The production backend address is assumed
to remain https://johnzhu.ca/portfolio. A separate frontend has not been created or
deployed here.

## Installation

Deploy `wp-content/mu-plugins/headless-portfolio.php` to the same path in the live
WordPress installation. WordPress loads this plugin automatically; no activation
step is required. In the dashboard, create and publish content under **Projects**.
Use the title, editor, excerpt and featured image for each project.

Existing pages and posts remain available through their built-in REST endpoints.
Existing content is not migrated into Projects automatically. The current theme
continues serving existing public pages until the separate frontend is deployed.
Projects are managed in the dashboard and served through the API, without public
WordPress project pages.

## Frontend connection

Use this API base in the separate frontend's configuration:

```text
https://johnzhu.ca/portfolio/wp-json/wp/v2
```

Endpoints:

- Published projects: `/projects?_embed=1`
- Project by slug: `/projects?slug=example-project&_embed=1`
- Pages: `/pages`
- Posts: `/posts`
- Media: `/media`

```js
const apiBase = 'https://johnzhu.ca/portfolio/wp-json/wp/v2';
const response = await fetch(`${apiBase}/projects?_embed=1&per_page=100`);
if (!response.ok) throw new Error(`WordPress returned ${response.status}`);
const projects = await response.json();
// Featured image: project._embedded?.['wp:featuredmedia']?.[0]?.source_url
// Collections with more than 100 entries require additional pages.
```

Public published content needs no credentials. WordPress's standard REST
permissions still apply to drafts and edits. No custom authentication or CORS
override is installed.

## Verification after deployment

1. Confirm **Headless Portfolio** appears under Plugins > Must-Use.
2. Publish a Project with an excerpt and featured image.
3. Open https://johnzhu.ca/portfolio/wp-json/wp/v2/projects?_embed=1
   and confirm the project appears as JSON while logged out.
4. If `/wp-json/` returns 404, save Settings > Permalinks using Post name.
   The existing `.htaccess` assumes Apache and a `/portfolio/` installation.
   Alternatively test
   `https://johnzhu.ca/portfolio/?rest_route=/wp/v2/projects`.

The database and hosting settings determine the WordPress URLs. This plugin does
not hard-code WP_HOME or WP_SITEURL, so a local installation can keep its own URL.
If the frontend must replace `/portfolio`, migrate the backend to its chosen
address first, then update the frontend API base. Do not replace the live
WordPress directory before that migration.

REST registration follows the WordPress documentation:
https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-rest-api-support-for-custom-content-types/
