$(function () {
  // 点击去注册账号的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })
  let form = layui.form
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须填写且不能包含空格，位数是6~12位"],
    repwd: function (value) {
      let pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return "两次密码不一致!,请重新输入。"
      }
    }
  })
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    let data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser', data,
      function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg('注册成功，请登录!')
        $('#link_login').click()
      })
  })
  $('#form_login').submit(function (e) {
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method: 'POST',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败!')
        }
        layer.msg('登录成功!')
        localStorage.setItem("token", res.token)
        location.href = "/index.html"
      }
    })
  })

})