const http = require('http');
const url = require('url');

// 创建 HTTP 服务
const server = http.createServer((req, res) => {
  // 解析 URL 参数
  const query = url.parse(req.url, true).query;

  // ———— 从 URL 获取参数，默认值兜底 ————
  const width = query.w || 854;           // 宽度
  const height = query.h || 180;          // 高度
  const title = query.title || 'Welcome'; // 主标题
  const subtitle = query.sub || '快速构建现代化应用'; // 副标题
  const bg = query.bg || '#1a1a1a';       // 背景色
  const color1 = query.c1 || '#5433FF';   // 渐变起点
  const color2 = query.c2 || '#20BDFF';   // 渐变中间
  const color3 = query.c3 || '#A5FECB';   // 渐变终点
  const opacity = query.op || 0.4;        // 波浪透明度
  const dur = query.dur || 20;            // 动画周期（秒）
  const textColor = query.tc || '#fff';   // 文字颜色

  // ———— 生成动态 SVG ————
  const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" style="z-index:1;position:relative;background:${bg};">
  <style>
    .text{font-size:40px;font-weight:700;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;}
    .desc{font-size:20px;font-weight:500;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;}
    .text,.desc{animation:fadeIn 1.2s ease-in-out forwards;opacity:0;}
    @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
  </style>
  <defs>
    <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${color1}"/>
      <stop offset="50%" stop-color="${color2}"/>
      <stop offset="100%" stop-color="${color3}"/>
    </linearGradient>
  </defs>
  <g>
    <path fill="url(#linear)" opacity="${opacity}">
      <animate attributeName="d" dur="${dur}s" repeatCount="indefinite" keyTimes="0;0.333;0.667;1" calcMode="spline" keySplines="0.2 0 0.2 1;0.2 0 0.2 1;0.2 0 0.2 1"
        values="M0 0L 0 100Q ${width/4} 140 ${width/2} 110T ${width} 135L ${width} 0 Z;
                M0 0L 0 125Q ${width/4} 140 ${width/2} 120T ${width} 110L ${width} 0 Z;
                M0 0L 0 145Q ${width/4} 115 ${width/2} 145T ${width} 110L ${width} 0 Z;
                M0 0L 0 100Q ${width/4} 140 ${width/2} 110T ${width} 135L ${width} 0 Z"/>
    </path>
    <path fill="url(#linear)" opacity="${opacity}">
      <animate attributeName="d" dur="${dur}s" repeatCount="indefinite" keyTimes="0;0.333;0.667;1" calcMode="spline" keySplines="0.2 0 0.2 1;0.2 0 0.2 1;0.2 0 0.2 1" begin="-${dur/2}s"
        values="M0 0L 0 115Q ${width/4} 160 ${width/2} 130T ${width} 140L ${width} 0 Z;
                M0 0L 0 130Q ${width/4} 100 ${width/2} 100T ${width} 120L ${width} 0 Z;
                M0 0L 0 125Q ${width/4} 105 ${width/2} 130T ${width} 145L ${width} 0 Z;
                M0 0L 0 115Q ${width/4} 160 ${width/2} 130T ${width} 140L ${width} 0 Z"/>
    </path>
  </g>
  <text text-anchor="middle" x="${width/2}" y="${height*0.35}" class="text" fill="${textColor}">${title}</text>
  <text text-anchor="middle" x="${width/2}" y="${height*0.55}" class="desc" fill="${textColor}">${subtitle}</text>
</svg>
  `;

  // 设置响应头为 SVG 图片
  res.writeHead(200, {
    'Content-Type': 'image/svg+xml',
    'Cache-Control': 'no-cache'
  });
  res.end(svg);
});

// 启动服务
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ SVG API 服务已启动：http://localhost:${PORT}`);
});