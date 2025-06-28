export const broadcastService = {
  getUrl: () =>
    process.env.SELF_HOSTED_BROADCAST
      ? `https://${location.hostname}:${process.env.BROADCAST_PORT || '3030'}`
      : 'https://livecodes-broadcast.onrender.com/',
};
