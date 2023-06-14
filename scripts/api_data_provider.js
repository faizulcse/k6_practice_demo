import http from "k6/http";
import { sleep, check } from "k6";
import { scenario, vu } from "k6/execution";
import { envdata, csvdata } from "../utils/helper.js";

const env = envdata();
const csv = csvdata();
export const options = {
  vus: csv.length,
  iterations: csv.length,
};

export function setup() {
  return {
    csv: csv,
  };
}

export default function (data) {
  const userInfo = data.csv[scenario.iterationInTest];

  const response1 = http.get(`${env.baseUrl}/api/v1/apiWithPathData/${userInfo.id}`);
  const response2 = http.request("GET", `${env.baseUrl}/api/v1/apiWithPathData/${userInfo.age}`);

  check(response1, { "check user id api status 200": (r) => r.status == 200 });
  check(response2, { "check user age api status 200": (r) => r.status == 200 });
  sleep(2);
}
