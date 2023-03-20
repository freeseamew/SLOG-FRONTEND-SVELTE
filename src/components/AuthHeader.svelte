<script>
	import { router, meta } from 'tinro'
  
  const route = meta()
  const url = $route.url
</script>

<!-- main-header start -->
<header class="main-header" >
  <p class="p-main-title" >SLogs</p>
  <nav class="main-nav ">
    <a href="/login" class=" main-menu mr-6" class:main-menu-selected={url==='/login'} >로그인</a>
    <a href="/register" class="main-menu mr-6" class:main-menu-selected={url==='/register'} >회원가입</a>
  </nav>
  <a href="/" class="text-white ">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-7 h-7 fill-white"><path d="m21.743 12.331-9-10c-.379-.422-1.107-.422-1.486 0l-9 10a.998.998 0 0 0-.17 1.076c.16.361.518.593.913.593h2v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7h2a.998.998 0 0 0 .743-1.669z"></path></svg>
  </a>
</header><!-- main-header end -->