import React, { useEffect, useRef } from "react";

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux';
import { setModalConfirmationProcess } from 'redux/reducers/ModalReducer';
//-------------------------------------------------------

export default function ModalProcess() { // receive props from parent

    // redux store
    const dispatch = useDispatch();
    // const { modalProcess } = useSelector((state) => state.ModalReducer)
    const { crypto } = useSelector((state) => state.GeneralReducer) 
    const { confirmAllowance, confirmTransaction } = useSelector((state) => state.CryptoReducer) 

    return (
        <>

            <div className="_modal" style={{ zIndex: 100 }}>
                <div className="border-white border-2 shadow-2xl bg-white  mx-auto rounded-3xl z-50 overflow-y-auto w-96 animated zoomIn">
                    <div className="modal-header py-3 text-left px-6 bg-gray-600">
                        <div className="flex justify-between items-center">
                            <h4 className="text-lg font-semibold text-white">
                                Please wait....
                            </h4>

                        </div>
                    </div>

                    {/* <div className="flex justify-center">
                        <img src="/assets/img/distribution.gif" alt="loader" className="mt-2" />
                    </div> */}
                    <div className="flex justify-center py-6 bg-white">
                    {confirmTransaction ?
                        <img src="/assets/img/distribution.gif" alt="loader" width={100}/> :
                        <img src="/assets/img/loader.gif" alt="loader" /> }
                    </div>
                    <div className="modal-content py-4 px-6  text-center bg-gray-200">
                        <p className="text-gray-700 text-sm mb-2 font-bold"> WAITING METAMASK POPUP ACTION</p>
                        <div className="flex centered">
                        <img src="/assets/img/metamask.gif" className="rounded-full" alt="metamask" width={80} height={80} />
                        </div>
                       {confirmAllowance ?
                        <p className="text-lg font-Poppins font-bold text-red-600 animate-pulse flex centered"> <i className="icofont-arrow-right text-3xl "></i> Confirm {crypto} Allowance</p>
                         :
                         <p className="text-lg font-Poppins font-bold text-gray-800 flex centered"> <i className="icofont-arrow-right text-3xl"></i> Confirm {crypto} Allowance</p>
                       }
                        {confirmTransaction ?
                        <p className="text-lg font-Poppins font-bold text-red-600 animate-pulse flex centered"> <i className="icofont-arrow-right text-3xl"></i> Confirm Transaction</p>
                         :
                         <p className="text-lg font-Poppins font-bold text-gray-800 flex centered"> <i className="icofont-arrow-right text-3xl"></i> Confirm Transaction</p>
                        }
                        <p className="text-gray-500"> Please wait... </p>
                        <p className="text-gray-500"> It may takes some minutes </p>

                    </div>
                </div>
            </div>


        </>
    );
}

