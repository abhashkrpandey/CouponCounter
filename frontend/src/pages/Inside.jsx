import axios from "axios"
import { useEffect, useState } from "react";
import Coupon from "../Components/Coupon";
import IpAddress from "../Components/IpAddress";

export default function Inside() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [totalCoupon, setTotalCoupon] = useState([]);
    const [totalIpAddress, setIpAddress] = useState([]);
    useEffect(() => {
        async function AdminChecker() {
            const response = await axios.get(import.meta.env.VITE_BACKEND_URL+"/inside");
            setIsAdmin(response.data.validation);
        }
        AdminChecker();
    }, []);
    useEffect(() => {
        async function totalCouponId() {
            const response = await axios.get(import.meta.env.VITE_BACKEND_URL+"/totalcoupon");
            setTotalCoupon(response.data.coupons);
        }
        totalCouponId();
    }, []);
    async function addCoupon() {
        const response = await axios.post(import.meta.env.VITE_BACKEND_URL+"/add");
        if (response.data.added == true) {
            const coupon = response.data.coupon;
            setTotalCoupon((prev) =>
                [
                    ...prev,
                    { "_id": coupon._id, "couponNumber": coupon.couponNumber, "isValid": coupon.isValid }
                ]);
        }
    }
    async function seeIp() {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL+"/totalip");
        setIpAddress(response.data.ipaddress);
    }
    return (
        <div>
            {isAdmin ? (
                <div className="flex flex-row gap-2 ">
                    <div className="text-white text-[16px] font-bold bg-amber-600 h-[40px]">
                        This is admin panel
                    </div>
                    <div className="flex flex-col ">
                        <button className="bg-amber-600 w-[18rem] h-[40px] text-white text-[16px] font-bold rounded-[2px]" onClick={addCoupon}>Add Coupon</button>
                    </div>
                    <div className="flex flex-col gap-1">
                        {
                            totalCoupon.map((ele) => {
                                return (
                                    <Coupon key={ele._id} id={ele._id} number={ele.couponNumber} valid={ele.isValid}></Coupon>
                                )
                            })
                        }
                    </div>
                    <div className="flex flex-col ">
                        <button className="bg-amber-600 w-[18rem] h-[40px] text-white text-[16px] font-bold rounded-[2px]" onClick={seeIp}>See all the ip Address</button>
                    </div>
                    <div className="flex flex-col gap-1">
                        {
                            totalIpAddress.map((ele) => {
                                return (
                                    <IpAddress key={ele._id} ipaddress={ele.ipnumber} sessionId={ele.sessionid} coupon={ele.couponid}></IpAddress>
                                )
                            })
                        }
                    </div>
                </div>
            ) :
                (
                    <div>
                        You are not admin
                    </div>
                )}
        </div>
    )
}