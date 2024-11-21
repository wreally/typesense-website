# Building Search UIs

## Using InstantSearch.js

The good folks over at Algolia have built and open-sourced [Instantsearch.js](https://github.com/algolia/instantsearch.js) (and its [React](https://github.com/algolia/react-instantsearch), [Vue](https://github.com/algolia/vue-instantsearch) and [Angular](https://github.com/algolia/angular-instantsearch) cousins) which is a collection of out-of-the-box UI components that you can use to build interactive search experiences quickly.

At Typesense, we've built [an adapter](https://github.com/typesense/typesense-instantsearch-adapter) that lets you use the same Instantsearch widgets as is, but send the queries to Typesense instead.
This guide will walk you through how to use Instantsearch, with the typesense-instantsearch-adapter to build a fully functioning search UI with just a few lines of code.

If you prefer a video walk-through, here are two videos where a member of our community, [Zaiste](https://twitter.com/zaiste) walks you through how to build an end-to-end search experience with Typesense:

- [Building a Search App in React.js using Typesense, Next.js & Tailwind CSS](https://www.youtube.com/watch?v=cIU19iA8I7U)
- [Exploring Typesense, a lightning-fast, open source search engine](https://www.youtube.com/watch?v=kwtHOkf7Jdg)

### With a package manager

If you are already using a package manager like npm or yarn, here's how to add Instantsearch to your app:

#### Walk-through

Let's start with a starter template:

<Tabs :tabs="['Shell']">
  <template v-slot:Shell>

```bash
$ npx create-instantsearch-app typesense-instantsearch-demo

Creating a new InstantSearch app in typesense-instantsearch-demo.

? InstantSearch template InstantSearch.js
? InstantSearch.js version 4.44.0
? Application ID typesense
? Search API key typesense_search_only_api_key
? Index name books
? Attributes to display
  Used to generate the default result template

📦  Installing dependencies...

yarn install v1.22.0
info No lockfile found.
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
success Saved lockfile.
✨  Done in 24.73s.

🎉  Created typesense-instantsearch-demo at typesense-instantsearch-demo.

Begin by typing:

  cd typesense-instantsearch-demo
  yarn start

⚡️  Start building something awesome!
```

  </template>
</Tabs>

A couple of setup pointers for the `npx create-instantsearch-app` command above:
* InstantSearch template: you can pick any one of the web libraries we support: InstantSearch.js, React, Vue or Angular.
* InstantSearch.js version: you can leave it at the default
* Application ID: can be any string - we'll be replacing this later in the guide
* Search API key: can be any string - we'll be replacing this later in the guide with your Typesense Search-only API Key
* Index name: the name of your collection in Typesense
* Attributes to display: **Uncheck** all the options by pressing space bar, including "Dynamic Widgets" **(this step is important)**.

Let's now install the Typesense InstantSearch adapter, to be able to use InstantSearch with a Typesense backend:

<Tabs :tabs="['Shell']">
  <template v-slot:Shell>

```bash
$ npm install --save typesense-instantsearch-adapter
```

  </template>
</Tabs>

To get InstantSearch.js to use the Typesense adapter, open `src/app.js` and edit how InstantSearch is initialized, from this:

<Tabs :tabs="['JavaScript']">
  <template v-slot:JavaScript>

```js
import instantsearch from "instantsearch.js";
const searchClient = algoliasearch('typesense', 'typesense_search_only_api_key');

const search = instantsearch({
  indexName: 'books',
  searchClient,
});
```

  </template>
</Tabs>

to this:

<Tabs :tabs="['JavaScript']">
  <template v-slot:JavaScript>

```js
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import instantsearch from "instantsearch.js";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "abcd", // Be sure to use the search-only-api-key
    nodes: [
      {
        host: "localhost",
        port: 8108,
        protocol: "http"
      }
    ]
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  query_by is required.
  additionalSearchParameters: {
    query_by: "title,authors"
  }
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

const search = instantsearch({
  searchClient,
  indexName: "books"
});
```

  </template>
</Tabs>

We're essentially creating a `searchClient` with the adapter and passing it to `instantsearch` when initializing it.

Now, you can use any of the widgets supported by InstantSearch to build a search interface. In this walkthrough, we'll add a search box, along with results:

```js
search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
        <div>
          <img src="" align="left" alt="" />
          <div class="hit-name">
            {{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}
          </div>
          <div class="hit-description">
            {{#helpers.highlight}}{ "attribute": "authors" }{{/helpers.highlight}}
          </div>
          <div class="hit-price">\$</div>
          <div class="hit-rating">Rating: </div>
        </div>
      `,
    },
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();
```

Now run `npm start` to start the dev server and view the app. You should now have a fully-functioning instant search interface with a search box, results that update as you type and pagination.


#### Demo App
Here's a repo with a working version of the app, following the instructions above: [https://github.com/typesense/typesense-instantsearch-demo](https://github.com/typesense/typesense-instantsearch-demo). The repo also contains quick commands to start a local Typesense server (`npm run typesenseServer`) and index the books collection used in this example (`npm run populateTypesenseIndex`).

InstantSearch.js also has [React](https://github.com/algolia/react-instantsearch), [Vue](https://github.com/algolia/vue-instantsearch), [Angular](https://github.com/algolia/angular-instantsearch) cousins. The Typesense InstantSearch adapter is also compatible with them. Similar to the above, you only need to swap the searchClient to the one provided by Typesense adapter. The rest of the instructions found in each of these repos work without additional changes.

### Without using a package manager

If you don't want to use npm / yarn, you can still use Instantsearch.js and typesense-instantsearch-adapter directly from plain HTML files and Javascript using `script` tags.

Here's a demo app that shows you how to do this [https://github.com/typesense/typesense-instantsearch-demo-no-npm-yarn](https://github.com/typesense/typesense-instantsearch-demo-no-npm-yarn).

## Other UI Libraries

Here are other Search UI libraries for Typesense:

- [Typesense-MiniBar](https://github.com/jquery/typesense-minibar)
- [Autocomplete.js](/guide/reference-implementations/typesense-autocomplete-js.md)
- [DocSearch](/guide/docsearch.html)