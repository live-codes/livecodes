export const broadcastService = {
  getUrl: () =>
    process.env.SELF_HOSTED_BROADCAST === 'true'
      ? `https://${location.hostname}:${process.env.BROADCAST_PORT || '443'}/`
      : 'https://vps.livecodes.io:3030/',
};
