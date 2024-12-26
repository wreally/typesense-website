const { description } = require('../../package')
const { typesenseVersions, typesenseLatestVersion } = require('../../../typesenseVersions')
const path = require('path')

let config = {
  // The base URL the site will be deployed at
  base: '/docs/',

  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */

  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#D52783' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: 'Typesense Documentation' }],
    ['meta', { name: 'og:description', content: description }],
    ['meta', { name: 'og:image', content: 'https://typesense.org/docs/images/opengraph_banner.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Typesense Documentation' }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:image', content: 'https://typesense.org/docs/images/opengraph_banner.png' }],
    ['link', { rel: 'icon', href: '/favicon.png' }],
    // Disable helpscout to improve page load times
    // [
    //   'script',
    //   {},
    //   `
    //     !function (e, t, n) {
    //     function a() {
    //       var e = t.getElementsByTagName("script")[0], n = t.createElement("script");
    //       n.type = "text/javascript", n.async = !0, n.src = "https://beacon-v2.helpscout.net", e.parentNode.insertBefore(n, e)
    //     }
    //
    //     if (e.Beacon = n = function (t, n, a) {
    //       e.Beacon.readyQueue.push({method: t, options: n, data: a})
    //     }, n.readyQueue = [], "complete" === t.readyState) return a();
    //     e.attachEvent ? e.attachEvent("onload", a) : e.addEventListener("load", a, !1)
    //   }(window, document, window.Beacon || function () {
    //   });
    //   window.Beacon('config', { display: { style: 'icon' } })
    //   window.Beacon('init', '11291d62-d72c-4354-9f74-dfd71bb37718')
    // `,
    // ],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    logo: '/images/typesense_logo.svg',
    logoHeight: 42,
    logoWidth: 150,
    typesenseVersions: typesenseVersions,
    typesenseLatestVersion: typesenseLatestVersion,
    typesenseDocsearch: {
      typesenseServerConfig: {
        nearestNode: {
          host: '01brzocp328nd4xvp.a1.typesense.net',
          port: 443,
          protocol: 'https',
        },
        nodes: [
          {
            host: '01brzocp328nd4xvp-1.a1.typesense.net',
            port: 443,
            protocol: 'https',
          },
          {
            host: '01brzocp328nd4xvp-2.a1.typesense.net',
            port: 443,
            protocol: 'https',
          },
          {
            host: '01brzocp328nd4xvp-3.a1.typesense.net',
            port: 443,
            protocol: 'https',
          },
        ],
        apiKey: 'qt4AWfMTN2YeLq1EjgQF6GngcOz3J3jl',
      },
      typesenseCollectionName: 'typesense_docs',
      typesenseSearchParams: {
        per_page: 6,
        query_by:
          'hierarchy.lvl0,hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3,hierarchy.lvl4,hierarchy.lvl5,hierarchy.lvl6,content,embedding',
        vector_query: 'embedding:([], k: 5, distance_threshold: 1.0, alpha: 0.2)',
        include_fields:
          'id,anchor,content,hierarchy,hierarchy.lvl0,hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3,hierarchy.lvl4,hierarchy.lvl5,hierarchy.lvl6,url',
      },
    },
    // Versioned nav links are dynamically populated by .vuepress/plugins/typesense-enhancements.js
    // Add any non-versioned pages below
    nav: [
      { text: 'Help', link: '/help' },
      { text: 'Roadmap', link: 'https://github.com/orgs/typesense/projects/1' },
    ],
    repo: 'typesense/typesense',
    smoothScroll: false, // We're handling this custom using the typesense-enhancements plugin
    markdown: {
      lineNumbers: false,
    },
    // https://vuepress.vuejs.org/theme/default-theme-config.html#git-repository-and-edit-links
    // if your docs are in a different repo from your main project:
    docsRepo: 'typesense/typesense-website',
    // if your docs are not at the root of the repo:
    docsDir: 'docs-site/content',
    // if your docs are in a specific branch (defaults to 'master'):
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: 'Edit page',
    sidebarDepth: 2, // Can also be overridden via frontmatter
    sidebar: {
      '/overview': [
        {
          title: 'Overview', // required
          collapsable: false, // optional, defaults to true
          children: [
            ['/overview/what-is-typesense', 'What is Typesense?'],
            ['/overview/why-typesense', 'Why Typesense?'],
            ['/overview/features', 'Key Features'],
            ['/overview/comparison-with-alternatives', 'Comparison with alternatives'],
          ],
        },
        ['/overview/use-cases', 'Use Cases'],
        ['/overview/demos', 'Live Demos'],
        ['/overview/benchmarks', 'Benchmarks'],
        ['/guide/', 'Guide'],
        ['/api/', 'API Reference'],
        ['/help', 'Help'],
      ],
      '/guide/': [
        ['/guide/', 'Introduction'],
        {
          title: 'Getting Started', // required
          collapsable: false, // optional, defaults to true
          children: [
            ['/guide/install-typesense', 'Install Typesense'],
            ['/guide/installing-a-client', 'Installing a Client'],
            ['/guide/building-a-search-application', 'Building a Search Application'],
            ['/guide/search-ui-components', 'Search UI Components'],
          ],
        },
        {
          title: 'Configuration', // required
          collapsable: false, // optional, defaults to true
          children: [
            ['/guide/system-requirements', 'System Requirements'],
            ['/guide/high-availability', 'High Availability'],
            ['/guide/updating-typesense', 'Updating Typesense'],
            ['/guide/backups', 'Backups'],
            ['/guide/typesense-cloud/search-delivery-network', 'Search Delivery Network (Typesense Cloud)'],
          ],
        },
        {
          title: 'Data Management', // required
          collapsable: false, // optional, defaults to true
          children: [
            ['/guide/organizing-collections', 'Organizing Collections'],
            ['/guide/syncing-data-into-typesense', 'Syncing Data into Typesense'],
            ['/guide/data-access-control', 'Managing Access to Data'],
          ],
        },
        {
          title: 'Best Practices',
          collapsable: false,
          children: [
            ['/guide/ranking-and-relevance', 'Tuning Ranking and Relevance'],
            ['/guide/tips-for-searching-common-types-of-data', 'Tips for Searching Common Types of Data'],
            ['/guide/locale', 'Tips for Locale-Specific Search'],
            ['/guide/tips-for-filtering', 'Tips for Filtering Data in Typesense'],
            ['/guide/running-in-production', 'Running in Production'],
          ],
        },
        {
          title: 'Cookbooks', // required
          collapsable: false, // optional, defaults to true
          children: [
            ['/guide/search-analytics', 'Search Analytics'],
            ['/guide/semantic-search', 'Semantic Search'],
            ['/guide/recommendations', 'Recommendations'],
            ['/guide/personalization', 'Personalization'],
            ['/guide/ab-testing', 'A/B Testing'],
            ['/guide/query-suggestions', 'Query Suggestions'],
            ['/guide/natural-language-search', 'Natural Language Search'],
            ['/guide/docker-swarm-high-availability', 'Running on Docker Swarm'],
            ['/guide/github-actions', 'Running Tests in Github Actions'],
            ['/guide/migrating-from-algolia', 'Migrating from Algolia'],
            ['/guide/testcontainers', 'Running Tests with Testcontainers'],
          ],
        },

        {
          title: 'Walk-Throughs',
          collapsable: false, // optional, defaults to true
          children: [
            ['/guide/firebase-full-text-search', 'Firebase Full Text Search'],
            ['/guide/dynamodb-full-text-search', 'AWS DynamoDB Full Text Search'],
            ['/guide/mongodb-full-text-search', 'MongoDB Full Text Search'],
            ['/guide/supabase-full-text-search', 'Supabase Full Text Search'],
            ['/guide/laravel-full-text-search.md', 'Laravel Full Text Search'],
            ['/guide/docsearch', 'Search for Documentation Sites'],
            ['/guide/wordpress-search', 'Search for WordPress Sites'],
            ['/guide/magento2-search', 'Search for Magento Sites'],
          ],
        },
        {
          title: 'Teams',
          collapsable: false,
          children: [
            ['/guide/typesense-cloud/team-accounts', 'Team Accounts (Typesense Cloud)'],
            [
              '/guide/typesense-cloud/role-based-access-control-admin-dashboard',
              'Role-Based Access Control for Admin Dashboard (Typesense Cloud)',
            ],
            ['/guide/typesense-cloud/single-sign-on', 'Single Sign-On (Typesense Cloud)'],
          ],
        },
        {
          title: 'Reference Implementations',
          path: '/guide/reference-implementations/',
          collapsable: false, // optional, defaults to true
          children: [
            ['/guide/reference-implementations/recipe-search', 'Recipe Search'],
            ['/guide/reference-implementations/linux-commits-search', 'Linux Commits Search'],
            ['/guide/reference-implementations/ecommerce-storefront', 'E-Commerce Storefront'],
            [
              '/guide/reference-implementations/ecommerce-storefront-with-next-js-and-typesense',
              'E-Commerce Storefront with Next.js',
            ],
            ['/guide/reference-implementations/nextjs-app-router-ssr', 'Next.js App Router with Server-Side Rendering'],
            ['/guide/reference-implementations/songs-search', 'Songs Search'],
            ['/guide/reference-implementations/books-search', 'Books Search'],
            ['/guide/reference-implementations/good-reads-books-search-with-vue', 'Good Reads Books Search with Vue'],
            [
              '/guide/reference-implementations/good-reads-books-search-without-npm',
              'Good Reads Books Search without NPM',
            ],
            ['/guide/reference-implementations/typeahead-spellchecker', 'Typeahead Spellchecker'],
            ['/guide/reference-implementations/xkcd-search', 'xkcd Search'],
            ['/guide/reference-implementations/federated-search', 'Federated Search'],
            ['/guide/reference-implementations/geo-search', 'Geo Search'],
            ['/guide/reference-implementations/airports-geo-search', 'Airports Geo Search'],
            ['/guide/reference-implementations/typesense-autocomplete-js', 'Autocomplete.js with Typesense'],
            ['/guide/reference-implementations/hn-comments-semantic-hybrid-search', 'Semantic + Hybrid Search'],
            ['/guide/reference-implementations/laravel-scout-integration', 'Laravel Scout Integration'],
            ['/guide/reference-implementations/joins', 'JOINs with Django'],
            [
              '/guide/reference-implementations/guitar-chords-search-in-different-js-frameworks',
              'Guitar Chords Search in different JS frameworks',
            ],
            ['/guide/reference-implementations/address-autocomplete.md', 'Address autocomplete'],
            ['/guide/reference-implementations/kotlin-soccer-search.md', 'Kotlin Full Text Search'],

            [
              '/guide/reference-implementations/pg-essays-conversational-search',
              'Conversational Search with Paul Graham Essays',
            ],
            ['/guide/reference-implementations/ai-image-search.md', 'AI Image Search'],
          ],
        },
        ['/guide/faqs', 'Frequently Asked Questions'],
      ],

      '/cloud-management-api/v1/': [
        ['/cloud-management-api/v1/', 'Overview'],
        ['/cloud-management-api/v1/authentication', 'Authentication'],
        {
          title: 'API Resources',
          collapsable: false,
          children: [
            ['/cloud-management-api/v1/cluster-management', 'Cluster Management'],
            ['/cloud-management-api/v1/cluster-configuration-changes', 'Cluster Configuration Changes'],
          ],
        },
        ['/cloud-management-api/v1/response-codes', 'Response Codes'],
        ['/cloud-management-api/v1/rate-limits', 'Rate Limits'],
        ['/cloud-management-api/v1/terraform-module', 'Terraform Module'],
      ],

      //For 27.1
      '/27.1/api/': [
        ['/27.1/api/', 'Introduction'],
        ['/27.1/api/server-configuration', 'Server Configuration'],
        ['/27.1/api/api-clients', 'API Clients'],
        ['/27.1/api/authentication', 'Authentication'],
        {
          title: 'API Resources',
          collapsable: false,
          children: [
            ['/27.1/api/collections', 'Collections'],
            ['/27.1/api/documents', 'Documents'],
            ['/27.1/api/search', 'Search'],
            ['/27.1/api/geosearch', 'GeoSearch'],
            ['/27.1/api/vector-search', 'Vector Search'],
            ['/27.1/api/federated-multi-search', 'Federated / Multi Search'],
            ['/27.1/api/voice-search-query', 'Voice Query'],
            ['/27.1/api/image-search', 'Image Search'],
            ['/27.1/api/conversational-search-rag', 'Conversational Search (RAG)'],
            ['/27.1/api/joins', 'JOINs'],
            ['/27.1/api/analytics-query-suggestions', 'Analytics & Query Suggestions'],
            ['/27.1/api/api-keys', 'API Keys'],
            ['/27.1/api/curation', 'Curation'],
            ['/27.1/api/collection-alias', 'Collection Alias'],
            ['/27.1/api/synonyms', 'Synonyms'],
            ['/27.1/api/stopwords', 'Stopwords'],
            ['/27.1/api/cluster-operations', 'Cluster Operations'],
          ],
        },
        ['/27.1/api/api-errors', 'API Errors'],
      ],

      //For 27.0
      '/27.0/api/': [
        ['/27.0/api/', 'Introduction'],
        ['/27.0/api/server-configuration', 'Server Configuration'],
        ['/27.0/api/api-clients', 'API Clients'],
        ['/27.0/api/authentication', 'Authentication'],
        {
          title: 'API Resources',
          collapsable: false,
          children: [
            ['/27.0/api/collections', 'Collections'],
            ['/27.0/api/documents', 'Documents'],
            ['/27.0/api/search', 'Search'],
            ['/27.0/api/geosearch', 'GeoSearch'],
            ['/27.0/api/vector-search', 'Vector Search'],
            ['/27.0/api/federated-multi-search', 'Federated / Multi Search'],
            ['/27.0/api/voice-search-query', 'Voice Query'],
            ['/27.0/api/image-search', 'Image Search'],
            ['/27.0/api/conversational-search-rag', 'Conversational Search (RAG)'],
            ['/27.0/api/joins', 'JOINs'],
            ['/27.0/api/analytics-query-suggestions', 'Analytics & Query Suggestions'],
            ['/27.0/api/api-keys', 'API Keys'],
            ['/27.0/api/curation', 'Curation'],
            ['/27.0/api/collection-alias', 'Collection Alias'],
            ['/27.0/api/synonyms', 'Synonyms'],
            ['/27.0/api/stopwords', 'Stopwords'],
            ['/27.0/api/cluster-operations', 'Cluster Operations'],
          ],
        },
        ['/27.0/api/api-errors', 'API Errors'],
      ],

      //For 26.0
      '/26.0/api/': [
        ['/26.0/api/', 'Introduction'],
        ['/26.0/api/server-configuration', 'Server Configuration'],
        ['/26.0/api/api-clients', 'API Clients'],
        ['/26.0/api/authentication', 'Authentication'],
        {
          title: 'API Resources',
          collapsable: false,
          children: [
            ['/26.0/api/collections', 'Collections'],
            ['/26.0/api/documents', 'Documents'],
            ['/26.0/api/search', 'Search'],
            ['/26.0/api/geosearch', 'GeoSearch'],
            ['/26.0/api/vector-search', 'Vector Search'],
            ['/26.0/api/federated-multi-search', 'Federated / Multi Search'],
            ['/26.0/api/voice-search-query', 'Voice Query'],
            ['/26.0/api/image-search', 'Image Search'],
            ['/26.0/api/conversational-search-rag', 'Conversational Search (RAG)'],
            ['/26.0/api/joins', 'JOINs'],
            ['/26.0/api/analytics-query-suggestions', 'Analytics & Query Suggestions'],
            ['/26.0/api/api-keys', 'API Keys'],
            ['/26.0/api/curation', 'Curation'],
            ['/26.0/api/collection-alias', 'Collection Alias'],
            ['/26.0/api/synonyms', 'Synonyms'],
            ['/26.0/api/stopwords', 'Stopwords'],
            ['/26.0/api/cluster-operations', 'Cluster Operations'],
          ],
        },
        ['/26.0/api/api-errors', 'API Errors'],
      ],

      //For 0.25.2
      '/0.25.2/api/': [
        ['/0.25.2/api/', 'Introduction'],
        ['/0.25.2/api/server-configuration', 'Server Configuration'],
        ['/0.25.2/api/api-clients', 'API Clients'],
        ['/0.25.2/api/authentication', 'Authentication'],
        {
          title: 'API Resources',
          collapsable: false,
          children: [
            ['/0.25.2/api/collections', 'Collections'],
            ['/0.25.2/api/documents', 'Documents'],
            ['/0.25.2/api/search', 'Search'],
            ['/0.25.2/api/geosearch', 'GeoSearch'],
            ['/0.25.2/api/vector-search', 'Vector Search'],
            ['/0.25.2/api/federated-multi-search', 'Federated / Multi Search'],
            ['/0.25.2/api/analytics-query-suggestions', 'Analytics & Query Suggestions'],
            ['/0.25.2/api/api-keys', 'API Keys'],
            ['/0.25.2/api/curation', 'Curation'],
            ['/0.25.2/api/collection-alias', 'Collection Alias'],
            ['/0.25.2/api/synonyms', 'Synonyms'],
            ['/0.25.2/api/cluster-operations', 'Cluster Operations'],
          ],
        },
        ['/0.25.2/api/api-errors', 'API Errors'],
      ],

      //For 0.25.1
      '/0.25.1/api/': [
        ['/0.25.1/api/', 'Introduction'],
        ['/0.25.1/api/server-configuration', 'Server Configuration'],
        ['/0.25.1/api/api-clients', 'API Clients'],
        ['/0.25.1/api/authentication', 'Authentication'],
        {
          title: 'API Resources',
          collapsable: false,
          children: [
            ['/0.25.1/api/collections', 'Collections'],
            ['/0.25.1/api/documents', 'Documents'],
            ['/0.25.1/api/search', 'Search'],
            ['/0.25.1/api/geosearch', 'GeoSearch'],
            ['/0.25.1/api/vector-search', 'Vector Search'],
            ['/0.25.1/api/federated-multi-search', 'Federated / Multi Search'],
            ['/0.25.1/api/analytics-query-suggestions', 'Analytics & Query Suggestions'],
            ['/0.25.1/api/api-keys', 'API Keys'],
            ['/0.25.1/api/curation', 'Curation'],
            ['/0.25.1/api/collection-alias', 'Collection Alias'],
            ['/0.25.1/api/synonyms', 'Synonyms'],
            ['/0.25.1/api/cluster-operations', 'Cluster Operations'],
          ],
        },
        ['/0.25.1/api/api-errors', 'API Errors'],
      ],

      //For 0.25.0
      '/0.25.0/api/': [
        ['/0.25.0/api/', 'Introduction'],
        ['/0.25.0/api/server-configuration', 'Server Configuration'],
        ['/0.25.0/api/api-clients', 'API Clients'],
        ['/0.25.0/api/authentication', 'Authentication'],
        {
          title: 'API Resources',
          collapsable: false,
          children: [
            ['/0.25.0/api/collections', 'Collections'],
            ['/0.25.0/api/documents', 'Documents'],
            ['/0.25.0/api/search', 'Search'],
            ['/0.25.0/api/geosearch', 'GeoSearch'],
            ['/0.25.0/api/vector-search', 'Vector Search'],
            ['/0.25.0/api/federated-multi-search', 'Federated / Multi Search'],
            ['/0.25.0/api/analytics-query-suggestions', 'Analytics & Query Suggestions'],
            ['/0.25.0/api/api-keys', 'API Keys'],
            ['/0.25.0/api/curation', 'Curation'],
            ['/0.25.0/api/collection-alias', 'Collection Alias'],
            ['/0.25.0/api/synonyms', 'Synonyms'],
            ['/0.25.0/api/cluster-operations', 'Cluster Operations'],
          ],
        },
        ['/0.25.0/api/api-errors', 'API Errors'],
      ],

      //For 0.24.1
      '/0.24.1/api/': [
        ['/0.24.1/api/', 'Introduction'],
        ['/0.24.1/api/server-configuration', 'Server Configuration'],
        ['/0.24.1/api/api-clients', 'API Clients'],
        ['/0.24.1/api/authentication', 'Authentication'],
        {
          title: 'API Resources',
          collapsable: false,
          children: [
            ['/0.24.1/api/collections', 'Collections'],
            ['/0.24.1/api/documents', 'Documents'],
            ['/0.24.1/api/search', 'Search'],
            ['/0.24.1/api/geosearch', 'GeoSearch'],
            ['/0.24.1/api/vector-search', 'Vector Search'],
            ['/0.24.1/api/federated-multi-search', 'Federated / Multi Search'],
            ['/0.24.1/api/api-keys', 'API Keys'],
            ['/0.24.1/api/curation', 'Curation'],
            ['/0.24.1/api/collection-alias', 'Collection Alias'],
            ['/0.24.1/api/synonyms', 'Synonyms'],
            ['/0.24.1/api/cluster-operations', 'Cluster Operations'],
          ],
        },
        ['/0.24.1/api/api-errors', 'API Errors'],
      ],

      //For 0.24.0
      '/0.24.0/api/': [
        ['/0.24.0/api/', 'Introduction'],
        ['/0.24.0/api/server-configuration', 'Server Configuration'],
        ['/0.24.0/api/api-clients', 'API Clients'],
        ['/0.24.0/api/authentication', 'Authentication'],
        {
          title: 'API Resources',
          collapsable: false,
          children: [
            ['/0.24.0/api/collections', 'Collections'],
            ['/0.24.0/api/documents', 'Documents'],
            ['/0.24.0/api/search', 'Search'],
            ['/0.24.0/api/geosearch', 'GeoSearch'],
            ['/0.24.0/api/vector-search', 'Vector Search'],
            ['/0.24.0/api/federated-multi-search', 'Federated / Multi Search'],
            ['/0.24.0/api/api-keys', 'API Keys'],
            ['/0.24.0/api/curation', 'Curation'],
            ['/0.24.0/api/collection-alias', 'Collection Alias'],
            ['/0.24.0/api/synonyms', 'Synonyms'],
            ['/0.24.0/api/cluster-operations', 'Cluster Operations'],
          ],
        },
        ['/0.24.0/api/api-errors', 'API Errors'],
      ],

      //For 0.23.1
      '/0.23.1/api/': [
        ['/0.23.1/api/', 'Introduction'],
        ['/0.23.1/api/server-configuration', 'Server Configuration'],
        ['/0.23.1/api/api-clients', 'API Clients'],
        ['/0.23.1/api/authentication', 'Authentication'],
        {
          title: 'API Resources',
          collapsable: false,
          children: [
            ['/0.23.1/api/collections', 'Collections'],
            ['/0.23.1/api/documents', 'Documents'],
            ['/0.23.1/api/search', 'Search'],
            ['/0.23.1/api/geosearch', 'GeoSearch'],
            ['/0.23.1/api/federated-multi-search', 'Federated / Multi Search'],
            ['/0.23.1/api/api-keys', 'API Keys'],
            ['/0.23.1/api/curation', 'Curation'],
            ['/0.23.1/api/collection-alias', 'Collection Alias'],
            ['/0.23.1/api/synonyms', 'Synonyms'],
            ['/0.23.1/api/cluster-operations', 'Cluster Operations'],
          ],
        },
        ['/0.23.1/api/api-errors', 'API Errors'],
      ],

      //For 0.23.0
      '/0.23.0/api/': [
        ['/0.23.0/api/', 'Introduction'],
        ['/0.23.0/api/server-configuration', 'Server Configuration'],
        ['/0.23.0/api/api-clients', 'API Clients'],
        ['/0.23.0/api/authentication', 'Authentication'],
        {
          title: 'API Resources',
          collapsable: false,
          children: [
            ['/0.23.0/api/collections', 'Collections'],
            ['/0.23.0/api/documents', 'Documents'],
            ['/0.23.0/api/search', 'Search'],
            ['/0.23.0/api/geosearch', 'GeoSearch'],
            ['/0.23.0/api/federated-multi-search', 'Federated / Multi Search'],
            ['/0.23.0/api/api-keys', 'API Keys'],
            ['/0.23.0/api/curation', 'Curation'],
            ['/0.23.0/api/collection-alias', 'Collection Alias'],
            ['/0.23.0/api/synonyms', 'Synonyms'],
            ['/0.23.0/api/cluster-operations', 'Cluster Operations'],
          ],
        },
        ['/0.23.0/api/api-errors', 'API Errors'],
      ],

      //For 0.22.2
      '/0.22.2/api/': [
        ['/0.22.2/api/', 'Introduction'],
        ['/0.22.2/api/server-configuration', 'Server Configuration'],
        ['/0.22.2/api/api-clients', 'API Clients'],
        ['/0.22.2/api/authentication', 'Authentication'],
        {
          title: 'API Resources',
          collapsable: false,
          children: [
            ['/0.22.2/api/collections', 'Collections'],
            ['/0.22.2/api/documents', 'Documents'],
            ['/0.22.2/api/api-keys', 'API Keys'],
            ['/0.22.2/api/curation', 'Curation'],
            ['/0.22.2/api/collection-alias', 'Collection Alias'],
            ['/0.22.2/api/synonyms', 'Synonyms'],
            ['/0.22.2/api/cluster-operations', 'Cluster Operations'],
          ],
        },
        ['/0.22.2/api/api-errors', 'API Errors'],
      ],

      //For 0.22.1
      '/0.22.1/api/': [
        ['/0.22.1/api/', 'Introduction'],
        ['/0.22.1/api/server-configuration', 'Server Configuration'],
        ['/0.22.1/api/api-clients', 'API Clients'],
        ['/0.22.1/api/authentication', 'Authentication'],
        {
          title: 'API Resources',
          collapsable: false,
          children: [
            ['/0.22.1/api/collections', 'Collections'],
            ['/0.22.1/api/documents', 'Documents'],
            ['/0.22.1/api/api-keys', 'API Keys'],
            ['/0.22.1/api/curation', 'Curation'],
            ['/0.22.1/api/collection-alias', 'Collection Alias'],
            ['/0.22.1/api/synonyms', 'Synonyms'],
            ['/0.22.1/api/cluster-operations', 'Cluster Operations'],
          ],
        },
        ['/0.22.1/api/api-errors', 'API Errors'],
      ],

      //For 0.22.0
      '/0.22.0/api/': [
        ['/0.22.0/api/', 'Introduction'],
        ['/0.22.0/api/server-configuration', 'Server Configuration'],
        ['/0.22.0/api/api-clients', 'API Clients'],
        ['/0.22.0/api/authentication', 'Authentication'],
        {
          title: 'API Resources',
          collapsable: false,
          children: [
            ['/0.22.0/api/collections', 'Collections'],
            ['/0.22.0/api/documents', 'Documents'],
            ['/0.22.0/api/api-keys', 'API Keys'],
            ['/0.22.0/api/curation', 'Curation'],
            ['/0.22.0/api/collection-alias', 'Collection Alias'],
            ['/0.22.0/api/synonyms', 'Synonyms'],
            ['/0.22.0/api/cluster-operations', 'Cluster Operations'],
          ],
        },
        ['/0.22.0/api/api-errors', 'API Errors'],
      ],

      //For 0.21.0
      '/0.21.0/api/': [
        ['/0.21.0/api/', 'Introduction'],
        ['/0.21.0/api/server-configuration', 'Server Configuration'],
        ['/0.21.0/api/api-clients', 'API Clients'],
        ['/0.21.0/api/authentication', 'Authentication'],
        {
          title: 'API Resources',
          collapsable: false,
          children: [
            ['/0.21.0/api/collections', 'Collections'],
            ['/0.21.0/api/documents', 'Documents'],
            ['/0.21.0/api/api-keys', 'API Keys'],
            ['/0.21.0/api/curation', 'Curation'],
            ['/0.21.0/api/collection-alias', 'Collection Alias'],
            ['/0.21.0/api/synonyms', 'Synonyms'],
            ['/0.21.0/api/cluster-operations', 'Cluster Operations'],
          ],
        },
        ['/0.21.0/api/api-errors', 'API Errors'],
      ],

      //For 0.20.0
      '/0.20.0/api/': [
        ['/0.20.0/api/', 'Introduction'],
        ['/0.20.0/api/server-configuration', 'Server Configuration'],
        ['/0.20.0/api/api-clients', 'API Clients'],
        ['/0.20.0/api/authentication', 'Authentication'],
        {
          title: 'API Resources',
          collapsable: false,
          children: [
            ['/0.20.0/api/collections', 'Collections'],
            ['/0.20.0/api/documents', 'Documents'],
            ['/0.20.0/api/api-keys', 'API Keys'],
            ['/0.20.0/api/curation', 'Curation'],
            ['/0.20.0/api/collection-alias', 'Collection Alias'],
            ['/0.20.0/api/synonyms', 'Synonyms'],
            ['/0.20.0/api/cluster-operations', 'Cluster Operations'],
          ],
        },
        ['/0.20.0/api/api-errors', 'API Errors'],
      ],

      //For 0.19.0
      '/0.19.0/api/': [
        ['/0.19.0/api/', 'Introduction'],
        ['/0.19.0/api/server-configuration', 'Server Configuration'],
        ['/0.19.0/api/api-clients', 'API Clients'],
        ['/0.19.0/api/authentication', 'Authentication'],
        {
          title: 'API Resources',
          collapsable: false,
          children: [
            ['/0.19.0/api/collections', 'Collections'],
            ['/0.19.0/api/documents', 'Documents'],
            ['/0.19.0/api/api-keys', 'API Keys'],
            ['/0.19.0/api/curation', 'Curation'],
            ['/0.19.0/api/collection-alias', 'Collection Alias'],
            ['/0.19.0/api/synonyms', 'Synonyms'],
            ['/0.19.0/api/cluster-operations', 'Cluster Operations'],
          ],
        },
        ['/0.19.0/api/api-errors', 'API Errors'],
      ],

      //For 0.18.0
      '/0.18.0/api/': [
        ['/0.18.0/api/', 'Introduction'],
        ['/0.18.0/api/server-configuration', 'Server Configuration'],
        ['/0.18.0/api/api-clients', 'API Clients'],
        ['/0.18.0/api/authentication', 'Authentication'],
        {
          title: 'API Resources',
          collapsable: false,
          children: [
            ['/0.18.0/api/collections', 'Collections'],
            ['/0.18.0/api/documents', 'Documents'],
            ['/0.18.0/api/api-keys', 'API Keys'],
            ['/0.18.0/api/curation', 'Curation'],
            ['/0.18.0/api/collection-alias', 'Collection Alias'],
            ['/0.18.0/api/synonyms', 'Synonyms'],
            ['/0.18.0/api/cluster-operations', 'Cluster Operations'],
          ],
        },
        ['/0.18.0/api/api-errors', 'API Errors'],
      ],

      //For 0.17.0
      '/0.17.0/api/': [
        ['/0.17.0/api/', 'Introduction'],
        ['/0.17.0/api/server-configuration', 'Server Configuration'],
        ['/0.17.0/api/api-clients', 'API Clients'],
        ['/0.17.0/api/authentication', 'Authentication'],
        {
          title: 'API Resources',
          collapsable: false,
          children: [
            ['/0.17.0/api/collections', 'Collections'],
            ['/0.17.0/api/documents', 'Documents'],
            ['/0.17.0/api/api-keys', 'API Keys'],
            ['/0.17.0/api/curation', 'Curation'],
            ['/0.17.0/api/collection-alias', 'Collection Alias'],
          ],
        },
        ['/0.17.0/api/api-errors', 'API Errors'],
      ],

      //For 0.16.1
      '/0.16.1/api/': [
        ['/0.16.1/api/', 'Introduction'],
        ['/0.16.1/api/server-configuration', 'Server Configuration'],
        ['/0.16.1/api/api-clients', 'API Clients'],
        ['/0.16.1/api/authentication', 'Authentication'],
        {
          title: 'API Resources',
          collapsable: false,
          children: [
            ['/0.16.1/api/collections', 'Collections'],
            ['/0.16.1/api/documents', 'Documents'],
            ['/0.16.1/api/api-keys', 'API Keys'],
            ['/0.16.1/api/curation', 'Curation'],
            ['/0.16.1/api/collection-alias', 'Collection Alias'],
          ],
        },
        ['/0.16.1/api/api-errors', 'API Errors'],
      ],

      //For 0.16.0
      '/0.16.0/api/': [
        ['/0.16.0/api/', 'Introduction'],
        ['/0.16.0/api/server-configuration', 'Server Configuration'],
        ['/0.16.0/api/api-clients', 'API Clients'],
        ['/0.16.0/api/authentication', 'Authentication'],
        {
          title: 'API Resources',
          collapsable: false,
          children: [
            ['/0.16.0/api/collections', 'Collections'],
            ['/0.16.0/api/documents', 'Documents'],
            ['/0.16.0/api/api-keys', 'API Keys'],
            ['/0.16.0/api/curation', 'Curation'],
            ['/0.16.0/api/collection-alias', 'Collection Alias'],
          ],
        },
        ['/0.16.0/api/api-errors', 'API Errors'],
      ],

      //For 0.15.0
      '/0.15.0/api/': [
        ['/0.15.0/api/', 'Introduction'],
        ['/0.15.0/api/server-configuration', 'Server Configuration'],
        ['/0.15.0/api/api-clients', 'API Clients'],
        ['/0.15.0/api/authentication', 'Authentication'],
        {
          title: 'API Resources',
          collapsable: false,
          children: [
            ['/0.15.0/api/collections', 'Collections'],
            ['/0.15.0/api/documents', 'Documents'],
            ['/0.15.0/api/api-keys', 'API Keys'],
            ['/0.15.0/api/curation', 'Curation'],
            ['/0.15.0/api/collection-alias', 'Collection Alias'],
          ],
        },
        ['/0.15.0/api/api-errors', 'API Errors'],
      ],

      // For 0.14.0
      '/0.14.0/api/': [
        ['/0.14.0/api/', 'Introduction'],
        ['/0.14.0/api/server-configuration', 'Server Configuration'],
        ['/0.14.0/api/api-clients', 'API Clients'],
        ['/0.14.0/api/authentication', 'Authentication'],
        {
          title: 'API Resources',
          collapsable: false,
          children: [
            ['/0.14.0/api/collections', 'Collections'],
            ['/0.14.0/api/documents', 'Documents'],
            ['/0.14.0/api/api-keys', 'API Keys'],
            ['/0.14.0/api/curation', 'Curation'],
            ['/0.14.0/api/collection-alias', 'Collection Alias'],
          ],
        },
        ['/0.14.0/api/api-errors', 'API Errors'],
      ],

      // For 0.13.0
      '/0.13.0/api/': [
        ['/0.13.0/api/', 'Introduction'],
        ['/0.13.0/api/server-configuration', 'Server Configuration'],
        ['/0.13.0/api/api-clients', 'API Clients'],
        ['/0.13.0/api/authentication', 'Authentication'],
        {
          title: 'API Resources',
          collapsable: false,
          children: [
            ['/0.13.0/api/collections', 'Collections'],
            ['/0.13.0/api/documents', 'Documents'],
            ['/0.13.0/api/api-keys', 'API Keys'],
            ['/0.13.0/api/curation', 'Curation'],
            ['/0.13.0/api/collection-alias', 'Collection Alias'],
          ],
        },
        ['/0.13.0/api/api-errors', 'API Errors'],
      ],

      // For 0.12.0
      '/0.12.0/api/': [
        ['/0.12.0/api/', 'Introduction'],
        ['/0.12.0/api/server-configuration', 'Server Configuration'],
        ['/0.12.0/api/api-clients', 'API Clients'],
        ['/0.12.0/api/authentication', 'Authentication'],
        {
          title: 'API Resources',
          collapsable: false,
          children: [
            ['/0.12.0/api/collections', 'Collections'],
            ['/0.12.0/api/documents', 'Documents'],
            ['/0.12.0/api/curation', 'Curation'],
            ['/0.12.0/api/collection-alias', 'Collection Alias'],
          ],
        },
        ['/0.12.0/api/api-errors', 'API Errors'],
      ],

      // For 0.11.2
      '/0.11.2/api/': [
        ['/0.11.2/api/', 'Introduction'],
        ['/0.11.2/api/server-configuration', 'Server Configuration'],
        ['/0.11.2/api/api-clients', 'API Clients'],
        ['/0.11.2/api/authentication', 'Authentication'],
        {
          title: 'API Resources',
          collapsable: false,
          children: [
            ['/0.11.2/api/collections', 'Collections'],
            ['/0.11.2/api/documents', 'Documents'],
          ],
        },
        ['/0.11.2/api/api-errors', 'API Errors'],
      ],

      // For 0.11.1
      '/0.11.1/api/': [
        ['/0.11.1/api/', 'Introduction'],
        ['/0.11.1/api/server-configuration', 'Server Configuration'],
        ['/0.11.1/api/api-clients', 'API Clients'],
        ['/0.11.1/api/authentication', 'Authentication'],
        {
          title: 'API Resources',
          collapsable: false,
          children: [
            ['/0.11.1/api/collections', 'Collections'],
            ['/0.11.1/api/documents', 'Documents'],
          ],
        },
        ['/0.11.1/api/api-errors', 'API Errors'],
      ],

      // For 0.11.0
      '/0.11.0/api/': [
        ['/0.11.0/api/', 'Introduction'],
        ['/0.11.0/api/server-configuration', 'Server Configuration'],
        ['/0.11.0/api/api-clients', 'API Clients'],
        ['/0.11.0/api/authentication', 'Authentication'],
        {
          title: 'API Resources',
          collapsable: false,
          children: [
            ['/0.11.0/api/collections', 'Collections'],
            ['/0.11.0/api/documents', 'Documents'],
          ],
        },
        ['/0.11.0/api/api-errors', 'API Errors'],
      ],
    },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    // '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    ['@dovyp/vuepress-plugin-clipboard-copy', true],
    require('./plugins/typesense-enhancements'),
    [
      'vuepress-plugin-sitemap',
      {
        hostname: 'https://typesense.org/docs',
        exclude: ['/404.html'],
      },
    ],
    '@vuepress/last-updated',
    'check-md', // To check for deadlinks: https://www.npmjs.com/package/vuepress-plugin-check-md
  ],
  configureWebpack: {
    // devtool: 'source-map',
    resolve: {
      alias: {
        '@images': path.resolve(__dirname, 'public/images/'),
      },
    },
  },
}

module.exports = config
