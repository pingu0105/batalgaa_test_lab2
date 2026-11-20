import http from 'k6/http';
import { sleep, check } from 'k6';

// SLO: baseline p95 (276.44 ms) × 1.5 ≈ 415 ms
export const options = {
  vus: 30,
  duration: '1m',
  thresholds: {
    http_req_duration: ['p(95)<415'], // SLO: p95 < 415ms
    http_req_failed:   ['rate<0.01'], // SLO: error rate < 1%
  },
};

export default function () {
  const res = http.get('https://test.k6.io');
  check(res, { 'status 200': (r) => r.status === 200 });
  sleep(1);
}
