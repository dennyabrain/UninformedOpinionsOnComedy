import {Markdown} from 'markdown-to-html'

import fs from 'fs';

let filenames=[];

fs.readdir('posts/', function(err, files){
  if(err){
    console.log(err);
  }else{
    console.log('files read '+files);
    for(let i=0; i<files.length; i++){
      mdToHtml(files[i]);
    }
  }
})

const mdToHtml=(file)=>{
  let md = new Markdown();
  md.bufmax = 2048;
  let filename = 'posts/'+file;
  let opt = {title: 'File $BASENAME in $DIRNAME', stylesheet: '../css/style.css', stylesheet:'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'};

  console.log('converting '+file);

  md.once('end', function() {
  console.log('===============================');
  });

  md.render(filename, opt, function(err){
    if(err){
      console.log('error '+err);
      process.exit();
    }

    let fileName = file.split(".");
    let out = fs.createWriteStream('html/'+fileName[0]+'.html');
    console.log(fileName[0]+".html");
    md.pipe(out);
  })
}
