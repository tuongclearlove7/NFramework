var JSCLPath = "D:\\nframework_gr/nmodules/demoNModule.nlc.client.js";
                
                    

    
    
    var Page=require('D:\\nframework_gr\\modules\\nframework\\ncompiler\\tags/../../page/page');
    
    var page_demoPage=new Page();

    page_demoPage.Setup=function(){

    

    
    
        this.ejs_src='demo.ejs';
    
    

    
    
        this.modules=[];
    this.modules.push('demoClientModule');
        this.modules.push('demoClientModuleBase');
        
    
    


    }
        page_demoPage.Setup.call(page_demoPage);

    
    
    
                
                
                
                    

        var NModule=
        function(){

            return require("D:\\nframework_gr\\modules\\nframework\\ncompiler\\tags/../../nmodule/nmodule");

        }()
    
    ;
    
        var nmodule=new NModule();

        var This=nmodule;

        nmodule.side='both';

        nmodule.name='demoClientModule';
    
    

    
    
        nmodule.baseModules = ['demoClientModuleBase'];
    
    

    

    {
        nmodule.AddServerMethod('LogSyncMethodInServer',(clientSocket,...args)=>{
            var f=
    

        function() {
            console.log(this.Get('syncProp'));
        }

    
        
    f.call(nmodule,...args); 

}
    
    );
}
    

    
        
        {
            path='';
            callback=()=>{};
            

        path='/'

        callback=(req,res)=>{
            
            

        ((req,res)=>{
            var framework=nmodule.manager.NFramework;
            var modules=page_demoPage.modules;

            var miejs='';

            var frameworkCLEJS=framework.clejs;

            miejs+=frameworkCLEJS;

            for(var i=0;i<modules.length;i++){
                var module=modules[i];
                miejs+=' <script  src="/nmodules/'+module+'"></script>';
            }
            

            miejs+="<script src='/appcl'></script>";

            res.render( page_demoPage.ejs_src,{
                NFramework:miejs
            });
        })(req,res);
    
    

        }

    
            nmodule.Routing(path,callback);
        }
    
    
    


        
    
        var fs=require('fs');

        var clientVersion=JSCLPath;

        var code=fs.readFileSync(clientVersion);
        
        if(nmodule.side!='server'){
            nmodule.Routing('/nmodules/demoClientModule',(req,res)=>{
                res.send(code);
            });
        }

        

            module.exports = nmodule;
        
        
                
                