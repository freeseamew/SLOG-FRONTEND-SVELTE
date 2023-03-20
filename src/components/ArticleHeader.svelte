<script>
	import { router } from 'tinro'
  import { auth, isLogin, articlesMode } from '../stores'
  import { ALL, LIKE, MY } from '../utils/constant'

	const goLogin = () => router.goto('/login')
  const onLogout = () => auth.logout()

	const onChangeMode = (mode) => { 
    // if($articlesMode !== mode) articlesMode.changeMode(mode)
    if($articlesMode !== mode) router.goto(`/articles/${mode}`)
  }  
</script>

<!-- start header -->
<header class="main-header">
  <p class="p-main-title" >SLogs </p>
  <nav class="main-nav">
		<button  class=" main-menu mr-6" class:main-menu-selected={$articlesMode === ALL} on:click={() => onChangeMode(ALL)} >모두 보기</button>    
    {#if $isLogin}
      <button class="main-menu mr-6" class:main-menu-selected={$articlesMode === LIKE} on:click={() => onChangeMode(LIKE)} >좋아요 보기</button>
      <button class="main-menu " class:main-menu-selected={$articlesMode === MY} on:click={() => onChangeMode(MY)} >내글 보기</button>          
    {:else}
      <button class="main-menu mr-6 main-menu-blocked" >좋아요 보기</button>
      <button class="main-menu main-menu-blocked" >내글 보기</button>
    {/if}
  </nav>
	{#if $isLogin}
	  <!--로그아웃 -->
	  <button href="#" class="text-white" on:click={onLogout}>
	    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-7 w-7 fill-white"><path d="M16 13v-2H7V8l-5 4 5 4v-3z"></path><path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"></path></svg>
	  </button>
	{:else}
		<!--로그인 -->
	  <button href="#" class="text-white" on:click={goLogin}>
	    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-7 w-7 fill-white"><path d="m13 16 5-4-5-4v3H4v2h9z"></path><path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"></path></svg>
	  </button>  
	{/if}
</header>
<!-- end header -->