export default {
  async scheduled(event, env, ctx) {
    let resp = await fetch('https://api.cloudflare.com/client/v4/ips');
    let wasSuccessful = resp.ok ? 'success' : 'fail';

    console.log(`trigger fired at ${event.cron}: ${wasSuccessful}`);
  },
};
