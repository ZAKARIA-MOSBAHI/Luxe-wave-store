import { useAuth } from "@/context/AuthProvider";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(()=>{
console.log(user);
  },[])
  if (user === null) {
    navigate("/login", { replace: true });
    return null;
  }
  return (
    <div className="w-full">
<h2 className="text-3xl font-bold tracking-tight my-10">Account Details</h2>
<div className="flex flex-col gap-4">
    <div className="grid grid-cols-12 gap-10">
     
    <span className="col-span-3 text-[#222222] font-medium">Name</span>
    <span className="col-span-9 text-[#666666] font-normal">{user.name}</span>

    <span className="col-span-3 text-[#222222] font-medium">Email</span>
    <span className="col-span-9 text-[#666666] font-normal">{user.email}</span>
  
<span className="col-span-3 text-[#222222] font-medium">Phone</span>
    <span className="col-span-9 text-[#666666] font-normal">{user.phone? user.phone : "Not Defined"}</span>

 </div>
</div>
      
    </div>
  );
}

export default Profile;
