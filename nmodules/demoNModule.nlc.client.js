
                
                    

    
    
    
                
                
                
                    
            (()=>{
                

        var NModule=
            function(){

                return window.NFramework.NModule;

            }()

        ;
    
        var nmodule=new NModule();

        var This=nmodule;

        nmodule.side='both';

        nmodule.name='demoClientModule';
    
    

    
    
        nmodule.baseModules = ['demoClientModuleBase'];
    
    

    

        
        nmodule.AddMethod('Setup',(...args)=>{
                var f=async function() {
                await this.AsyncSet('syncProp',2);
                this.Get('LogSyncMethodInServer')();
            }

        
                f.call(nmodule);
            }
    
        );
    
    

    

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

    
    


        
            var nmoduleManager=window.NFramework.nmoduleManager;
            nmoduleManager.ImportModule(nmodule);
        
            })();
        
                
                