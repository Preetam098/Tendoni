import { CircularProgress } from "@mui/material";
const Loading = () =>{
    return(
        <div  style={{height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <CircularProgress />
        </div>
        
    )
}

export default Loading;