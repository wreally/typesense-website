<template>
  <div>
    <h2 class="text-center text-gradient-1">
      Batteries-Included Developer Experience
    </h2>
    <div class="text-center">Zero to Instant-Search, in 30 seconds 🚀</div>
    <div class="my-1">&nbsp;</div>

    <HomeDeveloperExperienceStep class="mt-5" data-aos="fade-up">
      <template #code>
        <CodeBlockTabbed state-id="install-typesense">
          <pre data-language="bash" data-display-language="Docker">
docker run \
        -p 8108:8108 -v/tmp:/data \
        typesense/typesense:{{ typesenseLatestVersion }} \
          --data-dir /data --api-key=xyz</pre
          >
          <pre data-language="bash" data-display-language="DEB">
curl -O https://dl.typesense.org/releases/{{
              typesenseLatestVersion
            }}/typesense-server-{{ typesenseLatestVersion }}-amd64.deb

apt install ./typesense-server-{{ typesenseLatestVersion }}-amd64.deb</pre
          >
          <pre data-language="bash" data-display-language="RPM">
curl -O https://dl.typesense.org/releases/{{
              typesenseLatestVersion
            }}/typesense-server-{{ typesenseLatestVersion }}-1.x86_64.rpm

yum install ./typesense-server-{{ typesenseLatestVersion }}.x86_64.rpm</pre
          >
          <pre data-language="bash" data-display-language="Linux">
curl -O https://dl.typesense.org/releases/{{
              typesenseLatestVersion
            }}/typesense-server-{{ typesenseLatestVersion }}-linux-amd64.tar.gz

tar xvzf ./typesense-server-{{ typesenseLatestVersion }}-linux-amd64.tar.gz

./typesense-server --data-dir /tmp --api-key=xyz</pre
          >
          <pre data-language="bash" data-display-language="macOS">
brew install typesense/tap/typesense-server@{{ typesenseLatestVersion }}</pre
          >
        </CodeBlockTabbed>
      </template>
      <template #description>
        <h4>1. Run Typesense</h4>
        <div>Use Docker, our native binaries or our RPM or DEB packages.</div>
        <div class="mt-1">
          Or, use
          <a href="https://cloud.typesense.org" target="_blank"
            >Typesense Cloud</a
          >
          to provision a cluster with a few clicks.
        </div>
      </template>
    </HomeDeveloperExperienceStep>

    <HomeDeveloperExperienceStep class="mt-5" data-aos="fade-up">
      <template #code>
        <CodeBlockTabbed>
          <pre data-language="bash" data-display-language="Shell">
curl "http://localhost:8108/collections" \
        -X POST \
        -H "X-TYPESENSE-API-KEY: xyz" \
        -d '{
              "name": "books",
              "fields": [
                {"name": "title", "type": "string" },
                {"name": "author", "type": "string" },
                {"name": "ratings", "type": "int32" }
              ],
              "default_sorting_field": "ratings"
            }'

curl "http://localhost:8108/collections/books/documents/import" \
        -X POST \
        -H "X-TYPESENSE-API-KEY: xyz" \
        -d '
          {"title":"Book 1","author":"Author1","ratings":24}
          {"title":"Book 2","author":"Author2","ratings":31}
          {"title":"Book 3","author":"Author3","ratings":30}'</pre
          >
          <pre data-language="javascript">
// npm install typesense @babel/runtime

const Typesense = require('typesense')
const client = new Typesense.Client({
  'nodes': [{'host': 'localhost', 'port': '8108', 'protocol': 'http'}],
  'apiKey': 'xyz'
})

const schema = {
  "name": "books",
  "fields": [
    {"name": "title", "type": "string"},
    {"name": "author", "type": "string"},
    {"name": "ratings", "type": "int32"}
  ],
  "default_sorting_field": "ratings"
}

const documents = [
    {"title":"Book 1","author":"Author1","ratings":24},
    {"title":"Book 2","author":"Author2","ratings":31},
    {"title":"Book 3","author":"Author3","ratings":30}
  ]

client.collections().create(schema).then(() => {
  client.collections('books').documents().import(documents)
})</pre
          >
          <pre data-language="php" data-display-language="PHP">
// composer require php-http/curl-client typesense/typesense-php

use Typesense\Client;
$client = new Client(
  [
    'api_key' => 'xyz',
    'nodes'   => [['host' => 'localhost', 'port' => '8108', 'protocol' => 'http']],
  ]
);

$schema = [
  "name" => "books",
  "fields" => [
    ["name" => "title", "type" => "string"],
    ["name" => "author", "type" => "string"],
    ["name" => "ratings", "type" => "int32"]
  ],
  "default_sorting_field" => "ratings"
];
$client->collections->create($schema);

$documents = [
  ["title"=>"Book 1","author"=>"Author1","ratings"=>24],
  ["title"=>"Book 2","author"=>"Author2","ratings"=>31],
  ["title"=>"Book 3","author"=>"Author3","ratings"=>30]
];
$client->collections['books']->documents->import($documents);</pre
          >

          <pre data-language="python">
# pip install typesense

import typesense
client = typesense.Client({
  'nodes': [{ 'host': 'localhost', 'port': '8108', 'protocol': 'http' }],
  'api_key': 'xyz'
});

schema = {
  "name": "books",
  "fields": [
    {"name": "title", "type": "string"},
    {"name": "author", "type": "string"},
    {"name": "ratings", "type": "int32"}
  ],
  "default_sorting_field": "ratings"
}
client.collections.create(schema)

documents = [
  {"title":"Book 1","author":"Author1","ratings":24},
  {"title":"Book 2","author":"Author2","ratings":31},
  {"title":"Book 3","author":"Author3","ratings":30}
]
client.collections['books'].documents.import_(documents)</pre
          >

          <pre data-language="go">
// go get github.com/typesense/typesense-go

package main

import (
	"github.com/typesense/typesense-go/typesense"
	"github.com/typesense/typesense-go/typesense/api"
	"github.com/typesense/typesense-go/typesense/api/pointer"
)

func main() {
	client := typesense.NewClient(
		typesense.WithServer("http://localhost:8108"),
		typesense.WithAPIKey("xyz"),
	)

	schema := &api.CollectionSchema{
		Name: "books",
		Fields: []api.Field{
			{Name: "title", Type: "string"},
			{Name: "author", Type: "string"},
			{Name: "ratings", Type: "int32"},
		},
		DefaultSortingField: pointer.String("ratings"),
	}

	client.Collections().Create(schema)

	newDocument := func(title, author string, ratings int32) interface{} {
		return struct {
			Title   string `json:"title"`
			Author  string `json:"author"`
			Ratings int32  `json:"ratings"`
		}{title, author, ratings}
	}

	documents := []interface{}{
		newDocument("Book 1", "Author1", 24),
		newDocument("Book 2", "Author2", 31),
		newDocument("Book 3", "Author2", 30),
	}

	params := &api.ImportDocumentsParams{
		Action:    pointer.String("create"),
		BatchSize: pointer.Int(40),
	}

	client.Collection("books").Documents().Import(documents, params)
}</pre
          >

          <pre data-language="ruby">
# gem install typesense

require 'typesense'
client = Typesense::Client.new(
  nodes: [{ host: 'localhost', port: '8108', protocol: 'http' }],
  api_key: 'xyz'
);

schema = {
  name: "books",
  fields: [
    { name: "title", type: "string" },
    { name: "author", type: "string" },
    { name: "ratings", type: "int32" }
  ],
  default_sorting_field: "ratings"
}
client.collections.create(schema)

documents = [
  {"title" => "Book 1", "author" => "Author1", "ratings" => 24},
  {"title" => "Book 2", "author" => "Author2", "ratings" => 31},
  {"title" => "Book 3", "author" => "Author3", "ratings" => 30}
]
client.collections['books'].documents.import(documents)</pre
          >
        </CodeBlockTabbed>
      </template>
      <template #description>
        <h4>2. Import Your Data</h4>
        <div>Create a collection, then add some documents to it.</div>
      </template>
    </HomeDeveloperExperienceStep>

    <HomeDeveloperExperienceStep class="mt-5" data-aos="fade-up">
      <template #code>
        <CodeBlockTabbed>
          <pre data-language="bash" data-display-language="Shell">
curl "http://localhost:8108/collections/books/documents/search?query_by=title,author&q=boo" \
        -H "X-TYPESENSE-API-KEY: xyz"</pre
          >
          <pre data-language="javascript">
console.log(client.collections('books').documents().search({
  'query_by': 'title,author',
  'q': 'boo'
}))</pre
          >
          <pre data-language="php" data-display-language="PHP">
print_r($client->collections['books']->documents->search([
  'query_by' => 'title,author',
  'q' => 'boo'
]));</pre
          >
          <pre data-language="python">
print(client.collections['books'].documents.search({
  'query_by': 'title,author',
  'q': 'boo'
}))</pre
          >
          <pre data-language="go">
  result, _ := client.Collection("books").Documents().Search(searchParameters)
	buf, _ := json.Marshal(result)
	fmt.Println(string(buf))</pre
          >
          <pre data-language="ruby">
puts client.collections['books'].documents.search({
  query_by: 'title,author',
  q: 'boo'
})</pre
          >
        </CodeBlockTabbed>
      </template>
      <template #description>
        <h4>And, that's it! Search away.</h4>
        <div>
          You now have a typo-tolerant, search server you can send search
          queries to.
        </div>
      </template>
    </HomeDeveloperExperienceStep>

    <div class="container-fluid mt-5">
      <div class="row">
        <div class="col-sm text-center">
          <HomeCTAs class="mt-4" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { typesenseLatestVersion } from '../../../typesenseVersions'

export default {
  data() {
    return {
      typesenseLatestVersion,
    }
  },
}
</script>
