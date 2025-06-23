import React, { useEffect, useState } from "react";
import ActionModal from "../ActionModal/ActionModal";
import { api_host } from "../../../configs/api_host";
import axios from "axios";
import Spinner from "../../Spinner/Spinner";
import ecash from './../../../assets/images/ecashBlack.png'
export default function ModalPayment({ open, close, engNumber = 0 }) {
  const [paymentInfo, setPaymentInfo] = useState({});
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    if (open && engNumber != 0) {
      axios
        .post(`${api_host}/generate-payment/${engNumber}`, { nemoo: "nemoo" })
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            setPaymentInfo(response.data.data);
            setIsLoad(true);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [engNumber, open]);

  useEffect(() => {
    if (!open) {
      setPaymentInfo({});
    }
  }, [open]);

  return (
    <ActionModal
      open={open}
      title={<img src={ecash} alt="" className="w-28" />}
      close={close}
    >
      {paymentInfo.payment && isLoad ? (
        <>
          <div className="flex border pb-1 border-r-0 border-l-0 border-t-0 w-full max-w-72 mx-auto gap-4  items-center flex-col ">
            <span className="text-lg font-medium text-gray-900 dark:text-gray-300">
              الرقم الهندسي :
            </span>
            <span className="font-medium text-3xl text-gray-900 dark:text-gray-300">
              {paymentInfo?.payment.engineer_id}
            </span>
          </div>

          <div className="flex border pb-1 border-r-0 border-l-0 border-t-0 w-full max-w-72 mx-auto gap-4  items-center flex-col ">
            <span className="text-lg font-medium text-gray-900 dark:text-gray-300">
              رقم المعاملة:
            </span>
            <span className="font-medium text-3xl text-gray-900 dark:text-gray-300">
              {paymentInfo?.payment.orderKey}
            </span>
          </div>

          <div className="flex border pb-1 border-r-0 border-l-0 border-t-0 w-full max-w-72 mx-auto gap-4  items-center flex-col ">
            <span className="text-lg font-medium text-gray-900 dark:text-gray-300">
              المبلغ:
            </span>
            <span className="font-medium text-3xl text-gray-900 dark:text-gray-300">
              {paymentInfo?.payment.amount} <span>ل.س</span>
            </span>
          </div>

          <a
            className="text-white bg-custom-maincolor hover:bg-custom-maincolor/95 h-10 rounded-sm mt-5 flex justify-center items-center w-44 mx-auto"
            href={paymentInfo?.checkoutUrl}
          >
            ادفع
          </a>
        </>
      ) : (
        <Spinner page />
      )}
    </ActionModal>
  );
}
