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
                            Tham gia cộng đồng thể thao năng động của chúng tôi
                            và phát triển cùng chúng tôi.
                        </h2>
                        <p className="opacity-50">
                            Đăng ký ngay để nhận thông tin mới nhất về các sự
                            kiện, bài viết, khóa học và nhiều hơn nữa.
                        </p>
                        <ButtonWithIcon
                            icon={<BsPersonPlus size={20} />}
                            text="Đăng ký ngay"
                            className="hover:bg-white hover:text-primary"
                        />
                    </div>
                    <Separator className="opacity-30" />
                    <div className="py-6 grid grid-cols-5">
                        <div className="col-span-1">
                            <h3 className="text-lg font-semibold">Liên hệ</h3>
                            <ul className="flex flex-col gap-3 mt-4 text-sm">
                                <li>
                                    <p className="opacity-50">
                                        Chăm sóc khách hàng miễn phí
                                    </p>
                                    <p className="font-semibold">
                                        1800-123-4567
                                    </p>
                                </li>
                                <li>
                                    <p className="opacity-50">
                                        Hỗ trợ trực tiếp
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
                                Một số đường dẫn
                            </h3>
                            <ul className="flex flex-col gap-3 mt-4 text-sm">
                                <li className="opacity-50">
                                    <Link to="">Về chúng tôi</Link>
                                </li>
                                <li className="opacity-50">
                                    <Link to="">Dịch vụ</Link>
                                </li>
                                <li className="opacity-50">
                                    <Link to="">Sự kiện</Link>
                                </li>
                                <li className="opacity-50">
                                    <Link to="">Bài viết</Link>
                                </li>
                                <li className="opacity-50">
                                    <Link to="">Liên hệ</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-span-1">
                            <h3 className="text-lg font-semibold">Hỗ trợ</h3>
                            <ul className="flex flex-col gap-3 mt-4 text-sm">
                                <li className="opacity-50">
                                    <Link to="">Hỏi đáp</Link>
                                </li>
                                <li className="opacity-50">
                                    <Link to="">Hướng dẫn</Link>
                                </li>
                                <li className="opacity-50">
                                    <Link to="">Chính sách bảo mật</Link>
                                </li>
                                <li className="opacity-50">
                                    <Link to="">Điều khoản sử dụng</Link>
                                </li>
                                <li className="opacity-50">
                                    <Link to="">Giá cả</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-span-1">
                            <h3 className="text-lg font-semibold">
                                Các đường dẫn khác
                            </h3>
                            <ul className="flex flex-col gap-3 mt-4 text-sm">
                                <li className="opacity-50">
                                    <Link to="">Huấn luyện viên</Link>
                                </li>
                                <li className="opacity-50">
                                    <Link to="">Đăng ký sân</Link>
                                </li>
                                <li className="opacity-50">
                                    <Link to="">Đăng ký sự kiện</Link>
                                </li>
                                <li className="opacity-50">
                                    <Link to="">Tuyển dụng</Link>
                                </li>
                                <li className="opacity-50">
                                    <Link to="">Đối tác</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-span-1">
                            <h3 className="text-lg font-semibold">Quốc gia</h3>
                            <ul className="flex flex-col gap-3 mt-4 text-sm">
                                <li className="opacity-50">
                                    <Link to="">Việt Nam</Link>
                                </li>
                                <li className="opacity-50">
                                    <Link to="">USA</Link>
                                </li>
                                <li className="opacity-50">
                                    <Link to="">Nhật Bản</Link>
                                </li>
                                <li className="opacity-50">
                                    <Link to="">Hàn Quốc</Link>
                                </li>
                                <li className="opacity-50">
                                    <Link to="">Singapore</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <Separator className="opacity-30" />
            <section className="py-2">
                <p className="text-center">
                    &copy; 2024 ShuttleZone - All rights reserved
                </p>
            </section>
        </footer>
    );
}

export default Footer;
