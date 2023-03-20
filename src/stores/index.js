import { writable, get, derived } from 'svelte/store'
import {getApi, putApi, delApi, postApi} from '../service/api.js'
import { router } from 'tinro'
import { ALL, LIKE, MY } from '../utils/constant'

function setCurrentArticlesPage() {
  const {subscribe, update, set} = writable(1)

  const resetPage = () => set(1)
  const increPage = () => {
    update(data => data = data + 1)
    articles.fetchArticles()
  }

  return {
    subscribe,
    resetPage,
    increPage,
  }
}

function setArticles() {
  let initValues = {
    articleList: [],
    totalPageCount: 0,
    menuPopup: '',
    editMode: '',
  }  

  const { subscribe, update, set } = writable({...initValues})

	const fetchArticles = async () => { 

    loadingArticle.turnOnLoading() 
    const currentPage = get(currentArticlesPage)
    // let path = `/articles/?pageNumber=${currentPage}` 
    let path = ''
		const mode = get(articlesMode)

		switch(mode) {
      case ALL:
        path=`/articles/?pageNumber=${currentPage}`
        break
      case LIKE:
        path=`/likes/?pageNumber=${currentPage}`
        break
      case MY:
        path=`/articles/?pageNumber=${currentPage}&mode=${mode}`
        break
      default: 
        path=`/articles/${currentPage}`
        break
    }
    
    try {
      
			const access_token = get(auth).Authorization

      const options = {
        path: path,
        access_token: access_token,
      }

      const getDatas = await getApi(options)
      
      const newData = {
        articleList: getDatas.articleList,
        totalPageCount: getDatas.totalPageCount,
      }

      update(datas => {
        
        if(currentPage === 1) {
          datas.articleList = newData.articleList
          datas.totalPageCount = newData.totalPageCount
        }
        else {
	        const newArticles = [...datas.articleList, ...newData.articleList]
	        datas.articleList = newArticles
	        datas.totalPageCount = newData.totalPageCount
				}
      
        return datas
      })
      loadingArticle.turnOffLoading()       
    }
    catch(error) {
      loadingArticle.turnOffLoading()      
      throw error
    }
  }

	const resetArticles = () => {
    set({...initValues})
    currentArticlesPage.resetPage() 
    articlePageLock.set(false)    
  }

	const addArticle = async (content) => { 

		const access_token = get(auth).Authorization
    
		try {

      const options =  {
        path:"/articles",
        data: {
          content: content,
        },
				access_token: access_token,
      }

      const newArticle = await postApi(options)

      update(datas => {
        datas.articleList = [newArticle, ...datas.articleList]
        return datas
      })

			// 만약 무조건적으로 새로운 글이 나타나야 한다면, update로 store를 업데이트 하지 말고, 목록을 새로 불러오면 됨.
      // articles.resetArticles()
      
			return
    }
    catch(error) {
      throw error
    }
  }

  const openMenuPopup = (id) => { 
    update(datas => {
      datas.menuPopup = id
      return datas
    })
  }

  const closeMenuPopup = () => { 
    update(datas => {
      datas.menuPopup = ''
      return datas
    })
  }

  const openEditModeArticle = (id) => { 
    articles.closeMenuPopup()

    update(datas => {
      datas.editMode = id
      return datas
    })
  }

  const closeEditModeArticle = () => {
    update(datas => {
      datas.editMode = ''
      return datas
    })
  }  

	const updateArticle = async (article) => { 
		
		const access_token = get(auth).Authorization

    try {
      const updateData = {
        articleId: article.id,
        content: article.content,
      }
  
      const options = {
        path: '/articles',
        data: updateData,
				access_token: access_token,
      }

      const updateArticle = await putApi(options)

      update(datas => {
        const newArticleList = datas.articleList.map(article => {
          if(article.id === updateArticle.id) {
            article = updateArticle
          }
          return article
        })
        datas.articleList = newArticleList
        return datas
      })

      articles.closeEditModeArticle()
      alert('수정이 완료되었습니다. ')
    }
    catch(error) {
      alert('수정중에 오류가 발생했습니다. 다시 시도해 주세요.')
    }
  }  

	const deleteArticle = async (id) => {

    const access_token = get(auth).Authorization

    try {
      const options = {
        path: `/articles/${id}`,
        access_token: access_token
      }

      await delApi(options)

      update(datas => {
        const newArticleList = datas.articleList.filter(article => article.id !== id)
        datas.articleList = newArticleList
        return datas
      })

    }
    catch(error) {
      alert('삭제 중 오류가 발생했습니다. ')
    }
  }  

  const increArticleCommentCount = (articleId) => {
    update(datas => {
      const newArticleList = datas.articleList.map(article => {
        if(article.id === articleId) {
          article.commentCount = article.commentCount + 1
        }
        return article
      })
      datas.articleList = newArticleList
      return datas
    })
  }

  const decreArticleCommentCount = (articleId) => {
    update(datas => {
      const newArticleList = datas.articleList.map(article => {
        if(article.id === articleId) {
          article.commentCount = article.commentCount - 1
        }
        return article
      })
      datas.articleList = newArticleList
      return datas
    })
  }  

	const likeArticle = async (articleId) => { 

		const access_token = get(auth).Authorization

    try {
      const options = {
        path: `/likes/add/${articleId}`,
        access_token: access_token,
      }

      await postApi(options)

      update(datas => {
        const newArticles = datas.articleList.map(article => {
          if(article.id === articleId) {
            article.likeCount = article.likeCount + 1
            article.likeMe = true
          }
          return article
        })
        datas.articleList = newArticles
        return datas
      })

    }
    catch(error) {
      alert('오류가 발생했습니다. 다시 시도해 주세요.')
    }
  }  

	const cancelLikeArticle = async (articleId) => {
		const access_token = get(auth).Authorization

    try {
      const options = {
        path: `/likes/cancel/${articleId}`,
        access_token: access_token,
      }

      await postApi(options)

      update(datas => {
        const newArticles = datas.articleList.map(article => {
          if(article.id === articleId) {
            article.likeCount = article.likeCount - 1
            article.likeMe = false
          }
          return article
        })
        datas.articleList = newArticles
        return datas
      })
    }
    catch(error) {
      alert('오류가 발생했습니다. 다시 시도해 주세요.')
    }
  }

  return {
    subscribe,
    fetchArticles,
    resetArticles,
		addArticle,   
		openMenuPopup,
		closeMenuPopup,     
		openEditModeArticle,
		closeEditModeArticle,   
    updateArticle, 
    deleteArticle,
		increArticleCommentCount,
		decreArticleCommentCount, 
    likeArticle,     
    cancelLikeArticle,
  }
}

function setLoadingArticle() {
  const {subscribe, set} = writable(false)

  const turnOnLoading = () => {
    set(true)
    articlePageLock.set(true)
  } 
  const turnOffLoading = () => {
    set(false)
    articlePageLock.set(false)
  }

  return {
    subscribe,
    turnOnLoading,
    turnOffLoading,
  }
}

function setArticleContent() {
  let initValues = {
    id: '',
    userId: '',
    userEmail: '',
    content: '',
    createdAt: '',
    commentCount: 0,
    likeCount: 0,          
    likeUsers: [],   
  }

  const { subscribe, set } = writable({...initValues})

  const getArticle = async (id) => {

    try {
      const options = {
        path: `/articles/${id}`
      }

      const getData = await getApi(options)
      set(getData)
    }
    catch(error) {
      alert('오류가 발생했습니다. 다시 시도해 주세요.')
    }
  }

  return {
    subscribe,
    getArticle,
  }
}

function setComments() {
  const { subscribe, update, set } = writable([])

  const fetchComments = async (id) => {
    try {
      const options = {
        path: `/comments/${id}`
      }

      const getDatas = await getApi(options)
      set(getDatas.comments)
    }
    catch(error) {
      alert('오류가 발생했습니다 다시 시도해 주세요.')
    }
  }

  const addComment = async (articleId, commentContent) => {

    const access_token = get(auth).Authorization

    try {
      const options = {
        path: '/comments',
        data: {
          articleId: articleId,
          content: commentContent,
        },
        access_token: access_token,
      }

      const newData = await postApi(options)
      update(datas => [...datas, newData])
      articles.increArticleCommentCount(articleId)
    }
    catch(error) {
      alert('오류가 발생했습니다. 다시 시도해 주세요.')
    }
  }

	const deleteComment = async(commentId, articleId) => {

    const access_token = get(auth).Authorization

    try {
      const options = {
        path: '/comments',
        data: {
          commentId: commentId,
          articleId: articleId,
        },
        access_token: access_token,
      }

      await delApi(options)
      update(datas => datas.filter(comment => comment.id !== commentId))
      articles.decreArticleCommentCount(articleId)
      alert('커멘트가 삭제 되었습니다.')
    }
    catch(error) {
      alert('삭제 중 오류가 발생했습니다. 다시 시도해 주세요.')
    }
  }

  return {
    subscribe,
    fetchComments,
    addComment,
    deleteComment,
  }  
}

function setAuth() {
	let initValues = {
    id: '',
    email: '',
    Authorization: '',
  }

  const { subscribe, set, update } = writable({...initValues})

	const refresh = async () => {
		try {
      const authenticationUser = await postApi({path: '/auth/refresh'})
      set(authenticationUser)  
      isRefresh.set(true) 
    }
    catch(err) {
      auth.resetUserInfo()
      isRefresh.set(false)      
    }
	}
  
	const resetUserInfo = () => set({...initValues})

  const login = async(email, password) => {
		try {
      const options = {
        path: '/auth/login',
        data: {
          email: email,
          pwd: password,
        }
      }

      const result = await postApi(options)
      set(result)
      isRefresh.set(true)
      router.goto('/')
    }
    catch(error) {
      alert('오류가 발생했습니다. 로그인을 다시시도해 주세요.')
    }	
	}

  const logout = async () => {
		try {
      const options = {
        path: '/auth/logout',
      }

      await delApi(options)
      set({...initValues})
      isRefresh.set(false)
      // router.goto('/')
      articlesMode.changeMode(ALL)
    }
    catch(error) {
      alert('오류가 발생했습니다. 다시시도해 주세요')
    }
	}

	const register = async (email, pwd) => {
		try {
      const options = {
        path: '/auth/register',
        data: {
          email: email,
          pwd: pwd,
        }
      }

      await postApi(options)
      alert('가입이 완료되었습니다. ')
      router.goto('/login')
    }
    catch(error) {
      alert('오류가 발생했습니다. 다시 시도해 주세요.')
    }
	}

	return {
    subscribe,
    refresh,
    login,
    logout,
    resetUserInfo,
    register,
  }  
}

function setArticlesMode() {
  const { subscribe, update, set } = writable(ALL)

  const changeMode = async (mode) => {
    set(mode)
    articles.resetArticles()
    await articles.fetchArticles()
  }

  return {
    subscribe,
    changeMode,
  }
}

function setIsLogin() {
	const checkLogin = derived(auth, $auth => $auth.Authorization ? true : false)
  return checkLogin
}

export const currentArticlesPage = setCurrentArticlesPage()
export const articles = setArticles()
export const articlePageLock = writable(false)
export const loadingArticle = setLoadingArticle()
export const articleContent = setArticleContent()
export const comments = setComments()
export const auth = setAuth()
export const articlesMode = setArticlesMode()
export const isLogin = setIsLogin()
export const isRefresh = writable(false)