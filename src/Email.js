export const handleEmail=(e,setemail,setemailerror)=>{
    const value=e.target.value;
    setemail(value);
    const pattern= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    setemailerror((!pattern.test(value)));
}