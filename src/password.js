export const handlepassword=(e,setpass,setpasserror)=>{
let value=e.target.value;
value=value.slice(0,10);
setpass(value);
const pattern= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{10}$/;
setpasserror(!pattern.test(value));
}