# 数据服务器
---
* 手机号登陆，需要自己注册容联云通讯获取测试账号配置，然后在util\sms_util.js中修改相应个人配置，之后输入符合格式的手机号即可
* bin\www里指定端口
* data里指定数据
## 可能遇到的问题
### npm start报错【on first connect [Error: connect ECONNREFUSED ::1:27017]】
* 【原因】依赖较新，服务器默认会找::1（即ipv6地址），但本地mongodb服务监听localhost（127.0.0.0即ipv4地址）
* 【解决办法1】[修改ipv6、ipv4优先级](https://blog.csdn.net/jian091309/article/details/131839214)
* 【解决办法2】不想修改，另一个仓库提供解压直接可用[数据服务器](https://github.com/hanab11/gshop_server)