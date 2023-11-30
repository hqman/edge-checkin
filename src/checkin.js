
const updateAccesssTokenURL = "https://auth.aliyundrive.com/v2/account/token";
const signinURL = "https://member.aliyundrive.com/v1/activity/sign_in_list";


async function checkIn(event, env) {
  const refreshToeknArry = env.refresh_tokens.split(',');
  for (const elem of refreshToeknArry) {
    const queryBody = {
      'grant_type': 'refresh_token',
      'refresh_token': elem
    };
    //使用 refresh_token 更新 access_token
    let resp = await fetch(updateAccesssTokenURL, {
      method: "POST",
      body: JSON.stringify(queryBody),
      headers: { 'Content-Type': 'application/json' }
    });

    let json = await resp.json();
    let access_token = json.access_token;

    //签到
    let res = await fetch(signinURL, {
      method: "POST",
      body: JSON.stringify(queryBody),
      headers: { 'Authorization': 'Bearer ' + access_token, 'Content-Type': 'application/json' }
    });
    let ret = await res.json();
    // console.log(ret);
    return ret;
  }
}

export { checkIn }

