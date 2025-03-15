# Security

import MailLink from '../../src/components/MailLink.tsx';

User privacy and security are taken seriously.

- All user code, [result page](./result.html.md) and compilers run in [sandboxed iframes](https://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/) with a unique origin.

- [Embedded playgrounds](./embeds.html.md) do not have access to the parent page, or to sensitive data like user cookies and localstorage of the embedding page origin.

If you find any security vulnerability, please report it in the [contact page](../contact.html.md) or by email to <MailLink email="security&#64;livecodes&#46;io" text="security&#64;livecodes&#46;io" />
For other non-security-related bugs, please report them in the [repo issues](https://github.com/live-codes/livecodes/issues).