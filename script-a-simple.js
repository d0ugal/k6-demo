
import http from 'k6/http'
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 1 },
    { duration: '1m', target: 10 },
    { duration: '1m', target: 10 },
    { duration: '1m', target: 20 },
    { duration: '1m', target: 1 },
  ],
};

export default () => {
  const url = `http://localhost:50000/car`;
  let res = http.get(url);
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}
