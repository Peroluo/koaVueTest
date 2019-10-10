import koaStatic from 'koa-static'
import path from 'path'
const staticPath = '../www'
export const addStatic = app => {
  app.use(
    koaStatic(path.join(__dirname, staticPath), {
      maxage: 24 * 60 * 60 * 1000 * 90,
      gzip: true
    })
  )
}
