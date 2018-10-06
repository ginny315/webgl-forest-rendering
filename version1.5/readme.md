using node v6.11.0 (npm v6.2.0)
webpack 4.16
终端执行npm run start便可以启动

webpack dev server

index.html css js已经配置完成

```javascript
{
        type: 'javascript/auto',
        test: /\.json$/,
        include:path.join(__dirname,'./src'),
        exclude:/node_modules/,
        use: [
            {
              loader: 'file-loader',

            }
        ]
      }
```