import { checkIn } from "./checkin";

async function triggerEvent(event, env) {
  // Fetch some data
  console.log('cron processed', event.scheduledTime);
  const ret = await checkIn(event, env);
  // todo send message to telegram
}
export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(triggerEvent(event, env));
  },
  async fetch(request, env, ctx) {
    const json = await checkIn(request, env);
    // console.log(json);
    const data = JSON.stringify(json, null, 2);
    return new Response(data, {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
  }
}

