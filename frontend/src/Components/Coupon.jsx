import axios from "axios";
import { useState } from "react"

export default function Coupon({ id, number, valid }) {
    const [isDisabled, setDisabled] = useState(!valid);
    async function enablefunc()
    {
        const response=await axios.post(import.meta.env.VITE_BACKEND_URL+"/changeCoupon",
            {
                "_id":id,
                "change":"Enable"
            }
        )
        if(response.data.success==true)
        {
            setDisabled(false);
            valid=true;
        }
    }
    async function disablefunc()
    {
        const response=await axios.post(import.meta.env.VITE_BACKEND_URL+"/changeCoupon",
            {
                "_id":id,
                "change":"Disable"
            }
        )
        if(response.data.success==true)
        {
            setDisabled(true);
            valid=false
        }
    }
    return (
        <div className="bg-amber-400 flex flex-col w-[19rem] h-[73px] text-white text-[16px] font-bold rounded-[2px]">
            <div>
                CouponId:{id}
            </div>
            <div>
                CouponNumber:{number}
            </div>
            <div className="flex flex-row justify-between">
                Valid:{(isDisabled==false) ? "Yes" : "No"}
                {isDisabled ? (<button className="bg-green-600" onClick={enablefunc}>Enable</button>) : (<button className="bg-red-600" onClick={disablefunc}>Disable</button>)}
            </div>
        </div>
    )
}