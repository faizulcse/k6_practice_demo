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
  // =========================== sequential api call =====================================
  check(http.request("GET", `${env.baseUrl}/api/v1/api1`), { "check sequential api1 status 200": (r) => r.status == 200 });
  check(http.request("GET", `${env.baseUrl}/api/v1/api2`), { "check sequential api2 status 200": (r) => r.status == 200 });
  check(http.request("GET", `${env.baseUrl}/api/v1/api3`), { "check sequential api3 status 200": (r) => r.status == 200 });
  check(http.request("GET", `${env.baseUrl}/api/v1/api4`), { "check sequential api4 status 200": (r) => r.status == 200 });
  check(http.request("GET", `${env.baseUrl}/api/v1/api5`), { "check sequential api5 status 200": (r) => r.status == 200 });
  sleep(2);
}
