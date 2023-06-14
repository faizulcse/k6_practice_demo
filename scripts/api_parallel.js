import http from "k6/http";
import { sleep, check } from "k6";
import { envdata } from "../utils/helper.js";

const env = envdata();
export const options = {
  vus: 1,
  iterations: 10,
};

export function setup() {
  return {};
}

export default function (data) {
  // =========================== parallel api call =======================================
  let responses = http.batch([
    ["GET", `${env.baseUrl}/api/v1/api1`],
    ["GET", `${env.baseUrl}/api/v1/api2`],
    ["GET", `${env.baseUrl}/api/v1/api3`],
    ["GET", `${env.baseUrl}/api/v1/api4`],
    ["GET", `${env.baseUrl}/api/v1/api5`],
  ]);

  check(responses[0], { "check parallel api1 status 200": (r) => r.status == 200 });
  check(responses[1], { "check parallel api2 status 200": (r) => r.status == 200 });
  check(responses[2], { "check parallel api3 status 200": (r) => r.status == 200 });
  check(responses[3], { "check parallel api4 status 200": (r) => r.status == 200 });
  check(responses[4], { "check parallel api5 status 200": (r) => r.status == 200 });
  sleep(2);
}
