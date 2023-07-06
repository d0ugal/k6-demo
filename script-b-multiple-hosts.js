
import http from 'k6/http'
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 1 },
    { duration: '2m', target: 100 },
  ],
};

export default () => {

  const useast = '50000'
  const eunorth = '50001'
  const apsouth = '50002'

  const hosts = [useast, eunorth, apsouth, eunorth, eunorth];
  const randomHost = hosts[Math.floor(Math.random() * hosts.length)];
  const url = `http://localhost:${randomHost}/bike`;

  let res = http.get(url);

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
