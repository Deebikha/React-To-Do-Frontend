export const handlePhoneno=(e,setphoneno,setphoneerror)=>{
let value=e.target.value;
value=value.replace(/\D/g,"");
value=value.slice(0,10);
setphoneno(value);
setphoneerror(value.length!=10);
}