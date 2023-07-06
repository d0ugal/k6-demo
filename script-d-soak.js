
import http from 'k6/http'
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 1 },
    { duration: '10m', target: 1000 },
    { duration: '8h', target: 1000 },  // 8 hours!
  ],
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
