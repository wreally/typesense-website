---
sidebarDepth: 1
sitemap:
  priority: 0.7
---

# Cluster Operations

## Create Snapshot (for backups)
Creates a point-in-time snapshot of a Typesense node's state and data in the specified directory.

You can then backup the snapshot directory that gets created and later restore it as a data directory, as needed.

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Java','Go','Swift','Shell']">
  <template v-slot:JavaScript>

```js
client.operations.perform('snapshot', {'snapshot_path': '/tmp/typesense-data-snapshot'})
```

  </template>

  <template v-slot:PHP>

```php
$client->operations->perform("snapshot", ["snapshot_path" => "/tmp/typesense-data-snapshot"]);
```

  </template>
  <template v-slot:Python>

```py
client.operations.perform('snapshot', {'snapshot_path': '/tmp/typesense-data-snapshot'})
```

  </template>
  <template v-slot:Ruby>

```rb
client.operations.perform('snapshot', {'snapshot_path': '/tmp/typesense-data-snapshot'})
```

  </template>
  <template v-slot:Dart>

```dart
await client.operations.createSnapshot('/tmp/typesense-data-snapshot');
```

  </template>
  <template v-slot:Java>

```java
HashMap<String, String> query = new HashMap<>();
query.put("snapshot_path","/tmp/typesense-data-snapshot");

client.operations.perform("snapshot",query);
```

  </template>
  <template v-slot:Go>

```go
client.Operations().Snapshot(context.Background(), "/tmp/typesense-data-snapshot")
```

  </template>
  <template v-slot:Swift>

```swift
try await client.operations().snapshot(path: "/tmp/typesense-data-snapshot")
```

  </template>
  <template v-slot:Shell>

```bash
curl "http://localhost:8108/operations/snapshot?snapshot_path=/tmp/typesense-data-snapshot" -X POST \
-H "Content-Type: application/json" \
-H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}"
```

  </template>
</Tabs>

#### Sample Response

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```json
{
  "success": true
}
```

  </template>
</Tabs>

#### Definition
`POST ${TYPESENSE_HOST}/operations/snapshot`

### Arguments
| Parameter      | Required    |Description                                            |
| -------------- | ----------- |-------------------------------------------------------|
|snapshot_path	|yes	|The directory on the server where the snapshot should be saved.|

## Compacting the on-disk database

Typesense uses RocksDB to store your documents on the disk. If you do frequent writes or updates, you could benefit
from running a compaction of the underlying RocksDB database. This could reduce the size of the database and decrease
read latency.

While the database will _not_ block during this operation, we recommend running it during off-peak hours.

```shell
curl -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" -X POST http://localhost:8108/operations/db/compact
```

#### Definition
`POST ${TYPESENSE_HOST}/operations/db/compact`

## Re-elect Leader
Triggers a follower node to initiate the raft voting process, which triggers leader re-election.

The follower node that you run this operation against will become the new leader, once this command succeeds.

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Java','Go','Swift','Shell']">
  <template v-slot:JavaScript>

```js
client.operations.perform('vote')
```

  </template>

  <template v-slot:PHP>

```php
$client->operations->perform("vote");
```

  </template>
  <template v-slot:Python>

```py
client.operations.perform('vote')
```

  </template>
  <template v-slot:Ruby>

```rb
client.operations.perform('vote')
```

  </template>
  <template v-slot:Dart>

```dart
await client.operations.initLeaderElection();
```

  </template>
  <template v-slot:Java>

```java
client.operations.perform("vote");
```

  </template>
  <template v-slot:Go>

```go
client.Operations().Vote(context.Background())
```

  </template>
  <template v-slot:Swift>

```swift
try await client.operations().vote()
```

  </template>
  <template v-slot:Shell>

```bash
curl "http://localhost:8108/operations/vote" -X POST \
-H "Content-Type: application/json" \
-H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}"
```

  </template>
</Tabs>

#### Sample Response

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```json
{
  "success": true
}
```

  </template>
</Tabs>

#### Definition
`POST ${TYPESENSE_HOST}/operations/vote`

## Toggle Slow Request Log
Enable logging of requests that take over a defined threshold of time.

Default: `-1` which disables slow request logging.

Slow requests are logged to the primary log file, with the prefix `SLOW REQUEST`.

<Tabs :tabs="['Dart','Swift','Shell']">
  <template v-slot:Dart>

```dart
await client.operations.toggleSlowRequestLog(Duration(seconds: 2));
```

  </template>
  <template v-slot:Swift>

```swift
try await client.operations().toggleSlowRequestLog(seconds: 2)
```

  </template>
  <template v-slot:Shell>

```bash
curl "http://localhost:8108/config" \
        -X POST \
        -H 'Content-Type: application/json' \
        -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" \
        -d '{"log-slow-requests-time-ms": 2000}'
```

  </template>
</Tabs>

#### Sample Response

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```json
{
  "success": true
}
```

  </template>
</Tabs>

#### Definition
`POST ${TYPESENSE_HOST}/config`

## Clear cache

Responses of search requests that are sent with `use_cache` parameter are cached in a LRU cache. To clear
this cache completely:

```shell
curl -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" -X POST \
  http://localhost:8108/operations/cache/clear
```

#### Definition
`POST ${TYPESENSE_HOST}/operations/cache/clear`



## Cluster Metrics

Get current RAM, CPU, Disk & Network usage metrics.

<Tabs :tabs="['Dart','Java','Go','Swift','Shell']">
  <template v-slot:Dart>

```dart
await client.metrics.retrieve();
```
  </template>
  <template v-slot:Java>

```java
client.metrics.retrieve();
```
  </template>
  <template v-slot:Go>

```go
client.Metrics().Retrieve(context.Background())
```
  </template>
  <template v-slot:Swift>

```swift
let (metrics, response) = try await client.operations().getMetrics()
```
  </template>
  <template v-slot:Shell>

```bash
curl "http://localhost:8108/metrics.json" \
        -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}"
```
  </template>

</Tabs>

#### Sample Response

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```json
{
  "system_cpu1_active_percentage": "0.00",
  "system_cpu2_active_percentage": "0.00",
  "system_cpu3_active_percentage": "0.00",
  "system_cpu4_active_percentage": "0.00",
  "system_cpu_active_percentage": "0.00",
  "system_disk_total_bytes": "1043447808",
  "system_disk_used_bytes": "561152",
  "system_memory_total_bytes": "2086899712",
  "system_memory_used_bytes": "1004507136",
  "system_memory_total_swap_bytes": "1004507136",
  "system_memory_used_swap_bytes": "0.00",
  "system_network_received_bytes": "1466",
  "system_network_sent_bytes": "182",
  "typesense_memory_active_bytes": "29630464",
  "typesense_memory_allocated_bytes": "27886840",
  "typesense_memory_fragmentation_ratio": "0.06",
  "typesense_memory_mapped_bytes": "69701632",
  "typesense_memory_metadata_bytes": "4588768",
  "typesense_memory_resident_bytes": "29630464",
  "typesense_memory_retained_bytes": "25718784"
}
```

  </template>
</Tabs>

#### Definition
`GET ${TYPESENSE_HOST}/metrics.json`

:::tip Prometheus Integration

If you use Prometheus, here's a community-maintained project that lets you periodically poll this endpoint and export the data into Prometheus:

[https://github.com/imatefx/typesense-prometheus-exporter](https://github.com/imatefx/typesense-prometheus-exporter)

:::

## API Stats

Get stats about API endpoints.

This endpoint returns average requests per second and latencies for all requests in the last 10 seconds.

<Tabs :tabs="['Dart','Go','Swift','Shell']">
  <template v-slot:Dart>

```dart
await client.stats.retrieve();
```
  </template>
  <template v-slot:Go>

```go
client.Stats().Retrieve(context.Background())
```
  </template>
  <template v-slot:Swift>

```swift
let (stats, response) = try await client.operations().getStats()
```
  </template>
  <template v-slot:Shell>

```bash
curl "http://localhost:8108/stats.json" \
        -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}"
```
  </template>
</Tabs>

#### Sample Response

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```json
{
  "latency_ms": {
    "GET /collections/products": 0.0,
    "POST /collections": 4.0,
    "POST /collections/products/documents/import": 1166.0
  },
  "requests_per_second": {
    "GET /collections/products": 0.1,
    "POST /collections": 0.1,
    "POST /collections/products/documents/import": 0.1
  }
}
```

  </template>
</Tabs>

#### Definition
`GET ${TYPESENSE_HOST}/stats.json`

:::tip Prometheus Integration

If you use Prometheus, here's a community-maintained project that lets you periodically poll this endpoint and export the data into Prometheus:

[https://github.com/imatefx/typesense-prometheus-exporter](https://github.com/imatefx/typesense-prometheus-exporter)

:::

## Health

Get health information about a Typesense node.

<Tabs :tabs="['Dart','Go','Swift','Shell']">
  <template v-slot:Dart>

```dart
await client.health.retrieve();
```
  </template>
  <template v-slot:Go>

```go
client.Health(context.Background(), 3*time.Second)
```
  </template>
  <template v-slot:Swift>

```swift
let (healthStatus, response) = try await client.operations().getHealth()
```
  </template>
  <template v-slot:Shell>

```bash
curl "http://localhost:8108/health"
```
  </template>
</Tabs>

#### Sample Response

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```json
{
  "ok": true
}
```

  </template>
</Tabs>

When a node is running out of memory / disk, the API response will have an additional `resource_error` field that's
set to either `OUT_OF_DISK` or `OUT_OF_MEMORY`.

#### Definition
`GET ${TYPESENSE_HOST}/health`


