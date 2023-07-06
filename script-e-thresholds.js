
import http from 'k6/http'
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  },
};

export default () => {

  const useast = '50000'
  const eunorth = '50001'
  const apsouth = '50002'

  const hosts = [useast, eunorth, apsouth, eunorth, eunorth];
  const paths = ['', 'bike', 'scooter', 'car', 'env', 'car',];

  const randomHost = hosts[Math.floor(Math.random() * hosts.length)];
  const randomPath = paths[Math.floor(Math.random() * paths.length)];
  const url = `http://localhost:${randomHost}/${randomPath}`;

  let res = http.get(url);

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
