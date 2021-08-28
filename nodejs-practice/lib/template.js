module.exports = {
    html:function (title, list, body, control){
      return `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        ${control}
        ${body}
      </body>
      </html>
      `;
    },list:function (filelist){ // filelist 정보를  생성 templateList 함수에서 그 값을받아서 list 정보를 만들어서 return
      var list = '<ul>'; // 비어있는 문자열이 아닌 ul 태그로 시작
        var i = 0;
        while(i < filelist.length){
          list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</li>`;
          i = i + 1;
        }
        list = list + '</ul>';
        return list;
    }
  }

// module.exports = templates;  라고 할수도있으나 맨위로~