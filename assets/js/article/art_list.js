$(function () {
  let q = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: ''
  }
  initTable()

  function initTable() {
    $.ajax({
      method: "GET",
      url: "/my/article/list",
      data: q,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg("获取文章列表失败!")
        }
        let htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
      }
    })
  }
})