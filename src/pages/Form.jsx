import FormContainer from '../components/FormContainer'
import { lazy, Suspense, useEffect, useState } from 'react'
import ProgressBar from '../components/ProgressBar'
import { useDispatch, useSelector } from 'react-redux'
import { updateStoreData } from '../features/formDataSlice'
import { Bounce, ToastContainer } from 'react-toastify'
import CircularLoader from '../components/CircularLoader'

function Form() {
    const [submittedFormCount, setSubmittedFormCount] = useState(1);
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.theme);

    const LazyFormImageComponent = lazy(() => import("../components/FormImage"));

    useEffect(() => {
        const locallyStoredUserData = localStorage.getItem("userData");
        if (locallyStoredUserData) {
            dispatch(updateStoreData(JSON.parse(locallyStoredUserData)));
        }
        const stored = Number(localStorage.getItem("submittedFormCount"));
        if (stored) setSubmittedFormCount(stored);
    }, []);

    return (
        <div className={`w-full min-h-screen flex flex-col mt-14 items-center transition-colors duration-300
      ${darkMode ? "bg-gray-950 text-white" : "bg-gradient-to-br from-orange-50/60 via-white to-sky-50/60 text-gray-900"}`}>

            {/* Decorative top strip */}
            <div className="w-full h-[2px]" style={{ background: "linear-gradient(to right, #f97316, #38bdf8, transparent)" }} />

            {/* Progress bar */}
            <div className={`w-full max-w-2xl px-4 pt-6 pb-2`}>
                <ProgressBar submittedFormCount={submittedFormCount} darkMode={darkMode} />
            </div>

            {/* Body: image + form */}
            <div className="w-full max-w-6xl flex items-center justify-between gap-10 mt-10 px-4 pb-16">

                {/* Left decorative image */}
                <div className="hidden lg:flex flex-shrink-0">
                    <Suspense fallback={<CircularLoader />}>
                        <LazyFormImageComponent />
                    </Suspense>
                </div>

                {/* Right form */}
                <div className="flex-1 flex justify-center">
                    <FormContainer
                        setSubmittedFormCount={setSubmittedFormCount}
                        submittedFormCount={submittedFormCount}
                    />
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
        </div>
    );
}

export default Form;