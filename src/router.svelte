<script>
  import { Route } from 'tinro'
  import { isLogin } from './stores'
  import Articles from './pages/Articles.svelte'
  import Login from './pages/Login.svelte'
  import Register from './pages/Register.svelte'
  import NotFound from './pages/notFound.svelte'
</script>

<Route path="/" redirect="/articles/all" />
<!-- <Route path="/articles/*"><Articles /></Route> -->
<Route path="/articles/*">
  <Route path="/all/*"><Articles /></Route>    
  {#if $isLogin}
    <Route path="/my/*"><Articles /></Route>
    <Route path="/like/*"><Articles /></Route>
  {:else}
    <Route path="/my/*" redirect="/articles/all" />
    <Route path="/like/*" redirect="/articles/all"><Articles /></Route>
  {/if}
</Route>
<Route path="/login"><Login /></Route>
<Route path="/register"><Register /></Route>
<Route fallback><NotFound /></Route>  