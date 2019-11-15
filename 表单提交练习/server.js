var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");
var MT = {
	"html": "text/html",
	"htm": "text/html",
	"js": "text/javascript",
	"css": "text/css",
	"txt": "text/plain",
	"png": "image/png",
	"jpg": "image/jpeg",
	"jpeg": "image/jpeg",
	"jpe": "image/jpeg",
	"gif": "image/gif"

}
// 搭建服务器
var server = http.createServer(function(req, res) {
	var url_obj = url.parse(req.url);
	var pathname = url_obj.pathname;
	var pathobj = path.parse(pathname);
	if (!pathobj.ext) {
		pathname = path.join(pathname, "/index.html");
	}
	var extName = pathname.slice(pathname.lastIndexOf(".") + 1);
	var method = req.method.toLowerCase();
	if (pathname === "/login" && method === "post") {
		console.log("用户要登录了");
		
		res.setHeader("content-type", "text/plain;charset=utf-8");
		Math.random() > 0.5 ? res.end("登录成功") : res.end("登录失败");
		return;
	}
	fs.readFile("." + pathname, function(err, data) {
		if (err) {
			res.setHeader("content-type", "text/plain;charset=utf-8");
			res.end("抱歉，您访问的" + pathname + "不存在, 请重新检查!");
			return;
		}
		res.setHeader("content-type", MT[extName] + ";charset=utf-8");
		res.end(data);
	});
});

server.listen(3000);
