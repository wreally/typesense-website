# Typesense Docs

TODO: overview of Typesense

## How the docs are laid out

Todo: Explain Guide vs API docs

Links to docs for latest version

<RouterLink :to="`${$site.themeConfig.latestTypesenseVersion}/#what-s-new`">What's new</RouterLink>
<br>
<RouterLink :to="`${$site.themeConfig.latestTypesenseVersion}/guide`">Guide</RouterLink>
<br>
<RouterLink :to="`${$site.themeConfig.latestTypesenseVersion}/api`">API Docs</RouterLink>

Older versions, use dropdown

Versions:
<ul>
  <li v-for="version in $site.themeConfig.typesenseVersions">
    <RouterLink :to="version"> {{version}} </RouterLink>
  </li>
</ul>

## Help

Link to help page