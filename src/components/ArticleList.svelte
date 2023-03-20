<script>
  import { onMount } from 'svelte'
  import { articles, currentArticlesPage, loadingArticle, articlePageLock, articlesMode } from '../stores'
  import Article from './Article.svelte'
	// import ArticleLoading from './ArticleLoading.svelte'
	import { router } from 'tinro'
  import InfiniteScroll from './InfiniteScroll.svelte';

  // let component
  // let element
	let currentMode = $router.path.split("/")[2] 

	 onMount(() => {
		articlesMode.changeMode(currentMode)
    // articles.resetArticles()
    // articles.fetchArticles()
  })

  // $: {
  //   if(component) {
  //     element = component.parentNode
  //     element.addEventListener('scroll', onScroll)
  //     element.addEventListener('resize', onScroll)
  //   }    
  // }	

  // const onScroll = (e) => {
  //   const scrollHeight = e.target.scrollHeight
  //   const clientHeight = e.target.clientHeight
  //   const scrollTop = e.target.scrollTop
  //   const realHeight = scrollHeight - clientHeight
  //   const triggerHeight = realHeight * 0.7

  //   const triggerComputed = () => {
  //     return scrollTop > triggerHeight
  //   }

  //   const countCheck = () => {
  //     const check = $articles.totalPageCount <= $currentArticlesPage
  //     return check;
  //   }
    
  //   if(countCheck()) {  
  //     articlePageLock.set(true)
  //   }   

  //   const scrollTrigger = () => {
  //     return triggerComputed() && !countCheck() && !$articlePageLock
  //   }

  //   if(scrollTrigger()) {
  //     currentArticlesPage.increPage()
  //   }
  // }

</script>

<!-- slog-list-wrap start-->
<!-- <div class="slog-list-wrap infiniteTarget" bind:this={component} > -->
<div class="slog-list-wrap infiniteTarget" >
	<ul class="slog-ul">
		{#each $articles.articleList as article, index}
			<li class="mb-5" >
				<Article {article} />
	    </li>
	  {/each}
	</ul>  

  <!-- {#if $loadingArticle }
    <ArticleLoading />
  {/if} -->
  
  <InfiniteScroll 
    loading={$loadingArticle}
    pageLock={$articlePageLock}
    totalPageCount={$articles.totalPageCount} 
    currentPage={$currentArticlesPage} 
    domTarget={'.infiniteTarget'}
    on:onPageLock={() => articlePageLock.set(true)}
    on:increPage={() => currentArticlesPage.increPage()}  
    />
</div><!-- slog-list-wrap end-->