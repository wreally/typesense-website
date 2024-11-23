# Search Delivery Network

**In Typesense Cloud**, you can choose to have your data distributed to multiple regions around the world
and have search queries routed to the node that's closest to where your end users are geographically located.
We call this a Search Delivery Network (SDN).

## How it helps

By placing your search indices physically closer to your end-users, you can minimize network latency
and ensure that your users around the world have a consistently fast instant-search experience.

This is very similar to the benefits you get with a Content Delivery Network (CDN) for static assets,
except that instead of just caching the most recently accessed items like a CDN typically does,
in Typesense Cloud, we replicate the entire dataset to each node in your SDN cluster.

### Example scenario

If you had a single-region Typesense cluster in **Oregon** and your users are in **New York**, they'll see an added network latency of **~76ms** when making search requests from New York to Oregon.

But if you had a 3-region SDN Typesense Cloud cluster in **Oregon, Ohio & Northern Virginia**, your users in New York will now see a much lower network latency of **~9ms**, since the SDN will route the New York user to the node in Northern Virginia.

Typesense Cloud has 20+ geo regions around the world, and you can pick any 3-5 regions for a single SDN cluster.

## How to use it

When you provision a Typesense Cloud cluster, you'll find the option to turn on "Search Delivery Network" in the cluster configuration page, and select the regions you want in your SDN.

Once the cluster is provisioned, you'll now see a special "Nearest Node" hostname displayed in the dashboard:

<img src="~@images/search-delivery-network/sdn-hostnames.png" height="350" width="385" alt="Typesense Cloud SDN Hostnames">

Any requests sent to this nearest node hostname will be routed to the node that's closest to the geographic region where the query originates.

### Client Configuration

The official client libraries support specifying a nearest node hostname, and then specifying the individual nodes' hostnames as a fallback.

Requests are first sent to the Nearest Node endpoint, and if it fails for some reason, the request is then retried on the fallback nodes in a round-robin fashion.

<Tabs :tabs="['JavaScript','PHP','Python','Ruby', 'Dart', 'Java', 'Go', 'Swift', 'Shell']">
  <template v-slot:JavaScript>

```js
/*
 *  Our JavaScript client library works on both the server and the browser.
 *  When using the library on the browser, please be sure to use the
 *  search-only API Key rather than the master API key since the latter
 *  has write access to Typesense and you don't want to expose that.
 */

const Typesense = require('typesense')

let client = new Typesense.Client({
  'nearestNode': { 'host': 'xxx.a1.typesense.net', 'port': 443, 'protocol': 'https' }, // This is the special Nearest Node hostname that you'll see in the Typesense Cloud dashboard if you turn on Search Delivery Network
  'nodes': [
    { 'host': 'xxx-1.a1.typesense.net', 'port': 443, 'protocol': 'https' },
    { 'host': 'xxx-2.a1.typesense.net', 'port': 443, 'protocol': 'https' },
    { 'host': 'xxx-3.a1.typesense.net', 'port': 443, 'protocol': 'https' },
  ],
  'apiKey': '<API_KEY>',
  'connectionTimeoutSeconds': 2
})
```

  </template>

  <template v-slot:PHP>

```php
use Typesense\Client;

$client = new Client(
  [
    'nearest_node' =>  ['host' => 'xxx.a1.typesense.net', 'port' => '443', 'protocol' => 'https'], // This is the special Nearest Node hostname that you'll see in the Typesense Cloud dashboard if you turn on Search Delivery Network
    'nodes' => [
      ['host' => 'xxx-1.a1.typesense.net', 'port' => '443', 'protocol' => 'https'],
      ['host' => 'xxx-2.a1.typesense.net', 'port' => '443', 'protocol' => 'https'],
      ['host' => 'xxx-3.a1.typesense.net', 'port' => '443', 'protocol' => 'https'],
    ],
    'api_key'         => '<API_KEY>',
    'connection_timeout_seconds' => 2,
  ]
);
```

  </template>
  <template v-slot:Python>

```py
import typesense

client = typesense.Client({
  'nearest_node': {'host': 'xxx.a1.typesense.net', 'port': '443', 'protocol': 'https'}, # This is the special Nearest Node hostname that you'll see in the Typesense Cloud dashboard if you turn on Search Delivery Network
  'nodes': [
    {'host': 'xxx-1.a1.typesense.net', 'port': '443', 'protocol': 'https'},
    {'host': 'xxx-2.a1.typesense.net', 'port': '443', 'protocol': 'https'},
    {'host': 'xxx-3.a1.typesense.net', 'port': '443', 'protocol': 'https'}
  ],
  'api_key': '<API_KEY>',
  'connection_timeout_seconds': 2
})
```

  </template>
  <template v-slot:Ruby>

```rb
require 'typesense'

client = Typesense::Client.new(
  nearest_node: { host: 'xxx.a1.typesense.net', port: 443, protocol: 'https' }, # This is the special Nearest Node hostname that you'll see in the Typesense Cloud dashboard if you turn on Search Delivery Network
  nodes: [
    { host: 'xxx-1.a1.typesense.net', port: 443, protocol: 'https' },
    { host: 'xxx-2.a1.typesense.net', port: 443, protocol: 'https' },
    { host: 'xxx-3.a1.typesense.net', port: 443, protocol: 'https' },
  ],
  api_key:  '<API_KEY>',
  connection_timeout_seconds: 2
)
```

  </template>
  <template v-slot:Dart>

```dart
import 'package:typesense/typesense.dart';

final protocol = Protocol.https;
final config = Configuration(
    '<API_KEY>',
    // This is the special Nearest Node hostname that you'll see in the
    // Typesense Cloud dashboard if you turn on Search Delivery Network.
    nearestNode: Node(
      protocol,
      'xxx.a1.typesense.net',
      // Dart client initializes port to 443 and 80 for https and http respectively.
      // So if dealing with standard ports, specifying them is optional.
      port: 443,
    ),
    nodes: {
      Node(
        protocol,
        'xxx-1.a1.typesense.net',
      ),
      Node(
        protocol,
        'xxx-2.a1.typesense.net',
      ),
      Node(
        protocol,
        'xxx-3.a1.typesense.net',
      ),
    },
    connectionTimeout: Duration(seconds: 2),
  );
```

  </template>
  <template v-slot:Java>

```java
import org.typesense.api.*;
import org.typesense.models.*;
import org.typesense.resources.*;

ArrayList<Node> nodes = new ArrayList<>();
nodes.add(new Node("https", "xxx-1.a1.typesense.net", "443"));
nodes.add(new Node("https", "xxx-2.a1.typesense.net", "443"));
nodes.add(new Node("https", "xxx-3.a1.typesense.net", "443"));

// This is the special Nearest Node hostname that you'll see in the
// Typesense Cloud dashboard if you turn on Search Delivery Network.
Node nearestNode = new Node("https", "xxx.a1.typesense.net", "443");

Configuration configuration = new Configuration(nearestNode, nodes, Duration.ofSeconds(2),"<API_KEY>");

Client client = new Client(configuration);
```

  </template>
  <template v-slot:Go>

```go
import (
  "time"
  "github.com/typesense/typesense-go/v2/typesense"
)

client := typesense.NewClient(
    // This is the special Load Balanced hostname that you'll see in the Typesense Cloud dashboard if you turn on High Availability
    typesense.WithNearestNode("https://xxx.a1.typesense.net:443"),
    typesense.WithNodes([]string{
      "https://xxx-1.a1.typesense.net:443",
      "https://xxx-2.a1.typesense.net:443",
      "https://xxx-3.a1.typesense.net:443",
    }),
    typesense.WithAPIKey("<API_KEY>"),
    typesense.WithConnectionTimeout(2*time.Second),
)
```

  </template>
  <template v-slot:Swift>

```swift
import Typesense

var nodes: [Node] = []
nodes.append(Node(host: "xxx-1.a1.typesense.net", port: "443", nodeProtocol: "https"))
nodes.append(Node(host: "xxx-2.a1.typesense.net", port: "443", nodeProtocol: "https"))
nodes.append(Node(host: "xxx-3.a1.typesense.net", port: "443", nodeProtocol: "https"))

let nearestNode = Node(host: "xxx.a1.typesense.net", port: "443", nodeProtocol: "https")

let config = Configuration(nodes: nodes, apiKey: "<API_KEY>", connectionTimeoutSeconds: 2, nearestNode: nearestNode)

let client = Client(config: config)
```

  </template>
  <template v-slot:Shell>

```bash
export TYPESENSE_API_KEY='<API_KEY>'
export TYPESENSE_HOST='https://xxx.a1.typesense.net'
```

  </template>
</Tabs>

::: warning NOTE

For Typesense Cloud SDN clusters provisioned **after Jun 16, 2022**,
if a particular region has infrastructure issues, or a node is in accessible for any reason,
traffic is automatically re-routed to the next closest node that is healthy server-side.
So specifying fallback nodes in the client configuration is optional (but still recommended when a client library supports it), as traffic re-routing in error scenarios happens on the server-side.

In Typesense Cloud SDN clusters provisioned **before Jun 16, 2022**,
the nearest node endpoint will resolve to the node that's closest to the user, regardless of whether the node is healthy or not.
So you would have to rely on client-side load-balancing and the fallback nodes mentioned above to route requests away from unhealthy nodes.
In this case, specifying both the nearest node and fallback node is required in the client libraries.

If you'd like to enable automatic re-routing (server-side load-balancing) for your existing SDN cluster provisioned before Jun 16, 2022, you can do that by going to your Cluster Dashboard > Cluster Configuration > Modify and then enable "Load Balancing" and schedule the change.
:::
