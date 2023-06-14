import { sleep, check } from "k6";
import http from "k6/http";

export default function (data) {
  const response1 = http.get("https://test.k6.io");
  check(response1, { "check api status 200": (r) => r.status == 200 });
  sleep(1);
}
