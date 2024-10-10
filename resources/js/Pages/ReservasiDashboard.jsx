import { XOutlined } from "@ant-design/icons";
import { router, usePage } from "@inertiajs/react";
import { Modal, Table } from "antd";
import { useState } from "react";

const ReservasiDashboard = () => {
    const { props } = usePage();
    const { listReservasi } = props;
    console.log(listReservasi);
    const [id,setId] = useState(null);
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [formData, setFormData] = useState({
        pembooking: "",
        ruangan: "",
        waktu: "",
    });
    const column = [
        {
            title: "No.",
            render: (_, val, index) => {
                return (
                    <span className="flex justify-center items-center">
                        {index + 1}
                    </span>
                );
            },
        },
        { title: "Ruangan", dataIndex: "ruang" },
        { title: "Pembooking", dataIndex: "pembooking" },
        {
            title: "Waktu",
            dataIndex: "pukul",
            render: (text, val, index) => {
                return text > 12 ? (
                    <span>{text} PM</span>
                ) : (
                    <span>{text} AM</span>
                );
            },
        },
        {
            title: "Actions",
            render: (data, val, index) => {
                return (
                    <div className="flex gap-x-[20px]">
                        <button
                            className="bg-yellow-300 py-[8px] px-[16px] text-white rounded-[6px] "
                            onClick={() => {
                              handleEditData(data)
                            }}
                        >
                            Edit
                        </button>
                        <button className="bg-red-500 py-[8px] px-[16px] text-white rounded-[6px]"
                          onClick={() => {
                            router.delete(`/reservasi-ruang/delete/${data.id}`)
                          }}
                        >

                            Delete
                        </button>
                    </div>
                );
            },
        },
    ];

    const handleInputChange = (e) => {
        setFormData((oldForm) => ({
            ...oldForm,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmitReservasi = (e) => {
        e.preventDefault();
        router.post("/reservasi-ruang/create", formData);
        setOpen(false);
    };

    const handleEditData = (data) => {
      console.log("isi data", data)
      setId(data.id)
      setFormData({
        pembooking : data.pembooking,
        ruangan : data.ruang,
        waktu : data.pukul
      })
      setOpenEdit(true);
    }

    const handleEditSubmit = (e) => {
      e.preventDefault();
      router.patch(`/reservasi-ruang/update/${id}`, formData)
      setOpenEdit(false);
    }

    console.log(formData);

    return (
        <div className="h-[100vh]">
            <div className="h-[100px] w-full text-center text-[64px] font-[600]">
                Dashboard Reservasi Ruangan
            </div>
            <div className="flex justify-between mx-[20px]">
            <div
                className="bg-red-500 py-[8px] px-[16px] text-white rounded-[6px] max-w-max ml-[20px] cursor-pointer"
                onClick={() => router.get("/")}
            >
                Kembali ke Home
            </div>
            <div
                className="bg-[#1677FF] py-[8px] px-[16px] text-white rounded-[6px] max-w-max ml-[20px] cursor-pointer"
                onClick={() => setOpen(true)}
            >
                Create Reservasi Ruangan
            </div>
            </div>
            <div className="mt-[20px] flex justify-center items-center">
                <table>
                    <Table
                        columns={column}
                        dataSource={listReservasi}
                        bordered
                        pagination={{ position: ["bottomCenter"], pageSize: 5 }}
                    />
                </table>
            </div>
            {open && (
                <Modal
                    open
                    centered
                    modalRender={() => {
                        return (
                            <div className="pointer-events-auto bg-white w-[500px] h-[400px] p-[16px] rounded-[6px] px-[20px]">
                                <div className="flex justify-between items-center">
                                    <div className="text-[22px] font-[600]">
                                        Buat Reservasi Ruangan
                                    </div>
                                    <XOutlined onClick={() => setOpen(false)} />
                                </div>
                                <form
                                    className="flex flex-col gap-y-[20px]"
                                    onSubmit={handleSubmitReservasi}
                                >
                                    <div className="flex flex-col gap-y-[5px]">
                                        <label
                                            htmlFor="pembooking"
                                            className="text-[16px] font-[500]"
                                        >
                                            Pembooking :{" "}
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full rounded-[6px]"
                                            name="pembooking"
                                            onChange={handleInputChange}
                                            placeholder="Namamu Pembooking"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-[5px]">
                                        <label
                                            htmlFor="ruangan"
                                            className="text-[16px] font-[500]"
                                        >
                                            Ruangan :{" "}
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full rounded-[6px]"
                                            name="ruangan"
                                            onChange={handleInputChange}
                                            placeholder="Nama Ruangan"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-[5px]">
                                        <label
                                            htmlFor="waktu"
                                            className="text-[16px] font-[500]"
                                        >
                                            Waktu :{" "}
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full rounded-[6px]"
                                            name="waktu"
                                            onChange={handleInputChange}
                                            placeholder="Jam (1-24)"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-[#1677FF] text-white p-[10px] rounded-[6px]"
                                    >
                                        Create
                                    </button>
                                </form>
                            </div>
                        );
                    }}
                />
            )}
            {openEdit && (
                <Modal
                    open
                    centered
                    modalRender={() => {
                        return (
                            <div className="pointer-events-auto bg-white w-[500px] h-[400px] p-[16px] rounded-[6px] px-[20px]">
                                <div className="flex justify-between items-center">
                                    <div className="text-[22px] font-[600]">
                                        Edit Reservasi Ruangan
                                    </div>
                                    <XOutlined onClick={() => setOpenEdit(false)} />
                                </div>
                                <form
                                    className="flex flex-col gap-y-[20px]"
                                    onSubmit={handleEditSubmit}
                                >
                                    <div className="flex flex-col gap-y-[5px]">
                                        <label
                                            htmlFor="pembooking"
                                            className="text-[16px] font-[500]"
                                        >
                                            Pembooking :{" "}
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full rounded-[6px]"
                                            name="pembooking"
                                            onChange={handleInputChange}
                                            placeholder="Namamu Pembooking"
                                            value={formData.pembooking}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-[5px]">
                                        <label
                                            htmlFor="ruangan"
                                            className="text-[16px] font-[500]"
                                        >
                                            Ruangan :{" "}
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full rounded-[6px]"
                                            name="ruangan"
                                            onChange={handleInputChange}
                                            placeholder="Nama Ruangan"
                                            value={formData.ruangan}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-[5px]">
                                        <label
                                            htmlFor="waktu"
                                            className="text-[16px] font-[500]"

                                        >
                                            Waktu :{" "}
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full rounded-[6px]"
                                            name="waktu"
                                            onChange={handleInputChange}
                                            placeholder="Jam (1-24)"
                                            value={formData.waktu}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-[#1677FF] text-white p-[10px] rounded-[6px]"
                                    >
                                        Edit Data
                                    </button>
                                </form>
                            </div>
                        );
                    }}
                />
            )}
        </div>
    );
};

export default ReservasiDashboard;
