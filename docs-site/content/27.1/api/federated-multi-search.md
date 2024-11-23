---
sidebarDepth: 1
sitemap:
  priority: 0.7
---

# Federated / Multi Search
You can send multiple search requests in a single HTTP request, using the Multi-Search feature. This is especially useful to avoid round-trip network latencies incurred otherwise if each of these requests are sent in separate HTTP requests.

You can also use this feature to do a **federated search** across multiple collections in a single HTTP request.
For eg: in an ecommerce products dataset, you can show results from both a "products" collection, and a "brands" collection to the user, by searching them in parallel with a `multi_search` request.

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Java','Go','Shell']">
  <template v-slot:JavaScript>

```js
let searchRequests = {
  'searches': [
    {
      'collection': 'products',
      'q': 'shoe',
      'filter_by': 'price:=[50..120]'
    },
    {
      'collection': 'brands',
      'q': 'Nike'
    }
  ]
}

// Search parameters that are common to all searches go here
let commonSearchParams =  {
    'query_by': 'name',
}

client.multiSearch.perform(searchRequests, commonSearchParams)
```

  </template>

  <template v-slot:PHP>

```php
$searchRequests = [
  'searches' => [
    [
      'collection' => 'products',
      'q' => 'shoe',
      'filter_by' => 'price:=[50..120]'
    ],
    [
      'collection' => 'brands',
      'q' => 'Nike'
    ]
  ]
];

// Search parameters that are common to all searches go here
$commonSearchParams =  [
    'query_by' => 'name',
];

$client->multiSearch->perform($searchRequests, $commonSearchParams);
```

  </template>
  <template v-slot:Python>

```py
search_requests = {
  'searches': [
    {
      'collection': 'products',
      'q': 'shoe',
      'filter_by': 'price:=[50..120]'
    },
    {
      'collection': 'brands',
      'q': 'Nike'
    }
  ]
}

# Search parameters that are common to all searches go here
common_search_params =  {
    'query_by': 'name',
}

client.multi_search.perform(search_requests, common_search_params)
```

  </template>
  <template v-slot:Ruby>

```rb
search_requests = {
  'searches': [
    {
      'collection': 'products',
      'q': 'shoe',
      'filter_by': 'price:=[50..120]'
    },
    {
      'collection': 'brands',
      'q': 'Nike'
    }
  ]
}

# Search parameters that are common to all searches go here
common_search_params =  {
    'query_by': 'name',
}

client.multi_search.perform(search_requests, common_search_params)
```

  </template>
  <template v-slot:Dart>

```dart
final searchRequests = {
  'searches': [
    {
      'collection': 'products',
      'q': 'shoe',
      'filter_by': 'price:=[50..120]'
    },
    {
      'collection': 'brands',
      'q': 'Nike'
    }
  ]
};

# Search parameters that are common to all searches go here
final commonSearchParams =  {
    'query_by': 'name',
};

await client.multiSearch.perform(searchRequests, queryParams: commonSearchParams);
```

  </template>
  <template v-slot:Java>

```java
HashMap<String,String > search1 = new HashMap<>();
HashMap<String,String > search2 = new HashMap<>();

search1.put("collection","products");
search1.put("q","shoe");
search1.put("filter_by","price:=[50..120]");

search2.put("collection","brands");
search2.put("q","Nike");

List<HashMap<String, String>> searches = new ArrayList<>();
searches.add(search1);
searches.add(search2);

HashMap<String, List<HashMap<String ,String>>> searchRequests = new HashMap<>();
searchRequests.put("searches",searches);

HashMap<String,String> commonSearchParams = new HashMap<>();
commonSearchParams.put("query_by","name");

client.multiSearch.perform(searchRequests, commonSearchParams);
```

  </template>
  <template v-slot:Go>

```go
searchRequests := api.MultiSearchSearchesParameter{
  Searches: []api.MultiSearchCollectionParameters{
    {
      Collection: "products",
      Q:          pointer.String("shoe"),
      FilterBy:   pointer.String("price:=[50..120]"),
    },
    {
      Collection: "brands",
      Q:          pointer.String("Nike"),
    },
  },
}

// Search parameters that are common to all searches go here
commonSearchParams := &api.MultiSearchParams{
  QueryBy: pointer.String("name"),
}

client.MultiSearch.Perform(context.Background(), commonSearchParams, searchRequests)
```

  </template>
  <template v-slot:Shell>

```bash
curl "http://localhost:8108/multi_search?query_by=name" \
        -X POST \
        -H "Content-Type: application/json" \
        -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" \
        -d '{
          "searches": [
            {
              "collection": "products",
              "q": "shoe",
              "filter_by": "price:=[50..120]"
            },
            {
              "collection": "brands",
              "q": "Nike"
            }
          ]
        }'
```

  </template>
</Tabs>

**Sample Response**

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```json
{
  "results": [
    {
      "facet_counts": [],
      "found": 1,
      "hits": [
        {
          "document": {
            "name": "Blue shoe",
            "brand": "Adidas",
            "id": "126",
            "price": 50
          },
          "highlights": [
            {
              "field": "name",
              "matched_tokens": [
                "shoe"
              ],
              "snippet": "Blue <mark>shoe</mark>"
            }
          ],
          "text_match": 130816
        }
      ],
      "out_of": 10,
      "page": 1,
      "request_params": {
        "per_page": 10,
        "q": "shoe"
      },
      "search_time_ms": 1
    },
    {
      "facet_counts": [],
      "found": 1,
      "hits": [
        {
          "document": {
            "name": "Nike shoes",
            "brand": "Nike",
            "id": "391",
            "price": 60
          },
          "highlights": [
            {
              "field": "name",
              "matched_tokens": [
                "Nike"
              ],
              "snippet": "<mark>Nike</mark>shoes"
            }
          ],
          "text_match": 144112
        }
      ],
      "out_of": 5,
      "page": 1,
      "request_params": {
        "per_page": 10,
        "q": "Nike"
      },
      "search_time_ms": 1
    }
  ]
}
```

  </template>
</Tabs>

**Definition**

`POST ${TYPESENSE_HOST}/multi_search`

## `multi_search` Parameters

You can use any of the [Search Parameters here](./search.md#search-parameters) for each individual search operation within a `multi_search` request.

In addition, you can use the following parameters with `multi_search` requests:

| Parameter            | Required | Description                                                                                                                                                                                                                                                                                                                                   |
|----------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| limit_multi_searches | no	      | Max number of search requests that can be sent in a multi-search request. Eg: `20`<br><br>Default: `50`<br><br>You want to generate a [scoped API key](./api-keys.md##generate-scoped-search-key) with this parameter embedded and use that API key to perform the search, so it's automatically applied and can't be changed at search time. |
| x-typesense-api-key  | no	      | You can embed a separate search API key for each search within a multi_search request. <br><br> This is useful when you want to apply different embedded filters for each collection in individual [scoped API keys](./api-keys.md##generate-scoped-search-key).                                                                              |

::: tip
The `results` array in a `multi_search` response is guaranteed to be in the same order as the queries you send in the `searches` array in your request.
:::

## Example UI Implementation

Here's a demo Frontend app that shows you how to implement a Federated Search UI: [federated-search.typesense.org](https://federated-search.typesense.org/).

Here's the source code for it: [https://github.com/typesense/showcase-federated-search/blob/master/src/app.js](https://github.com/typesense/showcase-federated-search/blob/master/src/app.js)
