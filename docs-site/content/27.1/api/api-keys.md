---
sidebarDepth: 1
sitemap:
  priority: 0.7
---

# API Keys
Typesense allows you to create API Keys with fine-grained access control. You can restrict access on a per-collection, per-action, per-record or even per-field level or a mixture of these.

Read more about how to manage access to data in Typesense in this [dedicated guide article](../../guide/data-access-control.md).

:::warning
We will be using the initial bootstrap key that you started Typesense with (via `--api-key`>) to create additional keys. It's **strongly recommended** that you don't use the bootstrap API key directly in your production applications. Instead you want to generate an appropriately-scoped key for the application at hand.
:::

## Create an API Key

### Admin Key

Let's begin by creating an API key that allows you to do all operations, i.e. it's effectively an admin key and is equivalent to the key that you start Typesense with (via `--api-key`).

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Java','Go','Swift','Shell']">
  <template v-slot:JavaScript>

```js
key = client.keys().create({
  'description': 'Admin key.',
  'actions': ['*'],
  'collections': ['*']
})
```

  </template>
  <template v-slot:PHP>

```php
$key = $client->keys->create([
  'description' => 'Admin key.',
  'actions' => ['*'],
  'collections' => ['*']
]);
```

  </template>
  <template v-slot:Python>

```py
key = client.keys.create({
  "description": "Admin key.",
  "actions": ["*"],
  "collections": ["*"]
})

```

  </template>
  <template v-slot:Ruby>

```rb
key = client.keys.create({
  'description' => 'Admin key.',
  'actions' => ['*'],
  'collections' => ['*']
})

```

  </template>
  <template v-slot:Dart>

```dart
final key = await client.keys.create({
  'description': 'Admin key.',
  'actions': ['*'],
  'collections': ['*']
});

```

  </template>
  <template v-slot:Java>

```java
ApiKeySchema apiKeySchema = new ApiKeySchema();
List<String> actionValues = new ArrayList<>();
List<String> collectionValues = new ArrayList<>();

actionValues.add("*");
collectionValues.add("*");

apiKeySchema.description("Admin Key").actions(actionValues).collections(collectionValues);
ApiKey apiKey = client.keys().create(apiKeySchema);
```

  </template>
  <template v-slot:Go>

```go
key, err := client.Keys().Create(context.Background(), &api.ApiKeySchema{
  Description: "Admin key.",
  Actions:     []string{"*"},
  Collections: []string{"*"},
})
```

  </template>
  <template v-slot:Swift>

```swift
let adminKey = ApiKeySchema(
  _description: "Admin Key",
  actions: ["*"],
  collections: ["*"]
)
let (apiKey, response) = try await client.keys().create(adminKey)
```

  </template>
  <template v-slot:Shell>

```bash
curl 'http://localhost:8108/keys' \
    -X POST \
    -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" \
    -H 'Content-Type: application/json' \
    -d '{"description":"Admin key.","actions": ["*"], "collections": ["*"]}'
```

  </template>
</Tabs>

By setting both `actions` and `collections` to a wildcard `['*']` scope, we're able to create an admin key that gives you universal access. However, you should refrain from creating such widely scoped keys.

:::warning
The generated key is only returned during creation. You want to store this key carefully in a secure place.
:::

### Search-only API Key

Let's now see how we can create a search-only key that allows you to limit the key's scope to only the search action, and also for only a specific collection.

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Java','Go','Swift','Shell']">
  <template v-slot:JavaScript>

```js
client.keys().create({
  'description': 'Search-only companies key.',
  'actions': ['documents:search'],
  'collections': ['companies']
})
```

  </template>

  <template v-slot:PHP>

```php
$client->keys->create([
  'description' => 'Search-only companies key.',
  'actions' => ['documents:search'],
  'collections' => ['companies']
]);
```

  </template>
  <template v-slot:Python>

```py
client.keys.create({
  "description": "Search-only companies key.",
  "actions": ["documents:search"],
  "collections": ["companies"]
})
```

  </template>
  <template v-slot:Ruby>

```rb
client.keys.create({
  'description' => 'Search-only companies key.',
  'actions' => ['documents:search'],
  'collections' => ['companies']
})
```

  </template>
  <template v-slot:Dart>

```dart
await client.keys.create({
  'description': 'Search-only companies key.',
  'actions': ['documents:search'],
  'collections': ['companies']
});
```

  </template>
  <template v-slot:Java>

```java
ApiKeySchema apiKeySchema = new ApiKeySchema();
List<String> actionValues = new ArrayList<>();
List<String> collectionValues = new ArrayList<>();

actionValues.add("documents:search");
collectionValues.add("intbooks");

apiKeySchema.description("Search only Key").actions(actionValues).collections(collectionValues);

ApiKey apiKey = client.keys().create(apiKeySchema);
```

  </template>
  <template v-slot:Go>

```go
client.Keys().Create(context.Background(), &api.ApiKeySchema{
  Description: "Search-only companies key.",
  Actions:     []string{"documents:search"},
  Collections: []string{"companies"},
})
```

  </template>
  <template v-slot:Swift>

```swift
let searchKey = ApiKeySchema(
  _description: "Admin Key",
  actions: ["documents:search"],
  collections: ["companies"]
)
let (apiKey, response) = try await client.keys().create(searchKey)
```

  </template>
  <template v-slot:Shell>

```bash
curl 'http://localhost:8108/keys' \
    -X POST \
    -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" \
    -H 'Content-Type: application/json' \
    -d '{"description":"Search-only companies key.","actions": ["documents:search"], "collections": ["companies"]}'
```

  </template>
</Tabs>

By setting the `actions` scope to `["documents:search"]` and the `collections` scope to `["companies"]`, we can generate a key that is allowed to only conduct searches on the `companies` collection.

#### Sample Response

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```json
{
  "actions": [
    "*"
  ],
  "collections": [
    "*"
  ],
  "description": "Admin key.",
  "expires_at": 64723363199,
  "id": 1,
  "value": "k8pX5hD0793d8YQC5aD1aEPd7VleSuGP"
}
```

  </template>
</Tabs>

The collection names can contain regular expressions. For example, if you have multiple collections that begin with
`org_` and want to have a common key for all of them, you can define the permissions this way:

```json
{
  "description": "Key for searching org collections.",
  "actions": [
    "documents:search"
  ],
  "collections": [
    "org_.*"
  ]
}
```

#### Definition
`POST ${TYPESENSE_HOST}/keys`

### Arguments
| Parameter    | Required  | Description                                                                                                                                                                                                           |
|:-------------|:----------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| actions      | yes       | List of allowed actions. See next table for possible values.                                                                                                                                                          |
| collections  | yes       | List of collections that this key is scoped to. Supports regex. Eg: `coll.*` will match all collections that have "coll" in their name.                                                                               |
| description  | yes       | Internal description to identify what the key is for                                                                                                                                                                  |
| value        | no        | By default Typesense will auto-generate a random key for you, when this parameter is not specified. If you need to use a particular string as the key, you can mention it using this parameter when creating the key. |
| expires_at   | no        | [Unix timestamp](https://www.epochconverter.com/) until which the key is valid.                                                                                                                                       |
| autodelete   | no        | Automatically purge expired keys. This happens hourly. Default: `false`                                                                                                                                               |

### Sample actions

This is a _sample_ list of actions.

In general, you want to use the format `resource:verb` pattern to indicate an action, where `verb` can be one of `create`, `delete`, `get`, `list`, `search`, or `*`.

#### Collection actions

| Action               | Description                                       |
|:---------------------|:--------------------------------------------------|
| `collections:create` | Allows a collection to be created.                |
| `collections:delete` | Allows a collection to be deleted.                |
| `collections:get`    | Allows a collection schema to be retrieved.       |
| `collections:list`   | Allows retrieving all collection schema.          |
| `collections:*`      | Allow all kinds of collection related operations. |

#### Document actions

| Action             | Description                         |
|:-------------------|:------------------------------------|
| `documents:search` | Allows only search requests.        |
| `documents:get`    | Allows fetching a single document.  |
| `documents:create` | Allows creating documents.          |
| `documents:upsert` | Allows upserting documents.         |
| `documents:update` | Allows updating documents.          |
| `documents:delete` | Allows deletion of documents.       |
| `documents:import` | Allows import of documents in bulk. |
| `documents:export` | Allows export of documents in bulk. |
| `documents:*`      | Allows all document operations.     |

#### Alias actions

| Action               | Description                                       |
|:---------------------|:--------------------------------------------------|
| `aliases:list`       | Allows all aliases to be fetched.                 |
| `aliases:get`        | Allows a single alias to be retrieved             |
| `aliases:create`     | Allows the creation of aliases.                   |
| `aliases:delete`     | Allows the deletion of aliases.                   |
| `aliases:*`          | Allows all alias operations.                      |

#### Synonym actions

| Action               | Description                                       |
|:---------------------|:--------------------------------------------------|
| `synonyms:list`      | Allows all synonyms to be fetched.                |
| `synonyms:get`       | Allows a single synonym to be retrieved           |
| `synonyms:create`    | Allows the creation of synonyms.                  |
| `synonyms:delete`    | Allows the deletion of synonyms.                  |
| `synonyms:*`         | Allows all synonym operations.                    |

#### Override actions

| Action               | Description                                       |
|:---------------------|:--------------------------------------------------|
| `overrides:list`     | Allows all overrides to be fetched.               |
| `overrides:get`      | Allows a single override to be retrieved          |
| `overrides:create`   | Allows the creation of overrides.                 |
| `overrides:delete`   | Allows the deletion of overrides.                 |
| `overrides:*`        | Allows all override operations.                   |

#### Stopwords actions

| Action             | Description                                  |
|:-------------------|:---------------------------------------------|
| `stopwords:list`   | Allows all stopword sets to be fetched.      |
| `stopwords:get`    | Allows a single stopword set to be retrieved |
| `stopwords:create` | Allows the creation of a stopword set.       |
| `stopwords:delete` | Allows the deletion of a stopword set.       |
| `stopwords:*`      | Allows all stopwords operations.             |

#### Keys actions

| Action        | Description                                    |
|:--------------|:-----------------------------------------------|
| `keys:list`   | Allows fetching of metadata for all keys       |
| `keys:get`    | Allows metadata for a single key to be fetched |
| `keys:create` | Allows the creation of API keys.               |
| `keys:delete` | Allows the deletion of API keys.               |
| `keys:*`      | Allows all API Key related operations.         |

#### Analytics actions

| Action             | Description                                                                             |
|:-------------------|:----------------------------------------------------------------------------------------|
| `analytics:list`   | Allows all analytics rules to be fetched.                                               |
| `analytics:get`    | Allows for a single analytics rule to be fetched.                                       |
| `analytics:create` | Allows the creation of analytics rules and events.                                      |
| `analytics:delete` | Allows the deletion of analytics rules and events.                                      |
| `analytics:*`      | Allows all analytics rules and events related operations.                               |

##### Analytics Rules actions

| Action             | Description                                                                        |
|:-------------------|:-----------------------------------------------------------------------------------|
| `analytics/rules:list`   | Allows all analytics rules to be fetched.                                    |
| `analytics/rules:get`    | Allows for a single analytics rule to be fetched.                            |
| `analytics/rules:create` | Allows the creation of analytics rules.                                      |
| `analytics/rules:delete` | Allows the deletion of analytics rules.                                      |
| `analytics/rules:*`      | Allows all analytics rules related operations.                               |

##### Analytics Events actions

| Action                    | Description                                                                        |
|:--------------------------|:-----------------------------------------------------------------------------------|
| `analytics/events:create` | Allows the creation of analytics events.                                           |

#### Misc actions

| Action               | Description                                       |
|:---------------------|:--------------------------------------------------|
| `metrics.json:list`  | Allows access to the metrics endpoint.            |
| `stats.json:list`    | Allows access to the stats endpoint.              |
| `debug:list`         | Allows access to the `/debug` endpoint.           |
| `*`                  | Allows all operations.                            |

## Retrieve an API Key
Retrieve (metadata about) a key.

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Java','Go','Swift','Shell']">
  <template v-slot:JavaScript>

```js
key = client.keys(1).retrieve()
```

  </template>
  <template v-slot:PHP>

```php
$key = $client->keys[1]->retrieve();

```

  </template>
  <template v-slot:Python>

```py
key = client.keys[1].retrieve()
```

  </template>
  <template v-slot:Ruby>

```rb
key = client.keys[1].retrieve
```

  </template>
  <template v-slot:Dart>

```dart
final key = await client.key(1).retrieve();
```

  </template>
  <template v-slot:Java>

```java
ApiKey apiKey = client.keys(1).retrieve();
```

  </template>
  <template v-slot:Go>

```go
key, err := client.Key(1).Retrieve(context.Background())
```

  </template>
  <template v-slot:Swift>

```swift
let (apiKey, response) = try await client.keys().retrieve(id: 1)
```

  </template>
  <template v-slot:Shell>

```bash
curl 'http://localhost:8108/keys/1' \
    -X GET \
    -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}"
```

  </template>
</Tabs>

#### Sample Response

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```json
{
  "actions": [ "documents:search" ],
  "collections": [ "*" ],
  "description": "Search-only key.",
  "expires_at": 64723363199,
  "id": 1,
  "value_prefix": "vxpx"
}
```

  </template>
</Tabs>

Notice how only the key prefix is returned when you retrieve a key. Due to security reasons, only the create endpoint returns the full API key.

#### Definition
`GET ${TYPESENSE_HOST}/keys/:id`

## List all Keys
Retrieve (metadata about) all keys.

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Java','Go','Swift','Shell']">
  <template v-slot:JavaScript>

```js
client.keys().retrieve()
```

  </template>
  <template v-slot:PHP>

```php
$client->keys->retrieve();
```

  </template>
  <template v-slot:Python>

```py
client.keys.retrieve()
```

  </template>
  <template v-slot:Ruby>

```rb
client.keys.retrieve
```

  </template>
  <template v-slot:Dart>

```dart
await client.keys.retrieve();
```

  </template>
  <template v-slot:Java>

```java
ApiKeysResponse apiKeysResponse = client.keys().retrieve();
```

  </template>
  <template v-slot:Go>

```go
client.Keys().Retrieve(context.Background())
```

  </template>
  <template v-slot:Swift>

```swift
let (apiKeys, response) = try await client.keys().retrieve()
```

  </template>
  <template v-slot:Shell>

```bash
curl 'http://localhost:8108/keys' \
    -X GET \
    -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}"
```

  </template>
</Tabs>

#### Sample Response

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```json
{
  "keys": [
    {
      "actions": [
        "documents:search"
      ],
      "collections": [
        "users"
      ],
      "description": "Search-only key.",
      "expires_at": 64723363199,
      "id": 1,
      "value_prefix": "iKBT"
    },
    {
      "actions": [
        "documents:search"
      ],
      "collections": [
        "users"
      ],
      "description": "Search-only key.",
      "expires_at": 64723363199,
      "id": 2,
      "value_prefix": "wst8"
    }
  ]
}
```

  </template>
</Tabs>

Notice how only the key prefix is returned when you retrieve a key. Due to security reasons, only the create endpoint returns the full API key.

#### Definition
`GET ${TYPESENSE_HOST}/keys/`

## Delete API Key
Delete an API key given its ID.

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Java','Go','Swift','Shell']">
  <template v-slot:JavaScript>

```js
key = client.keys(1).delete()
```

  </template>

  <template v-slot:PHP>

```php
$client->keys[1]->delete();
```

  </template>
  <template v-slot:Python>

```py
key = client.keys[1].delete()
```

  </template>
  <template v-slot:Ruby>

```rb
key = client.keys[1].delete()
```

  </template>
  <template v-slot:Dart>

```dart
final key = await client.key(1).delete();
```

  </template>
  <template v-slot:Java>

```java
ApiKey apiKey = client.keys(1).delete();
```

  </template>
  <template v-slot:Go>

```go
client.Key(1).Delete(context.Background())
```

  </template>
  <template v-slot:Swift>

```swift
let (apiKey, response) = try await client.keys().delete(id: 1)
```

  </template>
  <template v-slot:Shell>

```bash
curl 'http://localhost:8108/keys/1' \
    -X DELETE \
    -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}"
```

  </template>
</Tabs>

#### Sample Response

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```json
{
  "id": 1
}
```

  </template>
</Tabs>

#### Definition
`DELETE ${TYPESENSE_HOST}/keys/:id`

## Generate Scoped Search Key
You can generate scoped search API keys that have embedded search parameters in them. This is useful in a few different scenarios:

1. You can index data from multiple users/customers in a single Typesense collection (aka multi-tenancy) and create scoped search keys with embedded `filter_by` parameters that only allow users access to their own subset of data.
2. You can embed any [search parameters](search.md#search-parameters) (for eg: `exclude_fields` or `limit_hits`) to prevent users from being able to modify it client-side.

When you use these scoped search keys in a search API call, the parameters you embedded in them will be automatically applied by Typesense and users will not be able to override them.

### Example

Let's take the first use-case of storing data from multiple users in a single collection.

1. First you'd add an array field called `accessible_to_user_ids` to each document in your collection, listing all the users who should have access to the document in that field.
2. Then when a user with say `user_id: 1` lands on your search experience, you'd generate a unique scoped search API key for them (on your backend server), with an embedded filter of `filter_by: accessible_to_user_ids:=1`.

When you make a search API call with this scoped search API key, Typesense will automatically apply the `filter_by`, so the user will effectively only have access to search through documents that have their own user_id listed in the `accessible_to_user_ids` field.

Now let's say you also don't want users to know the entire list of users_ids that have access to a document, you can also embed `exclude_fields: accessible_to_user_ids` in the scoped API key, so it doesn't get returned in the response.

### Role-based access <Badge text="Advanced"/>

Let's take another scenario where an organization has many users and users can be a part of one or more roles (eg: admin, sales, support, etc).
You can store all records/documents belonging to all organizations and users in a single collection and conditionally allow a given logged-in user to only search through their own organization's data and only for the subset of data their role grants them access to, using Scoped API keys.

1. First you'd add a field called `accessible_to_organization_id` to each document in your collection.
1. Add another array field called `accessible_to_roles` to each document, and add all the roles within that organization that have access to this document.
1. Generate a parent search API key for each organization using the [API Keys](./api-keys.md) endpoint.
1. Now when a user belonging to `organization_id: 1` with a role of say `sales` and `marketing` logs in, you would generate a Scoped API Key using the organization's Parent Search API Key and embedded filters of `filter_by: accessible_to_organization_id:=1 && accessible_to_roles:=[sales,marketing]`

When you make a search API call with this scoped search API key, Typesense will automatically apply the `filter_by`, so the user will effectively only have access to search through documents that have their `organization_id` and `role(s)` listed in documents.

Now, when a user leaves an organization, for added security, you can delete the organization's parent search API Key and generate a new one, and use that to generate scoped search API keys for users logging in, in the future.
Once a parent Search API Key is revoked, all scoped API keys that were generated with it are invalidated automatically.

::: tip
Once a parent Search API Key is revoked, all scoped API keys that were generated with it are invalidated automatically.
:::

### Usage

We can generate scoped search API keys without having to make any calls to the Typesense server.

We should use an API key that we previously generated with a **search scope (only)**, create an HMAC digest of the
parameters with this key and use that as the API key. Our client libraries handle this logic for you, but you can also
generate scoped search API keys from the command line.

::: tip
Scoped search API keys must only be created from a parent API key that has no other permissions besides `documents:search`
:::


<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Java','Go','Shell']">
  <template v-slot:JavaScript>

```js
// Make sure that the parent search key you use to generate a scoped search key
//  has no other permissions besides `documents:search`

keyWithSearchPermissions = 'RN23GFr1s6jQ9kgSNg2O7fYcAUXU7127'
client.keys().generateScopedSearchKey(keyWithSearchPermissions, {'filter_by': 'company_id:124', 'expires_at': 1906054106})
```

  </template>

  <template v-slot:PHP>

```php
// Make sure that the parent search key you use to generate a scoped search key
//  has no other permissions besides `documents:search`

$keyWithSearchPermissions = 'RN23GFr1s6jQ9kgSNg2O7fYcAUXU7127';
$client->keys->generateScopedSearchKey($keyWithSearchPermissions, ['filter_by' => 'company_id:124', 'expires_at' => 1906054106]);
```

  </template>
  <template v-slot:Python>

```py
# Make sure that the parent search key you use to generate a scoped search key
#  has no other permissions besides `documents:search`

key_with_search_permissions = 'RN23GFr1s6jQ9kgSNg2O7fYcAUXU7127'
client.keys.generate_scoped_search_key(key_with_search_permissions, {"filter_by": "company_id:124", "expires_at": 1906054106})
```

  </template>
  <template v-slot:Ruby>

```rb
# Make sure that the parent search key you use to generate a scoped search key
#  has no other permissions besides `documents:search`

key_with_search_permissions = 'RN23GFr1s6jQ9kgSNg2O7fYcAUXU7127'
client.keys().generate_scoped_search_key(key_with_search_permissions, {'filter_by': 'company_id:124', 'expires_at': 1906054106})
```

  </template>
  <template v-slot:Dart>

```dart
// Make sure that the parent search key you use to generate a scoped search key
//  has no other permissions besides `documents:search`

final keyWithSearchPermissions = 'RN23GFr1s6jQ9kgSNg2O7fYcAUXU7127';
client.keys.generateScopedSearchKey(keyWithSearchPermissions, {'filter_by': 'company_id:124', 'expires_at': 1906054106});
```

  </template>
  <template v-slot:Java>

```java
// Make sure that the parent search key you use to generate a scoped search key
//  has no other permissions besides `documents:search`
String keyWithSearchPermissions = "RN23GFr1s6jQ9kgSNg2O7fYcAUXU7127";

HashMap<String, Object> parameters = new HashMap<>();
parameters.put("filter_by", "company_id:124");

String scopedSearchKey = client.keys().generateScopedSearchKey(keyWithSearchPermissions,parameters);
```

  </template>
  <template v-slot:Go>

```go
// Make sure that the parent search key you use to generate a scoped search key
//  has no other permissions besides `documents:search`

keyWithSearchPermissions := "RN23GFr1s6jQ9kgSNg2O7fYcAUXU7127"
client.Keys().GenerateScopedSearchKey(keyWithSearchPermissions, map[string]interface{}{
  "filter_by":  "company_id:124",
  "expires_at": 1906054106,
})
```

  </template>
  <template v-slot:Shell>

```bash
# Make sure that the parent search key you use to generate a scoped search key
#  has no other permissions besides `documents:search`

KEY_WITH_SEARCH_PERMISSIONS="RN23GFr1s6jQ9kgSNg2O7fYcAUXU7127"
EMBEDDED_SEARCH_PARAMETERS_JSON='{"filter_by":"company_id:124","expires_at":1906054106}'

digest=$(echo -n $EMBEDDED_SEARCH_PARAMETERS_JSON | openssl dgst -sha256 -hmac $KEY_WITH_SEARCH_PERMISSIONS -binary | base64 -w0)

scoped_api_key=$(echo -n "${digest}${KEY_WITH_SEARCH_PERMISSIONS:0:4}${EMBEDDED_SEARCH_PARAMETERS_JSON}" | base64 -w0)

echo $scoped_api_key
```

  </template>
</Tabs>

#### Sample Response

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```
OW9DYWZGS1Q1RGdSbmo0S1QrOWxhbk9PL2kxbTU1eXA3bCthdmE5eXJKRT1STjIzeyJmaWx0ZXJfYnkiOiJjb21wYW55X2lkOjEyNCIsImV4cGlyZXNfYXQiOjE5MDYwNTQxMDZ9
```

  </template>
</Tabs>

You can also set a custom `expires_at` for a scoped API key. The expiration for a scoped API key should be less than the expiration of the parent API key with which it is generated.

:::warning
If you have documents in a collection that only a certain subset of users should have access to, remember to never expose your main search key client-side, since exposing the main search key will allow users to query all documents without your embedded search parameters / filters.
:::
