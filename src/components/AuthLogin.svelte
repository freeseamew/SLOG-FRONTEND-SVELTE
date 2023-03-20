<script>
	import { auth } from '../stores'
  import { loginValidate, extractErrors } from '../utils/validates'

  let errors = {}

	let values = {
    formEmail: '',
    formPassword: '',
  }

	const resetValues = () => {
    values.formEmail = ''
    values.formPassword = ''
  }

	const onLogin = async () => {
    try {
      await loginValidate.validate(values, {abortEarly: false})
      await auth.login(values.formEmail, values.formPassword)
      resetValues()
    }
    catch(error) {
      // alert('인증이 되지 않았습니다. 다시 시도해 주세요.')
      errors = extractErrors(error)

      if(errors.formEmail) alert(errors.formEmail)
      if(errors.formPassword) alert(errors.formPassword)
    }
  }

</script>

<!-- login-box start-->
<div class="auth-content-box " >        
  <div class="auth-box-main">
    <div class="auth-input-box">
      <input type="email" name="floating_email" id="floating_email" class="auth-input-text peer" placeholder=" " bind:value={values.formEmail} class:wrong={errors.formEmail} />
      <label for="floating_email" class="auth-input-label">이메일</label>
    </div>      
    <div class="auth-input-box">
      <input type="password" name="floating_email" id="floating_email" class="auth-input-text peer" placeholder=" " bind:value={values.formPassword} class:wrong={errors.formPassword} />
      <label for="floating_email" class="auth-input-label">비밀번호</label>
    </div>    
  </div>
  <div class="content-box-bottom">
    <div class="button-box">
      <button class="button-base" on:click={onLogin}>로그인</button>
    </div>
  </div>
</div>
<!-- login-box end-->

<style>
	.wrong {
	  border-bottom: 3px solid red;
	}
</style>