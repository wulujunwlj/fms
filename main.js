var app = require('app');		// 控制应用生命周期的模块
var BrowserWindow = require('browser-window');	// 创建原生浏览器窗口的模块

// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，window会被自动关闭
var mainWindow = null;

// 当所有窗口被关闭时，推出
app.on('window-all-closed', function() {
	// 在 OS X 上，通常用户在明确的按下 Cmd + Q 之前，应用会保持活动状态
	if (process.platform != 'darwin') {
		app.quit();
	}
});

// 当 Electron 完成了初始化并且准备创建浏览器窗口的时候，这个方法被调用
app.on('ready', function() {
	// 创建浏览器窗口
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600
	});
	// 加载应用首页
	mainWindow.loadURL('file://' + __dirname + '/index.html');
	// 打开开发者工具
	mainWindow.openDevTools();

	// 当 window 被关闭，触发 closed 事件
	mainWindow.on('closed', function() {
		// 取消引用 window 对象，如果应用支持多窗口，通常会把多个 window 对象存放在一个数组里面
		mainWindow = null;
	});
})