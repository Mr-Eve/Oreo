/**
 * 响应DTO
 * code   describe
 * 200    成功
 * 500    服务端错误
 * 404    资源不存在
 * 666    非法请求
 */
export interface ResponseDTO {
  code: 200 | 404 | 500 | 666;
  message: string;
  data: any;
}