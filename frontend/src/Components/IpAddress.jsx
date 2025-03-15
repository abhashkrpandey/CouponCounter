export default function IpAddress({ ipaddress, sessionId, coupon }) {
    return (
        <div className="bg-amber-400 flex flex-col w-[21rem] h-[73px] text-white text-[16px] font-bold rounded-[2px]">
            <div>
                CouponId:{coupon}
            </div>
            <div>
                IpAddress:{ipaddress}
            </div>
            <div>
                Session:{sessionId}
            </div>
        </div>
    )
}