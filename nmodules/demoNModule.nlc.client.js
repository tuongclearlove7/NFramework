
                
                    

    
    
    
                
                
                
                    

        var NModule=
            function(){

                return window.NFramework.NModule;

            }()

        ;
    
        var nmodule=new NModule();

        var This=nmodule;

        nmodule.name='demoNModule';
    
    

    nmodule.side='both';

    
    
    nmodule.AddProperty('demoProp');
    
    

    
        nmodule.AddMethod('Setup',(...args)=>{
            var f=
    

        function(){
            
        }

    
        
    f.call(nmodule,...args); 

}
    
    );
    
    

    
        nmodule.AddMethod('Start',(...args)=>{
            var f=
    

        function(){



        }

    
        
    f.call(nmodule,...args); 

}
    
    );
    
    

    
        

        path='/page/:name'

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

            res.render( page_demoPage.ejs_src,{
                NFramework:miejs
            });
        })(req,res);
    
    

        }

    
    

    
        nmodule.AddServerMethod('demoCrossSideMethod',(...args)=>{
            var f=
    

        function(){
            console.log();
        }

    
        
    f.call(nmodule,...args); 

}
    
    );
    
    

    
        nmodule.AddClientMethod('demoCrossSideMethod2',(...args)=>{
            var f=
    

        function(){
            
        }

    
        
    f.call(nmodule,...args); 

}
    
    );
    
    


                
                