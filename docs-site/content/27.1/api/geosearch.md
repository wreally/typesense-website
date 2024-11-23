---
sidebarDepth: 2
sitemap:
  priority: 0.7
---

# Geosearch

Typesense supports geo search on fields containing latitude and longitude values, specified as the `geopoint` or `geopoint[]` [field types](./collections.md#field-types).

Let's create a collection called `places` with a field called `location` of type `geopoint`.

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Java','Go','Shell']">
  <template v-slot:JavaScript>

```js
let schema = {
  'name': 'places',
  'fields': [
    {
      'name': 'title',
      'type': 'string'
    },
    {
      'name': 'points',
      'type': 'int32'
    },
    {
      'name': 'location',
      'type': 'geopoint'
    }
  ],
  'default_sorting_field': 'points'
}

client.collections().create(schema)
```

  </template>

<template v-slot:PHP>

```php
$schema = [
  'name'      => 'places',
  'fields'    => [
    [
      'name'  => 'title',
      'type'  => 'string'
    ],
    [
      'name'  => 'points',
      'type'  => 'int32'
    ],
    [
      'name'  => 'location',
      'type'  => 'geopoint'
    ]
  ],
  'default_sorting_field' => 'points'
];

$client->collections->create($schema);
```

  </template>

<template v-slot:Python>

```py
schema = {
  'name': 'places',
  'fields': [
    {
      'name'  :  'title',
      'type'  :  'string'
    },
    {
      'name'  :  'points',
      'type'  :  'int32'
    },
    {
      'name'  :  'location',
      'type'  :  'geopoint'
    }
  ],
  'default_sorting_field': 'points'
}

client.collections.create(schema)
```

  </template>

<template v-slot:Ruby>

```rb
schema = {
  'name'      => 'places',
  'fields'    => [
    {
      'name'  => 'title',
      'type'  => 'string'
    },
    {
      'name'  => 'points',
      'type'  => 'int32'
    },
    {
      'name'  => 'location',
      'type'  => 'geopoint'
    }
  ],
  'default_sorting_field' => 'points'
}

client.collections.create(schema)
```

  </template>
  <template v-slot:Dart>

```dart
final schema = Schema(
  'places',
  {
    Field('title', Type.string),
    Field('points', Type.int32),
    Field('location', Type.geopoint),
  },
  defaultSortingField: Field('points', Type.int32),
);

await client.collections.create(schema);
```

  </template>
<template v-slot:Java>

```java
CollectionSchema collectionSchema = new CollectionSchema();

collectionschema.name("places")
                .addFieldsItem(new Field().name("title").type("string"))
                .addFieldsItem(new Field().name("points").type("int32"))
                .addFieldsItem(new Field().name("location").type("geopoint"))
                .defaultSortingField("points");

CollectionResponse collectionResponse = client.collections().create(collectionSchema);
```

  </template>
<template v-slot:Go>

```go
schema := &api.CollectionSchema{
  Name: "places",
  Fields: []api.Field{
    {
      Name: "title",
      Type: "string",
    },
    {
      Name: "points",
      Type: "int32",
    },
    {
      Name: "location",
      Type: "geopoint",
    },
  },
  DefaultSortingField: pointer.String("points"),
}

client.Collections().Create(context.Background(), schema)
```

  </template>
  <template v-slot:Shell>

```bash
curl -k "http://localhost:8108/collections" -X POST
      -H "Content-Type: application/json" \
      -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" -d '{
        "name": "places",
        "fields": [
          {"name": "title", "type": "string" },
          {"name": "points", "type": "int32" },
          {"name": "location", "type": "geopoint"}
        ],
        "default_sorting_field": "points"
      }'
```

  </template>
</Tabs>

Let's now index a document.

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Java','Shell']">
  <template v-slot:JavaScript>

```js
let document = {
  'title': 'Louvre Museuem',
  'points': 1,
  'location': [48.86093481609114, 2.33698396872901]
}

client.collections('places').documents().create(document)
```

  </template>

<template v-slot:PHP>

```php
$document = [
  'title'   => 'Louvre Museuem',
  'points'  => 1,
  'location' => array(48.86093481609114, 2.33698396872901)
];

$client->collections['places']->documents->create($document);
```

  </template>

<template v-slot:Python>

```py
document = {
  'title': 'Louvre Museuem',
  'points': 1,
  'location': [48.86093481609114, 2.33698396872901]
}

client.collections['places'].documents.create(document)
```

  </template>

<template v-slot:Ruby>

```rb
document = {
  'title'    =>   'Louvre Museuem',
  'points'   =>   1,
  'location' =>  [48.86093481609114, 2.33698396872901]
}

client.collections['places'].documents.create(document)
```

  </template>
  <template v-slot:Dart>

```dart
final document = {
  'title': 'Louvre Museuem',
  'points': 1,
  'location': [48.86093481609114, 2.33698396872901]
};

await client.collection('places').documents.create(document};
```

  </template>

  <template v-slot:Java>

```java
HaashMap<String, Object> document = new HashMap<>();
float[] location =  {48.86093481609114, 2.33698396872901}

document.add("title", "Louvre Museuem");
document.add("points", 1);
document.add("location", location);

client.collection("places").documents.create(document);
```

  </template>

  <template v-slot:Shell>

```bash
curl "http://localhost:8108/collections/places/documents" -X POST \
        -H "Content-Type: application/json" \
        -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" \
        -d '{"points":1,"title":"Louvre Museuem", "location": [48.86093481609114, 2.33698396872901]}'
```

  </template>
</Tabs>

:::warning NOTE
Make sure to set the coordinates in the correct order: `[Latitude, Longitude]`. GeoJSON often uses `[Longitude, Latitude]` which is invalid!
:::

## Searching within a Radius

We can now search for places within a given radius of a given latlong
(use `mi` for miles and `km` for kilometers) using the `filter_by` search parameter.

In addition, let's also sort the records that are closest to a given
location (this location can be the same or different from the latlong used for filtering).

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart','Java','Go','Shell']">
  <template v-slot:JavaScript>

```js
let searchParameters = {
  'q'         : '*',
  'query_by'  : 'title',
  'filter_by' : 'location:(48.90615915923891, 2.3435897727061175, 5.1 km)',
  'sort_by'   : 'location(48.853, 2.344):asc'
}

client.collections('companies').documents().search(searchParameters)
```

  </template>

<template v-slot:PHP>

```php
$searchParameters = [
  'q'         => '*',
  'query_by'  => 'title',
  'filter_by' => 'location:(48.90615915923891, 2.3435897727061175, 5.1 km)',
  'sort_by'   => 'location(48.853, 2.344):asc'
];

$client->collections['companies']->documents->search($searchParameters);
```

  </template>

<template v-slot:Python>

```py
search_parameters = {
  'q'         : '*',
  'query_by'  : 'title',
  'filter_by' : 'location:(48.90615915923891, 2.3435897727061175, 5.1 km)',
  'sort_by'   : 'location(48.853, 2.344):asc'
}

client.collections['companies'].documents.search(search_parameters)
```

  </template>

<template v-slot:Ruby>

```rb
search_parameters = {
  'q'         => '*',
  'query_by'  => 'title',
  'filter_by' => 'location:(48.90615915923891, 2.3435897727061175, 5.1 km)',
  'sort_by'   => 'location(48.853, 2.344):asc'
}

client.collections['companies'].documents.search(search_parameters)
```

  </template>
  <template v-slot:Dart>

```dart
final searchParameters = {
  'q'         : '*',
  'query_by'  : 'title',
  'filter_by' : 'location:(48.90615915923891, 2.3435897727061175, 5.1 km)',
  'sort_by'   : 'location(48.853, 2.344):asc'
};

client.collections('companies').documents().search(searchParameters)
```

  </template>
  <template v-slot:Java>

```java
SearchParameters searchParameters = new SearchParameters()
                                        .q("*")
                                        .queryBy("title")
                                        .filterBy("location:(48.90615915923891, 2.3435897727061175, 5.1 km)")
                                        .sortBy("location(48.853, 2.344):asc");
SearchResult searchResult = client.collections("places").documents().search(searchParameters);
```

  </template>
  <template v-slot:Go>

```go
searchParameters := &api.SearchCollectionParams{
  Q:        pointer.String("*"),
  QueryBy:  pointer.String("title"),
  FilterBy: pointer.String("location:(48.90615915923891, 2.3435897727061175, 5.1 km)"),
  SortBy:   pointer.String("location(48.853, 2.344):asc"),
}

client.Collection("places").Documents().Search(context.Background(), searchParameters)
```

  </template>
  <template v-slot:Shell>

```bash
curl -G -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" \
  --data-urlencode 'q=*' \
  --data-urlencode 'query_by=title' \
  --data-urlencode 'filter_by=location:(48.853,2.344,5.1 km)' \
  --data-urlencode 'sort_by=location(48.853, 2.344):asc' \
'http://localhost:8108/collections/places/documents/search'
```

  </template>
</Tabs>

**Sample Response**

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```json
{
  "facet_counts": [],
  "found": 1,
  "hits": [
    {
      "document": {
        "id": 0,
        "location": [48.86093481609114, 2.33698396872901],
        "points": 1,
        "title": "Louvre Museuem"
      },
      "geo_distance_meters": {"location": 1020},
      "highlights": [],
      "text_match": 16737280
    }
  ],
  "out_of": 1,
  "page": 1,
  "request_params": {"collection_name": "places", "per_page": 10, "q": "*"},
  "search_time_ms": 0
}
```

  </template>
</Tabs>

The above example uses "5.1 km" as the radius, but you can also use miles, e.g.
`location:(48.90615915923891, 2.3435897727061175, 2 mi)`.

## Searching Within a Geo Polygon

You can also filter for documents within any arbitrary shaped polygon.

You want to specify the geo-points of the polygon as lat, lng pairs.

```shell
'filter_by' : 'location:(48.8662, 2.3255, 48.8581, 2.3209, 48.8561, 2.3448, 48.8641, 2.3469)'
```

## Sorting by Additional Attributes within a Radius

### exclude_radius

Sometimes, it's useful to sort nearby places within a radius based on another attribute like `popularity`, and then sort by distance outside this radius.
You can use the `exclude_radius` option for that.

```shell
'sort_by' : 'location(48.853, 2.344, exclude_radius: 2mi):asc, popularity:desc'
```

This makes all documents within a 2 mile radius to "tie" with the same value for distance.
To break the tie, these records will be sorted by the next field in the list `popularity:desc`.
Records outside the 2 mile radius are sorted first on their distance and then on `popularity:desc` as usual.

### precision

Similarly, you can bucket all geo points into "groups" using the `precision` parameter, so that all results within this group will have the same "geo distance score".

```shell
'sort_by' : 'location(48.853, 2.344, precision: 2mi):asc, popularity:desc'
```

This will bucket the results into 2-mile groups and force records within each bucket into a tie for "geo score", so that the popularity metric can be used to tie-break and sort results within each bucket.