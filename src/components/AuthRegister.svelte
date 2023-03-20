<script>
	import { auth } from '../stores'
	import { registerValidate, extractErrors } from '../utils/validates' 

  let errors = {}

	let values = {
    formEmail: '',
    formPassword: '',
    formPasswordConfirm: '',
  }

  const onRegister = async () => {
    try {
      await registerValidate.validate(values, {abortEarly: false})      
      await auth.register(values.formEmail, values.formPassword)
    } 
    catch(error) {
      // alert('회원가입에 실패했습니다. 다시 시도해 주세요.')
      errors = extractErrors(error);
      if(errors.formEmail) alert(errors.formEmail)
      if(errors.formPassword) alert(errors.formPassword)
      if(errors.formPasswordConfirm) alert(errors.formPasswordConfirm)
    }
  }
</script>

<!-- register-box start-->
<div class="auth-content-box" >        
  <div class="auth-box-main">
    <div class="auth-input-box">
      <input type="email" name="floating_email" id="floating_email" class="auth-input-text peer" placeholder=" " bind:value={values.formEmail} class:wrong={errors.formEmail} />
      <label for="floating_email" class="auth-input-label">이메일</label>
    </div>      
    <div class="auth-input-box">
      <input type="password" name="floating_email" id="floating_email" class="auth-input-text peer" placeholder=" " bind:value={values.formPassword} class:wrong={errors.formPassword} />
      <label for="floating_email" class="auth-input-label">비밀번호</label>
    </div>      
    <div class="auth-input-box">
      <input type="password" name="floating_email" id="floating_email" class="auth-input-text peer" placeholder=" " bind:value={values.formPasswordConfirm} class:wrong={errors.formPasswordConfirm} />
      <label for="floating_email" class="auth-input-label">비밀번호 확인</label>
    </div>                              
  </div>
  <div class="content-box-bottom">
    <div class="button-box">
      <button class="button-base" on:click={onRegister}>회원가입</button>
    </div>
  </div>
</div>
<!-- register-box end-->

<style>
	.wrong {
	  border-bottom: 3px solid red;
	}
</style>