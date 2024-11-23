# Installing a client

We have client libraries for:

- [JavaScript](https://github.com/typesense/typesense-js)
- [PHP](https://github.com/typesense/typesense-php)
- [Python](https://github.com/typesense/typesense-python)
- [Ruby](https://github.com/typesense/typesense-ruby)

We also have the following community-maintained client libraries:

- [Go](https://github.com/typesense/typesense-go)
- [.Net](https://github.com/DAXGRID/typesense-dotnet)
- [Java](https://github.com/typesense/typesense-java)
- [Rust](https://github.com/typesense/typesense-rust)
- [Dart](https://github.com/typesense/typesense-dart)
- [Perl](https://github.com/Ovid/Search-Typesense)
- [Swift](https://github.com/typesense/typesense-swift)
- [Clojure](https://github.com/runeanielsen/typesense-clj)
- [python orm client](https://github.com/RedSnail/typesense_orm)
- [PHP SEAL Adapter](https://github.com/schranz-search/seal-typesense-adapter)
- [Elixir](https://github.com/jaeyson/ex_typesense)
---
- <RouterLink :to="`/${$site.themeConfig.typesenseLatestVersion}/api/api-clients.html#framework-integrations`">Other Framework Integrations</RouterLink>

<Tabs :tabs="['JavaScript','PHP','Python','Ruby','Dart', 'Java','Go','Swift']">
  <template v-slot:JavaScript>

```js
// npm install typesense @babel/runtime

// Browser
<script src="dist/typesense.min.js"></script>
```

  </template>

  <template v-slot:PHP>

```shell
composer require php-http/curl-client typesense/typesense-php
```

  </template>
  <template v-slot:Python>

```shell
pip install typesense
```

  </template>
  <template v-slot:Ruby>

```shell
gem install typesense
```

  </template>
  <template v-slot:Dart>

```dart
// With Dart:
//  $ dart pub add typesense

// With Flutter:
//  $ flutter pub add typesense

// This will add a line like this to your package's pubspec.yaml:
// dependencies:
//   typesense: ^0.3.0

// Now in your Dart code, you can use:

import 'package:typesense/typesense.dart';
```

  </template>
  <template v-slot:Java>

```java
// Download the JAR file from the releases section in the typesense-java repository.
// (https://github.com/typesense/typesense-java/releases)
// And the import it them to your project

import org.typesense.api.*;
import org.typesense.models.*;
import org.typesense.resources.*;
```

  </template>
  <template v-slot:Go>

```go
// $ go get github.com/typesense/typesense-go/v2/typesense

import (
  "github.com/typesense/typesense-go/v2/typesense"
  "github.com/typesense/typesense-go/v2/typesense/api"
  "github.com/typesense/typesense-go/v2/typesense/api/pointer"
)
```

  </template>
  <template v-slot:Swift>

```swift
// For an iOS app, add typesense-swift as a framework dependency:
// Target -> General -> Frameworks, Libraries, and Embedded Content -> "+" -> Add Package Dependency -> typesense-swift

//For swift packages, add typesense-swift to the dependencies array in Package.swift:
...
dependencies: [
           .package(url: "https://github.com/typesense/typesense-swift", .upToNextMajor(from: "0.1.0"),
],
...
```

  </template>
</Tabs>

:::tip
If you don't see an official client in your language, you can still use any HTTP library in your language to make API calls to Typesense's RESTful API directly.
:::