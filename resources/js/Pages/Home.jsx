import { router } from "@inertiajs/react";

const Home = () => {
    return (
        <div className="bg-black text-white h-[100vh] w-full mx-[200px] flex flex-col justify-center items-center gap-y-[100px]">
            <div className="text-white text-[102px] text-center h-[100px] ">
                CRUD LARAVEL
            </div>
            <div className="flex flex-col gap-y-[20px]">
                <span>Muhammad Ilham Isfadhillah</span>
                <span>H1A021066</span>
                <span>UTS PEMRORAMAN INTERNET</span>
            </div>
            <div>
                <button className="bg-[#1677FF] py-[8px] px-[16px] text-white rounded-[6px]"
                onClick={() => router.visit("/reservasi-ruang")}
                >
                    CEK RESERVASI
                </button>
            </div>


        </div>
    );
};

export default Home;
