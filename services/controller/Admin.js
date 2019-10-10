import { Controller, RequestMapping } from '../decorator'
import middleware from '../decorator/middleware'
const { Required, Auth } = middleware
import http from '../utils/Http'

@Controller
class Admin {
  @RequestMapping({ method: 'get', url: '/test/:id' })
  // url非必填,不填则是/getUserInfo
  async getUserInfo(ctx) {
    const sessionId = Math.random()
      .toString(36)
      .substr(2)
    ctx.session = {
      user_id: sessionId,
      user: 'xxx',
      pwd: '123'
    }
    ctx.body = ctx.session
  }

  @RequestMapping({ method: 'get', url: '/add' })
  async getGoods(ctx) {
    console.log(ctx.session)
    const data = await query(
      `INSERT INTO category(name,code,status) VALUES("${'test'}","${'ss'}",1)`
    )
    ctx.body = data
  }
}
