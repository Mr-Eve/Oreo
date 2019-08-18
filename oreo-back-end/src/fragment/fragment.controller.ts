
import { Get, Controller, Post, Body, Delete, Query, HttpException, UseGuards } from '@nestjs/common';
import { TipMessageDTO, TipType } from 'src/others/response.dto';
import { DeleteResult } from 'typeorm';
import { FragmentService } from './fragment.service';
import { Fragment } from './fragment.entity';
import { AdminGuard } from 'src/others/auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('fragment')
@UseGuards(AuthGuard())
export class FragmentController {
  constructor(
    private readonly service: FragmentService
  ) { }

  /**
   * @api {Post} /classification/save 新增
   * @apiGroup Classification
   *
   * @apiParam {String} name 文章名
   * @apiParam {String} keywords 关键词   
   * @apiParamExample {json} Request-Example   
   * {
   *  "name": "Typescript VS Javascript",
   *  "keywords": "["可维护性","语法糖"]"
   * }
   * 
   * @apiUse UniversalSuccessDTO
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "tipType": "1",
   *   "message": "添加成功"
   * }
   * @apiSuccess {String} message 提示文本
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "tipType": "1",
   *   "message": "修改成功"
   * }
   *  
   * @apiUse UniversalErrorDTO
   * @apiErrorExample  {json} Response-Example
   * {
   *   "tipType": "3",
   *   "message": "发生未知错误, 请私信博主错误信息([fragment, save])"
   * }
   */
  @Post('save')
  @UseGuards(AdminGuard)
  async save(@Body() dto: Fragment): Promise<TipMessageDTO> {
    const flag = dto.id ? true : false;
    let tipType: number;
    let message: string;
    await this.service.save(dto).then(v => {
      tipType = TipType.SUCCESS;
      message = flag ? '修改成功' : '添加成功';
    }).catch(() => {
      throw new HttpException({
        tipType: TipType.DANGER,
        message: '发生未知错误, 请私信博主错误信息([fragment, save])'
      }, 500);
    });
    return { tipType, message };
  }

  // @Post('saveUser')
  // async saveUser(@Body() dto: { fragmentId: number, userId: number }): Promise<TipMessageDTO> {
  //   let tipType: number;
  //   let message: string;
  //   await this.service.saveUser(dto.fragmentId, dto.userId).catch(() => {
  //     throw new HttpException({
  //       tipType: TipType.DANGER,
  //       message: '发生未知错误, 请私信博主错误信息([fragment, saveUser])'
  //     }, 500);
  //   });
  //   return { tipType, message };
  // }

  /**
   * @api {Delete} /classification/delete 删除
   * @apiGroup Classification
   *
   * @apiParam {String} id 文章id
   * @apiParamExample {json} Request-Example
   * {
   *  "id": "1",
   * }
   * 
   * @apiUse UniversalSuccessDTO
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "tipType": "1",
   *   "message": "删除成功"
   * }
   * 
   * @apiUse UniversalErrorDTO
   * @apiErrorExample  {json} Response-Example
   * {
   *   "tipType": "3",
   *   "message": "发生未知错误, 请私信博主错误信息([fragment, delete])"
   * }
   */
  @Delete('delete')
  async delete(@Query() request): Promise<TipMessageDTO> {
    let message: string;
    let tipType: number;
    await this.service.delete(request.id).then((v: DeleteResult) => {
      if (v.raw.affectedRows > 0) {
        tipType = TipType.SUCCESS;
        message = '删除成功';
      } else {
        throw new HttpException({
          tipType: TipType.DANGER,
          message: '发生未知错误, 请私信博主错误信息([fragment, delete])'
        }, 500);
      }
    })
    return { tipType, message };
  }

  /**
   * @api {Get} /classification/findTableInfo 获取全部类别信息
   * @apiGroup Classification
   *
   * @apiParam {String} [name] 类别名
   * @apiParamExample {json} Request-Example
   * {
   *  "name": "ng"
   * }
   * 
   * @apiSuccess {Number} id 类别id
   * @apiSuccess {Number} articleAmount 文章总数
   * @apiUse LCCAmountDTO
   * @apiSuccessExample  {json} Response-Example
   * [{
   *   "id": 1,
   *   "name": "C语言",
   *   "articleAmount": 6,
   *   "likeAmount": 16,
   *   "collectAmount": 22,
   *   "commentAmount": 22
   * }]
   */
  @Get('findTableInfo')
  async findTableInfo(@Query() query): Promise<Fragment[]> {
    const name = query.name;
    return name ? this.service.findTableInfo(name) : this.service.findTableInfo();
  }

  /**
   * @api {Get} /classification/findDetail 获取特定类别信息
   * @apiGroup Classification
   *
   * @apiParam {String} id 类别id
   * @apiParamExample {json} Request-Example
   * {
   *  "id": "1",
   * }
   * 
   * @apiSuccess {Number} id 类别id
   * @apiUse TimeDTO
   * @apiSuccess {String} name 类别名
   * @apiSuccess {String} keywords 关键词
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "id": 1,
   *   "createTime": "2019-05-01T09:07:24.093Z",
   *   "updateTime": "2019-05-04T15:55:57.000Z",
   *   "name": "C语言",
   *   "keywords": "[\"速度快\",\"原生\"]"
   * }
   */
  @Get('findDetail')
  async findDetail(@Query() query): Promise<any> {
    return this.service.findDetail(query.id);
  }
}
