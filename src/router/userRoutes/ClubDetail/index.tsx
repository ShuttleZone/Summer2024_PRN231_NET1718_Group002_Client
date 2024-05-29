import {useParams} from "react-router-dom";
import Carousel from "./components/Carousel";
import {useGetClubDetailQuery} from "@/store/services/clubs/club.api";
import {FaStar} from "react-icons/fa";
import {CiShare2} from "react-icons/ci";
import {CiLocationOn} from "react-icons/ci";
import {FiPhoneCall} from "react-icons/fi";

const mockImages: string[] = [
    "https://us.123rf.com/450wm/anankkml/anankkml2204/anankkml220400024/184341315-shuttlecock-on-green-badminton-playing-court-with-player-in-background.jpg?ver=6",
    "https://recreation.uic.edu/wp-content/uploads/sites/377/2022/01/F2200046_REC_Badminton-9205-1-1090x727.jpg",
    "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1440,w_720,f_auto,q_auto/46317/830728_977684.jpg",
    "https://muic.mahidol.ac.th/eng/wp-content/uploads/2023/04/02-Badminton-Clubs-Weekly-Practice-770x400.jpg",
    "https://blog.khelomore.com/wp-content/uploads/2022/02/MC44MjUxMzYwMCAxNDY4MjI1Njg3-1024x683.jpeg",
    "https://blog.khelomore.com/wp-content/uploads/2022/02/MC44MjUxMzYwMCAxNDY4MjI1Njg3-1024x683.jpeg",
];

function ClubDetail() {
    const {clubId} = useParams();
    const {data: clubDetail, isError} = useGetClubDetailQuery(clubId);

    if (isError || !clubDetail) {
        return <div>Error</div>;
    }

    return (
        <div>
            <Carousel
                images={
                    clubDetail.clubImages.map((img) => img.imageUrl) ||
                    mockImages
                }
            />
            <div className="w-3/4 m-auto py-4">
                <div className="flex justify-between items-end border border-black/10 rounded p-4">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-[2rem] font-bold">
                            {clubDetail.clubName}
                        </h1>
                        <div className="flex items-center gap-4 text-sm opacity-60">
                            <div className="flex items-center gap-1">
                                <CiLocationOn />
                                <span>{clubDetail.clubAddress}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <FiPhoneCall />
                                <span>{clubDetail.clubPhone}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center gap-6">
                        <button className="flex justify-between items-center gap-2 border border-black/10 rounded px-2 py-1">
                            <CiShare2 />
                            <span>Share</span>
                        </button>
                        <div className="flex gap-4 items-center">
                            <span className="rounded-full p-2 bg-green-600 text-white text-xl font-semibold">
                                4.0
                            </span>
                            <div>
                                <ul className="flex">
                                    <li>
                                        <FaStar color="yellow" />
                                    </li>
                                    <li>
                                        <FaStar color="yellow" />
                                    </li>
                                    <li>
                                        <FaStar color="yellow" />
                                    </li>
                                    <li>
                                        <FaStar color="yellow" />
                                    </li>
                                </ul>
                                <span>15 Reviews</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClubDetail;
