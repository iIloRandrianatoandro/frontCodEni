import { createStyles,getStylesRef } from "@mantine/core";

export const useStyle = createStyles((theme)=>({
    root:{
        [theme.fn.smallerThan('lg')]: {
            flexDirection:"column",
            alignItems:"flex-start"
        },
     },
        containerAppliantProfil:{
            width:320,
            height:'100%',
            [theme.fn.smallerThan('lg')]: {
                width:"100%",
                justifyContent:"flex-start"
               
            },
        },
        appliantProfil:{
            ref:getStylesRef('appliantProfil'),
        },
        ContainerDetail:{
            width:"calc(100% - 340px)",
            [theme.fn.smallerThan('lg')]: {
                width:"100%"
            },
        },
       
    }
))
   
   
