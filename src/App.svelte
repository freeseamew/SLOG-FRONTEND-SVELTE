<script>
  import { onMount } from 'svelte'
  import { auth, isRefresh } from './stores'
  import Router from './router.svelte'

  const refresh_time =1000 * 60 * 14

  onMount(async () => {
    const onRefresh = setInterval(async () => {
      if($isRefresh) {
        await auth.refresh()
      }
      else {
        clearInterval(onRefresh)
      }
    }, refresh_time)
  })
</script>

<div class="main-container">
  <!-- {#await auth.refresh() then} -->
    <Router />  
  <!-- {/await} -->
</div>