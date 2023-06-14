import http from "k6/http";
import { sleep, check } from "k6";
import { scenario, vu } from "k6/execution";
import { envdata } from "../utils/helper.js";

const env = envdata();
export const options = {
  vus: 10,
  duration: "1m",
};
export function setup() {}

export default function (data) {
  const response1 = http.get(`${env.baseUrl}/api/v1/apiWithPathData/${vu.idInTest}`);
  check(response1, { "check api status 200": (r) => r.status == 200 });
  sleep(2);
}
export function teardown(data) {}
