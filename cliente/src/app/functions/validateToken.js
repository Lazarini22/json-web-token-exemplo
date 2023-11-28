    import { decode } from "jsonwebtoken";

    const validateToken = async (token)=>{
        try{
            const isTokenValidate = decode(token)
            console.log(isTokenValidate)
            if(isTokenValidate){
            return token= true
        }
    }catch {
        return false
    }
}
export {validateToken};