//load the necessary NPM packages and create necessary objects
var express         = require("express"),
    bodyParser      = require('body-parser'),
    pdfFiller       = require("pdffiller"),
    formConversion  = require("./taxForms/conversion/formDataConversion.js"),
    fs              = require('fs'),
    shortid         = require("shortid"),
    app             = express();
    
    

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static('public'));

var sourcePDF = "taxForms/source/fw8ben.pdf";
var destinationPDF = "taxForms/output/fw8ben_Complete.pdf";



//INDEX
app.get('/',function(req,res){
  res.render('index');
});



// ================================================
//          FORM
// ================================================
//NEW
app.post("/:form",function(req,res){
  var tmpId           = shortid.generate(),
      sourcePDF       = "./taxForms/source/" + req.params.form + ".pdf",
      destinationPDF  = "./public/tmp/formOutput/" + tmpId + "/" + req.params.form + "_Complete.pdf",
      data            = formConversion.W8BEN(req.body.data);
      
  fs.mkdir('./public/tmp/formOutput/' + tmpId,function(err){
    if (err) {
      console.log(err)
    } else {

      pdfFiller.fillForm( sourcePDF, destinationPDF, data, function(err) {
        if (err) {
          console.log(err)
        } else {
          res.redirect("/" + req.params.form + "/" + tmpId + "/success")
        }
      });
    }
  })
});

//DOWNLOAD
app.get('/:form/:id/success',function(req,res){
  res.render(req.params.form + "/success",{id: req.params.id,form: req.params.form});
});

//DELETE
app.post('/:form/:id/delete',function(req,res){
  console.log('delete command received')
  var filePath = "./public/tmp/formOutput/" + req.params.id + "/" + req.params.form + "_Complete.pdf"
  fs.stat(filePath,function(err,stat){
    if (err){
      console.log(err);
    } else {
      fs.unlink(filePath, function(err){
        if (err){
          console.log(err);
        } else {
          fs.rmdir("./public/tmp/formOutput/" + req.params.id, function(err){
            if (err){
              console.log(err);
            } else {
              console.log('Successfully Removed File')
            }
          
          })
        }
      });
    }
  })
});

//INDEX
app.get('/:form',function(req,res){
  res.render(req.params.form + "/index");
});


app.listen(process.env.PORT,process.env.IP,function(){
	console.log(Date());
  console.log('====== The Tax Form Server has started =====')
});