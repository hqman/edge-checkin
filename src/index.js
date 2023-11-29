export default {

  async scheduled(event, env, ctx) {
    const updateAccesssTokenURL = "https://auth.aliyundrive.com/v2/account/token";
    const signinURL = "https://member.aliyundrive.com/v1/activity/sign_in_list";
    const refreshToeknArry = [
      "c533dde9ed7c4a4fbe3d149bbfb00dd1",
      "919d9ba64ff14b4184e3b077fc83b927"
    ];

    for (const elem of refreshToeknArry) {

      const queryBody = {
        'grant_type': 'refresh_token',
        'refresh_token': elem
      };

      //使用 refresh_token 更新 access_token
      fetch(updateAccesssTokenURL, {
        method: "POST",
        body: JSON.stringify(queryBody),
        headers: { 'Content-Type': 'application/json' }
      })
        .then((res) => res.json())
        .then((json) => {
          // console.log(json);

          let access_token = json.access_token;
          // console.log(access_token);

          //签到
          fetch(signinURL, {
            method: "POST",
            body: JSON.stringify(queryBody),
            headers: { 'Authorization': 'Bearer ' + access_token, 'Content-Type': 'application/json' }
          })
            .then((res) => res.json())
            .then((json) => {
              console.log(json);
              let wasSuccessful = json.success ? 'true' : 'false';

              console.log(`check in result is  ${wasSuccessful}`);
            })
            .catch((err) => console.log(err))

        })
        .catch((err) => console.log(err))
    }
  }
  ,
};
