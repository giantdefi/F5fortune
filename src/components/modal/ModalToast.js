import React, { useEffect, useRef } from "react";

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux';
import { setModalToast } from 'redux/reducers/ModalReducer';
//-------------------------------------------------------

// note : props is get from parent componenet which call this modal

export default function ModalMessage() { // receive props from parent

  const outsideRef = useRef(null)
  const overlayRef = useRef(null)

  // redux store
  const dispatch = useDispatch();
  const { modalToast } = useSelector((state) => state.ModalReducer)

  const handleModalClose = () => {
    document.body.classList.remove('overflow-hidden'); // prevent body scroll on modal open
    if(outsideRef.current){
    outsideRef.current.classList.add('zoomOut');
   // overlayRef.current.classList.add('fadeOut');
    }
   

    setTimeout(() => { // delay close to enable animation working first
      dispatch(setModalToast(false))
    }, 500)
  }

  /* ---- click outside modal to close modal -----
    Must be set modal open from parent 
    Please inspect Body must add class 'overflow-hidden' to enable click outside
  */
  useEffect(() => {
    if (modalToast) {

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

    //   setTimeout(() => {
    //     handleModalClose()
    //   }, 5000) 
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalToast])


 

  return (
    <>
        <div className="fixed w-full inset-0  overflow-hidden flex justify-center items-center animated" style={{ zIndex: 100 }} ref={overlayRef}>
            <div className="bg-slate-100 relative border-2 shadow-2xl   mx-auto rounded-xl z-50 overflow-y-auto w-96 animated zoomInDown" ref={outsideRef}>
                <i className="icofont-close-circled absolute top-1 right-2 text-3xl text-orange-400 cursor-pointer"
                  onClick={()=>handleModalClose()}  />

                <div className="modal-content py-4 px-4">

                  

                    <div className="flex centered">
                    {modalToast.type === 'success' && <i className="icofont-check-circled text-[100px] text-green-700 animated bounceInDown"></i>}
                    {modalToast.type === 'error' && <i className="icofont-close-circled text-[100px] text-red-700 animated bounceInDown"></i>}
                    </div>
                    <div className="flex flex-col  centered">
                         <h2>  {modalToast.title || 'SUCCESS!'}</h2>
                         <div className=" text-dark flex flex-row centered">
                           <p className="icofont-arrow-right animate-ping  mr-2"/>
                          <p className="text-red-800 animated flash" dangerouslySetInnerHTML={{ __html: modalToast.message }} />
                </div>
                    </div>
                           
                  
                    <div className="flex justify-center mt-10">
                   
                </div>
               

                </div>
            </div>
        </div>


    </>
);
}

