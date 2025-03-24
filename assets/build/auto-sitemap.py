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

            # Get full path.
            full_file = os.path.join(root, file)

            # Truncate indexes.
            is_index = False
            trun_file = full_file
            if full_file.endswith(f"{os.sep}index.html"):
                is_index = True
                trun_file = f"{os.path.dirname(full_file)}"

            # Generate URL.
            rel_path = os.path.relpath(trun_file, root_dir).replace(os.sep, "/")
            url = (
                f"{base_url}/{rel_path}{'/' if is_index else ''}".replace("/.", "/")
                .replace("///", "/")
                .replace("//", "/")
                .replace(":/", "://")
            )

            # Generate last modified date.
            lastmod = datetime.fromtimestamp(os.path.getmtime(full_file)).strftime(
                "%Y-%m-%d"
            )

            # Generate frequency.
            freq = "monthly"
            if url == f"{base_url}/contact/":
                freq = "yearly"
            elif url == f"{base_url}/blog/":
                freq = "weekly"
            elif url.startswith(f"{base_url}/blog/"):
                freq = "yearly"
            elif url == f"{base_url}/galleries/":
                freq = "weekly"
            elif url.startswith(f"{base_url}/galleries/"):
                freq = "yearly"
            elif url == f"{base_url}/init/":
                freq = "weekly"

            # Generate priority.
            priority = "%.1f" % (
                1 - (0.175 * (trun_file.count("/") - 5))
            )

            # Update content.
            content += f"""  <url>
    <loc>{url}</loc>
    <lastmod>{lastmod}</lastmod>
    <changefreq>{freq}</changefreq>
    <priority>{priority}</priority>
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
