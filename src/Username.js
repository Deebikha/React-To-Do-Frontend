
export const handleUser=(e,setusername)=>{
let value=e.target.value;
value=value.replace(/[^A-Z0-9]/g,"");
value=value.slice(0,6);
setusername(value);
}