---
sidebarDepth: 1
sitemap:
  priority: 0.7
---

# Synonyms
The synonyms feature allows you to define search terms that should be considered equivalent. For eg: when you define a synonym for `sneaker` as `shoe`, searching for `sneaker` will now return all records with the word `shoe` in them, in addition to records with the word `sneaker`.

Typesense supports two types of synonyms:

1. **One-way synonyms**: Defining the words `iphone` and `android` as one-way synonyms of `smart phone` will cause searches for `smart phone` to return documents containing `iphone` or `android` or both.

2. **Multi-way synonyms**: Defining the words `blazer`, `coat` and `jacket` as multi-way synonyms will cause searches for any one of those words (eg: `coat`) to return documents containing at least one of the words in the synonym set (eg: records with `blazer` or `coat` or `jacket` are returned).

:::tip Precedence
When using Synonyms and [Overrides](./curation.md) together, Overrides are handled first since the rules can contain instructions to replace the query. Synonyms will then work on the modified query.
:::

## Create or update a synonym

### Multi-way synonym

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Java','Go','Swift','Shell']">
  <template v-slot:JavaScript>

```js
synonym = {
  "synonyms": ["blazer", "coat", "jacket"]
}

// Creates/updates a synonym called `coat-synonyms` in the `products` collection
client.collections('products').synonyms().upsert('coat-synonyms', synonym)
```

  </template>

  <template v-slot:PHP>

```php
$synonym = [
  "synonyms" => ["blazer", "coat", "jacket"]
];

# Creates/updates a synonym called `coat-synonyms` in the `products` collection
$client->collections['products']->synonyms->upsert('coat-synonyms', $synonym);
```

  </template>
  <template v-slot:Python>

```py
synonym = {
  "synonyms": ["blazer", "coat", "jacket"]
}

# Creates/updates a synonym called `coat-synonyms` in the `products` collection
client.collections['products'].synonyms.upsert('coat-synonyms', synonym)
```

  </template>
  <template v-slot:Ruby>

```rb
synonym = {
  "synonyms" => ["blazer", "coat", "jacket"]
}

# Creates/updates a synonym called `coat-synonyms` in the `products` collection
client.collections['products'].synonyms.upsert('coat-synonyms', synonym)
```

  </template>
  <template v-slot:Dart>

```dart
final synonym = {
  "synonyms": ["blazer", "coat", "jacket"]
};

// Creates/updates a synonym called `coat-synonyms` in the `products` collection
await client.collection('products').synonyms.upsert('coat-synonyms', synonym);
```

  </template>
  <template v-slot:Java>

```java
SearchSynonymSchema synonym = new SearchSynonymSchema();
synonym.addSynonymsItem("blazer").addSynonymsItem("coat").addSynonymsItem("jacket");

// Creates/updates a synonym called `coat-synonyms` in the `products` collection
client.collections("products").synonyms().upsert("coat-synonyms", synonym);
```

  </template>
  <template v-slot:Go>

```go
synonym := &api.SearchSynonymSchema{
  Synonyms: []string{"blazer", "coat", "jacket"},
}

// Creates/updates a synonym called `coat-synonyms` in the `products` collection
client.Collection("products").Synonyms().Upsert(context.Background(), "coat-synonyms", synonym)
```

  </template>
  <template v-slot:Swift>

```swift
let synonymSchema = SearchSynonymSchema(synonyms: ["blazer", "coat", "jacket"])

// Creates/updates a synonym called `coat-synonyms` in the `products` collection
let (searchSynonym, response) = try await client.collection(name: "products").synonyms().upsert(id: "coat-synonyms", synonymSchema)
```

  </template>
  <template v-slot:Shell>

```bash
curl "http://localhost:8108/collections/products/synonyms/coat-synonyms" -X PUT \
-H "Content-Type: application/json" \
-H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" -d '{
  "synonyms": ["blazer", "coat", "jacket"]
}'
```

  </template>
</Tabs>

#### Sample Response

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```json
{
  "id": "coat-synonyms",
  "synonyms": ["blazer", "coat", "jacket"]
}
```

  </template>
</Tabs>

### One-way synonym

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Java','Go','Swift','Shell']">
  <template v-slot:JavaScript>

```js
synonym = {
  "root": "smart phone",
  "synonyms": ["iphone", "android"]
}

// Creates/updates a synonym called `smart-phone-synonyms` in the `products` collection
client.collections('products').synonyms().upsert('smart-phone-synonyms', synonym)
```

  </template>

  <template v-slot:PHP>

```php
$synonym = [
  'root' => 'smart phone',
  'synonyms' => ['iphone', 'android'],
];

// Creates/updates a synonym called `smart-phone-synonyms` in the `products` collection
$client->collections['products']->synonyms->upsert('smart-phone-synonyms', $synonym);
```

  </template>
  <template v-slot:Python>

```py
synonym = {
  "root": "smart phone",
  "synonyms": ["iphone", "android"]
}

# Creates/updates a synonym called `smart-phone-synonyms` in the `products` collection
client.collections('products').synonyms.upsert('smart-phone-synonyms', synonym)
```

  </template>
  <template v-slot:Ruby>

```rb
synonym = {
  "root": "smart phone",
  "synonyms": ["iphone", "android"]
}

# Creates/updates a synonym called `smart-phone-synonyms` in the `products` collection
client.collections('products').synonyms.upsert('smart-phone-synonyms', synonym)
```

  </template>
  <template v-slot:Dart>

```dart
final synonym = {
  "root": "smart phone",
  "synonyms": ["iphone", "android"]
};

// Creates/updates a synonym called `smart-phone-synonyms` in the `products` collection
await client.collection('products').synonyms.upsert('smart-phone-synonyms', synonym);
```

  </template>
  <template v-slot:Java>

```java
SearchSynonymSchema synonym = new SearchSynonymSchema();
synonym.addSynonymsItem("iphone").addSynonymsItem("android");
synonym.root("smart phone");

// Creates/updates a synonym called `smart-phone-synonyms` in the `products` collection
client.collections("products").synonyms().upsert("smart-phone-synonyms", synonym);
```

  </template>
  <template v-slot:Go>

```go
synonym := &api.SearchSynonymSchema{
  Root:     pointer.String("smart phone"),
  Synonyms: []string{"iphone", "android"},
}

// Creates/updates a synonym called `smart-phone-synonyms` in the `products` collection
client.Collection("products").Synonyms().Upsert(context.Background(), "smart-phone-synonyms", synonym)
```

  </template>
  <template v-slot:Swift>

```swift
let synonymSchema = SearchSynonymSchema(
  root: "smart phone",
  synonyms: ["iphone", "android"]
)

// Creates/updates a synonym called `smart-phone-synonyms` in the `products` collection
let (searchSynonym, response) = try await client.collection(name: "products").synonyms().upsert(id: "smart-phone-synonyms", synonymSchema)
```

  </template>
  <template v-slot:Shell>

```bash
curl "http://localhost:8108/collections/products/synonyms/smart-phone-synonyms" -X PUT \
-H "Content-Type: application/json" \
-H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" -d '{
    "root": "smart phone",
    "synonyms": ["iphone", "android"]
}'
```

  </template>
</Tabs>

#### Sample Response

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```json
{
  "id":"smart-phone-synonyms",
  "root":"smart phone",
  "synonyms": ["iphone", "android"],
  "locale": "",
  "symbols_to_index": []
}
```

  </template>
</Tabs>

#### Definition
`PUT ${TYPESENSE_HOST}/collections/:collection/synonyms/:id`

### Arguments
| Parameter        | Required | Description                                                                                                                               |
|------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------|
| synonyms         | yes      | Array of words that should be considered as synonyms.                                                                                     |
| root             | no       | For 1-way synonyms, indicates the root word that words in the synonyms parameter map to.                                                  |
| locale           | no       | Locale for the synonym, leave blank to use the standard tokenizer.                                                                        |
| symbols_to_index | no       | By default, special characters are dropped from synonyms. Use this attribute to specify which special characters should be indexed as is. |

## Retrieve a synonym
We can retrieve a single synonym.

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Java','Go','Swift','Shell']">
  <template v-slot:JavaScript>

```js
client.collections('products').synonyms('coat-synonyms').retrieve()
```

  </template>

  <template v-slot:PHP>

```php
$client->collections['products']->synonyms['coat-synonyms']->retrieve();
```

  </template>
  <template v-slot:Python>

```py
client.collections('products').synonyms['coat-synonyms'].retrieve
```

  </template>
  <template v-slot:Ruby>

```rb
client.collections('products').synonyms['coat-synonyms'].retrieve
```

  </template>
  <template v-slot:Dart>

```dart
await client.collection('products').synonym('coat-synonyms').retrieve();
```

  </template>
  <template v-slot:Java>

```java
SearchSynonym searchSynonym = client.collections("products").synonyms("coat-synonyms").retrieve();
```

  </template>
  <template v-slot:Go>

```go
client.Collection("products").Synonym("coat-synonyms").Retrieve(context.Background())
```

  </template>
  <template v-slot:Swift>

```swift
let (searchSynonym, response) = try await client.collection(name: "products").synonyms().retrieve(id: "coat-synonyms")
```

  </template>
  <template v-slot:Shell>

```bash
curl -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" "http://localhost:8108/collections/products/synonyms"
```

  </template>
</Tabs>

#### Sample Response

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```json
{
  "id": "coat-synonyms",
  "root":"",
  "synonyms": ["blazer", "coat", "jacket"]
}
```

  </template>
</Tabs>

#### Definition
`GET ${TYPESENSE_HOST}/collections/:collection/synonyms/:id`

## List all synonyms
List all synonyms associated with a given collection.

NOTE: By default, ALL synonyms are returned, but you can use the `offset` and `limit` parameters to
paginate on the listing.

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Java','Go','Swift','Shell']">
  <template v-slot:JavaScript>

```js
client.collections('products').synonyms().retrieve()
```

  </template>

  <template v-slot:PHP>

```php
$client->collections['products']->synonyms->retrieve();
```

  </template>
  <template v-slot:Python>

```py
client.collections['products'].synonyms.retrieve()
```

  </template>
  <template v-slot:Ruby>

```rb
client.collections['products'].synonyms.retrieve
```

  </template>
  <template v-slot:Dart>

```dart
await client.collection('products').synonyms.retrieve();
```

  </template>
  <template v-slot:Java>

```java
SearchSynonymsResponse searchSynonymsResponse =  client.collections("products").synonyms().retrieve();
```

  </template>
  <template v-slot:Go>

```go
client.Collection("products").Synonyms().Retrieve(context.Background())
```

  </template>
  <template v-slot:Swift>

```swift
let (searchSynonyms, response) = try await client.collection(name: "products").synonyms().retrieve()
```

  </template>
  <template v-slot:Shell>

```bash
curl -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" \
"http://localhost:8108/collections/products/synonyms"
```

  </template>
</Tabs>

#### Sample Response

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```json
{
  "synonyms": [
    {
      "id": "coat-synonyms",
      "root": "",
      "synonyms": ["blazer", "coat", "jacket"]
    }
  ]
}
```

  </template>
</Tabs>

#### Definition
`GET ${TYPESENSE_HOST}/collections/:collection/synonyms`

## Delete a synonym
Delete a synonym associated with a collection.

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Java','Go','Swift','Shell']">
  <template v-slot:JavaScript>

```js
client.collections('products').synonyms('coat-synonyms').delete()
```

  </template>

  <template v-slot:PHP>

```php
$client->collections['products']->synonyms['coat-synonyms']->delete();
```

  </template>
  <template v-slot:Python>

```py
client.collections['products'].synonyms['coat-synonyms'].delete()
```

  </template>
  <template v-slot:Ruby>

```rb
client.collections['products'].synonyms['coat-synonyms'].delete
```

  </template>
  <template v-slot:Dart>

```dart
await client.collection('products').synonym('coat-synonyms').delete();
```

  </template>
  <template v-slot:Java>

```java
SearchSynonym searchSynonym = client.collections("products").synonyms("coat-synonyms").delete();
```

  </template>
  <template v-slot:Go>

```go
client.Collection("products").Synonym("coat-synonyms").Delete(context.Background())
```

  </template>
  <template v-slot:Swift>

```swift
let (searchSynonym, response) = try await client.collection(name: "products").synonyms().delete(id: "coat-synonyms")
```

  </template>
  <template v-slot:Shell>

```bash
curl "http://localhost:8108/collections/products/synonyms/coat-synonyms" -X DELETE \
-H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}"
```

  </template>
</Tabs>

#### Sample Response

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```json
{
  "id": "coat-synonyms"
}
```

  </template>
</Tabs>

#### Definition
`DELETE ${TYPESENSE_HOST}/collections/:collection/synonyms/:id`

