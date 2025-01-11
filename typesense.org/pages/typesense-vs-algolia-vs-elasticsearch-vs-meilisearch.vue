<template>
  <div>
    <header>
      <Navbar color-scheme="dark" />
    </header>
    <div class="jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <h1 class="display-4">
              Compare Algolia<br />
              vs ElasticSearch<br />
              vs Meilisearch<br />
              vs Typesense
            </h1>
            <p>
              This table is meant to give you an objective side-by-side
              comparison of key features in each search engine and is based on
              each search engine's documentation.
            </p>
            <p class="mt-2">
              We've strived to provide accurate information below, but if you
              notice any issues, please open an issue
              <a
                href="https://github.com/typesense/typesense-website/issues"
                target="_blank"
                >here</a
              >.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row mt-3">
        <div class="col-md-12">
          <h3 class="mb-3">Overview</h3>
          <div class="table-responsive">
            <table
              class="table table-condensed feature-list"
              data-sticky-header="true"
            >
              <thead class="thead-dark">
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Typesense</th>
                  <th scope="col">Algolia</th>
                  <th scope="col">ElasticSearch</th>
                  <th scope="col">Meilisearch</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="font-weight-bold">Source Code</td>
                  <td>Fully open source</td>
                  <td>Proprietary closed source</td>
                  <td>Source-available, licensed under SSPL</td>
                  <td>Fully open source</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">First Commit</td>
                  <td>2015</td>
                  <td>2012</td>
                  <td>2010</td>
                  <td>2018</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Built Using</td>
                  <td>C++</td>
                  <td>C++</td>
                  <td>Java</td>
                  <td>Rust</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Core Search Algorithm</td>
                  <td>Built from the ground-up</td>
                  <td>Built from the ground-up</td>
                  <td>Built on top of Lucene</td>
                  <td>Built from the ground-up</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Best Suited For</td>
                  <td>
                    Instant Search-as-you-type Experiences for data sets that
                    can fit in RAM, up to 24 TB (or current commercially
                    available RAM size).
                  </td>
                  <td>
                    Instant Search-as-you-type Experiences for datasets up to
                    128 GB in size.
                  </td>
                  <td>
                    General-purpose search & aggregations over petabyte-scale
                    datasets (eg: log data)
                  </td>
                  <td>
                    Instant Search-as-you-type Experiences for use cases that
                    don't require a highly-available fault-tolerant setup.
                    <a
                      href="https://www.meilisearch.com/docs/learn/advanced/storage#:~:text=For%20the%20best%20performance%2C%20it%20is%20recommended%20to%20provide%20the%20same%20amount%20of%20RAM%20as%20the%20size%20the%20database%20takes%20on%20disk%2C%20so%20all%20the%20data%20structures%20can%20fit%20in%20memory"
                      target="_blank"
                      >Recommends</a
                    >
                    providing enough RAM to hold entire dataset in RAM for ideal
                    performance.
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Primary Index Location</td>
                  <td>RAM</td>
                  <td>RAM</td>
                  <td>Disk, with RAM cache</td>
                  <td>Disk with Memory Mapped files</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="mt-5 mb-3">Deployment</h3>
          <div class="table-responsive">
            <table class="table table-condensed feature-list">
              <thead class="thead-dark">
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Typesense</th>
                  <th scope="col">Algolia</th>
                  <th scope="col">ElasticSearch</th>
                  <th scope="col">Meilisearch</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="font-weight-bold">Self-Hosted Option</td>
                  <td>✅️</td>
                  <td>❌</td>
                  <td>✅️</td>
                  <td>✅️</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">SaaS Option</td>
                  <td>✅️</td>
                  <td>✅️</td>
                  <td>✅️</td>
                  <td>✅️</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">
                    High Availability / <br />Fault Tolerance
                  </td>
                  <td>✅<br /><br />RAFT-based multi-node clustering</td>
                  <td>✅<br /><br />RAFT-based multi-node clustering</td>
                  <td>✅<br /><br />Active-passive replication</td>
                  <td>❌</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">GPU Acceleration Support</td>
                  <td>
                    ✅<br /><br />Can optionally use a GPU when available.
                  </td>
                  <td>❌</td>
                  <td>❌</td>
                  <td>❌</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">
                    CDN-like Geo-Distributed clusters
                  </td>
                  <td>
                    ✅<br /><br />Supported in self-hosted and SaaS options,
                    called Search Delivery Network
                  </td>
                  <td>
                    ✅<br /><br />Available in Premium tier, called Distributed
                    Search Network
                  </td>
                  <td>
                    ❌<br /><br />Not available as part of hosted offering
                  </td>
                  <td>❌</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Runtime Dependencies</td>
                  <td>
                    None. Self-contained binary. <br /><br />Built-in high
                    performance HTTP server, that can be exposed to the frontend
                    directly.
                  </td>
                  <td>N/A, since it's SaaS only</td>
                  <td>
                    Requires JVM, and an application backend. <br /><br />Cannot
                    be directly exposed to frontend - requires use of nginx,
                    apache or the like as a reverse proxy in front
                  </td>
                  <td>
                    None. Self-contained binary. <br /><br />Built-in high
                    performance HTTP server, that can be exposed to the frontend
                    directly. Recommends use of nginx, apache or the like as a
                    reverse proxy in front, to manage the renewal of the SSL
                    certificate
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Index Backward Compatibility</td>
                  <td>
                    ✅<br /><br />
                    Fully backward compatible
                  </td>
                  <td>
                    N/A<br /><br />
                    As a SaaS service, Algolia does not expose this detail to
                    end users.
                  </td>
                  <td>
                    ✅<br /><br />
                    Backward compatible up to 1 major version.
                  </td>
                  <td>
                    ✅<br /><br />
                    Fully backward compatible
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Upgrade Path</td>
                  <td>
                    Replace binary, restart process. No re-indexing required.
                  </td>
                  <td>Managed SaaS service, doesn't require upgrades.</td>
                  <td>
                    Replace binary, restart process. Re-indexing required if
                    upgrading more than 1 major version.
                  </td>
                  <td>Create a dump, replace binary, load the dump.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="mt-5 mb-3">Features</h3>
          <div class="table-responsive">
            <table class="table table-condensed feature-list">
              <thead class="thead-dark">
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Typesense</th>
                  <th scope="col">Algolia</th>
                  <th scope="col">ElasticSearch</th>
                  <th scope="col">Meilisearch</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="font-weight-bold">REST API</td>
                  <td>✅️</td>
                  <td>✅️</td>
                  <td>✅️</td>
                  <td>✅️</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Typo Tolerance</td>
                  <td>✅️</td>
                  <td>✅️</td>
                  <td>
                    ✅️<br /><br />But slow and
                    <a
                      href="https://www.algolia.com/blog/engineering/algolia-v-elasticsearch-relevance/"
                      target="_blank"
                      >affects relevance</a
                    >
                  </td>
                  <td>✅️</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">
                    Query Field Weights &<br />Boosting
                  </td>
                  <td>✅️</td>
                  <td>❌</td>
                  <td>✅️</td>
                  <td>❌</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">
                    Scoped API Keys &<br />Multi-tenant indices
                  </td>
                  <td>✅️</td>
                  <td>✅️</td>
                  <td>❌</td>
                  <td>✅</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Federated Multi-Index Search</td>
                  <td>✅️</td>
                  <td>✅️</td>
                  <td>✅️</td>
                  <td>✅️</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Grouping / Distinct</td>
                  <td>✅️</td>
                  <td>
                    ✅<br /><br />
                    Upto one distinct field
                  </td>
                  <td>✅️</td>
                  <td>
                    🔶<br /><br />
                    Upto one distinct field, no support for grouping
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold">
                    JOINs across multiple indices
                  </td>
                  <td>✅️</td>
                  <td>❌</td>
                  <td>❌</td>
                  <td>❌</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Dynamic Sorting</td>
                  <td>
                    ✅<br /><br />Sort fields can be defined at query time using
                    a single index
                  </td>
                  <td>
                    🔶<br /><br />Duplicate indices need to be created for each
                    sort order, for
                    <a
                      href="https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/in-depth/exhaustive-sort/"
                      target="_blank"
                      >Exhaustive Sorting</a
                    >.<br /><br />
                    Virtual replica indices can be used for
                    <a
                      href="https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/in-depth/relevant-sort/"
                      target="_blank"
                      >Relevant Sorting</a
                    >.
                  </td>
                  <td>
                    ✅<br /><br />Sort fields can be defined at query time using
                    a single index
                  </td>
                  <td>
                    ✅<br /><br />Sort fields need to be defined upfront, but
                    can be changed at query time, using a single index.
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Faceting & Filtering</td>
                  <td>✅️</td>
                  <td>✅️</td>
                  <td>✅️</td>
                  <td>✅</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Ranking on Filter Scores</td>
                  <td>✅️</td>
                  <td>✅️</td>
                  <td>❌</td>
                  <td>❌</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Facet Value Searches</td>
                  <td>✅️</td>
                  <td>✅️</td>
                  <td>❌</td>
                  <td>✅️</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">
                    Result Pinning / Merchandising
                  </td>
                  <td>✅️</td>
                  <td>
                    ✅<br /><br />Upto 10 results in Free Tier, Upto 10,000
                    results in Premium Tier
                  </td>
                  <td>
                    ✅️<br /><br />
                    Available only in closed-source version
                  </td>
                  <td>❌</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Synonyms</td>
                  <td>✅️</td>
                  <td>✅️<br /><br />Upto 10,000 per index</td>
                  <td>✅️</td>
                  <td>✅️</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Dynamic Synonym Suggestions</td>
                  <td>❌️</td>
                  <td>✅️<br /><br />Available in Premium Tier</td>
                  <td>❌</td>
                  <td>❌</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Language support</td>
                  <td>All languages</td>
                  <td>All languages</td>
                  <td>All languages</td>
                  <td>All languages</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Stop words</td>
                  <td>✅</td>
                  <td>✅️</td>
                  <td>✅️</td>
                  <td>✅️</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Stemming</td>
                  <td>✅</td>
                  <td>✅️</td>
                  <td>✅️</td>
                  <td>❌</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Geo Search</td>
                  <td>✅</td>
                  <td>🔶 <br /><br />Limited to one geo point</td>
                  <td>✅️</td>
                  <td>🔶 <br /><br />Limited to one geo point</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">
                    Automatic Record ID generation
                  </td>
                  <td>✅</td>
                  <td>✅️</td>
                  <td>✅️</td>
                  <td>❌<br /><br />IDs needs to be pre-generated</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Sort by String field</td>
                  <td>
                    ✅<br /><br />
                    Up to 3 tie-breaking sort fields per search query
                  </td>
                  <td>
                    ✅<br /><br />But
                    <a
                      href="https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/how-to/sort-an-index-alphabetically/"
                      target="_blank"
                      >not recommended</a
                    >
                  </td>
                  <td>✅️</td>
                  <td>✅</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Search Analytics</td>
                  <td>
                    <a
                      href="https://typesense.org/docs/guide/search-analytics.html"
                      target="_blank"
                      >Client-side and Server-side</a
                    >
                  </td>
                  <td>Client-side and Server-side</td>
                  <td>❌</td>
                  <td>❌</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Record Schema Validations</td>
                  <td>✅️</td>
                  <td>❌</td>
                  <td>
                    ✅<br /><br />
                    with coerced mapping
                  </td>
                  <td>❌</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Schemaless</td>
                  <td>
                    ✅<br /><br />
                    <a
                      href="https://typesense.org/docs/0.24.0/api/collections.html#with-auto-schema-detection"
                      target="_blank"
                      >Automatic schema detection</a
                    >
                    needs to be enabled.
                  </td>
                  <td>✅</td>
                  <td>
                    ✅<br /><br />
                    with coerced mapping
                  </td>
                  <td>✅</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Custom Ranking Rules</td>
                  <td>✅</td>
                  <td>✅️</td>
                  <td>✅️</td>
                  <td>✅️</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">
                    Negative Keyword Search <br />(<code>-query</code>)
                  </td>
                  <td>✅️</td>
                  <td>✅️</td>
                  <td>✅️</td>
                  <td>❌</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">
                    Phrase Search <br />(<code>"some query"</code>)
                  </td>
                  <td>✅</td>
                  <td>✅️</td>
                  <td>✅️</td>
                  <td>✅</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">
                    Vector Search <br />
                    (Nearest-Neighbor Search)
                  </td>
                  <td>✅</td>
                  <td>❌</td>
                  <td>✅️</td>
                  <td>❌</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Semantic Search</td>
                  <td>✅</td>
                  <td>✅ <br /><br />Called NeuralSearch</td>
                  <td>❌</td>
                  <td>❌</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Similarity Search</td>
                  <td>✅<br /><br />Can be implemented using Vector Search</td>
                  <td>❌</td>
                  <td>✅️<br /><br />Can be implemented using Vector Search</td>
                  <td>❌</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Image Search</td>
                  <td>✅<br /><br />Built-in integration with CLIP</td>
                  <td>❌</td>
                  <td>❌</td>
                  <td>❌</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Voice Search</td>
                  <td>✅<br /><br />Built-in integration with Whisper</td>
                  <td>❌</td>
                  <td>❌</td>
                  <td>❌</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Conversational Q&A Search</td>
                  <td>
                    ✅<br /><br />Built-in RAG pipeline and integration with
                    OpenAI and Cloudflare LLMs
                  </td>
                  <td>❌</td>
                  <td>❌</td>
                  <td>❌</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Recommendations</td>
                  <td>
                    🔶️<br /><br />Not out-of-the-box, but can be
                    <a
                      href="https://typesense.org/docs/guide/recommendations.html"
                      target="_blank"
                    >
                      implemented</a
                    >
                    using Vector Search
                  </td>
                  <td>✅</td>
                  <td>
                    🔶️<br /><br />Not out-of-the-box, but can be implemented
                    using Vector Search
                  </td>
                  <td>❌</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">
                    User-level Search Personalization
                  </td>
                  <td>
                    🔶️<br /><br />Not out-of-the-box, but can be
                    <a
                      href="https://typesense.org/docs/guide/personalization.html"
                      target="_blank"
                    >
                      implemented</a
                    >
                    using Vector Search.
                  </td>
                  <td>
                    ✅<br /><br />
                    Premium Tier
                  </td>
                  <td>❌</td>
                  <td>❌</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Collection Aliases</td>
                  <td>✅️</td>
                  <td>❌</td>
                  <td>✅️</td>
                  <td>❌</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Collection Swapping</td>
                  <td>✅️</td>
                  <td>✅️</td>
                  <td>✅️</td>
                  <td>✅️</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">A/B Testing Results</td>
                  <td>
                    🔶️<br /><br />
                    <a
                      href="https://typesense.org/docs/guide/ab-testing.html"
                      target="_blank"
                      >Can be implemented</a
                    >
                    by swapping collections and search parameters based on AB
                    Test Bucket
                  </td>
                  <td>
                    ✅<br /><br />
                    Premium Tier
                  </td>
                  <td>❌</td>
                  <td>
                    🔶️<br /><br />
                    Can be implemented by swapping collections and search
                    parameters based on AB Test Bucket
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Query Suggestions</td>
                  <td>✅️</td>
                  <td>✅️</td>
                  <td>❌</td>
                  <td>❌</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Visual Dashboard</td>
                  <td>✅<br /><br />In Typesense Cloud</td>
                  <td>✅️</td>
                  <td>🔶️<br /><br />3rd party plugins</td>
                  <td>✅️<br /><br />Search only</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Site Crawler</td>
                  <td>
                    ✅<br /><br />
                    <a
                      href="https://typesense.org/docs/guide/docsearch.html"
                      target="_blank"
                      >DocSearch crawler</a
                    >
                    for docs sites.
                  </td>
                  <td>
                    ✅<br /><br />
                    DocSearch crawler for docs sites.<br />
                    General site crawler is part of Premium Tier.
                  </td>
                  <td>❌</td>
                  <td>✅<br /><br />DocSearch crawler for docs sites.</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Search UI Component Library</td>
                  <td>✅<br /><br />Supports InstantSearch.js</td>
                  <td>✅<br /><br />InstantSearch.js</td>
                  <td>✅<br /><br />Search UI, requires hosted search</td>
                  <td>✅<br /><br />Forked version of InstantSearch.js</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Privacy Friendliness</td>
                  <td>
                    ✅<br /><br />Does NOT collect usage analytics or personal
                    data in both Self-Hosted and SaaS options.
                  </td>
                  <td>
                    🔶<br /><br />Collects personal data, usage analytics & IP
                    addresses.
                  </td>
                  <td>
                    🔶<br /><br />
                    Collects personal data, hardware information, RAM used,
                    unique fingerprint ID for licensing.
                  </td>
                  <td>
                    🔶<br /><br /><a
                      href="https://docs.meilisearch.com/learn/what_is_meilisearch/telemetry.html#exhaustive-list-of-all-collected-data"
                      target="_blank"
                      >Collects</a
                    >
                    hardware information, total number of documents, number of
                    document updates, server uptime, search settings, etc.
                    Opt-out supported.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="mt-5 mb-3">Limits</h3>
          <div class="table-responsive">
            <table class="table table-condensed feature-list">
              <thead class="thead-dark">
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Typesense</th>
                  <th scope="col">Algolia</th>
                  <th scope="col">ElasticSearch</th>
                  <th scope="col">Meilisearch</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="font-weight-bold">Number of Documents</td>
                  <td>No limitation, only constrained by available RAM</td>
                  <td>Unknown</td>
                  <td>
                    No limitation, only constrained by available disk space
                  </td>
                  <td>
                    No limitation, constrained by available disk space and
                    <a
                      href="https://docs.meilisearch.com/learn/advanced/storage.html#:~:text=it%20is%20recommended%20to%20provide%20the%20same%20amount%20of%20RAM%20as%20the%20size%20the%20database%20takes%20on%20disk,%20so%20all%20the%20data%20structures%20can%20fit%20in%20memory"
                      target="_blank"
                    >
                      performance is constrained by available RAM</a
                    >.
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Maximum Number of Indices</td>
                  <td>No limitation</td>
                  <td>No limitation</td>
                  <td>No limitation</td>
                  <td>200 for Linux/MacOS, 20 for Windows</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Maximum Index Size</td>
                  <td>No limitations, only constrained by available RAM</td>
                  <td>128 GB</td>
                  <td>No limitation</td>
                  <td>500GB</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Maximum Words per field</td>
                  <td>No limitation</td>
                  <td>No limitation</td>
                  <td>No limitation</td>
                  <td>No limitation</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Maximum Record Size</td>
                  <td>No limitation</td>
                  <td>10KB</td>
                  <td>No limitation</td>
                  <td>2GB</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Number of API Keys</td>
                  <td>No limitation</td>
                  <td>5000</td>
                  <td>No limitation</td>
                  <td>No limitation</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="mt-5 mb-3">Support</h3>
          <div class="table-responsive">
            <table class="table table-condensed feature-list">
              <thead class="thead-dark">
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Typesense</th>
                  <th scope="col">Algolia</th>
                  <th scope="col">ElasticSearch</th>
                  <th scope="col">Meilisearch</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="font-weight-bold">Channels</td>
                  <td>
                    GitHub issues<br />
                    Email<br />
                    Public Slack Community<br />
                    Phone<br />
                    Private Slack<br />
                    Paid Prioritized Support
                  </td>
                  <td>
                    GitHub issues<br />
                    Email<br />
                    Public Slack Community<br />
                    Phone<br />
                    Paid Prioritized Support
                  </td>
                  <td>
                    GitHub issues<br />
                    Email<br />
                    Public Slack Community<br />
                    Paid Prioritized Support
                  </td>
                  <td>
                    GitHub issues<br />
                    Email<br />
                    Public Discord Community
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Support Hours</td>
                  <td>24 x 7 x 365 <br />for Paid Prioritized Support</td>
                  <td>
                    Mon - Fri; Business Hours<br />
                    9am - 5pm in user timezone<br />for Paid Prioritized Support
                  </td>
                  <td>
                    24 x 7 x 365 <br />for Platinum and Enterprise Prioritized
                    Support
                  </td>
                  <td>
                    8am - 10pm (Paris Time), <br />Mon - Thu<br />
                    for Enterprise customers
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Expert Onboarding & Training</td>
                  <td>✅</td>
                  <td>✅</td>
                  <td>✅</td>
                  <td>❌</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Algolia vs Elasticsearch vs Meilisearch vs Typesense Comparison',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'A side-by-side, feature-by-feature comparison of search engine alternatives available today.',
        },
      ],
    }
  },
}
</script>

<style scoped>
.jumbotron {
  background-color: unset;
  margin-bottom: 0;
  padding-bottom: 1rem;
}

td {
  width: 20%;
}
</style>
