<script>
  import ArticleHeader from '../components/ArticleHeader.svelte';
  import ArticleList from '../components/ArticleList.svelte'
  import ArticleAddForm from '../components/ArticleAddForm.svelte'
  import Comments from '../pages/Comments.svelte'
  import { isLogin } from '../stores'
  import { Route } from 'tinro'  
</script>
<ArticleHeader />
<main class="slog-main ">
  {#if $isLogin}
    <ArticleAddForm />
  {/if}
  <ArticleList />

  <Route path="/comments/:id" >
    <Comments />
  </Route>  
</main>