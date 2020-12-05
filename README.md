# quasar-admin-template

基于 Quasar 的管理系统模板

Quasar相比ElementUI，胜在可定制性上比较强，每个组件保留了大量的Slot和Event，可以按自己喜好自定义，同时官网文档也相当详细，看文档能解决绝大多数问题。界面也相对漂亮一些，另外还有一个很大的优势，Quasar对于移动端的适配做得非常棒。

问题是一些国内常用的功能和组件，Quasar缺失，这就需要自己二次开发或用其他js库代替。

- 给个`star`吧
- 最优适配移动端
- Dark 和 Light模式自由切换
- 可以分别自定义Dark 和 Light模式下的颜色样式，并保存到LocalStorage里面，关闭浏览器不丢失
 - 可自定义左侧菜单栏宽度、背景色、字体色，顶部标题栏颜色、Tab标签栏位置和是否显示 等
- 左侧菜单栏基于路由配置自动生成，可以实现noCache、icon等自定义配置
- 页面路由Tab标签栏
- 演示了几种在页面实现搜索栏的样式（费了我不少时间）
- 二次开发了CoadminDialog，可以实现拖拽和最大化等
- 二次开发了CoadminTree，增加了很多功能
  - tick-strategy 在原有none strict leaf leaf-filtered的基础上，增加leaf-any-with-parent（子节点大于0个ticked，则增加父节点）、leaf-all-with-parent（子节点全部ticked，则增加父节点）、leaf-all-only-parent（子节点全部ticked，则只取父节点，去掉子节点）
  - 增加事件 ticked-label和selected-label，返回选择的节点的label
  - 增加一个过滤输入栏
- 二次开发了CoadminTable，新增了新的loading样式，还有sticky-header、sticky-first-column、sticky-last-column
- 二次开发了CoadminForm，CoadminDate、CoadminInput、CoadminOptionGroup、CoadminFormItem，增加一些实用功能
- 新增CoadminDateInput
- 新增CoadminTreeInput
- 新增CoadminTreeTable
- 感谢：eladmin-web、vue-element-admin、quasar-admin-crm、quasar-element-pro

```bash
TODO CoadminInput外的其它自定义form项的错误提示
TODO CoadminTable 可以单击某行，一直高亮这一行
TODO Dialog、PopupProxy 等弹出层，在Dark模式下不好区分
TODO CoadminDateInput 可以手工输入日期、可以选择“最近7天、最近30天、本月、。。。”
TODO CoadminTree selected和ticked，可以设置“只选parent，只选leaf”

TODO BUG CoadminSelect use-input的时候，会出现下拉列出的选项空行的问题
TODO BUG CoadminInput 在popup-proxy 里面时，有时候prepend、append、before、after 的slot会失效
TODO BUG 对话框最大化后，取消拖动
TODO BUG 图表dark模式文字颜色
```

## 界面截图
见“UI”目录

## Install the dependencies（安装依赖）
```bash
安装新版nodejs
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
