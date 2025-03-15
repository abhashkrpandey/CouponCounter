import { Link } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

export default function Home() {
    async function claimfunc() {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL+"/claimcoupon");
        if (response.data.success == true) {
            Swal.fire(
                {
                    title:"Coupon claimed",
                    icon:"success",
                    html:
                    `<div>CouponNumber:${response.data.coupon.couponNumber}</div><div>CouponCode:${response.data.coupon._id}</div>`
                }
            )
        }
        else if(response.data.success == false)
        {
            Swal.fire(
                {
                    title:"No Coupon Available",
                    icon:"error",
                }
            )
        }
        else
        {
            Swal.fire(
                {
                    title:"Not Allowed Come after 1hr",
                    icon:"warning",
                }
            )
        }
    }
    return (
        <div>
            <div className="flex flex-row justify-end text-lg font-sans">
                <Link to="/login" className="rounded-full p-2 hover:bg-white hover:text-black text-white">Login as Admin</Link>
            </div>
            <div className=" lg:w-128 sm:w-80  lg:text-5xl sm:text-2xl font-bold ml-5 h-56 leading-relaxer text-white">
            Coupon Website
            </div>
            <div className="flex flex-row justify-center">
                <button className="bg-amber-600  w-[18rem] h-[40px] text-white text-[16px] font-bold rounded-[2px]" onClick={claimfunc}>Claim a coupon</button>
            </div>
        </div>
    )
}