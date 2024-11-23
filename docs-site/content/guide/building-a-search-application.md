# Build A Search Application

Now that you have Typesense [installed and running](./install-typesense.md), we're now ready to create a Typesense collection, index some documents in it and try searching for them.

## Sample Dataset

To follow along, [download](https://dl.typesense.org/datasets/books.jsonl.gz) this small dataset that we've put together for this walk-through.

```shell
cd /tmp
curl -O https://dl.typesense.org/datasets/books.jsonl.gz
gunzip books.jsonl.gz
```

This should give you a file called `books.jsonl` which we'll use below.

## Initializing the client
Let's begin by configuring the Typesense client by pointing it to a Typesense node.

- Be sure to use the same API key that you used to [start the Typesense server](./install-typesense.md#🎬-start) earlier.
- Or if you're using [Typesense Cloud](./install-typesense.md#option-1-typesense-cloud), click on the "Generate API key" button on the cluster page. This will give you a set of hostnames and API keys to use.

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Java','Go','Shell']">
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
  'nodes': [{
    'host': 'localhost', // For Typesense Cloud use xxx.a1.typesense.net
    'port': 8108,      // For Typesense Cloud use 443
    'protocol': 'http'   // For Typesense Cloud use https
  }],
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
    'api_key'         => '<API_KEY>',
    'nodes'           => [
      [
        'host'     => 'localhost', // For Typesense Cloud use xxx.a1.typesense.net
        'port'     => '8108',      // For Typesense Cloud use 443
        'protocol' => 'http',      // For Typesense Cloud use https
      ],
    ],
    'connection_timeout_seconds' => 2,
  ]
);
```

  </template>
  <template v-slot:Python>

```py
import typesense

client = typesense.Client({
  'nodes': [{
    'host': 'localhost', # For Typesense Cloud use xxx.a1.typesense.net
    'port': '8108',      # For Typesense Cloud use 443
    'protocol': 'http'   # For Typesense Cloud use https
  }],
  'api_key': '<API_KEY>',
  'connection_timeout_seconds': 2
})
```

  </template>
  <template v-slot:Ruby>

```rb
require 'typesense'

client = Typesense::Client.new(
  nodes: [{
    host:     'localhost', # For Typesense Cloud use xxx.a1.typesense.net
    port:     8108,        # For Typesense Cloud use 443
    protocol: 'http'       # For Typesense Cloud use https
  }],
  api_key:  '<API_KEY>',
  connection_timeout_seconds: 2
)
```

  </template>
  <template v-slot:Java>

```java
ArrayList<Node> nodes = new ArrayList<>();
nodes.add(
  new Node(
    "http",       // For Typesense Cloud use https
    "localhost",  // For Typesense Cloud use xxx.a1.typesense.net
    "8108"        // For Typesense Cloud use 443
  )
);

Configuration configuration = new Configuration(nodes, Duration.ofSeconds(2),"<API_KEY>");

Client client = new Client(configuration);
```

  </template>
  <template v-slot:Go>

```go
import (
  "github.com/typesense/typesense-go/v2/typesense"
  "github.com/typesense/typesense-go/v2/typesense/api"
  "github.com/typesense/typesense-go/v2/typesense/api/pointer"
)

client := typesense.NewClient(
    typesense.WithNodes([]string{
      // For Typesense Cloud use "https://xxx-1.a1.typesense.net:443"
      "http://localhost:8108",
    }),
    typesense.WithAPIKey("<API_KEY>"),
    typesense.WithConnectionTimeout(2*time.Second),
)
```

  </template>
  <template v-slot:Shell>

```bash
export TYPESENSE_API_KEY='<API_KEY>'
export TYPESENSE_HOST='http://localhost:8108'

# For Typesense Cloud use:
# export TYPESENSE_HOST='https://xxx.a1.typesense.net'
```

  </template>
</Tabs>

That's it - we're now ready to start interacting with the Typesense server.

## Creating a "books" collection
In Typesense, a [`Collection`](../latest/api/collections.md) is a group of related [`Documents`](../latest/api/documents.md) that is roughly equivalent to a table in a relational database. When we create a collection, we give it a name and describe the fields that will be indexed when a document is added to the collection.

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Java','Go','Shell']">
  <template v-slot:JavaScript>

```js
let booksSchema = {
  'name': 'books',
  'fields': [
    {'name': 'title', 'type': 'string' },
    {'name': 'authors', 'type': 'string[]', 'facet': true },

    {'name': 'publication_year', 'type': 'int32', 'facet': true },
    {'name': 'ratings_count', 'type': 'int32' },
    {'name': 'average_rating', 'type': 'float' }
  ],
  'default_sorting_field': 'ratings_count'
}

client.collections().create(booksSchema)
  .then(function (data) {
    console.log(data)
  })
```

  </template>

  <template v-slot:PHP>

```php
$booksSchema = [
  'name' => 'books',
  'fields' => [
    ['name' => 'title', 'type' => 'string'],
    ['name' => 'authors', 'type' => 'string[]', 'facet' => true],

    ['name' => 'publication_year', 'type' => 'int32', 'facet' => true],
    ['name' => 'ratings_count', 'type' => 'int32'],
    ['name' => 'average_rating', 'type' => 'float']
  ],
  'default_sorting_field' => 'ratings_count'
];

$client->collections->create($booksSchema);
```

  </template>
  <template v-slot:Python>

```py
import typesense

books_schema = {
  'name': 'books',
  'fields': [
    {'name': 'title', 'type': 'string' },
    {'name': 'authors', 'type': 'string[]', 'facet': True },

    {'name': 'publication_year', 'type': 'int32', 'facet': True },
    {'name': 'ratings_count', 'type': 'int32' },
    {'name': 'average_rating', 'type': 'float' }
  ],
  'default_sorting_field': 'ratings_count'
}

client.collections.create(books_schema)
```

  </template>
  <template v-slot:Ruby>

```rb
require 'typesense'

books_schema = {
  'name' => 'books',
  'fields' => [
    {'name' => 'title', 'type' => 'string' },
    {'name' => 'authors', 'type' => 'string[]', 'facet' => true },

    {'name' => 'publication_year', 'type' => 'int32', 'facet' => true },
    {'name' => 'ratings_count', 'type' => 'int32' },
    {'name' => 'average_rating', 'type' => 'float' }
  ],
  'default_sorting_field' => 'ratings_count'
}

client.collections.create(books_schema)
```

  </template>
  <template v-slot:Java>

```java
CollectionSchema collectionSchema = new CollectionSchema();
collectionSchema.name("books").defaultSortingField("ratings_count")
                .addFieldsItem(new Field().name("title").type("string"))
                .addFieldsItem(new Field().name("authors").type("string[]").facet(true))
                .addFieldsItem(new Field().name("publication_year").type("string").facet(true))
                .addFieldsItem(new Field().name("ratings_count").type("int32"))
                .addFieldsItem(new Field().name("average_rating").type("float"));

CollectionResponse collectionResponse = client.collections().create(collectionSchema);

```

  </template>
  <template v-slot:Go>

```go
booksSchema := &api.CollectionSchema{
  Name: "companies",
  Fields: []api.Field{
    {Name: "title", Type: "string"},
    {Name: "authors", Type: "string[]", Facet: pointer.True()},
    {Name: "publication_year", Type: "int32", Facet: pointer.True()},
    {Name: "ratings_count", Type: "int32"},
    {Name: "average_rating", Type: "float"},
  },
  DefaultSortingField: pointer.String("ratings_count"),
}

client.Collections().Create(context.Background(), booksSchema)
```

  </template>
  <template v-slot:Shell>

```bash
curl "${TYPESENSE_HOST}/collections" \
      -X POST \
      -H "Content-Type: application/json" \
      -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" -d '{
        "name": "books",
        "fields": [
          {"name": "title", "type": "string" },
          {"name": "authors", "type": "string[]", "facet": true },

          {"name": "publication_year", "type": "int32", "facet": true },
          {"name": "ratings_count", "type": "int32" },
          {"name": "average_rating", "type": "float" }
        ],
        "default_sorting_field": "ratings_count"
      }'
```

  </template>
</Tabs>

For each field, we define its `name, type` and whether it's a `facet` field. A facet field allows us to cluster the search results into categories and lets us drill into each of those categories. We will be seeing faceted results in action at the end of this guide.

We also define a `default_sorting_field` that determines how the results must be sorted when no `sort_by` clause is provided. In this case, books that have more ratings will be ranked higher.

:::tip Indexed fields vs un-indexed fields
You only need to include fields that you want to search / filter / facet / sort / group_by in the collection schema. We call these indexed fields. Indexed fields are stored in RAM with a backup on disk.

You can still send additional fields that you might use for display purposes (for eg: image URLs) when importing the documents into Typesense.
Any fields not mentioned in the schema, but present in an imported document, will only be stored on disk and returned when the document is a hit.
We call these un-indexed fields and this helps conserve memory usage and avoid wasted CPU cycles in trying to otherwise build unused indices for these fields in memory.
:::

## Adding books to the collection

We're now ready to index some books into the collection we just created.

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Java','Go','Shell']">
  <template v-slot:JavaScript>

```js
var fs = require('fs/promises');

const booksInJsonl = await fs.readFile("/tmp/books.jsonl");
client.collections('books').documents().import(booksInJsonl);
```

  </template>

  <template v-slot:PHP>

```php
$booksData = file_get_contents('/tmp/books.jsonl');

$client->collections['books']->documents->import($booksData);
```

  </template>
  <template v-slot:Python>

```py
with open('/tmp/books.jsonl') as jsonl_file:
  client.collections['books'].documents.import_(jsonl_file.read().encode('utf-8'))
```

  </template>
  <template v-slot:Ruby>

```rb
books_data = File.read('/tmp/books.jsonl')
collections['books'].documents.import(books_data)
```

  </template>
  <template v-slot:Java>

```java
String booksData = Files.readString("/tmp/books.jsonl");
client.collections("books").documents().import_(booksData)
```

  </template>
  <template v-slot:Go>

```go
params := &api.ImportDocumentsParams{
  Action:    pointer.String("create"),
  BatchSize: pointer.Int(40),
}
importBody, err := os.Open("/tmp/books.jsonl")
// defer close, error handling ...

client.Collection("books").Documents().ImportJsonl(context.Background(), importBody, params)
```

  </template>
  <template v-slot:Shell>

```bash
curl "${TYPESENSE_HOST}/collections/books/documents/import" \
      -X POST \
      -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" \
      --data-binary @/tmp/books.jsonl
```

  </template>
</Tabs>

## Searching for books
We will start with a really simple search query - let's search for `harry potter` and ask Typesense to rank books that have more ratings higher in the results.

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Java','Go','Shell']">
  <template v-slot:JavaScript>

```js
let searchParameters = {
  'q'         : 'harry potter',
  'query_by'  : 'title',
  'sort_by'   : 'ratings_count:desc'
}

client.collections('books')
  .documents()
  .search(searchParameters)
  .then(function (searchResults) {
    console.log(searchResults)
  })
```

  </template>

  <template v-slot:PHP>

```php
$searchParameters = [
  'q'         => 'harry potter',
  'query_by'  => 'title',
  'sort_by'   => 'ratings_count:desc'
];

$client->collections['books']->documents->search($searchParameters);
```

  </template>
  <template v-slot:Python>

```py
search_parameters = {
  'q'         : 'harry potter',
  'query_by'  : 'title',
  'sort_by'   : 'ratings_count:desc'
}

client.collections['books'].documents.search(search_parameters)
```

  </template>
  <template v-slot:Ruby>

```rb
search_parameters = {
  'q'         => 'harry potter',
  'query_by'  => 'title',
  'sort_by'   => 'ratings_count:desc'
}

client.collections['books'].documents.search(search_parameters)
```

  </template>
  <template v-slot:Java>

```java
SearchParameters searchParameters = new SearchParameters()
                                                .q("harry")
                                                .addQueryByItem("title")
                                                .addSortByItem("ratings_count:desc");
SearchResult searchResult = client.collections("books").documents().search(searchParameters);
```

  </template>
  <template v-slot:Go>

```go
searchParameters := &api.SearchCollectionParams{
  Q:        pointer.String("harry potter"),
  QueryBy:  pointer.String("title"),
  SortBy:   &([]string{"ratings_count:desc"}),
}

client.Collection("books").Documents().Search(context.Background(), searchParameters)
```

  </template>
  <template v-slot:Shell>

```bash
curl -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" \
"${TYPESENSE_HOST}/collections/books/documents/search\
?q=harry+potter&query_by=title&sort_by=ratings_count:desc"
```

  </template>
</Tabs>

#### Sample Response

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```json
{
  "facet_counts": [],
  "found": 27,
  "hits": [
    {
      "highlights": [
        {
          "field": "title",
          "snippet": "<mark>Harry</mark> <mark>Potter</mark> and the Philosopher's Stone"
        }
      ],
      "document": {
        "authors": [
          "J.K. Rowling", "Mary GrandPré"
        ],
        "average_rating": 4.44,
        "id": "2",
        "image_url": "https://images.gr-assets.com/books/1474154022m/3.jpg",
        "publication_year": 1997,
        "ratings_count": 4602479,
        "title": "Harry Potter and the Philosopher's Stone"
      }
    },
    ...
  ]
}
```

  </template>
</Tabs>


In addition to returning the matching documents, Typesense also highlights where the query terms appear in a document via the `highlight` property.

Want to actually see newest `harry potter` books returned first? No problem, we can change the `sort_by` clause to `publication_year:desc`:

### Semantic Search

Typesense also supports the ability to return semantic matches, in addition to keyword matches.

For eg, if your dataset contains the word "Harry Potter" and the user searches for "famous boy wizard", semantic search will return the record with "Harry Potter" since it is conceptually related to the search term.

Read more about Semantic Search in the dedicated guide article [here](./semantic-search.md).

## Filtering results
Now, let's tweak our query to only fetch books that are published before the year 1998. To do that, we just have to add a `filter_by` clause to our query:

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Java','Go','Shell']">
  <template v-slot:JavaScript>

```js
let searchParameters = {
  'q'         : 'harry potter',
  'query_by'  : 'title',
  'filter_by' : 'publication_year:<1998',
  'sort_by'   : 'publication_year:desc'
}

client.collections('books')
  .documents()
  .search(searchParameters)
  .then(function (searchResults) {
    console.log(searchResults)
  })
```

  </template>

  <template v-slot:PHP>

```php
$searchParameters = [
  'q'         => 'harry potter',
  'query_by'  => 'title',
  'filter_by' => 'publication_year:<1998',
  'sort_by'   => 'publication_year:desc'
];

$client->collections['books']->documents->search($searchParameters);
```

  </template>
  <template v-slot:Python>

```py
search_parameters = {
  'q'         : 'harry potter',
  'query_by'  : 'title',
  'filter_by' : 'publication_year:<1998',
  'sort_by'   : 'publication_year:desc'
}

client.collections['books'].documents.search(search_parameters)
```

  </template>
  <template v-slot:Ruby>

```rb
search_parameters = {
  'q'         => 'harry potter',
  'query_by'  => 'title',
  'filter_by' => 'publication_year:<1998',
  'sort_by'   => 'publication_year:desc'
}

client.collections['books'].documents.search(search_parameters)
```

  </template>
  <template v-slot:Java>

```java
SearchParameters searchParameters = new SearchParameters()
                                                .q("harry")
                                                .addQueryByItem("title")
                                                .filterBy("publication_year:<1998")
                                                .addSortByItem("ratings_count:desc");
SearchResult searchResult = client.collections("books").documents().search(searchParameters);
```

  </template>
  <template v-slot:Go>

```go
searchParameters := &api.SearchCollectionParams{
  Q:        pointer.String("harry potter"),
  QueryBy:  pointer.String("title"),
  FilterBy: pointer.String("publication_year:<1998"),
  SortBy:   &([]string{"publication_year:desc"}),
}

client.Collection("companies").Documents().Search(context.Background(), searchParameters)
```

  </template>
  <template v-slot:Shell>

```bash
curl -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" \
"${TYPESENSE_HOST}/collections/books/documents/search\
?q=harry+potter&query_by=title&sort_by=publication_year:desc\
&filter_by=publication_year:<1998"
```

  </template>
</Tabs>


#### Sample Response

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```json
{
  "facet_counts": [],
  "found": 24,
  "hits": [
    {
      "highlights": {
        "title": {
          "field": "title",
          "snippet": "<mark>Harry</mark> <mark>Potter</mark> and the Philosopher's Stone"
        }
      },
      "document": {
        "authors": [
            "J.K. Rowling", "Mary GrandPré"
        ],
        "average_rating": 4.44,
        "id": "2",
        "image_url": "https://images.gr-assets.com/books/1474154022m/3.jpg",
        "publication_year": 1997,
        "ratings_count": 4602479,
        "title": "Harry Potter and the Philosopher's Stone"
      }
    },
    ...
  ]
}
```

  </template>
</Tabs>

## Faceting
Let's facet the search results by the authors field to see how that works. Let's also use this example to see how Typesense handles typographic errors. Let's search for `experyment` (notice the typo!).

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Java','Go','Shell']">
  <template v-slot:JavaScript>

```js
let searchParameters = {
  'q'         : 'experyment',
  'query_by'  : 'title',
  'facet_by'  : 'authors',
  'sort_by'   : 'average_rating:desc'
}

client.collections('books')
  .documents()
  .search(searchParameters)
  .then(function (searchResults) {
    console.log(searchResults)
  })
```

  </template>

  <template v-slot:PHP>

```php
$searchParameters = [
  'q'         => 'experyment',
  'query_by'  => 'title',
  'facet_by'  => 'authors',
  'sort_by'   => 'average_rating:desc'
]

$client->collections['books']->documents->search($searchParameters)
```

  </template>
  <template v-slot:Python>

```py
search_parameters = {
  'q'         : 'experyment',
  'query_by'  : 'title',
  'facet_by'  : 'authors',
  'sort_by'   : 'average_rating:desc'
}

client.collections['books'].documents.search(search_parameters)
```

  </template>
  <template v-slot:Ruby>

```rb
search_parameters = {
  'q'         => 'experyment',
  'query_by'  => 'title',
  'facet_by'  => 'authors',
  'sort_by'   => 'average_rating:desc'
}

client.collections['books'].documents.search(search_parameters)
```

  </template>
  <template v-slot:Java>

```java
SearchParameters searchParameters = new SearchParameters()
                                                .q("experyment")
                                                .addQueryByItem("title")
                                                .addFacetByItem("authors_facet")
                                                .addSortByItem("average_rating:desc");
SearchResult searchResult = client.collections("books").documents().search(searchParameters);
```

  </template>
  <template v-slot:Go>

```go
searchParameters := &api.SearchCollectionParams{
  Q:        pointer.String("experyment"),
  QueryBy:  pointer.String("title"),
  FacetBy:  pointer.String("authors"),
  SortBy:   &([]string{"average_rating:desc"}),
}

client.Collection("companies").Documents().Search(context.Background(), searchParameters)
```

  </template>
  <template v-slot:Shell>

```bash
curl -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" \
"${TYPESENSE_HOST}/collections/books/documents/search\
?q=experyment&query_by=title&sort_by=average_rating:desc\
&facet_by=authors"
```

  </template>
</Tabs>

As we can see in the result below, Typesense handled the typographic error gracefully and fetched the results correctly. The `facet_by` clause also gives us a neat break-down of the number of books written by each author in the returned search results.

#### Sample Response

<Tabs :tabs="['JSON']">
  <template v-slot:JSON>

```json
{
  "facet_counts": [
    {
      "field_name": "authors",
      "counts": [
          {
              "count": 2,
              "value": " Käthe Mazur"
          },
          {
              "count": 2,
              "value": "Gretchen Rubin"
          },
          {
              "count": 2,
              "value": "James Patterson"
          },
          {
              "count": 2,
              "value": "Mahatma Gandhi"
          }
      ]
    }
  ],
  "found": 3,
  "hits": [
    {
      "_highlight": {
        "title": "The Angel <mark>Experiment</mark>"
      },
      "document": {
        "authors": [
            "James Patterson"
        ],
        "average_rating": 4.08,
        "id": "569",
        "image_url": "https://images.gr-assets.com/books/1339277875m/13152.jpg",
        "publication_year": 2005,
        "ratings_count": 172302,
        "title": "The Angel Experiment"
      }
    },
    ...
  ]
}
```

  </template>
</Tabs>

We've come to the end of our little walk-through. For a detailed dive into Typesense, refer to our [API documentation](../api/README.md).

:::tip
We used a single node in this example, but Typesense can also run in a clustered mode. See the [high availability](./high-availability.md) section for more details.
:::
