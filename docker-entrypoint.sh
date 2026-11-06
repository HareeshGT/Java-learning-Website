#!/bin/sh
# Optional container-side keep-alive pinger for the Apache/PHP static site.
set -eu

if [ -n "${KEEP_ALIVE_URL:-}" ]; then
  (
    while true; do
      sleep 30
      curl --silent --show-error --max-time 10 --output /dev/null \
        --write-out "Keep-alive HTTP %{http_code}\n" \
        "$KEEP_ALIVE_URL" || echo "Keep-alive request failed"
    done
  ) &
fi

exec apache2-foreground
