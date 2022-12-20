/// <reference types="vite/client" />
 
/**
 * 
 * 解决ts模块引用js报错，js文件提示全部关闭了
 */
declare module '*.js' {
  const content: any
  /// 这里的 content 可以根据自己的需要，添加需要的类型，这的话可以让 ts 更好的提示
  /**
  type content = {
    test: string
  }
 */
  export = content
}