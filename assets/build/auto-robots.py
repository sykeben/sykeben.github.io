import os
from datetime import datetime
import time

# Generate configuration variables.
root_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
robots_dir = os.path.join(root_dir, "robots.txt")
sitemap_url = "https://sykeben.github.io/sitemap.xml"
timestamp = (
    f"{datetime.now().strftime('%Y-%m-%d %H:%M:%S')} {time.tzname[time.daylight]}"
)

# Initialize content.
content = f"""{'#'*80}
# Last generated {timestamp}
{'#'*80}

# Allow all crawlers to access everything
User-agent: *
Disallow:
"""

# Disallow any "assets" directories.
content += """
# Disallow bots from crawling assets, scripts, or placeholder files
"""
for root, dirs, files in os.walk(root_dir):
    if "assets" in dirs:
        path = os.path.normpath(
            f"/{os.path.relpath(root, root_dir).replace(os.sep, '/').replace(".", "")}/assets/"
        )
        content += f"Disallow: {path.replace("//", "/")}\n"

# Add the sitemap reference.
content += f"""
# Sitemap
Sitemap: {sitemap_url}
"""

# Write to disk.
with open(robots_dir, "wt") as file:
    file.write(content)

# Print result.
print(content)
print("=" * 80)
print()
print("Generated the above 'robots.txt' file at:")
print(robots_dir)
