# quasar-admin-template

基于 Quasar 的管理系统模板

Quasar相比ElementUI，胜在可定制性上比较强，每个组件保留了大量的Slot和Event，可以按自己喜好自定义，同时官网文档也相当详细，看文档能解决绝大多数问题。界面也相对漂亮一些，另外还有一个很大的优势，Quasar对于移动端的适配做得非常棒。

问题是一些国内常用的功能和组件，Quasar缺失，这就需要自己二次开发或用其他js库代替。

## 代码仓库
[Github](https://github.com/jinjingmail/quasar-admin-template)
[Gitee](https://gitee.com/jinjinge/quasar-admin-template)

## 主要特点
- 给个`star`吧
- 良好的适配移动端小屏幕
- Dark 和 Light模式自由切换
- 可以分别自定义Dark 和 Light模式下的颜色样式，并保存到LocalStorage里面，关闭浏览器不丢失
 - 可自定义左侧菜单栏宽度、背景色、字体色，顶部标题栏颜色、Tab标签栏位置和是否显示 等
- 左侧菜单栏基于路由配置自动生成，可以实现noCache、icon等自定义配置
- 页面路由Tab标签栏
- 演示了几种在页面实现搜索栏的样式（费了我不少时间）
- 增强开发了CoadminDialog，可以实现拖拽和最大化等
- 增强开发了CoadminTree，增加了很多功能
  - tick-strategy 在原有none strict leaf leaf-filtered的基础上，增加leaf-any-with-parent（子节点大于0个ticked，则增加父节点）、leaf-all-with-parent（子节点全部ticked，则增加父节点）、leaf-all-only-parent（子节点全部ticked，则只取父节点，去掉子节点）
  - 增加事件 ticked-label和selected-label，返回选择的节点的label
  - 增加一个过滤输入栏
- 增强开发了CoadminTable，新增了新的loading样式，还有sticky-header、sticky-first-column、sticky-last-column
- 增强开发了CoadminForm，CoadminDate、CoadminInput、CoadminOptionGroup、CoadminFormItem，增加一些实用功能
- 新增CoadminDateSelect
- 新增CoadminTreeSelect
- 新增CoadminTreeTable
- 感谢：eladmin-web、vue-element-admin、quasar-admin-crm、quasar-element-pro

```bash
TODO co-dialog
  - TODO 可移动的dialog的标题栏图标显示移动图标
  - TODO 标题栏添加可以折叠对话框内容的按钮
  - TODO dialog里面内容滚动时，可以不滚动标题栏、底部工具栏
TODO 页面增加字段选择的存储
TODO 页面增加表格大小选择（存储）
TODO 页面增加表格是否换行选择（存储）
TODO 页面总的增删改查工具栏，可以配置为变灰还是消失
TODO 如果不显示 Tab 栏，则所有页面都不 keep-alive（不缓存）
TODO 加快图标页加载速度
TODO 菜单caption 附加文字颜色，改为灰色
TODO 在右侧打开外部url（iframe或其他方案）
TODO 增加“个人设置”页面
TODO 菜单增加“new”标签支持

TODO CoadminOptionGroup 自定义form项的错误提示
TODO CoadminDateSelect 可以手工输入日期、可以选择“最近7天、最近30天、本月、。。。”
TODO co-tree selected和ticked，可以设置“只选parent，只选leaf”

TODO BUG CoadminInput 在popup-proxy 里面时，有时候prepend、append、before、after 的slot会失效
TODO BUG 对话框最大化后，取消拖动
TODO BUG 图表dark模式文字颜色
```

## Demo
[Demo](http://jinjinge.gitee.io/quasar-admin-template)

## 界面截图
### 见“UI”目录
### PC上的效果
![index](https://gitee.com/jinjinge/quasar-admin-template/raw/main/UI/v0.9/index.jpg)
![index_dark](https://gitee.com/jinjinge/quasar-admin-template/raw/main/UI/v0.9/index_dark.jpg)
![icons](https://gitee.com/jinjinge/quasar-admin-template/raw/main/UI/v0.9/icons.jpg)
![login](https://gitee.com/jinjinge/quasar-admin-template/raw/main/UI/v0.9/login.jpg)
![page_search_dialog](https://gitee.com/jinjinge/quasar-admin-template/raw/main/UI/v0.9/page_search_dialog.jpg)
![page_search_popup](https://gitee.com/jinjinge/quasar-admin-template/raw/main/UI/v0.9/page_search_popup.jpg)
![page_search_popup_dark](https://gitee.com/jinjinge/quasar-admin-template/raw/main/UI/v0.9/page_search_popup_dark.jpg)
![page_table](https://gitee.com/jinjinge/quasar-admin-template/raw/main/UI/v0.9/page_table.jpg)
![page_table_dark](https://gitee.com/jinjinge/quasar-admin-template/raw/main/UI/v0.9/page_table_dark.jpg)
![page_table_with_dialog](https://gitee.com/jinjinge/quasar-admin-template/raw/main/UI/v0.9/page_table_with_dialog.jpg)
![page_tree_select](https://gitee.com/jinjinge/quasar-admin-template/raw/main/UI/v0.9/page_tree_select.jpg)
![page_tree_table2](https://gitee.com/jinjinge/quasar-admin-template/raw/main/UI/v0.9/page_tree_table2.jpg)
![right_bar_setting](https://gitee.com/jinjinge/quasar-admin-template/raw/main/UI/v0.9/right_bar_setting.jpg)

### 手机上的效果
![index](https://gitee.com/jinjinge/quasar-admin-template/raw/main/UI/v0.9/mobile/index.png)
![index_dark](https://gitee.com/jinjinge/quasar-admin-template/raw/main/UI/v0.9/mobile/index_dark.png)
![left_sidebar](https://gitee.com/jinjinge/quasar-admin-template/raw/main/UI/v0.9/mobile/left_sidebar.png)
![page_search_popup](https://gitee.com/jinjinge/quasar-admin-template/raw/main/UI/v0.9/mobile/page_search_popup.png)
![page_table](https://gitee.com/jinjinge/quasar-admin-template/raw/main/UI/v0.9/mobile/page_table.png)
![page_table_dark](https://gitee.com/jinjinge/quasar-admin-template/raw/main/UI/v0.9/mobile/page_table_dark.png)
![page_table_with_dialog](https://gitee.com/jinjinge/quasar-admin-template/raw/main/UI/v0.9/mobile/page_table_with_dialog.png)
![page_tree_table](https://gitee.com/jinjinge/quasar-admin-template/raw/main/UI/v0.9/mobile/page_tree_table.png)
![right_setting_bar](https://gitee.com/jinjinge/quasar-admin-template/raw/main/UI/v0.9/mobile/right_setting_bar.png)


## Install the dependencies（安装依赖）
```bash
首先，安装新版nodejs
然后，执行下面的指令安装依赖
npm install -g @quasar/cli
npm install
```

### Start development mode (启动app开发模式)
```bash
quasar dev
```

### Lint the files（Lint校验）
```bash
npm run lint
```

### Build the production（构建发行版本）
```bash
quasar build
```

### Customize the configuration（修改配置）
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
