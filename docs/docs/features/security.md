# Security

The result page and compilers run in [sandboxed iframes](https://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/) with a unique origin. This prevents code added in the embedded editors from having access to the parent page, or to sensitive data like user cookies, localstorage, etc.
