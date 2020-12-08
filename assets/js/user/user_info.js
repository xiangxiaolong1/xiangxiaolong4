$(function () {
  let form = layui.form
  let layer = layui.layer
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "昵称长度必须在1~6个字符之间!"
      }
    }
  })
  initUserInfo()

  function initUserInfo() {
    $.ajax({
      method: "GET",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("获取用户信息失败!")
        }
        // console.log(res);
        form.val('formUserInfo', res.data)
      }
    })
  }
  $('#btnReset').on('click', function (e) {
    e.preventDefault()
    initUserInfo()

  })
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("更新用户信息成功!")
        }
        layer.msg('更新用户信息成功!')
        // 调用父页面的方法，渲染用户头像和用户信息
        window.parent.getUserInfo()
      }
    })
  })
})