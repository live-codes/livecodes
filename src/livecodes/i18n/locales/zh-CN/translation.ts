// ATTENTION: This file is auto-generated from source code. Do not edit manually!

import type { I18nTranslation } from '../models';

const translation: I18nTranslation = {
  about: {
    blog: {
      text: '博客',
      title: 'LiveCodes 博客',
    },
    configuration: '配置',
    credits: {
      heading: '致谢',
      para1: 'LiveCodes 的实现得益于开源项目、网络服务和贡献者的支持。 <1>查看致谢</1>',
      para2: '© 2024 Hatem Hosny。LiveCodes 已获得 MIT 许可。',
    },
    documentations: {
      heading: '文档',
    },
    gettingStarted: '快速开始',
    github: {
      text: 'GitHub',
      title: 'GitHub',
    },
    heading: '关于 LiveCodes',
    livecodes: {
      aboutUs: '关于 LiveCodes',
      para1:
        '<1><2>LiveCodes</2></1> 是一个开源的、功能丰富的、客户端侧的代码运行环境。目前支持超过 90 种语言 / 框架。它可以作为独立应用使用，亦可嵌入到任意网页中。',
      para2:
        '功能强大的 SDK 可轻松整合代码运行环境并与其进行通信。文档内容详细完整，代码示例、实时演示和屏幕截图一应俱全。',
    },
    sdk: 'LiveCodes SDK',
    sponsor: {
      text: '赞助',
      title: '赞助 LiveCodes',
    },
    twitter: {
      text: '𝕏 / Twitter',
      title: '𝕏 / Twitter',
    },
    version: {
      app: '应用版本：<1>{{APP_VERSION}}</1>',
      appPermanentUrl: '应用永久 URL',
      commit: 'Git 提交： <1> {{COMMIT_SHA}} </1>',
      heading: '版本',
      sdk: 'SDK 版本： <1> {{SDK_VERSION}} </1>',
      sdkPermanentUrl: 'SDK 永久 URL',
    },
  },
  app: {
    changeTheme: {
      hint: '更改主题',
    },
    codeToImage: {
      hint: '代码转图片',
    },
    consoleMessage: {
      appVersion: '应用版本：{{APP_VERSION}}',
      commit: 'Git 提交：{{COMMIT_SHA}}',
      learnMore: '了解更多！ {{docsUrl}} 🚀',
      sdkVersion: 'SDK 版本：{{SDK_VERSION}}',
    },
    copy: {
      hint: '复制（Ctrl/Cmd + A, Ctrl/Cmd + C）',
    },
    copyAsUrl: {
      hint: '将代码复制为 Data URL',
    },
    customSettings: {
      hint: '自定义设置',
    },
    editorSettings: {
      hint: '编辑器设置',
    },
    externalResources: {
      hint: '外部资源',
    },
    focus: {
      hint: '切换聚焦模式',
    },
    format: {
      hint: '格式化（Alt + Shift + F）',
    },
    fullscreen: {
      hint: '全屏',
    },
    i18nButton: {
      hint: '应用界面语言',
    },
    i18nMenu: {
      docs: 'i18n 文档',
      helpTranslate: '帮助我们翻译',
    },
    logo: {
      title: 'LiveCodes: 一个简单实用的代码运行环境！',
    },
    projectInfo: {
      hint: '项目信息',
    },
    redo: {
      hint: '重做（Ctrl/Cmd + Shift + Z）',
    },
    result: {
      hint: '结果',
    },
    run: {
      hint: '运行（Shift + Enter）',
    },
    share: {
      hint: '分享',
    },
    themeColors: {
      custom: '自定义',
    },
    undo: {
      hint: '撤消（Ctrl/Cmd + Z）',
    },
    untitledProject: '未命名项目',
  },
  assets: {
    action: {
      delete: '删除',
    },
    add: {
      dataURL: {
        desc: '将资产添加为 base64 编码的 <1>Data URL</1> 。',
        heading: 'Data URL',
        label: '添加文件',
      },
      githubPages: {
        desc: '将资产部署到 GitHub Pages。该文件将推送至您 GitHub 帐户上 <2> livecodes-assets</2> 仓库的 <1>gh-pages</1> 分支。如果该仓库尚不存在，则将创建一个公开仓库。',
        heading: 'GitHub Pages',
        label: '上传文件',
      },
      heading: '添加资产',
    },
    delete: {
      all: '删除 {{assets}} 个资产？',
      one: '删除资产：{{asset}} ？',
    },
    deleteAll: '删除全部',
    generic: {
      clickToCopyURL: '点击以复制 URL',
    },
    heading: '资产',
    link: {
      date: '日期：{{modified}}',
      type: '类型：{{type}}',
      url: 'URL：{{url}}',
    },
    loadFile: {
      error: {
        failedToUpload: '错误：无法上传文件',
        unauthenticated: '错误：用户未经身份验证',
      },
      upload: '上传文件',
      uploading: '正在上传...',
    },
    noMatch: '没有符合筛选条件的资产。',
    noSavedAssets: '您没有已保存的资产。',
    processAsset: {
      addFile: '已添加文件：',
      deployNotice: '该资产将很快在此 URL 上可用（约 1 分钟）。',
      success: '文件已添加到资产！',
      urlLabel: 'URL：',
    },
    resetFilters: '重置',
    search: '搜索',
    sort: {
      date: '日期',
      fileName: '文件名',
      heading: '排序方式：',
    },
    type: {
      archive: '归档文件',
      audio: '音频',
      csv: 'CSV',
      font: '字体',
      html: 'HTML',
      icon: '图标',
      image: '图像',
      json: 'JSON',
      other: '其他',
      script: '脚本',
      stylesheet: '样式表',
      text: '文本',
      video: '视频',
      xml: 'XML',
    },
    types: {
      all: '所有类型',
    },
    url: {
      fail: '复制 URL 失败。',
      success: 'URL 已复制到剪贴板',
    },
  },
  backup: {
    backup: {
      assets: '资产',
      button: '备份',
      desc: '备份 LiveCodes 数据，以便稍后在此设备上或其他设备上恢复。 <1> </1>请访问<2>文档</2>以了解详情。',
      heading: '备份',
      projects: '项目',
      settings: '用户设置',
      snippets: '代码片段',
      templates: '用户模板',
    },
    backupBtn: '备份',
    error: {
      atLeastOneStore: '请至少选择一个需要备份的存储',
      incorrectFileType: '错误：文件类型不正确',
    },
    fileInputLabel: '从文件恢复',
    heading: '备份 / 恢复',
    inProgress: '进行中 ...',
    restore: {
      desc: '恢复先前备份的 LiveCodes 数据。<1></1>如果您选择替换当前内容，可能需要先将其备份。<2></2>请访问<3>文档</3> 以了解详情。',
      fromFile: '从文件恢复',
      heading: '恢复',
      mode: {
        merge: '与当前内容合并',
        replace: '替换当前内容',
      },
      success: '恢复成功！',
    },
  },
  broadcast: {
    broadcastBtn: {
      start: '播送',
      stop: '停止播送',
    },
    broadcasting: '正在播送 ...',
    channelURL: '频道 URL',
    connecting: '正在连接 ...',
    desc: '将结果页面实时播送到其他浏览器 / 设备。请访问<1>文档</1>以了解详情。',
    error: {
      generic: '播送失败！',
      serverURLRequired: '必须填写服务器 URL！',
    },
    heading: '播送',
    includeSourceCode: '包含源代码',
    serverURL: {
      heading: '服务器 URL',
    },
  },
  codeToImage: {
    background: '背景色',
    borderRadius: '边框半径',
    code: '代码',
    copyCode: '复制代码',
    copyImage: '复制图像',
    default: '默认',
    direction: '方向',
    fileName: '文件名',
    fontFamily: '字体',
    fontSize: '字体大小',
    heading: '代码转图片',
    image: '图像',
    imageFormat: {
      jpg: 'JPEG',
      label: '图像格式',
      png: 'PNG',
      svg: 'SVG',
    },
    layout: '布局',
    opacity: '不透明度',
    padding: '内边距',
    presets: '预设',
    preview: '预览',
    save: '保存图片',
    scale: '图像缩放比例',
    shadow: '阴影',
    share: '分享图片',
    shareUrl: '分享 URL',
    theme: '主题',
    width: '宽度',
    windowStyle: {
      label: '窗口样式',
      mac: 'macOS',
      none: '无',
      windows: 'Windows',
    },
  },
  core: {
    broadcast: {
      heading: '播送',
      successSetToken: '播送用户令牌设置成功',
    },
    changeLanguage: {
      hint: '更改语言',
      message: '正在加载 {{lang}} 。这可能需要一些时间！',
    },
    copy: {
      copied: '代码已复制到剪贴板',
      copiedAsDataURL: '将代码复制为 Data URL',
      copiedImage: '图像复制到剪贴板。',
      hint: '已复制！',
      title: '复制',
    },
    error: {
      couldNotLoadTemplate: '无法加载模板：{{template}}',
      failedToCopyCode: '复制代码失败',
      failedToCopyImage: '复制图像失败',
      failedToLoadTemplate: '加载模板失败',
      failedToLoadTemplates: '加载启动模板失败',
      failedToParseSettings: '无法将设置解析为 JSON',
      failedToSaveImage: '保存图像失败',
      failedToShareImage: '分享图像失败',
      invalidCommand: '命令无效！',
      invalidImport: '导入 URL 无效',
      invalidPanelId: '面板 ID 无效',
      invalidToken: '令牌无效！',
      login: '登录错误！',
      logout: '登出错误！',
      noResultContainer: '未找到结果容器',
      unavailable: '命令不可用',
      unavailableForEmbeds: '嵌入中命令不可用',
    },
    export: {
      gist: '创建公开 GitHub gist...',
    },
    fork: {
      success: 'Fork 为新项目',
    },
    fullScreen: {
      enter: '全屏',
      exit: '退出全屏',
    },
    generating: '正在生成 ...',
    import: {
      loading: '正在加载项目 ...',
    },
    layout: {
      horizontal: '水平布局',
      responsive: '响应式布局',
      vertical: '垂直布局',
    },
    loadDefaults: {
      template: '加载默认模板中',
    },
    login: {
      success: '登录成功',
      successWithName: '以 {{name}} 的身份登录',
    },
    logout: {
      success: '登出成功',
    },
    result: {
      hint: '在新窗口中显示结果',
    },
    save: {
      success: '项目已本地保存至设备！',
      successWithName: '项目 "{{name}}" 已保存至设备。',
    },
    template: {
      blank: '空白项目',
      delete: '删除模板 "{{item}}" ？',
      javascript: 'JavaScript 启动模板',
      react: 'React 启动模板',
      saved: '另存为新模板',
      typescript: 'TypeScript 启动模板',
      vue: 'Vue 3 启动模板',
    },
    unload: {
      notSaved: '您所做的更改可能无法保存。',
    },
    zoom: {
      hint: '缩放',
    },
  },
  customSettings: {
    JSON: '自定义设置 JSON',
    desc: '<1></1> 请查看 <2>文档</2> 以了解详情。',
    heading: '自定义设置',
    load: '加载',
  },
  deploy: {
    create: {
      desc: '将创建一个新的<1>公开</1>仓库。结果页面将被推送到 <2>gh-pages</2> 分支。',
      heading: '创建新仓库',
      repoName: '仓库名称<1></1>',
    },
    error: {
      generic: '部署失败！',
      repoNameExists: '仓库名称已存在',
      repoNameRequired: '必须填写仓库名称',
    },
    existing: {
      desc: '新提交将被添加到 <1>gh-pages</1> 分支。',
      heading: '现有仓库',
      repoName: '仓库名称',
    },
    generic: {
      commitMessage: '提交信息',
      commitSourceCodePublic: '提交源代码（公开）',
      deployBtn: '部署',
      deploying: '正在部署...',
    },
    heading: '部署到 GitHub Pages',
    searchRepo: '搜索您的公开代码仓库...',
  },
  editorSettings: {
    closeBrackets: '自动闭合括号和引号',
    codeJarDesc: '<1></1> * 标记的功能在 CodeJar 中不可用。',
    default: '默认',
    desc: '<1></1> 请查看 <2>文档</2> 以了解详情。',
    editor: {
      codejar: 'CodeJar',
      codemirror: 'CodeMirror',
      heading: '编辑器',
      monaco: 'Monaco',
    },
    editorMode: {
      emacs: 'Emacs',
      heading: '编辑器模式 *',
      vim: 'Vim',
    },
    editorTheme: '编辑器主题',
    emmet: '启用 Emmet *',
    enableAI: {
      heading: '启用 AI 代码助手',
      note: '由 <1> <2> </2> </1> 提供支持',
    },
    fontFamily: '字体',
    fontSize: '字体大小',
    format: '格式化',
    heading: '编辑器设置',
    lineNumbers: '显示行号',
    notAvailableInCodeJar: '在 CodeJar 中不可用',
    preview: '预览',
    semicolons: '格式：使用分号',
    singleQuote: '格式：使用单引号',
    tabSize: '制表符大小',
    theme: '深色模式',
    trailingComma: '格式：使用尾随逗号',
    useTabs: {
      heading: '缩进字符',
      spaces: '空格',
      tabs: '制表符（Tab）',
    },
    wordWrap: '自动换行',
  },
  embed: {
    activeEditor: {
      heading: '活动编辑器',
      markup: '{{markup}}',
      script: '{{script}}',
      style: '{{style}}',
    },
    activeTool: {
      compiled: '编译结果',
      console: '控制台',
      heading: '活动工具',
      tests: '测试',
    },
    code: {
      copy: '复制代码',
      heading: '代码',
    },
    codeEditor: {
      codeJar: 'CodeJar',
      codeMirror: 'CodeMirror',
      default: '默认',
      heading: '代码编辑器',
      monaco: 'Monaco',
    },
    desc: '请查看<1>文档</1>以了解高级配置。',
    embedType: {
      cdn: '脚本（CDN）',
      heading: '嵌入类型',
      html: 'HTML',
      iframe: 'Iframe',
      npm: 'JS（npm）',
      react: 'React',
      svelte: 'Svelte',
      vue: 'Vue',
    },
    heading: '嵌入项目',
    layout: {
      heading: '布局',
      horizontal: '横向',
      responsive: '响应式',
      vertical: '纵向',
    },
    lite: '精简模式',
    loading: {
      click: '点击时',
      eager: '积极',
      heading: '加载',
      lazy: '延迟',
    },
    mode: {
      codeblock: '代码块',
      editor: '编辑器',
      full: '完整',
      heading: '显示模式',
      result: '结果',
      simple: '简洁',
    },
    permanentUrl: '永久 URL',
    preview: '预览',
    previewLoading: '正在加载预览...',
    readonly: '只读',
    theme: {
      dark: '深色',
      heading: '主题',
      light: '浅色',
    },
    tools: {
      closed: '折叠',
      full: '完全展开',
      heading: '工具面板',
      none: '不显示',
      open: '展开',
    },
    view: {
      editor: '编辑器',
      heading: '默认视图',
      result: '结果',
      split: '分割',
    },
  },
  generic: {
    about: {
      blog: '博客',
      configuration: '配置',
      gettingStarted: '快速开始',
      github: 'GitHub',
      sdk: 'LiveCodes SDK',
      sponsor: '赞助',
      twitter: '𝕏 / Twitter',
    },
    clickForInfo: '点击以获取信息...',
    close: '关闭',
    custom: '自定义',
    embed: {
      logoHint: '在 LiveCodes 上编辑 🡕',
    },
    error: {
      authentication: '身份验证错误！',
      exceededSize: '错误：过大的文件大小 {{size}} MB',
      failedToReadFile: '错误：读取文件失败',
    },
    loading: '正在加载 ...',
    more: '更多...',
    optional: '可选',
    required: '必填',
    tagline: '一个简单实用的代码游乐场！',
  },
  import: {
    bulk: {
      desc: '将多个项目批量导入到您已保存的项目中。可以从<1>已保存的项目</1>屏幕导出项目。',
      fromFile: '从本地文件批量导入',
      fromURL: '从 URL 批量导入',
      heading: '批量导入',
      started: '批量导入已开始 ...',
    },
    code: {
      desc: '支持的来源： <1> <2>GitHub Gist</2> <3>GitHub 文件</3> <4>GitHub 仓库中的目录</4> <5>Gitlab Snippet</5> <6>Gitlab 文件</6><7>Gitlab 仓库中的目录</7> <8>JS Bin</8><9> 原始代码</9> <10>网页 DOM 中的代码 </10> <11>zip 文件中的代码</11> <12>官方样板<13></13>（TypeScript 和 Vue）</12> </1> 请访问<14>文档</14>以了解详细信息。',
      fromFile: '从本地文件导入',
      fromURL: '从 URL 导入',
      heading: '导入代码',
    },
    error: {
      failedToLoadURL: '错误：无法加载 URL',
      invalidConfigFile: '配置文件无效',
      invalidFile: '错误：文件无效',
    },
    generic: {
      file: '本地文件',
      url: 'URL',
    },
    heading: '导入',
    json: {
      desc: '将单个项目 JSON 导入编辑器。可以通过菜单&nbsp;→&nbsp;导出项目（JSON）中导出项目。',
      fromFile: '从本地文件导入项目',
      fromURL: '从 URL 导入项目',
      heading: '导入项目 JSON',
    },
    success: '导入成功！',
  },
  login: {
    accessAllowed: '允许访问：',
    desc: '<1>登录即表示您同意 <2>Cookie</2> 将可能存储在您的设备上。</1><3> <4>为什么需要这些权限？</4> </3><5> <6>如何更改 / 撤销权限？</6> </5>',
    gist: 'Gists',
    heading: '使用 GitHub 登录',
    loginAs: '以 {{name}} 的身份登录',
    loginBtn: '登录',
    logout: '登出',
    privateRepo: '私有仓库',
    publicRepo: '仓库',
  },
  menu: {
    about: '关于 ...',
    appHelp: {
      heading: '帮助',
      hint: '帮助',
    },
    appProject: {
      heading: '项目',
      hint: '项目',
    },
    appSettings: {
      heading: '设置',
      hint: '应用程序设置',
    },
    assets: '资产 ...',
    autoSave: '自动保存',
    autoUpdate: '自动更新',
    backup: '备份 / 恢复 ...',
    blog: 'LiveCodes 博客',
    broadcast: '播送 ...',
    config: '配置',
    customSettings: '自定义设置 ...',
    delay: {
      heading: '延迟：<1> 1.5 </1> 秒',
      hint: '自动更新前的延迟',
    },
    deploy: '部署 ...',
    docs: '文档',
    editorSettings: '编辑器设置 ...',
    embed: '嵌入 ...',
    export: {
      codepen: '在 CodePen 中编辑',
      gist: '导出到 GitHub Gist',
      heading: '导出',
      jsfiddle: '在 JSFiddle 中编辑',
      json: '导出项目（JSON）',
      result: '导出结果页（HTML）',
      src: '导出源代码（ZIP）',
    },
    features: '特性',
    formatOnsave: '保存时格式化',
    getstart: '快速开始',
    import: '导入 ...',
    layout: '垂直布局',
    license: '许可证',
    login: '登录',
    logout: '登出',
    new: '新建 ...',
    open: '打开 ...',
    project: '项目信息 ...',
    recoverUnsaved: '恢复未保存的内容',
    report: '报告问题',
    resources: '外部资源 ...',
    save: '保存',
    saveAs: {
      fork: 'Fork（新项目）',
      heading: '另存为 ...',
      template: '模板',
    },
    sdk: 'SDK',
    share: '分享 ...',
    showSpacing: {
      heading: '显示间距',
      hint: '按下 Alt/Option 并将光标移至结果页面以显示',
    },
    showWelcome: {
      title: '启动时显示欢迎屏幕',
    },
    snippets: '代码片段 ...',
    source: 'GitHub 上的源代码',
    sync: '同步（Beta 版）... <1> ⏳</1>',
    theme: '深色主题',
    themeColor: '颜色',
    welcome: {
      heading: '欢迎 ...',
    },
  },
  open: {
    action: {
      delete: '删除',
    },
    defaultTemplate: '默认模板',
    delete: {
      all: '删除 {{projects}} 个项目？',
      deleting: '正在删除项目 ...',
      one: '删除项目：{{project}} ？',
    },
    deleteAll: '删除全部',
    exportAll: '导出全部',
    filter: {
      language: '按语言筛选',
      tag: '按标签筛选',
    },
    heading: '已保存的项目',
    import: '导入',
    lastModified: '最后修改时间：{{modified}}',
    noData: {
      desc: '您可以从菜单 &gt; 保存或通过键盘快捷键（Ctrl/Cmd + S）保存项目。',
      heading: '您没有已保存的项目。',
    },
    noMatch: '没有符合筛选条件的项目。',
    placeholder: {
      allLanguages: '所有语言',
      filterByTags: '按标签筛选',
      search: '搜索',
    },
    removeDefault: '（未设置）',
    reset: '重置',
    setAsDefault: '设为默认',
    sort: {
      heading: '排序方式：',
      lastModified: '最后修改',
      title: '标题',
    },
  },
  project: {
    desc: '描述',
    head: '添加到 &lt;head&gt;',
    heading: '项目信息',
    htmlAttr: '&lt;html&gt; 属性',
    tags: '标签',
    title: '项目标题',
  },
  recoverPrompt: {
    desc: '您的最后一个项目存在尚未保存的更改！',
    heading: '恢复未保存的项目？',
    meta: '标题：<1> </1> <2> </2>最后修改时间：<3> </3>',
    notShowAgain: '不要再展示此内容。',
    prompt: {
      discard: '丢弃未保存的项目',
      heading: '<1> </1>您想现在恢复吗？',
      recover: '将项目恢复到编辑器',
      save: '保存到设备并继续',
    },
  },
  resources: {
    browseOnJsDelivr: '浏览 jsDelivr 上的软件包',
    cssPresets: {
      heading: 'CSS 预设',
      none: '无',
      normalizeCss: 'Normalize.css',
      resetCss: '重置 CSS',
    },
    error: {
      failedToLoadResults: '加载结果失败！',
      noResultsFound: '未找到相关结果：',
    },
    fonts: {
      add: '添加',
      heading: '字体<1>（由 Google Fonts 提供）</1>',
      select: '选择字体 ...',
    },
    heading: '外部资源',
    scripts: '外部脚本',
    search: {
      heading: '搜索软件包<1>（由 jsDelivr 提供）</1>',
      placeholder: '例如 jquery, lodash@4, bootstrap@5.2.3, ...',
    },
    stylesheets: '外部样式',
    urlDesc: '键入样式/脚本 URL。每个 URL 应位于单独的一行中。',
  },
  resultMode: {
    linkText: '在 LiveCodes 上编辑',
  },
  savePrompt: {
    heading: '未保存的更改',
    prompt: {
      cancel: '取消',
      discard: '不保存',
      heading: '您所做的更改可能无法保存。 <1> </1>您想现在保存吗？',
      save: '保存',
    },
  },
  share: {
    characters: '{{urlLength}} 字符',
    copy: {
      clickToCopy: '点击以复制',
      copied: 'URL 已复制到剪贴板',
    },
    encodedURL: '获取编码 URL',
    error: {
      failedToCopy: '复制到剪贴板失败！',
      failedToGenerateURL: '生成短 URL 失败！',
    },
    expireInOneYear: '1 年内有效',
    generateURL: '正在生成 URL ...',
    heading: '分享',
    permanentURL: '永久 URL',
    qrcode: {
      clickToDownload: '点击以下载',
      generating: '正在生成...',
    },
    services: {
      devTo: 'Dev.to',
      email: '电子邮件',
      facebook: 'Facebook',
      hackerNews: 'Hacker News',
      linkedIn: 'LinkedIn',
      pinterest: 'Pinterest',
      pocket: 'Pocket',
      qrCode: '二维码',
      reddit: 'Reddit',
      share: '分享方式 ...',
      telegram: 'Telegram',
      tumblr: 'Tumblr',
      twitter: '𝕏 / Twitter',
      whatsApp: 'WhatsApp',
    },
    shortURL: '获取短 URL',
  },
  snippets: {
    action: {
      copy: '复制',
      delete: '删除',
      edit: '编辑',
    },
    add: {
      code: '代码',
      desc: '描述',
      heading: '添加代码片段',
      language: '语言',
      save: '保存',
      snippets: '代码片段',
      title: '标题',
    },
    copy: {
      clickToCopySnippet: '点击以复制代码片段',
      copied: '代码片段已复制到剪贴板。',
    },
    delete: {
      all: '删除 {{snippets}} 个代码片段？',
      one: '删除代码片段：{{snippet}} ？',
    },
    deleteAll: '删除全部',
    error: {
      failedToCopy: '复制 URL 失败。',
      noTitle: '请为代码片段添加标题。',
    },
    filter: {
      language: '按语言筛选',
    },
    heading: '代码片段',
    lastModified: '最后修改时间：{{modified}}',
    noMatch: '没有符合筛选条件的代码片段。',
    noSavedSnippets: '您没有已保存的代码片段。',
    placeholder: {
      allLanguages: '所有语言',
      search: '搜索',
    },
    reset: '重置',
    save: {
      success: '代码片段已本地保存至设备！',
    },
    sort: {
      date: '日期',
      heading: '排序方式：',
      title: '标题',
    },
    text: '纯文本',
  },
  splash: {
    loading: '正在加载 LiveCodes ...',
  },
  sync: {
    autoSync: '自动同步',
    create: {
      desc: '将创建一个新的<1>私有</1>仓库。您的 LiveCodes 本地数据将与 <2>main</2> 分支同步。',
      heading: '创建新仓库',
      repoName: '仓库名称',
    },
    error: {
      generic: '同步失败！',
      repoNameRequired: '必须填写仓库名称',
    },
    existing: {
      desc: '您的 LiveCodes 本地数据将与 <1>main</1> 分支同步。',
      heading: '现有仓库',
      repoName: '仓库名称',
    },
    heading: '同步到 GitHub 仓库',
    searchRepos: '搜索您的仓库...',
    success: '同步完成！',
    syncBtn: '同步',
    syncInProgress: '同步进行中 ...',
    syncStarted: '同步已开始...',
  },
  templates: {
    heading: '新项目',
    noUserTemplates: {
      desc: '您可以通过<1></1>（菜单&nbsp;&gt;&nbsp;另存为&nbsp;&gt;&nbsp;模板）将项目另存为模板。',
      heading: '您没有已保存的模板。',
    },
    starter: {
      angular: 'Angular 启动模板',
      assemblyscript: 'AssemblyScript 启动模板',
      astro: 'Astro 启动模板',
      backbone: 'Backbone 启动模板',
      blank: '空白项目',
      blockly: 'Blockly 启动模板',
      bootstrap: 'Bootstrap 启动模板',
      civet: 'Civet 启动模板',
      clio: 'Clio 启动模板',
      clojurescript: 'ClojureScript 启动模板',
      coffeescript: 'CoffeeScript 启动模板',
      commonlisp: 'Common Lisp 启动模板',
      cpp: 'C++ 启动模板',
      diagrams: '图表启动模板',
      fennel: 'Fennel 启动模板',
      gleam: 'Gleam 启动模板',
      go: 'Go 启动模板',
      heading: '启动模板',
      imba: 'Imba 启动模板',
      javascript: 'JavaScript 启动模板',
      jest: 'Jest 启动模板',
      'jest-react': 'Jest/React 启动模板',
      jquery: 'jQuery 启动模板',
      julia: 'Julia 启动模板',
      knockout: 'Knockout 启动模板',
      lit: 'Lit 启动模板',
      livescript: 'LiveScript 启动模板',
      loading: '正在加载启动模板...',
      lua: 'Lua 启动模板',
      'lua-wasm': 'Lua（WASM）启动模板',
      malina: 'Malina.js 启动模板',
      markdown: 'Markdown 启动模板',
      mdx: 'MDX 启动模板',
      ocaml: 'Ocaml 启动模板',
      perl: 'Perl 启动模板',
      php: 'PHP 启动模板',
      'php-wasm': 'PHP（WASM）启动模板',
      postgresql: 'PostgreSQL 启动模板',
      preact: 'Preact 启动模板',
      prolog: 'Prolog 启动模板',
      python: 'Python 启动模板',
      r: 'R 启动模板',
      react: 'React 启动模板',
      'react-native': 'React Native 启动模板',
      reason: 'Reason 启动模板',
      rescript: 'ReScript 启动模板',
      riot: 'Riot.js 启动模板',
      ruby: 'Ruby 启动模板',
      'ruby-wasm': 'Ruby（Wasm）启动模板',
      scheme: 'Scheme 启动模板',
      solid: 'Solid 启动模板',
      sql: 'SQL 启动模板',
      stencil: 'Stencil 启动模板',
      svelte: 'Svelte 启动模板',
      tailwindcss: 'Tailwind CSS 启动模板',
      tcl: 'Tcl 启动模板',
      teal: 'Teal 启动模板',
      typescript: 'TypeScript 启动模板',
      vue: 'Vue 3 单文件组件启动模板',
      vue2: 'Vue 2 启动模板',
      wat: 'WebAssembly 启动模板',
    },
    user: {
      heading: '我的模板',
      loading: '正在加载用户模板...',
    },
  },
  testEditor: {
    heading: '编辑测试',
    load: '加载',
    tests: '测试',
  },
  testSettings: {
    desc: '<1></1> 请查看 <2>文档</2> 以了解详情。',
  },
  toolspane: {
    close: '关闭',
    compiled: {
      title: '编译结果',
    },
    console: {
      clear: '清除控制台',
      title: '控制台',
    },
    test: {
      edit: '编辑',
      error: '<1><2>测试错误！</2></1>',
      loading: '<1>正在加载测试... </1>',
      noTest: '<1>该项目没有测试！</1>',
      reset: '重置',
      run: {
        desc: 'Ctrl/Cmd + Alt + T',
        heading: '运行',
      },
      summary: {
        desc: '测试： {{failed}}\n       {{passed}}\n       {{skipped}}\n       {{total}}<1></1>\n耗时：{{duration}} 秒',
        failed: '失败 {{failedNum}}',
        passed: '通过 {{passedNum}}',
        skipped: '已跳过 {{skippedNum}}',
        total: '总计 {{totalNum}}',
      },
      title: '测试',
      watch: {
        desc: '在代码更改时运行测试',
        heading: '监听',
      },
    },
  },
  welcome: {
    about: {
      documentation: '文档',
      heading: '关于 LiveCodes',
    },
    heading: '欢迎',
    recent: {
      heading: '最近',
    },
    recover: {
      cancel: '取消',
      heading: '恢复',
      lastModified: '最后修改时间：',
      recover: '恢复',
      save: '保存',
      unsavedChanges: '您的上一个项目有未保存的更改：',
    },
    showOnStartup: '启动时显示',
    start: {
      heading: '开始',
      import: '导入...',
      loadDefaultTemplate: '加载默认模板',
      new: '新建...',
      noDefaultTemplate: '无默认模板',
      open: '打开...',
    },
    templates: {
      heading: '启动模板',
    },
  },
};

export default translation;
