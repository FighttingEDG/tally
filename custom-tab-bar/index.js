// 自定义的组件
Component({
  data: {
    selected: 1, // 改为动态判断
    list: [{
        id: 1,
        pagePath: "/pages/index/index",
        text: "流水",
        iconPath: "../images/tabBar/zhangdan_o.png",
        selectedIconPath: "../images/tabBar/zhangdan_o1.png"
      },
      {
        id: 2,
        pagePath: "/pages/write/write",
        text: "记账",
        iconPath: "../images/tabBar/jizhang.png",
        selectedIconPath: "../images/tabBar/jizhang1.png"
      },
      {
        id: 3,
        pagePath: "/pages/user/user",
        text: "我的",
        iconPath: "../images/tabBar/wode.png",
        selectedIconPath: "../images/tabBar/wode1.png"
      }
    ]
  },
  lifetimes: {
    // 新增组件生命周期
    attached() {
      const pages = getCurrentPages() // 首次进入时为 []

      // 需要添加空数组保护
      if (pages.length === 0) {
        // 默认选中第一个tab（对应首页）
        this.setData({
          selected: 1
        })
        return
      }

      const currentPage = pages[pages.length - 1]
      const pagePath = currentPage.route

      // 动态设置初始选中状态
      this.setData({
        selected: this.data.list.findIndex(item =>
          item.pagePath.includes(pagePath)
        )
      })
    }
  },

  methods: {
    switchTab(e) {
      const listId = e.currentTarget.dataset.index
      const path = e.currentTarget.dataset.path

      wx.switchTab({
        url: path,
        success: () => {
          // 新增页面状态同步
          const pages = getCurrentPages()
          const currentPage = pages[pages.length - 1]

          if (typeof currentPage.getTabBar === 'function') {
            currentPage.getTabBar().setData({
              selected: listId
            })
          }
        }
      })
    }
  }
})