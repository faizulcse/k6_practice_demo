import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js";

const env_file = JSON.parse(open("../env.json"));
const csv_file = papaparse.parse(open("../data/users.csv"), {
  header: true,
});

export function envdata() {
  switch (`${__ENV.ENV}`) {
    case "prod":
      return env_file.prod;
    case "staging":
      return env_file.staging;
    case "test":
      return env_file.test;
    default:
      return env_file.dev;
  }
}

export function csvdata() {
  return csv_file.data;
}
