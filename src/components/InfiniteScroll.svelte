<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte'
  import ArticleLoading from './ArticleLoading.svelte'

  export let totalPageCount
  export let currentPage
  export let pageLock
  export let loading
  export let domTarget

  let component
  let element

  const dispatch = createEventDispatcher()

  onMount(() => {
    component = document.querySelector(domTarget)
    element = component.parentNode
  })

  onDestroy(() => {
    if(element) {
      element.removeEventListener('scroll', onScroll)
      element.removeEventListener('resize', onScroll)
    }
  })

  $: {
    if(element) {
      element.addEventListener('scroll', onScroll)
      element.addEventListener('resize', onScroll)
    }    
  }	

  const onScroll = (e) => {

    const scrollHeight = e.target.scrollHeight
    const clientHeight = e.target.clientHeight
    const scrollTop = e.target.scrollTop
    const realHeight = scrollHeight - clientHeight
    const triggerHeight = realHeight * 0.7

    const triggerComputed = () => {
      return scrollTop > triggerHeight
    }

    const countCheck = () => {
      const check = totalPageCount <= currentPage
      return check;
    }
    
    if(countCheck()) {  
      dispatch('onPageLock')
    }   
    
    const scrollTrigger = () => {
      return triggerComputed() && !countCheck() && !pageLock 
    }

    if(scrollTrigger()) {
      dispatch('increPage')
    }
  }	
</script>

<!-- <div  style="width: 0;" bind:this={component} /> -->
{#if loading }
  <ArticleLoading />
{/if}


