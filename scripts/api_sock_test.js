import http from "k6/http";
import { sleep, check } from "k6";
import { envdata } from "../utils/helper.js";

const env = envdata();
export const options = {
  stages: [
    { duration: "1m", target: 10 }, // ramp up to 400 users
    { duration: "5m", target: 40 }, // stay at 400 for ~4 hours
    { duration: "2m", target: 0 }, // scale down. (optional)
  ],
};

export function setup() {}

export default function (data) {
  check(http.request("GET", `${env.baseUrl}/public/crocodiles/1/`), { "check api1 status 200": (r) => r.status == 200 });
  check(http.request("GET", `${env.baseUrl}/public/crocodiles/2/`), { "check api2 status 200": (r) => r.status == 200 });
  check(http.request("GET", `${env.baseUrl}/public/crocodiles/3/`), { "check api3 status 200": (r) => r.status == 200 });
  check(http.request("GET", `${env.baseUrl}/public/crocodiles/4/`), { "check api4 status 200": (r) => r.status == 200 });
  sleep(1);
}
