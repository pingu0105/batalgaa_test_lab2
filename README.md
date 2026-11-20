# Лаборатори №2: Гүйцэтгэлийн хэмжүүрийг k6-аар хэмжих

F.CSA313 — Программ хангамжийн чанарын баталгаа ба тест (2026)

## Ажлын орчин

```
k6.exe v2.4.0 (commit/dd9395906d, go1.26.11, windows/amd64)
```

- Үйлдлийн систем: Windows 11
- Тестийн бай: `https://test.k6.io` (зааврын албан ёсны дадлагын сайт)

## Алхам 2: Анхны тест — Baseline (5 VU, 30 секунд)

Скрипт: [`script.js`](script.js) · Бүтэн гаралт: [`results/baseline-30s.txt`](results/baseline-30s.txt)

| Хэмжүүр | Утга |
|---|---|
| http_req_duration — avg | 174.12 ms |
| http_req_duration — med | 188.34 ms |
| http_req_duration — p(90) | 271.96 ms |
| http_req_duration — p(95) | **276.44 ms** |
| http_req_duration — max | 287.33 ms |
| http_reqs (нийт) | 220 |
| Throughput (http_reqs/s) | 7.10 req/s |
| http_req_failed (error rate) | 0.00% (220-аас 0) |
| checks (status 200) | 100.00% (110-аас 110) |
| iterations | 110 (3.55 iter/s) |

**Миний baseline p95 = 276.44 ms.**

Тайлбар: iteration 110 байхад http_reqs 220 гарсан. Учир нь `https://test.k6.io` хүсэлтэд `302 Found` redirect буцаадаг тул k6 нэг iteration бүрд 2 HTTP хүсэлт (redirect + эцсийн хуудас) илгээж байна. Иймээс throughput-ийг http_reqs/s (7.10 req/s)-ээр тооцов.

![Baseline](screenshots/baseline.png)

## Алхам 3: Ачааллыг шатлан өсгөх (5 / 30 / 100 VU)

> ⏳ Хараахан ажиллуулаагүй. Доорх тоонуудыг `results/run-05vu.txt`, `run-30vu.txt`, `run-100vu.txt` файлуудаас яг хуулж бөглөнө.

| VU | p90 | p95 | Throughput (req/s) | Error rate | Файл |
|---|---|---|---|---|---|
| 5 | … | … | … | … | [results/run-05vu.txt](results/run-05vu.txt) |
| 30 | … | … | … | … | [results/run-30vu.txt](results/run-30vu.txt) |
| 100 | … | … | … | … | [results/run-100vu.txt](results/run-100vu.txt) |

Ажиглалт: хэрэглэгчийн туршлага ___ VU-ээс муудаж эхэлсэн, учир нь p95 ___ ms-ээс ___ ms болж өссөн.

Stages туршилт ([`stages.js`](stages.js), [`results/run-stages.txt`](results/run-stages.txt)): …

## Алхам 4: Thresholds — SLO-г кодоор шалгах

**SLO:** p95 < 415 ms, error rate < 1%.

**Үндэслэл:** Алхам 2-т хэмжсэн baseline p95 = 276.44 ms. Гадаад сүлжээний хэлбэлзэл болон 30 VU-ийн ачааллыг тооцож baseline-ийг 1.5 дахин өсгөсөн (276.44 × 1.5 ≈ 415 ms) утгыг SLO болгон сонгосон.

| Тест | Threshold | Үр дүн | Файл |
|---|---|---|---|
| PASS | `p(95)<415`, `rate<0.01` | … | [results/thresholds-pass.txt](results/thresholds-pass.txt) |
| FAIL (санаатай хатуу) | `p(95)<50` | … | [results/thresholds-fail.txt](results/thresholds-fail.txt) |

Хатуу threshold (p95 < 50 ms) тавихад тест FAIL болдог нь CI pipeline дээрх quality gate SLO зөрчигдсөн үед хувилбарыг зогсоодог зарчимтай ижил.

## Алхам 5: Локал сервер (нэмэлт)

> ⏳ Хараахан хийгээгүй.

## Дүгнэлт

> ⏳ Бүх хэмжилт дууссаны дараа 8–10 өгүүлбэрээр бичнэ: ачаалал өсөхөд p95 ба throughput хэрхэн өөрчлөгдсөн, лекцийн аль ойлголт (latency p95/p99, throughput, error rate, availability) батлагдсан, SLO хангагдсан эсэх.

## Файлууд

- Скриптүүд: `script.js`
- k6-ийн бүтэн гаралт: [`results/`](results/)
- Дэлгэцийн зургууд: [`screenshots/`](screenshots/)
