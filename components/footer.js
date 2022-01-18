import Image from "./image"
import { AiOutlineInstagram } from "@react-icons/all-files/ai/AiOutlineInstagram";
import { AiOutlineLinkedin } from "@react-icons/all-files/ai/AiOutlineLinkedin";
import { AiOutlineFacebook } from "@react-icons/all-files/ai/AiOutlineFacebook";
import { AiTwotonePhone } from "@react-icons/all-files/ai/AiTwotonePhone";
import { FaFax } from "@react-icons/all-files/fa/FaFax";

export default function Footer({ data }) {
    return (
        <footer className="grid md:grid-cols-2" >
            <div className="w-full py-12 px-5 lg:px-12 bg-primary4 grid lg:grid-cols-2">
                <div>
                    <Image className="w-16 aspect-square relative mb-4" asset={data.logo.asset} sizes={[500]} />
                    <p className="text-white mb-6 lg:col-start-1">
                        2021
                        <span className="font-bold"> Super Choice.</span>
                        <br />
                        All rights reserved
                    </p>
                </div>


                <div className="lg:col-start-2 lg:row-start-1">
                    <p className="font-bold text-white uppercase mb-2">
                        Links
                    </p>

                    <ul className="text-white w-full  flex gap-x-4 gap-y-2 flex-wrap">
                        {data.footerLinks.map((link, index) => {
                            return <li key={index}>{link}</li>
                        })}
                    </ul>
                </div>

            </div>

            <div className="w-full py-12 px-5 md:pl-12 bg-primary5 grid lg:grid-cols-2">

                <div>
                    <p className="font-bold text-white uppercase mb-4">
                        Contact
                    </p>

                    <p className="text-white mb-2">
                        {data.contact.addressLine1} 
                    </p>

                    <p className="text-white mb-2">
                    {data.contact.postalCode} {data.contact.city} 
                    </p>

                    <p className="text-white mb-2">
                    {data.contact.country}
                    </p>

                </div>

                <div>
                    <p className="font-bold text-white uppercase mb-4 invisible">
                        Contact
                    </p>

                    <div className="flex gap-x-4 mb-2">
                        <AiOutlineInstagram className="text-primary2" size={24} />
                        <AiOutlineLinkedin className="text-primary2" size={24} />
                        <AiOutlineFacebook className="text-primary2" size={24} />
                    </div>

                    <p className="text-white mb-2  flex items-center">
                        <AiTwotonePhone size={20} className="text-primary2 w-5 inline-block mr-3" />
                        {data.contact.phone}
                    </p>

                    <p className="text-white flex items-center">
                        <FaFax size={20} className="text-primary2 w-5 inline-block mr-3" />
                        {data.contact.fax}
                    </p>
                </div>

            </div>
        </footer>
    )
}
