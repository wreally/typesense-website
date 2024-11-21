---
sitemap:
  priority: 0.3
---

# API Keys
Typesense allows you to create API Keys with fine-grain access control. You can restrict access on both a per-collection and per-action level.

:::warning
We will be using the initial bootstrap key that you started Typesense with (via `--api-key`>) to create additional keys. It's **strongly recommended** that you don't use the bootstrap API key directly in your production applications. Instead you want to generate an appropriately-scoped key for the application at hand.
:::

## Create an API Key

#### Admin Key

Let's begin by creating an API key that allows you to do all operations, i.e. it's effectively an admin key and is equivalent to the key that you start Typesense with (via `--api-key`).

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Shell']">
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

If you need an API Key equivalent to the Admin key but without the ability to manage API Keys see below.

#### Admin API Key without manage key permissions.

This key is equivalent to the admin key, when it comes to the collections scope. This Key can create, edit or delete any collection.

The only difference is, it cannot manage API Keys, create, retrieve or delete.

You might want to use this Key in an backend service that needs to interact with all your collections.

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Shell']">
  <template v-slot:JavaScript>

```js
key = client.keys().create({
  'description': 'Almost Admin key.',
  'actions': ['collections:*'],
  'collections': ['*']
})
```

  </template>

  <template v-slot:PHP>

```php
$key = $client->keys->create([
  'description' => 'Almost Admin key.',
  'actions' => ['collections:*'],
  'collections' => ['*']
]);
```

  </template>
  <template v-slot:Python>

```py
key = client.keys.create({
  "description": "Almost Admin key.",
  "actions": ["collections:*"],
  "collections": ["*"]
})

```

  </template>
  <template v-slot:Ruby>

```rb
key = client.keys.create({
  'description' => 'Almost Admin key.',
  'actions' => ['collections:*'],
  'collections' => ['*']
})

```

  </template>
  <template v-slot:Shell>

```bash
curl 'http://localhost:8108/keys' \
    -X POST \
    -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" \
    -H 'Content-Type: application/json' \
    -d '{"description":"Almost Admin key.","actions": ["collections:*"], "collections": ["*"]}'
```

  </template>
</Tabs>

#### Search-only API Key

Let's now see how we can create a search-only key that allows you to limit the key's scope to only the search action, and also for only a specific collection.

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Shell']">
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
  "id": 1,
  "value": "k8pX5hD0793d8YQC5aD1aEPd7VleSuGP"
}
```

  </template>
</Tabs>

#### Definition
`POST ${TYPESENSE_HOST}/keys`

### Arguments
| Parameter      | Required    |Description                                            |
| -------------- | ----------- |-------------------------------------------------------|
|actions	|yes	|List of allowed actions. See next table for possible values.|
|collections	|yes	|List of collections that this key is scoped to. Supports regex. Eg: `coll.*` will match all collections that have "coll" in their name.|
|description	|no	|Internal description to identify what the key is for|
|value	|no	|By default Typesense will auto-generate a random key for you, when this parameter is not specified. If you need to use a particular string as the key, you can mention it using this parameter when creating the key.|
|expires_at	|no	|[Unix timestamp](https://www.epochconverter.com/) until which the key is valid.|

### Sample actions

| Action         | Description |
| -------------- | ----------- |
|`documents:search	`|Allows only search requests.|
|`documents:get	`|Allows fetching a single document.|
|`collections:delete	`|Allows a collection to be deleted.|
|`collections:create	`|Allows a collection to be created.|
|`collections:*	`|Allow all kinds of collection related operations.|
|`*	`|Allows all operations.|


## Retrieve an API Key
Retrieve (metadata about) a key.

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Shell']">
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

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Shell']">
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

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Shell']">
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
2. You can embed any [search parameters](./documents.md#arguments) (for eg: `exclude_fields` or `limit_hits`) to prevent users from being able to modify it client-side. 

When you use these scoped search keys in a search API call, the parameters you embedded in them will be automatically applied by Typesense and users will not be able to override them.

### Example

Let's take the first use-case of storing data from multiple users in a single collection. 

1. First you'd add an array field called `accessible_to_user_ids` to each document in your collection, listing all the users who should have access to the document in that field. 
2. Then when a user with say `user_id: 1` lands on your search experience, you'd generate a unique scoped search API key for them (on your backend server), with an embedded filter of `filter_by: accessible_to_user_ids:=1`.

When you make a search API call with this scoped search API key, Typesense will automatically apply the `filter_by`, so the user will effectively only have access to search through documents that have their own user_id listed in the `accessible_to_user_ids` field.

Now let's say you also don't want users to know the entire list of users_ids that have access to a document, you can also embed `exclude_fields: accessible_to_user_ids` in the scoped API key, so it doesn't get returned in the response.  

#### Role-based access <Badge text="Advanced"/>

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

We can generate scoped search API keys without having to make any calls to the Typesense server. We use an API key that we previously generated with a search scope (only), create an HMAC digest of the parameters with this key and use that as the API key. Our client libraries handle this logic for you, but you can also generate scoped search API keys from the command line.

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Shell']">
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
client.keys().generate_scoped_search_key(key_with_search_permissions, {"filter_by": "company_id:124", "expires_at": 1906054106})
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
