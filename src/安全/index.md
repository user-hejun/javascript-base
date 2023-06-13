# XSS攻击
XSS是跨站脚本攻击(Cross Site Scripting)
预防：所有用户输入的提交都要转义，过滤特殊字符。

# CSRF攻击 
CSRF跨站点请求伪造（Cross Site Request Forgery）和XSS攻击一样，有巨大的危害性，就是攻击者盗用了用户的身份，以用户的身份发送恶意请求，
但是对服务器来说这个请求是合理的，这样就完成了攻击者的目标。
预防：使用验证码，使用token验证