var fs=require('fs');

var NCompiler = require('./ncompiler/ncompiler');

var NModuleManager = require('./nmoduleManager/nmoduleManager');

var NModule=require('./nmodule/nmodule');

var NFramework=class{

    constructor(){
        this.ncompiler=new NCompiler();
        this.ncompiler.NFramework=this;

        this.nmoduleManager=new NModuleManager();
        this.nmoduleManager.NFramework=this;

        this.framework_nmodules_src_dir=__dirname+'/nmodules';

        this.debug=new Object();

        this.debug.show_nlc_compiled_js=false;

        this.server=new Object();

        this.server.PORT=7070;

        this.clejs=this.GetCLEJS();
    }

    Init(){
        this.StartServer();
        this.SetupCLEJSRouters();
    }

    Build(){
        this.nmoduleManager.BuildModulePathsArray();
        this.nmoduleManager.CompileModules();
        this.nmoduleManager.ImportModules();
    }

    Run(){
        this.nmoduleManager.Setup();
        this.nmoduleManager.Start();
    }

    GetCLEJS(){
        return `

            <script src='/nframework'></script>
            <script src='/nmodule'></script>


        `;
    }

    SetupCLEJSRouters(){
        //framework js

        var frameworkCLJSFilePath=__dirname+'/cl/framework.js';

        var frameworkCLJSCode=fs.readFileSync(frameworkCLJSFilePath).toString();

        this.express_server.get('/nframework',(req,res)=>{
            res.send(frameworkCLJSCode);
        });

        var nmoduleCLJSFilePath=__dirname+'/cl/nmodule.js';

        var nmoduleCLJSCode=fs.readFileSync(nmoduleCLJSFilePath).toString();

        this.express_server.get('/nmodule',(req,res)=>{
            res.send(nmoduleCLJSCode);
        });


    }

    LoadSetting(path){
        var str=fs.readFileSync(path).toString();
        var settingObj=JSON.parse(str);
        var keys=Object.keys(settingObj);
        for(var i=0;i<keys.length;i++){
            this[keys[i]]=settingObj[keys[i]];
        }
        if(this.nmodules_src_dir[0]=='.'){
            this.nmodules_src_dir=this.appDir+this.nmodules_src_dir.substring(1,this.nmodules_src_dir.length);
        }
    }

    CompileModule(path){
        return this.ncompiler.CompileFile(path);
        
    }

    StartServer(){
        var express=require('express');
        var express_server=express();
        express_server.set('view engine','ejs');
        express_server.use(express.static("public"));
        this.express_server=express_server;

        var server=express_server.listen(this.server.PORT);
        this.httpServer=server;

        var socket_io=require('socket.io');
        var socket=socket_io(server);
        this.socket=socket;

    }

}


module.exports=()=>{

    return new NFramework();

}