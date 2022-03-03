// 阻止默认行为
// e.preventDefault()
// e.stopPropagation()
const VIEW_HEIGHT = document.documentElement.clientHeight
const VIEWA_WIDTH = document.documentElement.clientWidth
const DIV_STYLE = {
  listStyle: 'none',
  position: 'absolute',
  boxShadow: '0px 0px 10px 1px #DCDCDC',
  padding: '10px',
  width: '200px',
  cursor: 'pointer',
  display: 'none'
}
const ITEM = {
  backgroundColor: '#fff',
  padding: '5px 10px',
  textAlign: 'center',
  borderRadius: '10px',
  activeBackgroundColor: '#F5F5F5',
  height: '20px'
}
const CORRECT_OFFSET = {
  left: 10,
  right: -30,
  top: -20,
  bottom: -50
}
function hiddenMune (dom) {
  document.addEventListener('click', function (e) {
    dom.style.display = 'none'
  })
}
function defalutDOM (functionList = ['刷新', '查看页面源码', '前进']) {
  var div = document.createElement('div')
  document.body.appendChild(div)
  div.style.listStyle = DIV_STYLE.listStyle
  div.style.position = DIV_STYLE.position
  div.style.boxShadow = DIV_STYLE.boxShadow
  div.style.padding = DIV_STYLE.padding
  div.style.width = DIV_STYLE.width
  div.style.cursor = DIV_STYLE.cursor
  div.style.display = DIV_STYLE.display
  for (let i = 0; i < functionList.length; i++) {
    const item = document.createElement('div')
    item.addEventListener('mouseenter', function (e) {
      // e.preventDefault()
      // e.stopPropagation()
      item.style.backgroundColor = ITEM.activeBackgroundColor
    })
    item.addEventListener('mouseleave', function (e) {
      // e.preventDefault()
      // e.stopPropagation()
      item.style.backgroundColor = ITEM.backgroundColor
    })
    item.addEventListener('click', function (e) {
      // 阻止默认行为
      // e.preventDefault()
      // e.stopPropagation()
      console.log(functionList[i])
    })
    item.innerHTML = functionList[i]
    item.style.height = ITEM.height
    item.style.padding = ITEM.padding
    item.style.textAlign = ITEM.textAlign
    item.style.borderRadius = ITEM.borderRadius
    div.appendChild(item)
  }
  return div
}
function defalutFunction (dom, e) {
  const environment = window.event || e
  // 获取鼠标位置
  // pageX:鼠标当前位置 距离页面左侧 的 距离
  // pageY:鼠标当前位置 距离页面顶部 的 距离
  // clientX:鼠标当前位置 距离可视窗口左侧 的 距离
  // clientY:鼠标当前位置 距离可视窗口顶部 的 距离
  // 调整菜单栏显示位置
  var x = environment.clientX + CORRECT_OFFSET.left
  var y = environment.clientY + CORRECT_OFFSET.top
  // console.log('x: ', x)
  // console.log('both width', VIEWA_WIDTH - x)
  // console.log('div width: ', parseInt(DIV_STYLE.width))
  // 鼠标太右的情况
  if (VIEWA_WIDTH - x < parseInt(DIV_STYLE.width)) {
    x = x - parseInt(DIV_STYLE.width) + CORRECT_OFFSET.right
  }
  // 菜单栏高度 ≈ 菜单栏子项数目 * 子项高度
  var divHeight = dom.children.length * parseInt(ITEM.height)
  // console.log('both height: ', VIEW_HEIGHT - y)
  // console.log(divHeight + 30)
  // 鼠标太低
  if (VIEW_HEIGHT - y < divHeight - CORRECT_OFFSET.bottom) {
    y = y - divHeight + CORRECT_OFFSET.bottom + 10
  }
  // 鼠标太高
  if (y < -CORRECT_OFFSET.bottom) {
    y = y - CORRECT_OFFSET.top
  }
  // console.log('new x: ', x)
  // console.log('new y: ', y)
  dom.style.left = x + 'px'
  dom.style.top = y + 'px'
  dom.style.display = 'block'
  // 阻止默认行为
  e.preventDefault()
  e.stopPropagation()
}
var defalutDom = defalutDOM()
var updateContentMune = function (dom = defalutDom, fn = defalutFunction) {
  if (document.addEventListener) {
    // 所有主流浏览器，除了 IE 8 及更早 IE版本
    document.addEventListener('contextmenu', function (e) {
      fn(dom, e)
      hiddenMune(dom)
    })
  } else if (document.attachEvent) {
    // IE 8 及更早 IE 版本
    alert('部分功能受限，请更换浏览器')
  }
}
updateContentMune()
