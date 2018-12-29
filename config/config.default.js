'use strict';

module.exports = appInfo => {
	const config = exports = {
		// 加载 errorHandler 中间件
		middleware: ['errorHandler'],
		// 只对 /api 前缀的 url 路径生效
		errorHandler: {
			match: '/api'
		},
		mysql: {
			// 单数据库信息配置
			client: {
				// host
				host: '127.0.0.1',
				// 端口号
				port: '3306',
				// 用户名
				user: 'root',
				// 密码
				password: 'zhly9205156',
				// 数据库名
				database: 'jianhang',
			},
			// 是否加载到 app 上，默认开启
			app: true,
			// 是否加载到 agent 上，默认关闭
			agent: false
		},
		security: {
			csrf: {
				enable: false,
				ignoreJSON: true
			},
			domainWhiteList: ['http://10.0.0.173']
		},
		cors: {
			origin: '*',
			allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
		}
	};

	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1544666604145_3847';

	return config;
};