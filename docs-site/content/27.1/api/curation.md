---
sidebarDepth: 2
sitemap:
  priority: 0.7
---

# Curation
While Typesense makes it really easy and intuitive to deliver great search results, sometimes you might want to promote certain documents over others. Or, you might want to exclude certain documents from a query's result set.

Using overrides, you can include or exclude specific documents for a given query.

:::tip Precedence
When using [Synonyms](./synonyms.md) and Overrides together, Overrides are handled first since the rules can contain instructions to replace the query. Synonyms will then work on the modified query.
:::

## Create or update an override

### Including or excluding documents

In the following example, we will:

1. Use the `includes` condition to place the documents with ids `422` and `54` in the first and second positions
   respectively.
2. Use the `excludes` condition to remove the document with id `287` from the results.

Typesense allows you to use both `includes` and `excludes` or just one of them for curation.

Note how we are applying these overrides to an `exact` match of the query `apple`. Instead, if we want to match all
queries containing the word `apple`, we will use the `contains` match instead.

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Java','Go','Shell']">
  <template v-slot:JavaScript>

```js
override = {
  "rule": {
    "query": "apple",
    "match": "exact"
  },
  "includes": [
    {"id": "422", "position": 1},
    {"id": "54", "position": 2}
  ],
  "excludes": [
    {"id": "287"}
  ]
}

// Creates/updates an override called `customize-apple` in the `companies` collection
client.collections('companies').overrides().upsert('customize-apple', override)
```

  </template>

  <template v-slot:PHP>

```php
$override = [
  "rule" => [
    "query" => "apple",
    "match" => "exact"
  ],
  "includes" => [
    ["id" => "422", "position" => 1],
    ["id" => "54", "position" => 2]
  ],
  "excludes" => [
    ["id" => "287"]
  ]
];

# Creates/updates an override called `customize-apple` in the `companies` collection
$client->collections['companies']->overrides->upsert('customize-apple', $override);
```

  </template>
  <template v-slot:Python>

```py
override = {
  "rule": {
    "query": "apple",
    "match": "exact"
  },
  "includes": [
    {"id": "422", "position": 1},
    {"id": "54", "position": 2}
  ],
  "excludes": [
    {"id": "287"}
  ]
}

# Creates/updates an override called `customize-apple` in the `companies` collection
client.collections['companies'].overrides.upsert('customize-apple', override)
```

  </template>
  <template v-slot:Ruby>

```rb
override = {
  "rule" => {
    "query" => "apple",
    "match" => "exact"
  },
  "includes" => [
    {"id" => "422", "position" => 1},
    {"id" => "54", "position" => 2}
  ],
  "excludes" => [
    {"id" => "287"}
  ]
}

# Creates/updates an override called `customize-apple` in the `companies` collection
client.collections['companies'].overrides.upsert('customize-apple', override)
```

  </template>
  <template v-slot:Dart>

```dart
final override = {
  "rule": {"query": "apple", "match": "exact"},
  "includes": [
    {"id": "422", "position": 1},
    {"id": "54", "position": 2}
  ],
  "excludes": [
    {"id": "287"}
  ]
};

// Creates/updates an override called `customize-apple` in the `companies` collection
await client.collection('companies').overrides.upsert('customize-apple', override);
```

  </template>
  <template v-slot:Java>

```java
SearchOverrideSchema searchOverrideSchema = new SearchOverrideSchema();

searchOverrideSchema.addIncludesItem(new SearchOverrideInclude().id("422").position(1))
                    .addIncludesItem(new SearchOverrideInclude().id("54").position(2))
                    .addExcludesItem(new SearchOverrideExclude().id("287"))
                    .rule(new SearchOverrideRule().query("apple").match(SearchOverrideRule.MatchEnum.EXACT))

// Creates/updates an override called `customize-apple` in the `companies` collection
SearchOverride searchOverride = client.collections("companies").overrides().upsert("customize-apple", searchOverrideSchema);

```

  </template>
  <template v-slot:Go>

```go
override := &api.SearchOverrideSchema{
  Rule: api.SearchOverrideRule{
    Query: "apple",
    Match: "exact",
  },
  Includes: &[]api.SearchOverrideInclude{
    {Id: "422", Position: 1},
    {Id: "54", Position: 2},
  },
  Excludes: &[]api.SearchOverrideExclude{
    {Id: "287"},
  },
}
// Creates/updates an override called `customize-apple` in the `companies` collection
client.Collection("companies").Overrides().Upsert(context.Background(), "customize-apple", override)
```

  </template>
  <template v-slot:Shell>

```bash
curl "http://localhost:8108/collections/companies/overrides/customize-apple" -X PUT \
-H "Content-Type: application/json" \
-H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" -d '{
  "rule": {
    "query": "apple",
    "match": "exact"
  },
  "includes": [
    {"id": "422", "position": 1},
    {"id": "54", "position": 2}
  ],
  "excludes": [
    {"id": "287"}
  ]
}'
```

  </template>
</Tabs>

#### Sample Response

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```json
{
  "id": "customize-apple",
  "excludes": [
    {
      "id": "287"
    }
  ],
  "includes": [
    {
      "id": "422",
      "position": 1
    },
    {
      "id": "54",
      "position": 2
    }
  ],
  "rule": {
    "match": "exact",
    "query": "apple"
  }
}
```

  </template>
</Tabs>

### Add tags to rules

You can add tags to override rules and then trigger curation by referring to the rule by the tag name directly.

```json
{
    "overrides": [
        {
            "id": "tagging-example",
            "includes": [{"id": "1348","position": 1}],
            "rule": {
                "match": "exact",
                "query": "iphone pro",
                "tags": ["apple", "iphone"]
            }
        }
    ]
}
```
Now, when we search the collection, we can pass one or more tags via the `override_tags` parameter to directly
trigger the curations rules that match the tags:

```json
{
   "override_tags": "apple,iphone"
}
```

**Additional notes on how rule tagging works**

If `override1` is tagged with `tagA,tagB`, and `override2` is tagged with just `tagA` and `override3` is not tagged:

1. If a search sets `override_tags` to `tagA`, we only consider overrides that contain `tagA` (`override1` and `override2`)
   with the usual logic -- in alphabetic order of override name and then process both if stop rule processing is false.
2. If a search sets `override_tags` to `tagA,tagB`, we evaluate any rules that contain both `tagA` and tagB first,
   then rules with either `tagA` or `tagB`, but not overrides that contain no tags. Within each group, we evaluate
   in alphabetic order of override name and process multiple rules if `stop_processing` is `false`.
3. If a search sets no `override_tags`, we only consider rules that have no tags associated with them.

### Dynamic filtering

In the following example, we will apply a filter dynamically to a query that matches a rule.

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Java','Go','Shell']">
  <template v-slot:JavaScript>

```js
override = {
  "rule": {
    "query": "{brand} phone",
    "match": "contains"
  },
  "filter_by": "brand:={brand}",
  "remove_matched_tokens": true
}

// Creates/updates an override called `brand-filter` in the `companies` collection
client.collections('companies').overrides().upsert('brand-filter', override)
```

  </template>

  <template v-slot:PHP>

```php
$override = [
  "rule" => [
    "query" => "{brand} phone",
    "match" => "contains"
  ],
  "filter_by" => "brand:={brand}",
  "remove_matched_tokens" => true
];

# Creates/updates an override called `brand-filter` in the `companies` collection
$client->collections['companies']->overrides->upsert('brand-filter', $override);
```

  </template>
  <template v-slot:Python>

```py
override = {
  "rule": {
    "query": "{brand} phone",
    "match": "contains"
  },
  "filter_by": "brand:={brand}",
  "remove_matched_tokens": True
}

# Creates/updates an override called `brand-filter` in the `companies` collection
client.collections['companies'].overrides.upsert('brand-filter', override)
```

  </template>
  <template v-slot:Ruby>

```rb
override = {
  "rule": {
    "query": "{brand} phone",
    "match": "contains"
  },
  "filter_by": "brand:={brand}",
  "remove_matched_tokens": true
}

# Creates/updates an override called `brand-filter` in the `companies` collection
client.collections['companies'].overrides.upsert('brand-filter', override)
```

  </template>
  <template v-slot:Dart>

```dart
final override = {
  "rule": {
    "query": "{brand} phone",
    "match": "contains"
  },
  "filter_by": "brand:={brand}",
  "remove_matched_tokens": true
};

// Creates/updates an override called `brand-filter` in the `companies` collection
await client.collection('companies').overrides.upsert('brand-filter', override);
```

  </template>
  <template v-slot:Java>

```java
SearchOverrideSchema searchOverrideSchema = new SearchOverrideSchema();

searchOverrideSchema.rule(new SearchOverrideRule().query("{brand} phone")
                    .match(SearchOverrideRule.MatchEnum.CONTAINS))

// Creates/updates an override called `customize-apple` in the `companies` collection
SearchOverride searchOverride = client.collections("companies").overrides().upsert("brand-filter", searchOverrideSchema);

```

  </template>
  <template v-slot:Go>

```go
override := &api.SearchOverrideSchema{
  Rule: api.SearchOverrideRule{
    Query: "{brand} phone",
    Match: "contains",
  },
  FilterBy:            pointer.String("brand:={brand}"),
  RemoveMatchedTokens: pointer.True(),
}

// Creates/updates an override called `brand-filter` in the `companies` collection
client.Collection("companies").Overrides().Upsert(context.Background(), "brand-filter", override)
```

  </template>
  <template v-slot:Shell>

```bash
curl "http://localhost:8108/collections/companies/overrides/brand-filter" -X PUT \
-H "Content-Type: application/json" \
-H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" -d '{
  "rule": {
    "query": "{brand} phone",
    "match": "contains"
  },
  "filter_by": "brand:={brand}",
  "remove_matched_tokens": true
}'
```

  </template>
</Tabs>

With this override in effect, any query that contains a brand will automatically be filtered on the matching brand
directly. In addition, the brand will also be removed from the original query tokens, so that the search is made
only on the remaining tokens.

For example, if someone searches for `sony ericsson phone`, the query will be re-written as `phone` and a
`sony ericsson` brand filter will be directly applied. If you don't wish to remove matching tokens from the query,
set `remove_matched_tokens` to `false`. By default, this parameter is set to `true`.

:::tip Note
Fields used in the query for dynamic filtering should have `facet: true` in their field definition in the schema.
:::

### Curation and filtering

`includes` is used to fix documents at certain positions in the results, but it's possible for these documents to
be filtered out when using `filter_curated_hits: true`.

When this happens, Typesense "slides" any remaining documents added by `includes` up in the results.
For example, say you have a collection of product records that look like this when sorted on a `ranking` field:

```
1. ABC123 (in stock)
2. DEF456 (sold out)
3. XYZ999 (sold out)
4. QWE127 (in stock)
5. BNM847 (in stock)
6. JKL999 (in stock)
7. CVB333 (in stock)
```

Let's say an override is created that uses `includes` to pin the following records to specific positions. The override also has
`filter_curated_hits` set to true, so the documents added by `includes` can be filtered out if they don't match any
`filter_by` conditions:

```
- QWE127 pinned to position 1
- DEF456 pinned to position 2
- CVB333 pinned to position 3
```

When this override is applied to a search, the result will be:

```
1. QWE127 (in stock) <- Position set by includes
2. DEF456 (sold out) <- Position set by includes
3. CVB333 (in stock) <- Position set by includes
4. ABC123 (in stock)
5. XYZ999 (sold out)
6. BNM847 (in stock)
7. JKL999 (in stock)
```

If a `status:=in stock` filter is then added to the search, the sold-out records are removed. This includes `DEF456`,
even though it's one of the records the override is trying to add via `includes` (because it's out of stock and the
override has `filter_curated_hits: true`). The end result is that the two in-stock records from the override appear at
positions 1 and 2, with the remaining records below them:

```
1. QWE127 (in stock) <- Position set by includes
2. CVB333 (in stock) <- Position set by includes (moved up)
3. ABC123 (in stock)
4. BNM847 (in stock)
5. JKL999 (in stock)
```

Document `CVB333` "slides up" to position 2, to take the place of `DEF456` (which has been filtered out).

### Override parameters

#### Definition
`PUT ${TYPESENSE_HOST}/collections/:collection/overrides/:id`

#### Parameters
| Parameter             | Required                                                    | Description                                                                                                                                                                                                                                                                                                  |
|-----------------------|-------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| rule.query            | One of either `rule.query` or `rule.filter_by` is required. | Indicates what search queries should be overridden.                                                                                                                                                                                                                                                          |
| rule.match            | no                                                          | Indicates whether the match on the query term should be `exact` or `contains`. Required when `rule.query` is set.                                                                                                                                                                                            |
| rule.filter_by        | One of either `rule.query` or `rule.filter_by` is required. | Indicates that the override should apply when the `filter_by` parameter in a search query _exactly_ matches the string specified here (including backticks, spaces, brackets, etc).                                                                                                                          |
| rule.tags             | no                                                          | List of tag values to associate with this override rule.                                                                                                                                                                                                                                                     |
| excludes              | no                                                          | List of document `id`s that should be excluded from the search results.                                                                                                                                                                                                                                      |
| includes              | no                                                          | List of document `id`s that should be included in the search results with their corresponding `positions`.                                                                                                                                                                                                   |
| metadata              | no                                                          | Return a custom JSON object in the Search API response, when this rule is triggered. This can can be used to display a pre-defined message (eg: a promotion banner) on the front-end when a particular rule is triggered.                                                                                    |
| filter_by             | no                                                          | A filter by clause that is applied to any search query that matches the override rule.                                                                                                                                                                                                                       |
| sort_by               | no                                                          | A sort by clause that is applied to any search query that matches the override rule.                                                                                                                                                                                                                         |
| replace_query         | no                                                          | Replaces the current search query with this value, when the search query matches the override rule.                                                                                                                                                                                                          |
| remove_matched_tokens | no                                                          | Indicates whether search query tokens that exist in the override's rule should be removed from the search query. <br/><br/>Default: `true`.                                                                                                                                                                  |
| filter_curated_hits   | no                                                          | When set to `true`, the filter conditions of the query is applied to the curated records as well. <br/><br/>Default: `false`.                                                                                                                                                                                |
| effective_from_ts     | no                                                          | A Unix timestamp that indicates the date/time from which the override will be active. You can use this to create override rules that start applying from a future point in time.                                                                                                                             |
| effective_to_ts       | no                                                          | A Unix timestamp that indicates the date/time until which the override will be active. You can use this to create override rules that stop applying after a period of time.                                                                                                                                  |
| stop_processing       | no                                                          | When set to `true`, override processing will stop at the first matching rule. When set to `false` override processing will continue and multiple override actions will be triggered in sequence. <br/><br/> Overrides are processed in the lexical sort order of their `id` field.<br/><br/>Default: `true`. |

## List all overrides
Listing all overrides associated with a given collection.

NOTE: By default, ALL overrides are returned, but you can use the `offset` and `limit` parameters to paginate on the listing.

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Java','Go','Shell']">
  <template v-slot:JavaScript>

```js
client.collections('companies').overrides().retrieve()
```

  </template>

  <template v-slot:PHP>

```php
$client->collections['companies']->overrides->retrieve();
```

  </template>
  <template v-slot:Python>

```py
client.collections['companies'].overrides.retrieve()
```

  </template>
  <template v-slot:Ruby>

```rb
client.collections['companies'].overrides.retrieve
```

  </template>
  <template v-slot:Dart>

```dart
await client.collection('companies').overrides.retrieve();
```

  </template>
  <template v-slot:Java>

```java
SearchOverridesResponse searchOverridesResponse = client.collections("companies").overrides().retrieve();
```

  </template>
  <template v-slot:Go>

```go
client.Collection("companies").Overrides().Retrieve(context.Background())
```

  </template>
  <template v-slot:Shell>

```bash
curl -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" \
"http://localhost:8108/collections/companies/overrides"
```

  </template>
</Tabs>

#### Sample Response

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```json
{
  "overrides":[
    {
      "id":"customize-apple",
      "excludes":[
        {
          "id":"287"
        }
      ],
      "includes":[
        {
          "id":"422",
          "position":1
        },
        {
          "id":"54",
          "position":2
        }
      ],
      "rule":{
        "match":"exact",
        "query":"apple"
      }
    }
  ]
}
```

  </template>
</Tabs>

#### Definition
`GET ${TYPESENSE_HOST}/collections/:collection/overrides`


## Retrieve an override
Fetch an individual override associated with a collection.

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Java','Go','Shell']">
  <template v-slot:JavaScript>

```js
client.collections('companies').overrides('customize-apple').retrieve()
```

  </template>

  <template v-slot:PHP>

```php
$client->collections['companies']->overrides['customize-apple']->retrieve();
```

  </template>
  <template v-slot:Python>

```py
client.collections['companies'].overrides['customize-apple'].retrieve()
```

  </template>
  <template v-slot:Ruby>

```rb
client.collections['companies'].overrides['customize-apple'].retrieve
```

  </template>
  <template v-slot:Dart>

```dart
await client.collection('companies').override('customize-apple').retrieve();
```

  </template>
  <template v-slot:Java>

```java
SearchOverride searchOverride = client.collections("companies").overrides("customize-apple").retrieve();
```

  </template>
  <template v-slot:Go>

```go
client.Collection("companies").Override("customize-apple").Retrieve(context.Background())
```

  </template>
  <template v-slot:Shell>

```bash
curl "http://localhost:8108/collections/companies/overrides/customize-apple" -X GET \
-H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}"
```

  </template>
</Tabs>

#### Sample Response

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```json
{
  "id":"customize-apple",
  "excludes":[
    {
      "id":"287"
    }
  ],
  "includes":[
    {
      "id":"422",
      "position":1
    },
    {
      "id":"54",
      "position":2
    }
  ],
  "rule":{
    "match":"exact",
    "query":"apple"
  }
}
```

  </template>
</Tabs>

#### Definition
`GET ${TYPESENSE_HOST}/collections/:collection/overrides/:id`


## Delete an override
Deleting an override associated with a collection.

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Java','Go','Shell']">
  <template v-slot:JavaScript>

```js
client.collections('companies').overrides('customize-apple').delete()
```

  </template>

  <template v-slot:PHP>

```php
$client->collections['companies']->overrides['customize-apple']->delete();
```

  </template>
  <template v-slot:Python>

```py
client.collections['companies'].overrides['customize-apple'].delete()
```

  </template>
  <template v-slot:Ruby>

```rb
client.collections['companies'].overrides['customize-apple'].delete
```

  </template>
  <template v-slot:Dart>

```dart
await client.collection('companies').override('customize-apple').delete();
```

  </template>
  <template v-slot:Java>

```java
SearchOverride searchOverride = client.collections("companies").overrides("customize-apple").delete();
```

  </template>
  <template v-slot:Go>

```go
client.Collection("companies").Override("customize-apple").Delete(context.Background())
```

  </template>
  <template v-slot:Shell>

```bash
curl "http://localhost:8108/collections/companies/overrides/customize-apple" -X DELETE \
-H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}"
```

  </template>
</Tabs>

#### Sample Response

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```json
{
  "id": "customize-apple"
}
```

  </template>
</Tabs>

#### Definition
`DELETE ${TYPESENSE_HOST}/collections/:collection/overrides/:id`

