---
sidebarDepth: 2
sitemap:
  priority: 0.7
---

# JOINs

Typesense supports JOINing documents from one or more collections based on a related column between them.

## One-to-One relation

When you create a collection, you can create a field that connects a document to a field in another collection 
via the `reference` property. 

For example, we could connect a `books` collection to an `authors` collection by using the `id` field of the `authors` 
collection as a reference:

```json
{
  "name":  "books",
  "fields": [
    {"name": "title", "type": "string"},
    {"name": "author_id", "type": "string", "reference": "authors.id"}
  ]
}
```

When we search the `books` collection, we can fetch author fields from the `authors` collection via `include_fields`.

```bash
curl "http://localhost:8108/multi_search" -X POST \
        -H "X-TYPESENSE-API-KEY: ${TYPESENSE_API_KEY}" \
        -d '{
          "searches": [
            {
              "collection": "books",
              "include_fields": "$authors(first_name,last_name)",
              "q": "famous"
            }
          ]
        }'
```

By requesting the `first_name` and `last_name` via `$authors(first_name,last_name)`, the response contains an
`authors` object with the corresponding author information:

```json
{
  "document": {
    "id": "0",
    "title": "Famous Five",
    "author_id": "0",
    "authors": {
      "first_name": "Enid",
      "last_name": "Blyton"
    }
  }
}
```

To include all fields in the collection we should use an asterisk `*`:

```json
{
  "collection": "books",
  "include_fields": "$authors(*)",
  "q": "famous"
}
```

Let's say we want to query the `authors` collection and get the related books of all the authors that match the query. Since `books` collection has the reference field and we're searching on `authors` collection, we cannot simply specify `include_fields: $books(*)` to join the related documents. To achieve this we'll have to specify `filter_by` clause to join on a collection like this:

```json
{
  "collection": "authors",
  "q": "query",
  "filter_by": "$books(id: *)",
  "include_fields": "$books(*)",
}
```

`id:*` is a special filter that matches all the documents of a particular collection so when used in a join, it allows you to list all the related books of a particular author.

Fields of type `int32`, `int64`, and `string` can be used in the case of "one-to-one" reference, i.e. one document 
being related to exactly one reference document. Fields of type `int32[]`, `int64[]`, and `string[]` can be used in 
the case of multiple references, i.e. one document being related to zero or more documents in another collection.

## One-to-many relation

Let's suppose that we have a `products` collection, and we want to offer personalized pricing for customers, 
i.e. each product would have a different price for every customer. The join feature comes handy here.

The schema of the `products` collection will look like this

```json
{
  "name":  "products",
  "fields": [
    {"name": "product_id", "type": "string"},
    {"name": "product_name", "type": "string"},
    {"name": "product_description", "type": "string"}
  ]
}
```

Let's create a `customer_product_prices` collection that stores a custom price for each customer, and it will
also reference the corresponding document in the product collection.

```json
{
  "name":  "customer_product_prices",
  "fields": [
    {"name": "customer_id", "type": "string"},
    {"name": "custom_price", "type": "float"},
    {"name": "product_id", "type": "string", "reference": "products.product_id"}
  ] 
}
```

We can now search the `products` collection, and filter for the prices for a particular customer from  
the `customer_product_prices` collection via `filter_by`:

```json
{
    "q":"*",
    "collection":"products",
    "filter_by":"$customer_product_prices(customer_id:=customer_a)"
}
```

Want to fetch products with price under `100`? That's easy to do too.

```json
{
    "q": "*",
    "collection": "products",
    "filter_by": "$customer_product_prices(customer_id:=customer_a && custom_price:<100)"
}
```

By default, the above queries will include all the fields from the referenced `customer_product_prices` 
collection. To include only the `custom_price` field from the referenced collection, you could do:

```json
{
  "include_fields": "$customer_product_prices(custom_price)" 
}
```

## Many-to-many relation

Consider a collection with documents that we want to provide access to users such that a document can be accessed by 
many users and a given user can access many documents.

To do this, we can create three collections: `documents`, `users` and `user_doc_access` with the following schemas:

```json lines

{
  "name":  "documents",
  "fields": [
    {"name": "id", "type": "string"},
    {"name": "title", "type": "string"}
    {"name": "content", "type": "string"}
  ]
}

{
  "name":  "users",
  "fields": [
    {"name": "id", "type": "string"},
    {"name": "username", "type": "string"}
  ]
}

{
  "name":  "user_doc_access",
  "fields": [
    {"name": "user_id", "type": "string", "reference": "users.id"},
    {"name": "document_id", "type": "string", "reference": "documents.id"},
  ]
}
```

To fetch all the documents accessible to a `user_a`, we can query this way:

```json
{
    "q": "*",
    "collection": "documents",
    "filter_by": "$user_doc_access(user_id:= user_a)"
}
```
To get the user ids that can access a particular document:

```json
{
    "q": "*",
    "collection": "documents",
    "query_by": "title",
    "filter_by": "$user_doc_access(id: *)",
    "include_fields": "$users(id) as user_identifier"
}
```

## Sort by joined collection field

We can sort on a field that's present in the joined collection this way:

```json
{
  "sort_by": "$JoinedCollectionName(field_name:asc)"
}
```

## Merging / nesting joined fields

By default, when we join on a collection, the collection's fields are returned as a nested document.

For example, when we join the `books` collection with `authors` collection above, notice how the fields of the
`authors` collection appear as an object in the response document:

```json
{
  "document": {
    "id": "0",
    "title": "Famous Five",
    "author_id": "0",
    "authors": {
      "first_name": "Enid",
      "last_name": "Blyton"
    }
  }
}
```

We could instead make the fields of the `authors` collection be merged with the fields of the `books` document
by using the `merge` strategy:

```json
{
  "collection": "books",
  "include_fields": "$authors(*, strategy: merge)",
  "q": "famous"
}
```

The default behavior is `strategy: nest`.

#### Forcing nested array for joined fields

In a one-to-many join query, you might want the joined collection's fields to be always represented as an array of 
objects, even if there is only a single match.

For example, given the following authors and books:

```json lines
{"id": "0", ",first_name": "Enid", "last_name": "Blyton"}
{"id": "1", ",first_name": "JK", "last_name": "Rowling"}
```

```json lines
{"title": "Famous Five", "author_id": "0"}
{"title": "Secret Seven", "author_id": "0"}
{"title": "Harry Potter", ",author_id": "1"}
```

When we query the `authors` collection and join on the `books` collection, like this:

```json
{
  "collection": "authors",
  "q": "*",
  "filter_by": "$books(id:*)",
  "include_fields": "$books(*)"
}
```

We might end up with the books being either a nested object or a nested array of objects, depending on whether there 
are 1 or more matched books for each author.

```json
[
  {
    "document": {
      "id": "1",
      "first_name": "JK",
      "last_name": "Rowling",
      "books": {
        "author_id": "1",
        "id": "2",
        "title": "Harry Potter"
      }
    }
  },
  {
    "document": {
      "id": "0",
      "first_name": "Enid",
      "last_name": "Blyton",
      "books": [
        {
          "author_id": "0",
          "id": "0",
          "title": "Famous Five"
        },
        {
          "author_id": "0",
          "id": "1",
          "title": "Secret Seven"
        }
      ]
    }
  }
]
```

To always make the fields of the joined `books` collection be an array of objects, you can use the `nest_array` 
field merging strategy.

```json
{
  "collection": "authors",
  "q": "*",
  "filter_by": "$books(id:*)",
  "include_fields": "$books(*, strategy: nest_array)"
}
```

This will always return an array of objects for the fields of `books` collection.

```json
[
  {
    "document": {
      "id": "1",
      "first_name": "JK",
      "last_name": "Rowling",
      "books": [
        {
          "author_id": "1",
          "id": "2",
          "title": "Harry Potter"
        }
      ]
    }
  },
  {
    "document": {
      "id": "0",
      "first_name": "Enid",
      "last_name": "Blyton",
      "books": [
        {
          "author_id": "0",
          "id": "0",
          "title": "Famous Five"
        },
        {
          "author_id": "0",
          "id": "1",
          "title": "Secret Seven"
        }
      ]
    }
  }
]
```

## References inside an object

Let's say there is an `object` field called `order` in a `orders` collection. We can make the order refer to a
product in a `products` collection like this:

```json
{
  "name": "orders",
  "fields": [
    {"name": "order", "type": "object"},
    {"name": "order.product_id", "type": "string", "reference": "products.id"}
  ]
}
```

Alternatively, if we had an array of `order` objects with each order object containing a reference, then
the type of the reference field would have to be an array as well.

```json
{
  "name": "orders",
  "fields": [
    {"name": "orders", "type": "object[]"},
    {"name": "orders.product_id", "type": "string[]", "reference": "products.id"}
  ]
}
```
