const APP_VERSION = process.env.APP_VERSION;
const CF_ACCOUNT_ID = process.env.CF_ACCOUNT_ID;
const CF_ZONE = process.env.CF_ZONE;
const CF_TOKEN = process.env.CF_TOKEN;

const customDomainsUrl = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/pages/projects/livecodes/domains`;
const dnsUrl = `https://api.cloudflare.com/client/v4/zones/${CF_ZONE}/dns_records`;

const headers = {
  Authorization: `Bearer ${CF_TOKEN}`,
  'Content-Type': 'application/json',
};

const failed = () => {
  console.log('Failed to create permanent URL!');
  process.exit(1);
};

(async () => {
  const res1 = await fetch(customDomainsUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({ name: `${APP_VERSION}.livecodes.io` }),
  });
  if (!res1.ok) {
    return failed();
  }

  const res2 = await fetch(dnsUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      content: `releases-${APP_VERSION}.livecodes.pages.dev`,
      name: APP_VERSION,
      proxied: true,
      type: 'CNAME',
      ttl: 1,
    }),
  });
  if (!res2.ok) {
    return failed();
  }

  console.log(`Created the permanent URL: https://${APP_VERSION}.livecodes.io`);
})();
