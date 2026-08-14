# KindredCube web deployment

The contents of `site` are the complete production web root. Copy everything
inside that folder to `/var/www/kindredcube` on the server.

`nginx-kindredcube.conf` is the matching Nginx virtual host. It serves the web
application at `https://kindredcube.com`, keeps `/download` and
`/privacy`, `/delete-account`, and `/terms` available; redirects `www`, disables legacy TLS and CBC
ciphers, and disables dynamic compression for the reported BREACH finding.

The certificate paths assume a Let's Encrypt certificate for
`kindredcube.com`. Test the Nginx configuration before reloading the service.
