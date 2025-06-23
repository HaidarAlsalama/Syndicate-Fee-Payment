import React, { useEffect, useState } from "react";
import InputField from "../../components/InputField/InputField";
import { createAlert } from "../../components/Alert/Alert";
import { api_host } from "../../configs/api_host";
import axios from "axios";
import Spinner from "./../../components/Spinner/Spinner";
import ModalPayment from "../../components/Modals/ModalPayment/ModalPayment";
import ContainerInputs from "./../../components/ContainerInputs/ContainerInputs";
import ActionModal from "../../components/Modals/ActionModal/ActionModal";
import ecash from "./../../assets/images/ecash.png";
import { useLocation, useParams } from "react-router-dom";
export default function Home() {
  const location = useLocation();

  // لتحليل الاستعلام
  const queryParams = new URLSearchParams(location.search);
  const eng = queryParams.get("eng");

  const [loadingData, setLoadingData] = useState(false);
  const [engNumber, setEngNumber] = useState(eng || "");
  const [engName, setEngName] = useState("");
  const [temp, setTemp] = useState("");
  const [engInfo, setEngInfo] = useState({});

  const [onSend, setOnSend] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [openModalDetails, setOpenModalDetails] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await search();
      } catch (err) {}
    };

    if (eng) fetchData();
  }, [eng]);

  useEffect(() => {
    if (loadingData) setLoadingData(false);
  }, [engNumber, engName]);

  const handleSearch = async (e) => {
    e.preventDefault();
    await search();
  };

  function encodeBase64(str) {
    // Encode the string to UTF-8 first
    const utf8String = unescape(encodeURIComponent(str));
    return btoa(utf8String);
  }
  const search = async () => {
    if (engName == 0 || engName == "" || engName == null)
      return createAlert("Warning", "يرجى كتابة الاسم الاول");
    if (engNumber == 0 || engNumber == "" || engNumber == null)
      return createAlert("Warning", "يرجى كتابة الرقم الهندسي");
    if (!isNumeric(engNumber))
      return createAlert("Warning", "يرجى ادخال رقم صالح");
    if (onSend) return;
    setOnSend(true);
    await axios
      .get(`${api_host}/searchEng/${engNumber}/${encodeBase64(engName)}`)
      .then((response) => {
        if (response.status === 200) {
          // createAlert(response.data.type, response.data.message);
          setEngInfo(response.data.data);
          setLoadingData(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        if (error.response.status === 404) {
          setLoadingData(false);
          return createAlert(
            error.response.data.type,
            error.response.data.message
          );
        }
      });
    setOnSend(false);
  };

  function isNumeric(input) {
    // تحقق من إذا كان النص يحتوي على أرقام فقط باستخدام التعبير العادي
    const regex = /^\d+$/;
    return regex.test(input);
  }

  return (
    <div className="p-10">
      <div className="text-center font-medium">
        <h1 className="text-xl dark:text-white">
          دفع الرسوم النقابية للمهندسين المنتسبين
        </h1>
        <h1 className="text-xl dark:text-white">
          حتى عام{" "}
          <span className="text-custom-maincolor dark:text-blue-500 font-bold">
            2024
          </span>
        </h1>
      </div>
      <form onSubmit={handleSearch} className="mt-4 flex gap-4 flex-col">
        <InputField
          title={"المحافظة"}
          id={"mohafazaz"}
          type="select"
          required
          value={["حمص"]}
        />

        <InputField
          title={"الاسم الاول للمهندس"}
          id={"nameNumber"}
          type="text"
          required
          onChange={(e) => setEngName(e.value)}
          value={engName}
        />

        <InputField
          title={"الرقم الهندسي"}
          id={"engNumber"}
          type="number"
          required
          onChange={(e) => setEngNumber(e.value)}
          value={engNumber}
        />

        <InputField
          title={"الرقم المركزي"}
          id={"nameNumber"}
          type="text"
          isDisabled
          onChange={(e) => setTemp(e.value)}
          value={temp}
        />

        {!onSend ? (
          <button className="text-white bg-custom-maincolor hover:bg-custom-maincolor/95 h-10 rounded-sm mt-5">
            بحث
          </button>
        ) : (
          <Spinner />
        )}
      </form>

      {!loadingData ? null : (
        <div className="flex flex-col">
          <hr className="my-5" />
          <h5 className="text-center font-medium text-lg dark:text-white">
            بيانات الزميل المهندس
          </h5>
          <div className="flex flex-col gap-4">
            <InputField
              title={"الاسم الكامل"}
              isDisabled
              value={engInfo?.engineer_info.name}
            />
            <InputField
              title={"تاريخ الانضمام"}
              isDisabled
              value={engInfo?.engineer_info.date_joined}
            />
            <InputField
              title={"عدد السنوات الغير مدفوعة"}
              isDisabled
              value={engInfo?.engineer_info.unpaid_years}
            />
          </div>
          {engInfo.missing_years.length > 0 ? (
            <div className="mt-4">
              <InputField
                title={"المبلغ الإجمالي"}
                isDisabled
                value={`${engInfo?.engineer_info.total_unpaid_money} ل.س`}
              />
              <button
                className="text-white bg-custom-maincolor h-10 w-full rounded-sm mt-5 hover:bg-custom-maincolor/95"
                onClick={() => setOpenModalDetails(true)}
              >
                تفاصيل السنوات الغير مدفوعة
              </button>
            </div>
          ) : (
            <>
              <hr className="my-5" />
              <h5 className="text-center font-medium text-lg dark:text-white">
                لا يوجد رسوم مترتبة
              </h5>
            </>
          )}
          <button
            className="flex items-center justify-center text-white bg-green-600 h-10 rounded-sm mt-5 hover:bg-green-600/95 disabled:bg-gray-400"
            disabled={
              engInfo?.engineer_info.total_unpaid_money == 0 ? true : false
            }
            onClick={() => setOpenModal(true)}
          >
            الدفع عبر
            <img src={ecash} alt="" className="w-28" />
          </button>
        </div>
      )}
      <ModalPayment
        open={openModal}
        close={setOpenModal}
        engNumber={engNumber}
      />

      <ActionModal
        open={openModalDetails}
        title={"تفاصيل السنوات الغير مدفوعة "}
        close={setOpenModalDetails}
      >
        <table className="w-full text-sm text-right text-gray-500 dark:text-gray-400 col-span-2">
          <thead className="font-bold text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                السنة
              </th>
              <th scope="col" className="px-6 py-3">
                المبلغ
              </th>
            </tr>
          </thead>
          <tbody>
            {engInfo.missing_years &&
              engInfo?.missing_years.map((item, index) => (
                <tr
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  key={index}
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.year}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.money}
                    {" ل.س"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </ActionModal>
    </div>
  );
}
