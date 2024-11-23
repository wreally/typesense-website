---
sidebarDepth: 2
sitemap:
  priority: 0.3
---

# Collections

In Typesense, every record you index is called a `Document` and a group of documents with similar fields is called a `Collection`.
A Collection is roughly equivalent to a table in a relational database.

## Create a collection

Before we can [add documents](./documents.md#index-a-single-document) to Typesense, we need to first create a `Collection` - we give it a name and describe the fields that will be indexed from our `Documents`.
We call this definition the collection's `schema`, which is just a fancy term to describe the fields (and their [data types](#field-types)) in your documents.

:::tip
It might help to think of defining a collection "schema" as being similar to defining "types" in a strongly-typed programming language like Typescript, C, Java, Dart, Rust, etc.
This ensures that the documents you add to your collection have consistent data types and are validated, and this helps prevent a whole class of errors you might typically see with mis-matched or inconsistent data types across documents.
:::

:::tip Organizing Collections

Read more on how to organize data into collections in this dedicated guide article: [Organizing Collections](/guide/organizing-collections.md).

:::

There are two ways to specify a schema:

1. [Pre-define all the fields to be indexed](#with-pre-defined-schema) from your documents OR
2. [Have Typesense automatically detect your fields and data types](#with-auto-schema-detection) based on the documents you index.

The simplest option is [#2](#with-auto-schema-detection) where you don't have to worry about defining an explicit schema.
But if you need more fine-grained control and/or validation, you want to use [#1](#with-pre-defined-schema) or even mix both together.

### With pre-defined schema

Let's first create a collection with an explicit, pre-defined schema.

This option gives you fine-grained control over your document fields' [data types](#field-types) and configures your collection to reject documents that don't match the data types defined in your schema ([by default](./documents.md#dealing-with-dirty-data)).

If you want Typesense to automatically detect your schema for you, skip over to [auto-schema detection](#with-auto-schema-detection).

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Java','Go','Swift','Shell']">
  <template v-slot:JavaScript>

```js
let schema = {
  'name': 'companies',
  'fields': [
    {
      'name': 'company_name',
      'type': 'string',
      'facet': false
    },
    {
      'name': 'num_employees',
      'type': 'int32',
      'facet': false
    },
    {
      'name': 'country',
      'type': 'string',
      'facet': true
    }
  ],
  'default_sorting_field': 'num_employees'
}

client.collections().create(schema)
```

  </template>

  <template v-slot:PHP>

```php
$schema = [
  'name'      => 'companies',
  'fields'    => [
    [
      'name'  => 'company_name',
      'type'  => 'string'
    ],
    [
      'name'  => 'num_employees',
      'type'  => 'int32'
    ],
    [
      'name'  => 'country',
      'type'  => 'string',
      'facet' => true
    ]
  ],
  'default_sorting_field' => 'num_employees'
];

$client->collections->create($schema);
```

  </template>
  <template v-slot:Python>

```py
schema = {
  'name': 'companies',
  'fields': [
    {
      'name'  :  'company_name',
      'type'  :  'string'
    },
    {
      'name'  :  'num_employees',
      'type'  :  'int32'
    },
    {
      'name'  :  'country',
      'type'  :  'string',
      'facet' :  True
    }
  ],
  'default_sorting_field': 'num_employees'
}

client.collections.create(schema)
```

  </template>
  <template v-slot:Ruby>

```rb
schema = {
  'name'      => 'companies',
  'fields'    => [
    {
      'name'  => 'company_name',
      'type'  => 'string'
    },
    {
      'name'  => 'num_employees',
      'type'  => 'int32'
    },
    {
      'name'  => 'country',
      'type'  => 'string',
      'facet' => true
    }
  ],
  'default_sorting_field' => 'num_employees'
}

client.collections.create(schema)
```

  </template>
  <template v-slot:Dart>

```dart
final schema = Schema(
  'companies',
  {
    Field('company_name', type: Type.string),
    Field('num_employees',type: Type.int32),
    Field('country', type: Type.string, isFacetable: true),
  },
  defaultSortingField: Field('num_employees',type: Type.int32),
);

await client.collections.create(schema);
```

  </template>
  <template v-slot:Go>

```go
schema := &api.CollectionSchema{
  Name: "companies",
  Fields: []api.Field{
    {
      Name: "company_name",
      Type: "string",
    },
    {
      Name: "num_employees",
      Type: "int32",
    },
    {
      Name:  "country",
      Type:  "string",
      Facet: pointer.True(),
    },
  },
  DefaultSortingField: pointer.String("num_employees"),
}

client.Collections().Create(context.Background(), schema)
```

  </template>
  <template v-slot:Java>

```java
CollectionSchema collectionSchema = new CollectionSchema();

collectionschema.name("companies")
                .addFieldsItem(new Field().name("company_name").type(FieldTypes.STRING))
                .addFieldsItem(new Field().name("num_employees").type(FieldTypes.INT32))
                .addFieldsItem(new Field().name("country").type(FieldTypes.STRING).facet(true));

CollectionResponse collectionResponse = client.collections().create(collectionSchema);
```

  </template>
  <template v-slot:Swift>

```swift
let schema = CollectionSchema(
  name: "companies",
  fields: [
    Field(name: "company_name", type: "string"),
    Field(name: "num_employees", type: "int32"),
    Field(name: "country", type: "string", facet: true)
  ],
  defaultSortingField: "num_employees"
)
let (collectionResponse, response) = try await client.collections.create(schema: schema)
// collectionResponse is a CollectionResponse object and response refers to
// the HTTP response (URLResponse?) and can be used for debugging
```

  </template>
  <template v-slot:Shell>

```bash
curl "http://localhost:8108/collections" \
       -X POST \
       -H "Content-Type: application/json" \
       -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" \
       -d '{
         "name": "companies",
         "fields": [
           {"name": "company_name", "type": "string" },
           {"name": "num_employees", "type": "int32" },
           {"name": "country", "type": "string", "facet": true }
         ],
         "default_sorting_field": "num_employees"
       }'
```

  </template>
</Tabs>

See [Schema Parameters](#schema-parameters) for all available options, and [Field Types](#field-types) for all available data types.

**Sample Response**

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```json
{
  "name": "companies",
  "num_documents": 0,
  "fields": [
    {"name": "company_name", "type": "string" },
    {"name": "num_employees", "type": "int32" },
    {"name": "country", "type": "string", "facet": true }
  ],
  "default_sorting_field": "num_employees"
}
```

  </template>
</Tabs>

**Definition**

`POST ${TYPESENSE_HOST}/collections`

:::warning IMPORTANT NOTE & TIP
All fields you mention in a collection's schema will be indexed _in memory_.

There might be cases where you don't intend to search / filter / facet / group by a particular field and just want it to be stored (on disk) and returned as is when a document is a search hit.
For eg: you can store image URLs in every document that you might use when displaying search results, but you might not want to text-search the actual URLs.

You want to NOT mention these fields in the collection's schema or mark these fields as `index: false` (see `fields` [schema parameter](#schema-parameters) below) to mark it as an unindexed field.
You can have any number of these additional unindexed fields in the documents when adding them to a collection - they will just be stored on disk, and will not take up any memory.
:::

### With auto schema detection

If your field names are dynamic and not known upfront, or if you just want to keep things simple and index all fields you send in your documents by default,
auto-schema detection should help you.

You can define a wildcard field with the name `.*` and  type `auto` to let Typesense automatically
detect the type of the fields when you [add documents](./documents.md#index-a-single-document) to the collection.
In fact, you can use **any RegEx expression to define a field name**.

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```json
{
  "name": "companies",
  "fields": [
    {"name": ".*", "type": "auto" }
  ]
}
```

  </template>
</Tabs>

When a `.*` field is defined this way,  all the fields in a document are automatically indexed for **searching and filtering**.

#### Data Coercion

Say you've set `type: auto` for a particular field (or fields) (eg: `popularity_score`) in a collection and send the first document as:

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```json
{
  "title": "A Brief History of Time",
  "author": "Stephen Hawking",
  "popularity_score": 4200
}
```

  </template>
</Tabs>

Since `popularity_score` has `type: auto`, the data-type will automatically be set to `int64` internally.

What happens when the next document's `popularity_score` field is not an integer field, but a string? For eg:

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```json
{
  "title": "The Hunger Games",
  "author": "Suzanne Collins",
  "popularity_score": "4230"
}
```

  </template>
</Tabs>

_By default,_ Typesense will try to coerce (convert) the value to the previously inferred type.
So in this example, since the first document had a numeric data-type for `popularity_score`, the second document's `popularity_score` field will be coerced to an integer from string.

However, this may not always work - (for eg: say the value has alphabets, it can't be coerced to an integer).
In such cases, when Typesense is unable to coerce the field value to the previously inferred type, the indexing will fail with the appropriate error.

:::tip
You can control this default coercion behavior at write-time with the [`dirty_values`](./documents.md#dealing-with-dirty-data) parameter.
:::

#### Faceting fields with auto-schema detection

[Faceting](./search.md#facet-results) is not enabled for a wildcard field `{"name": ".*" , ...}`, since that can consume a lot of memory,
especially for large text fields. However, you can still explicitly define specific fields (with or without RegEx names) to facet by
setting `facet: true` for them.

For e.g, when you define a schema like this:

```json
{
  "name": "companies",
  "fields": [
    {
      "name": ".*_facet",
      "type": "auto",
      "facet": true
    }
  ]
}
```

This will only set field names that end with `_facet` in the document, as a facet.

#### `Geopoint` and auto-schema detection

A [`geopoint` field](#field-types) requires an explicit type definition, as the geo field value is represented as a 2-element
float field and we cannot differentiate between a lat/long definition and an actual float array.

#### Indexing all but some fields

If you have a case where you do want to index all fields in the document, except for a few fields, you can use the `{"index": false, "optional": true}` settings to exclude fields.

Note: it is not currently possible to have a mandatory field excluded from the indexing, hence the setting to optional.

For eg, if you want to index all fields, except for fields that start with `description_`, you can use a schema like this:

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```json
{
  "name": "companies",
  "fields": [
    {"name": ".*", "type": "auto" },
    {"name": ".*_facet", "type": "auto", "facet": true },
    {"name": "description_.*", "type": "string", "index": false, "optional": true },
    {"name": "country", "type": "string", "facet": true }
  ]
}
```

  </template>
</Tabs>

:::tip
You can mix auto-schema detection with explicit field definitions.

If an explicit definition is available for a field (`country` in the example above), Typesense will give
preference to that before falling back to the wildcard definition.

When such an explicit field definition is not available, the first document that contains a field with a given name
determines the type of that field.

For example, if you index a document with a field named `title` and it is a
string, then the next document that contains the field named `title` will be expected to have a string too.
:::

### Schema parameters

| Parameter             | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|:----------------------|:---------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name                  | yes      | Name of the collection you wish to create.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| fields                | yes      | A list of fields that you wish to index for [querying](./search.md#query-parameters), [filtering](./search.md#filter-results), [faceting](./search.md#facet-results), [grouping](./search.md#group-results) and [sorting](./search.md#sort-results). For each field, you have to specify at least it's `name` and [`type`](#field-types).<br><br> Eg: ```{"name": "title", "type": "string", "facet": false, "index": true}``` <br><br>`name` can be a simple string like `"name": "score"`. Or you can also use a RegEx to specify field names matching a pattern. For eg: if you want to specify that all fields starting with `score_` should be an integer, you can set name as `"name": "score_.*"`.<br><br>**Declaring a field as optional**<br>A field can be declared as optional by setting `"optional": true`.<br><br>**Declaring a field as a facet**<br>A field can be declared as a facetable field by setting `"facet": true`. Faceted fields are indexed verbatim without any tokenization or preprocessing. For example, if you are building a product search, `color` and `brand` could be defined as facet fields. Once a field is enabled for faceting in the schema, it can be used in the [`facet_by` search parameter](./search.md#facet-results)..<br><br>**Enabling stemming**<br>Stemming allows you to handle common word variations (singular / plurals, tense changes) of the same root word. For eg: searching for `walking`, will also return results with `walk`, `walked`, `walks`, etc when stemming is enabled. <br><br> Enable stemming on the contents of the field during indexing and querying by setting `"stem": true`. The actual value stored on disk is not affected. <br><br>We use the [Snowball stemmer](https://snowballstem.org/). Language selection for stemmer is automatically made from the value of the `locale` property associated with the field.<br><br>**Declaring a field as un-indexed**<br>You can set a field as un-indexed (you can't search/sort/filter/facet on it) by setting `"index": false`. This is useful when used along with [auto schema detection](#with-auto-schema-detection) and you need to [exclude certain fields from indexing](#indexing-all-but-some-fields).<br><br>**Prevent field from being stored on disk**:<br> Set `"store": false` to ensure that a field value is removed from the document before the document is saved to disk. <br><br>**Configuring language-specific tokenization:**<br> The default tokenizer that Typesense uses works for most languages, especially ones that separate words by spaces. However, based on feedback from users, we've added locale specific customizations for the following languages. You can enable these customizations for a field, by setting a field called `locale` inside the field definition. Eg: `{name: 'title', type: 'string', locale: 'ja'}` will enable the Japanese locale customizations for the field named `title`. <br><br>Here's the list of all language-specific customizations: <ul><li>`ja` - Japanese</li><li>`zh` - Chinese</li><li>`ko` - Korean</li><li>`th` - Thai</li><li>`el` - Greek</li><li>`ru` - Russian</li><li>`sr` - Serbian / Cyrillic</li><li>`uk` - Ukrainian</li><li>`be` - Belarusian</li> <li> For all other languages, you don't have to set the `locale` field.</li></ul> |
| token_separators      | no       | List of symbols or special characters to be used for splitting the text into individual words _**in addition**_ to space and new-line characters.<br><br> For e.g. you can add `-` (hyphen) to this list to make a word like `non-stick` to be split on hyphen and indexed as two separate words. <br><br> Read [this guide article](../../guide/tips-for-searching-common-types-of-data.md) for more examples on how to use this setting.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| symbols_to_index      | no       | List of symbols or special characters to be indexed. <br><br>For e.g. you can add `+` to this list to make the word `c++` indexable verbatim. <br><br>Read [this guide article](../../guide/tips-for-searching-common-types-of-data.md) for more examples on how to use this setting.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| default_sorting_field | no       | The name of an `int32 / float` field that determines the order in which the search results are ranked when a `sort_by` clause is not provided during searching. <br><br>This field must indicate some kind of popularity. For example, in a product search application, you could define `num_reviews` field as the `default_sorting_field` to rank products that have the most reviews higher by default.<br><br>Additionally, when a word in a search query matches multiple possible words (either during a prefix (partial word) search or because of a typo), this parameter is used to rank such equally matching records. <br><br>For e.g. Searching for "ap", will match records with "apple", "apply", "apart", "apron", or any of hundreds of similar words that start with "ap" in your dataset. Also, searching for "jofn", will match records with "john", "joan" and all similar variations that are 1-typo away in your dataset. <br><br>For performance reasons though, Typesense will only consider the top `4` prefixes or typo variations by default (the `4` is configurable using the [`max_candidates`](./search.md#ranking-and-sorting-parameters) search parameter, which defaults to `4`). <br><br>If `default_sorting_field` is NOT specified in the collection schema, then "top" is defined as the prefixes or typo variations with the most number of matching records. <br><br>But let's say you have a field called `popularity` in each record, and you want Typesense to use the value in that field to define the "top" records, you'd set that field as `default_sorting_field: popularity`. Typesense will then use the value of that field to fetch the top `max_candidates` number of terms that are most popular, and as users type in more characters, it will refine the search further to always rank the most popular prefixes highest.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

### Field parameters

| Parameter   | Required | Description                                                                                                                                |
|:------------|:---------|:-------------------------------------------------------------------------------------------------------------------------------------------|
| name        | yes      | Name of the field.                                                                                                                         |
| type        | yes      | The data type of the field (see the section below for a list of types).                                                                    |
| facet       | no       | Enables faceting on the field. Default: `false`.                                                                                           |
| optional    | no       | When set to `true`, the field can have empty, null or missing values. Default: `false`.                                                    |
| index       | no       | When set to `false`, the field will not be indexed in **any** in-memory index (e.g. search/sort/filter/facet).  Default: `true`.           |
| store       | no       | When set to `false`, the field value will not be stored on disk.  Default: `true`.                                                         |
| sort        | no       | When set to `true`, the field will be sortable.  Default: `true` for numbers, `false` otherwise.                                           |
| infix       | no       | When set to `true`, the field value can be infix-searched.  Incurs significant memory overhead. Default: `false`.                          |
| locale      | no       | For configuring language specific tokenization, e.g. `jp` for Japanese. Default: `en` which also broadly supports most European languages. |
| num_dim     | no       | Set this to a non-zero value to treat a field of type `float[]` as a vector field.                                                         |
| vec_dist    | no       | The distance metric to be used for vector search. Default: `cosine`. You can also use `ip` for inner product.                              |
| reference   | no       | Name of a field in another collection that should be linked to this collection so that it can be joined during query.                      |
| range_index | no       | Enables an index optimized for range filtering on numerical fields (e.g. `rating:>3.5`). Default: `false`.                                 |
| stem        | no       | Values are stemmed before indexing in-memory. Default: `false`.                                                                            |

### Field types

Typesense allows you to index the following types of fields:

| `type`       | Description                                                                                                                                                                    |
|:-------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `string`     | String values                                                                                                                                                                  |
| `string[]`   | Array of strings                                                                                                                                                               |
| `int32`      | Integer values up to 2,147,483,647                                                                                                                                             |
| `int32[]`    | Array of `int32`                                                                                                                                                               |
| `int64`      | Integer values larger than 2,147,483,647                                                                                                                                       |
| `int64[]`    | Array of `int64`                                                                                                                                                               |
| `float`      | Floating point / decimal numbers                                                                                                                                               |
| `float[]`    | Array of floating point / decimal numbers                                                                                                                                      |
| `bool`       | `true` or `false`                                                                                                                                                              |
| `bool[]`     | Array of booleans                                                                                                                                                              |
| `geopoint`   | Latitude and longitude specified as `[lat, lng]`. Read more [here](geosearch.md).                                                                                              |
| `geopoint[]` | Arrays of Latitude and longitude specified as `[[lat1, lng1], [lat2, lng2]]`. Read more [here](geosearch.md).                                                                  |
| `object`     | Nested objects. Read more [here](#indexing-nested-fields).                                                                                                                     |
| `object[]`   | Arrays of nested objects. Read more [here](#indexing-nested-fields).                                                                                                           |
| `string*`    | Special type that automatically converts values to a `string` or `string[]`.                                                                                                   |
| `image`      | Special type that is used to indicate a base64 encoded string of an image used for [Image search](./image-search.md).                                                          |
| `auto`       | Special type that automatically attempts to infer the data type based on the documents added to the collection. See [automatic schema detection](#with-auto-schema-detection). |

### Cloning a collection schema

Here's how you can clone an existing collection's schema (documents are not copied), overrides and synonyms.

```shell
curl -k "http://localhost:8108/collections?src_name=existing_coll" -X POST -H "Content-Type: application/json" \
      -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" -d '{
        "name": "new_coll"
      }'
```

The above API call will create a new collection called `new_coll` that contains the schema, overrides and synonyms of
the collection `existing_coll`. The actual documents in the `existing_coll` collection are **not** copied,
so this is primarily useful for creating new collections from an existing reference template.

:::tip
Cloning a collection this way, does **not** copy the data.
:::

### Adding metadata to schema

If you wish, you could populate a `metadata` object to the schema while creating a collection to add
details about the collection, for e.g. when it was created, who created it etc.

```json
{
  "name": "docs",
  "enable_nested_fields": true,
  "fields": [
    {
      "name": "title",
      "type": "string",
      "facet": true
    }
  ],
  "metadata": {
    "batch_job": 325,
    "indexed_from": "2023-04-20T00:00:00.000Z"
  }
}
```

The fields within the `metadata` object are persisted and returned in the `GET /collections` end-point.

### Notes on indexing common types of data

Here's how to index other common types of data, using the basic primitives in the table above:

- [Nested fields / objects](#indexing-nested-fields)
- [Dates](#indexing-dates)
- [Other Types](#indexing-other-types-of-data)

#### Indexing nested fields

Typesense supports indexing nested objects (and array of objects) from `v0.24`.

You must first enable nested fields at a collection level via the `enable_nested_fields` schema property, and the `object` or `object[]` data type:

```shell{4,6-7}
curl -k "http://localhost:8108/collections" -X POST -H "Content-Type: application/json" \
      -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" -d '{
        "name": "docs",
        "enable_nested_fields": true,
        "fields": [
          {"name": "person", "type": "object"},
          {"name": "details", "type": "object[]"}
        ]
      }'
```

When you now search on an object field name, all sub-fields will be automatically searched. Use a dot notation to refer to specific sub-fields, e.g. `person.last_name` or `person.school.name`.

You can also index specific sub-fields within a nested object. For eg, if your document looks like this:

```json{7}
{
  "id": 1,
  "name": "Jack",
  "address": {
    "line_1": "111 1st Street",
    "city": "Alpha",
    "zip": "98765"
  }
}
```

And say you only want to index the `zip` field inside the `address` nested object, without indexing other fields like `line_1`, you can specify this in the schema like this:

```shell{7}
curl -k "http://localhost:8108/collections" -X POST -H "Content-Type: application/json" \
      -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" -d '{
        "name": "docs",
        "enable_nested_fields": true,
        "fields": [
          {"name": "name", "type": "string"},
          {"name": "address.zip", "type": "string"}
        ]
      }'
```

To index specific fields inside an array of objects, you want to specify an **array data type**. For eg, if your document looks like this:

```json{8,13}
{
  "id": 1,
  "name": "Jack",
  "addresses": [
    {
      "line_1": "111 1st Street",
      "city": "Alpha",
      "zip": "98765"
    },
    {
      "line_1": "222 2nd Street",
      "city": "Zeta",
      "zip": "45678"
    }
  ]
}
```

And say you only want to index the `zip` field inside each address object in the `addresses` array of objects, without indexing other fields, you can specify this in the schema like this:


```shell{7}
curl -k "http://localhost:8108/collections" -X POST -H "Content-Type: application/json" \
      -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" -d '{
        "name": "docs",
        "enable_nested_fields": true,
        "fields": [
          {"name": "name", "type": "string"},
          {"name": "addresses.zip", "type": "string[]"}
        ]
      }'
```

:::warning Note
If there are overlapping definitions for nested fields at different levels of the nested hierarchy, the broader definition will take precedence over the definition for a sub-field.
:::

**Indexing nested objects via flattening**

You can also flatten objects and arrays of objects into top-level keys before sending the data into Typesense.

For example, a document like this containing nested objects:

```json
{
  "nested_field": {
    "field1": "value1",
    "field2": ["value2", "value3", "value4"],
    "field3": {
      "fieldA": "valueA",
      "fieldB": ["valueB", "valueC", "valueD"]
    }
  }
}
```

would need to be flattened as:

```json
{
  "nested_field.field1": "value1",
  "nested_field.field2":  ["value2", "value3", "value4"],
  "nested_field.field3.fieldA": "valueA",
  "nested_field.field3.fieldB": ["valueB", "valueC", "valueD"]
}
```

before indexing it into Typesense.

To simplify traversing the data in the results, you might want to send both the flattened and unflattened version of the nested fields into Typesense,
and only set the flattened keys as indexed in the collection's schema and use them for search/filtering/faceting.
At display time when parsing the results, you can then use the nested version.

#### Indexing Dates

Dates need to be converted into [Unix timestamps](https://en.wikipedia.org/wiki/Unix_time) and stored as `int64` fields in Typesense.
Most languages have libraries that help do this conversion for you.

You'll then be able to use numerical operators like `<`, `>`, etc to filter records that are before or after or between dates.

#### Indexing other types of data

Read our dedicated guide article on how to index other common types of data like emails, phone numbers, SKUs, model numbers, etc [here](../../guide/tips-for-searching-common-types-of-data.md).

## Retrieve a collection
Retrieve the details of a collection, given its name.

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Java','Go','Swift','Shell']">
  <template v-slot:JavaScript>

```js
client.collections('companies').retrieve()
```

  </template>

  <template v-slot:PHP>

```php
$client->collections['companies']->retrieve();
```

  </template>
  <template v-slot:Python>

```py
client.collections['companies'].retrieve()
```

  </template>
  <template v-slot:Ruby>

```rb
client.collections['companies'].retrieve
```

  </template>
  <template v-slot:Dart>

```dart
await client.collection('companies').retrieve();
```

  </template>
  <template v-slot:Java>

```java
CollectionResponse collection = client.collections("companies").retrieve();
```

  </template>
  <template v-slot:Go>

```go
client.Collection("companies").Retrieve(context.Background())
```

  </template>
  <template v-slot:Swift>

```swift
let (collectionResponse, response) = try await client.collection(name: "companies").retrieve()
```

  </template>
  <template v-slot:Shell>

```bash
curl -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" \
     -X GET \
    "http://localhost:8108/collections/companies"
```

  </template>
</Tabs>

**Sample Response**

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```json
{
  "name": "companies",
  "num_documents": 1250,
  "fields": [
    {"name": "company_name", "type": "string"},
    {"name": "num_employees", "type": "int32"},
    {"name": "country", "type": "string", "facet": true}
  ],
  "default_sorting_field": "num_employees"
}
```

  </template>
</Tabs>

**Definition**
`GET ${TYPESENSE_HOST}/collections/:collection`

## List all collections
Returns a summary of all your collections. The collections are returned sorted by creation date, with the most recent collections appearing first.

:::tip
By default, ALL collections are returned, but you can use the `offset` and `limit` parameters to paginate on the
collection listing.

You can also set `exclude_fields=fields` to exclude the field definitions from being returned in the response.
:::

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Java','Go','Swift','Shell']">
  <template v-slot:JavaScript>

```js
client.collections().retrieve()
```

  </template>

  <template v-slot:PHP>

```php
$client->collections->retrieve();
```

  </template>
  <template v-slot:Python>

```py
client.collections.retrieve()
```

  </template>
  <template v-slot:Ruby>

```rb
client.collections.retrieve
```

  </template>
  <template v-slot:Dart>

```dart
await client.collections.retrieve();
```

  </template>
  <template v-slot:Java>

```java
CollectionResponse[] collectionResponses = client.collections().retrieve();
```

  </template>
  <template v-slot:Go>

```go
client.Collections().Retrieve(context.Background())
```

  </template>
  <template v-slot:Swift>

```swift
let (collections, response) = try await client.collections().retrieveAll()
// collections is of type [CollectionResponse]
```

  </template>
  <template v-slot:Shell>

```bash
curl -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" \
    "http://localhost:8108/collections"
```

  </template>
</Tabs>

**Sample Response**

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```json
[
  {
    "num_documents": 1250,
    "name": "companies",
    "fields": [
      {"name": "company_name", "type": "string"},
      {"name": "num_employees", "type": "int32"},
      {"name": "country", "type": "string", "facet": true}
    ],
    "default_sorting_field": "num_employees"
  },
  {
    "num_documents": 1250,
    "name": "ceos",
    "fields": [
      {"name": "company_name", "type": "string"},
      {"name": "full_name", "type": "string"},
      {"name": "from_year", "type": "int32"}
    ],
    "default_sorting_field": "from_year"
  }
]
```

  </template>
</Tabs>

**Definition**
`GET ${TYPESENSE_HOST}/collections`

## Drop a collection
Permanently drops a collection. This action cannot be undone. For large collections, this might have an impact on read latencies.

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Java','Go','Swift','Shell']">
  <template v-slot:JavaScript>

```js
client.collections('companies').delete()
```

  </template>

  <template v-slot:PHP>

```php
$client->collections['companies']->delete();
```

  </template>
  <template v-slot:Python>

```py
client.collections['companies'].delete()
```

  </template>
  <template v-slot:Ruby>

```rb
client.collections['companies'].delete
```

  </template>
  <template v-slot:Dart>

```dart
await client.collection('companies').delete();
```

  </template>
 <template v-slot:Java>

```java
CollectionResponse collectionResponse = client.collections("companies").delete();
```

  </template>
  <template v-slot:Go>

```go
client.Collection("companies").Delete(context.Background())
```

  </template>
  <template v-slot:Swift>

```swift
let (collectionResponse, response) = try await client.collection(name: "companies").delete()
```

  </template>

  <template v-slot:Shell>

```bash
curl -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" \
     -X DELETE \
    "http://localhost:8108/collections/companies"
```

  </template>
</Tabs>

**Sample Response**

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```json
{
  "name": "companies",
  "num_documents": 1250,
  "fields": [
    {"name": "company_name", "type": "string"},
    {"name": "num_employees", "type": "int32"},
    {"name": "country", "type": "string", "facet": true}
  ],
  "default_sorting_field": "num_employees"
}
```

  </template>
</Tabs>

When a collection is dropped, we perform a disk compaction operation which reclaims the disk space used by the
deleted collection. However, if you are managing a large number of collections and need to drop collections
frequently, you can disable this compaction to improve the performance of the drop operation
via the `compact_store` GET parameter. You can still do a full database compaction
via the [API](../api/cluster-operations.md#compacting-the-on-disk-database).

**Definition**
`DELETE ${TYPESENSE_HOST}/collections/:collection`

## Update or alter a collection

Typesense supports adding or removing fields to a collection's schema in-place.

:::tip
Typesense supports updating all fields **except** the `id` field (since it's a special field within Typesense).
:::

Let's see how we can add a new `company_category` field to the `companies` collection and also drop the existing
`num_employees` field.

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Java','Go','Swift','Shell']">
  <template v-slot:JavaScript>

```js
update_schema = {
  "fields":[
    {"name":"num_employees", "drop": true},
    {"name":"company_category", "type":"string"}
  ]
}
client.collections('companies').update(update_schema)
```

  </template>

  <template v-slot:PHP>

```php
$update_schema = [
  'fields'    => [
    [
      'name'  => 'num_employees',
      'drop'  => true
    ],
    [
      'name'  => 'company_category',
      'type'  => 'string'
    ]
  ]
];
$client->collections['companies']->update($update_schema);
```

</template>
<template v-slot:Python>

```py
update_schema = {
  'fields': [
    {
      'name'  :  'num_employees',
      'drop'  :  True
    },
    {
      'name'  :  'company_category',
      'type'  :  'string'
    }
  ]
}
client.collections['companies'].update(update_schema)
```

</template>
<template v-slot:Ruby>

```rb
update_schema = {
  'fields'    => [
    {
      'name'  => 'num_employees',
      'drop'  => true
    },
    {
      'name'  => 'company_category',
      'type'  => 'string'
    }
  ]
}
client.collections['companies'].update(update_schema)
```

</template>
<template v-slot:Dart>

```dart
final updateSchema = UpdateSchema(
  {
    Field('num_employees', drop: true),
    Field('company_category', Type.string)
  }
);
await client.collection('companies').update(updateSchema);
```

</template>
<template v-slot:Java>

```java
CollectionUpdateSchema updateSchema = new CollectionUpdateSchema();
updateSchema.addFieldsItem(new Field().name("num_employees").drop(true))
            .addFieldsItem(new Field().name("company_category").type(FieldTypes.STRING));
client.collections("companies").update(updateSchema);
```

</template>
<template v-slot:Go>

```go
updateSchema := &api.CollectionUpdateSchema{
  Fields: []api.Field{
    {Name: "num_employees", Drop: pointer.True()},
    {Name: "company_category", Type: "string"},
  },
}

client.Collection("companies").Update(context.Background(), updateSchema)
```

</template>
<template v-slot:Swift>

```swift
let updateSchema = CollectionUpdateSchema(
  fields: [
    Field(name: "num_employees", drop: true),
    Field(name: "company_category", type: "string")
  ]
)
try await client.collections.update(updateSchema: updateSchema)
```

</template>

<template v-slot:Shell>

```bash
curl "http://localhost:8108/collections/companies" \
       -X PATCH \
       -H "Content-Type: application/json" \
       -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" \
       -d '{
         "fields": [
           {"name": "num_employees", "drop": true },
           {"name": "company_category", "type": "string" }
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
   "fields": [
      {
         "drop": true,
         "name": "num_employees"
      },
      {
         "name": "company_category",
         "facet": false,
         "index": true,
         "infix": false,
         "locale": "",
         "optional": false,
         "sort": false,
         "type": "string"
      }
   ]
}
```

  </template>
</Tabs>

:::tip
Dropping a field affects only the schema and the in-memory index;
it does not remove the data associated with that field from the existing documents stored on disk.
In Typesense, documents can contain additional fields not explicitly defined in the schema.

To permanently remove a field and its data from a document, you must update the document directly, by passing `null`
to the field you want to remove.
:::

**Definition**
`PATCH ${TYPESENSE_HOST}/collections/:collection`

:::warning
The schema update operation is a synchronous **blocking** operation.

When a schema update is in progress, all incoming writes to _that particular collection_ will wait for the schema update operation to finish.
In a multi-node HA cluster, the schema update is executed on all nodes in the cluster in parallel. So writes will be blocked across the entire cluster while the schema update is in progress.
Given this, we recommend updating fields one at a time, especially for large collections and during off-peak hours.

Reads will be serviced as usual, without blocking.

Alternatively, you can also use the [alias feature](#using-an-alias) to do zero downtime schema changes.
:::

:::warning
Only one alter operation can be in progress at a time for a given cluster.

Since the alter operation can take a long time, this ensures that a client with a short default time-out does
not end up retrying the same alter request.
:::

The update operation consists of an initial validation step where the records on-disk are assessed to ensure
that they are compatible with the proposed schema change. For example, let's say there is a `string` field `A` which
is already present in the documents on-disk but is not part of the schema. If you try to update the collection
schema by adding a field `A` with type `integer`, the validation step will reject this change as it's incompatible
with the type of data already present.

If the validation is successful, the actual schema change is done and the records are
indexed / re-indexed / dropped as per the requested change. The process is complete as soon as the API call
returns (make sure you use a large client timeout value). Because of the blocking nature of the update, we
recommend doing the change during off-peak hours.

Alternatively, you can also use the [alias feature](#using-an-alias) to do zero downtime schema changes.

### Modifying an existing field

Since Typesense currently only supports adding/deleting a field, any modifications to an existing field should be
expressed as a drop + add operation. All fields **except** the `id` field can be modified.

For example, to add a `facet` property to the `company_category` field, we will drop + add it in the same change set:

```bash
curl "http://localhost:8108/collections/companies" \
       -X PATCH \
       -H "Content-Type: application/json" \
       -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" \
       -d '{
         "fields": [
           {"name": "company_category", "drop": true },
           {"name": "company_category", "type": "string", "facet": true }
         ]
       }'
```

### Using an alias

If you need to do zero-downtime schema changes, you could also re-create the collection fully with the updated schema and use
the [Collection Alias](./collection-alias.md) feature to do a zero-downtime switch over to the new collection:

Let's say you have a collection called `movies_jan_1` that you want to change the schema for.

1. First [create an alias](./collection-alias.md#create-or-update-an-alias) pointing to your collection. For eg: create an alias called `movies` pointing to `movies_jan_1`. Use this collection alias in your application to search / index documents in your collection.
2. Create a **new** timestamped collection with the updated collection schema. For eg: `movies_feb_1`.
3. In your application, temporarily write to both the old collection and also to the new collection in parallel - essentially dual writes. Eg: Send writes both to the `movies_jan_1` collection and also to the new `movies_feb_1` collection.
4. Now, upsert the data from your primary database into the new collection. Eg `movies_feb_1`.
5. [Update the collection alias](./collection-alias.md#create-or-update-an-alias) to now point to the new collection. Eg: Update `movies` to now point to `movies_feb_1`.
6. Stop your application from sending writes to the old collection and [drop the old collection](#drop-a-collection), `movies_jan_1` in our example.

Once you update the alias, any search / indexing operations will go to the new collection (eg: `movies_feb_1`)
without you having to do any additional application-side changes.

### Dynamic field additions

If you only need to _add_ new fields to the schema on the fly, we recommend using [auto-schema detection](#with-auto-schema-detection)
when creating the collection. You can essentially define RegEx field names and when documents containing
new field names that match the RegEx come in, the new fields will automatically be added to the schema.
