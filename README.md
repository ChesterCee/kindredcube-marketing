# KindredCube web deployment

This folder is the complete production web root. Copy the contents of
`kindredcube-marketing` to `/var/www/kindredcube` on the server.

`nginx-kindredcube.conf` is the matching Nginx virtual host. It serves the web
application at `https://kindredcube.com`, keeps `/sign-in-register` and
`/privacy`, `/delete-account`, and `/terms` available; redirects `www`, disables legacy TLS and CBC
ciphers, and disables dynamic compression for the reported BREACH finding.

The certificate paths assume a Let's Encrypt certificate for
`kindredcube.com`. Test the Nginx configuration before reloading the service.
