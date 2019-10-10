import session from 'koa-session-minimal'
import MysqlSession from 'koa-mysql-session'
const { DATABASE, USERNAME, PASSWORD, PORT, HOST } = global.config.database
// 配置存储session信息的mysql
let store = new MysqlSession({
  user: USERNAME,
  password: PASSWORD,
  database: DATABASE,
  port: PORT,
  host: HOST
})

// 存放sessionId的cookie配置
let cookie = {
  maxAge: 1000 * 60 * 30, // cookie有效时长
  expires: '', // cookie失效时间
  path: '/', // 写cookie所在的路径
  domain: '', // 写cookie所在的域名
  httpOnly: '', // 是否只用于http请求中获取
  overwrite: 'false', // 是否允许重写
  secure: '',
  sameSite: '',
  signed: ''
}

export const addStatic = app => {
  // 使用session中间件
  app.use(
    session({
      key: 'SESSION_ID',
      store: store,
      cookie: cookie
    })
  )
}
