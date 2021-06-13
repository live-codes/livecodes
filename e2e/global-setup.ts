import liveServer from 'live-server';

async function globalSetup() {
  const params = {
    file: 'index.html',
    root: 'build',
    open: false,
  };
  await new Promise<void>((done) => {
    liveServer.start(params);
    done();
  });
  return async () => {
    await new Promise<void>((done) => {
      liveServer.shutdown();
      done();
    });
  };
}
export default globalSetup;
