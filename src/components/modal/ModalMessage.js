import React, { useEffect, useRef } from "react";

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux';
import { setModalMessage } from 'redux/reducers/ModalReducer';
//-------------------------------------------------------

// note : props is get from parent componenet which call this modal

export default function ModalMessage() { // receive props from parent

  const outsideRef = useRef(null)
  const overlayRef = useRef(null)

  // redux store
  const dispatch = useDispatch();
  const { modalMessage } = useSelector((state) => state.ModalReducer)

  const handleModalClose = () => {
    document.body.classList.remove('overflow-hidden'); // prevent body scroll on modal open
    if(outsideRef.current){
    outsideRef.current.classList.add('zoomOut');
    overlayRef.current.classList.add('fadeOut');
    }
   

    setTimeout(() => { // delay close to enable animation working first
      dispatch(setModalMessage(false))
    }, 500)
  }

  /* ---- click outside modal to close modal -----
    Must be set modal open from parent 
    Please inspect Body must add class 'overflow-hidden' to enable click outside
  */
  useEffect(() => {
    if (modalMessage) {

      setTimeout(() => { // must use this to little bit delay click outside. Otherwise modal will immediatelly close when it called

        const checkIfClickedOutside = e => {
          if (outsideRef.current && !outsideRef.current.contains(e.target)) {
            handleModalClose()
            document.body.classList.remove('overflow-hidden');
          }
        }
        document.addEventListener("click", checkIfClickedOutside)
        return () => {
          document.removeEventListener("click", checkIfClickedOutside)
        }
      }, 100)

      setTimeout(() => {
        handleModalClose()
      }, 5000) 
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalMessage])


 


  return (
    <>
      {/* style={{ zIndex: 100, background: 'rgba(0,0,0, 0.1)' }} */}

      <div className="_modal_message  animated" ref={overlayRef}>
        <div className="relative shadow-full  mx-auto z-50 overflow-y-auto  animated fadeInDown min-w-[350px]"
          ref={outsideRef} >

          <i className="icofont-close-circled absolute top-0 right-0 text-3xl text-white cursor-pointer m-2"
            onClick={handleModalClose} />

          {modalMessage.type === 'success' &&
            <div className="_gradient_puple flex flex-row items-center  p-5 rounded-2xl border-2 ">
              <div className="flex items-center bg-green-100 border-2 border-yellow-500 justify-center rounded-full h-10 w-10 flex-shrink-0 rounded-2xl-full">
                <span className="text-green-500">
                <img src="/assets/img/loadcat.gif" className="rounded-full animated fadeIn" alt="avatar" />
                </span>
              </div>
              <div className="alert-content ml-4">
                <div className="alert-title text-lg text-white">
                  {modalMessage.title || 'Transaction Success!'}
                </div>
                <div className="text-sm text-white">
                  <p dangerouslySetInnerHTML={{ __html: modalMessage.message }} />
                </div>
              </div>
            </div>
          }

          {modalMessage.type === 'danger' &&
            <div className="flex flex-row items-center bg-red-600 p-5 rounded-2xl border-4 border-gray-200">
              <div className="flex items-center justify-center h-10 w-10 flex-shrink-0 rounded-2xl-full">
                <span className="text-red-500">
                  <i className="icofont-network-tower text-4xl text-white  animate-ping" />
                </span>
              </div>
              <div className="alert-content ml-4">
                <div className="alert-title text-lg text-white">
                  {modalMessage.title}
                </div>
                <div className="text-sm text-white">
                  <p dangerouslySetInnerHTML={{ __html: modalMessage.message }} />
                </div>
              </div>
            </div>
          }

          {modalMessage.type === 'error' &&
            <div className="flex flex-row items-center bg-red-600 p-5 rounded-2xl border-4 border-gray-200">
              <div className="flex items-center justify-center h-10 w-10 flex-shrink-0 rounded-2xl-full">
                <span className="text-red-500">
                  <i className="icofont-network-tower text-4xl text-white" />
                </span>
              </div>
              <div className="alert-content ml-4">
                <div className="alert-title text-lg text-white">
                  {modalMessage.title || 'Transaction Fail!'}
                </div>
                <div className="text-sm text-white">
                  <p dangerouslySetInnerHTML={{ __html: modalMessage.message }} />
                </div>
              </div>
            </div>
          }

          {modalMessage.type === 'warning' &&
            <div className="flex flex-row items-center bg-yellow-700 p-5 rounded-2xl border-2 ">
              <div className="flex items-center bg-yellow-100 border-2 border-yellow-500 justify-center h-10 w-10 flex-shrink-0 rounded-2xl-full">
                <span className="text-yellow-900">
                  <svg style={{ maxWidth: 40 }} fill="currentColor" viewBox="0 0 20 20" className="h-6 w-6">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
              <div className="alert-content ml-4">
                <div className="alert-title text-lg text-white">
                  {modalMessage.title || 'Warning!'}
                </div>
                <div className="text-sm ">
                  <p className="text-white" dangerouslySetInnerHTML={{ __html: modalMessage.message }} />
                </div>
              </div>
            </div>
          }
          {modalMessage.type === 'info' &&
            <div className="flex flex-row items-center bg-blue-800 p-5 rounded-2xl border-4 border-gray-200">
              <div className="flex items-center bg-blue-100 border-2 border-blue-500 justify-center h-10 w-10 flex-shrink-0 rounded-2xl-full">
                <span className="text-blue-500">
                  <svg style={{ maxWidth: 40 }} fill="currentColor" viewBox="0 0 20 20" className="h-6 w-6">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
              <div className="alert-content ml-4">
                <div className="alert-title text-lg text-white">
                  {modalMessage.title || 'Info!'}
                </div>
                <div className="text-sm text-white">
                  <p dangerouslySetInnerHTML={{ __html: modalMessage.message }} />
                </div>
              </div>
            </div>
          }

          {modalMessage.type === 'flashout' &&
            <div className="flex flex-row items-center _gradient_purple p-5 rounded-2xl border-4 ">
              <div className="flex items-center bg-white rounded-full border-2 border-white justify-center 
              h-14 w-15 flex-shrink-0 rounded-2xl-full">
                <span className="text-blue-500 ">
                  <img src="/assets/img/loadcat.gif" alt="banner" />
                </span>
              </div>
              <div className="alert-content ml-4">
                <div className="alert-title text-lg text-white bold">
                  {modalMessage.title || 'Warning!'}
                </div>
                <div className="text-sm ">
                  <p className="text-white" dangerouslySetInnerHTML={{ __html: modalMessage.message }} />
                </div>
              </div>
            </div>
          }

          {modalMessage.type === 'completed' &&
            <div className="flex flex-row items-center bg-yellow-700 p-5 rounded-2xl border-4 border-gray-200">
              <div className="flex items-center bg-white rounded-full border-2 border-white justify-center 
              h-14 w-15 flex-shrink-0 rounded-2xl-full">
                <span className="text-blue-500 ">
                  <img src="/assets/img/loadcat.gif" alt="banner" />
                </span>
              </div>
              <div className="alert-content ml-4">
                <div className="alert-title text-lg text-white">
                  {modalMessage.title || 'Info!'}
                </div>
                <div className="text-sm text-white">
                  <p dangerouslySetInnerHTML={{ __html: modalMessage.message }} />
                </div>
              </div>
            </div>
          }

        </div>
      </div>


    </>
  );
}

