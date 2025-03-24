import os
from datetime import datetime
import time

# Generate configuration variables.
root_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sitemap_path = os.path.join(root_dir, "sitemap.xml")
base_url = "https://sykeben.github.io"
timestamp = (
    f"{datetime.now().strftime('%Y-%m-%d %H:%M:%S')} {time.tzname[time.daylight]}"
)

# Initialize sitemap content.
content = f"""<?xml version="1.0" encoding="UTF-8"?>
<!-- {"="*78} -->
<!-- Last generated {timestamp} -->
<!-- {"="*78} -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
"""

# Crawl directories for HTML files, excluding "assets" directories.
for root, dirs, files in os.walk(root_dir):

    # Prevent os.walk from entering assets directories.
    if "assets" in dirs:
        dirs.remove("assets")

    # Index HTML files.
    for file in files:
        if file.endswith(".html"):
            rel_path = os.path.relpath(os.path.join(root, file), root_dir).replace(
                os.sep, "/"
            )
            url = f"{base_url}/{rel_path}".replace("///", "/").replace("//", "/").replace(":/", "://")
            lastmod = datetime.today().strftime("%Y-%m-%d")

            content += f"""  <url>
    <loc>{url}</loc>
    <lastmod>{lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
"""

# Close the sitemap file structure.
content += "</urlset>\n"

# Write to disk.
with open(sitemap_path, "wt") as file:
    file.write(content)

# Print result.
print(content)
print("=" * 80)
print()
print("Generated the above 'sitemap.xml' file at:")
print(sitemap_path)
