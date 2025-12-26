#!/bin/sh
# Post-renewal hook to reload nginx without downtime

echo "Certificate renewed successfully at $(date)"
docker exec f1_nginx nginx -s reload
echo "Nginx configuration reloaded"
