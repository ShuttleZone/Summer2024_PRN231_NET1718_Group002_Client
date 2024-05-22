import ButtonWithIcon from "@/components/ui/buttonWithIcon";
import {Separator} from "@/components/ui/separator";
import {BsPersonPlus} from "react-icons/bs";
import {Link} from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-primary text-white">
            <section className="flex justify-center">
                <div className="w-3/4">
                    <div className="flex flex-col justify-center items-center gap-2 py-8">
                        <h2 className="text-3xl font-bold">
                            We Welcome Your Passion And Your Expertise
                        </h2>
                        <p className="opacity-50">
                            Join our empowering sport community today and grow
                            with us.
                        </p>
                        <ButtonWithIcon
                            icon={<BsPersonPlus size={20} />}
                            text="Join With Us"
                            className="hover:bg-white hover:text-primary"
                        />
                    </div>
                    <Separator className="opacity-30" />
                    <div className="py-6 grid grid-cols-5">
                        <div className="col-span-1">
                            <h3 className="text-lg font-semibold">
                                Contact Us
                            </h3>
                            <ul className="flex flex-col gap-3 mt-4 text-sm">
                                <li>
                                    <p className="opacity-50">
                                        Toll free Customer Care
                                    </p>
                                    <p className="font-semibold">
                                        1800-123-4567
                                    </p>
                                </li>
                                <li>
                                    <p className="opacity-50">
                                        Need Live Support
                                    </p>
                                    <p className="font-semibold">
                                        1800-123-4567
                                    </p>
                                </li>
                                <li>some icons</li>
                            </ul>
                        </div>
                        <div className="col-span-1">
                            <h3 className="text-lg font-semibold">
                                Quick Links
                            </h3>
                            <ul className="flex flex-col gap-3 mt-4 text-sm">
                                <li className="opacity-50">
                                    <Link to="">About us</Link>
                                </li>
                                <li className="opacity-50">
                                    <Link to="">Services</Link>
                                </li>
                                <li className="opacity-50">
                                    <Link to="">Events</Link>
                                </li>
                                <li className="opacity-50">
                                    <Link to="">Blogs</Link>
                                </li>
                                <li className="opacity-50">
                                    <Link to="">Contact us</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-span-1">
                            <h3 className="text-lg font-semibold">Support</h3>
                            <ul className="flex flex-col gap-3 mt-4 text-sm">
                                <li className="opacity-50">
                                    <Link to="">Contact us</Link>
                                </li>
                                <li className="opacity-50">
                                    <Link to="">Faq</Link>
                                </li>
                                <li className="opacity-50">
                                    <Link to="">Privacy Policy</Link>
                                </li>
                                <li className="opacity-50">
                                    <Link to="">Terms &amp; Conditions</Link>
                                </li>
                                <li className="opacity-50">
                                    <Link to="">Pricing</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-span-1">
                            <h3 className="text-lg font-semibold">
                                Other Links
                            </h3>
                            <ul className="flex flex-col gap-3 mt-4 text-sm">
                                <li className="opacity-50">
                                    <Link to="">Coaches</Link>
                                </li>
                                <li className="opacity-50">
                                    <Link to="">Sports Venue</Link>
                                </li>
                                <li className="opacity-50">
                                    <Link to="">Join As Coach</Link>
                                </li>
                                <li className="opacity-50">
                                    <Link to="">Add Venue</Link>
                                </li>
                                <li className="opacity-50">
                                    <Link to="">My Account</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-span-1">
                            <h3 className="text-lg font-semibold">
                                Our Locations
                            </h3>
                            <ul className="flex flex-col gap-3 mt-4 text-sm">
                                <li className="opacity-50">
                                    <Link to="">Germany</Link>
                                </li>
                                <li className="opacity-50">
                                    <Link to="">Russia</Link>
                                </li>
                                <li className="opacity-50">
                                    <Link to="">France</Link>
                                </li>
                                <li className="opacity-50">
                                    <Link to="">UK</Link>
                                </li>
                                <li className="opacity-50">
                                    <Link to="">Colombia</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <Separator className="opacity-30" />
            <section className="py-2">
                <p className="text-center">
                    &copy; 2021 ShuttleZone - All rights reserved
                </p>
            </section>
        </footer>
    );
}

export default Footer;
