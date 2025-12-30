import FormContainer from '../components/FormContainer'
import { lazy, Suspense, useEffect, useState } from 'react'
import ProgressBar from '../components/ProgressBar'
import { useDispatch, useSelector } from 'react-redux'
import { updateStoreData } from '../features/formDataSlice'
import { Bounce, ToastContainer } from 'react-toastify'
import CircularLoader from '../components/CircularLoader'

function Form() {

    const [submittedFormCount, setSubmittedFormCount] = useState(1)
    const dispatch = useDispatch()
    const darkMode = useSelector((state) => state.theme); // Get dark mode from Redux
    // If page refreshes take stored data from local storage and update the store

    const LazyFormImageComponent = lazy(() => import("../components/FormImage"))
    useEffect(() => {

        const locallyStoredUserData = localStorage.getItem("userData")
        if (locallyStoredUserData) {
            // Step 1 : Get data and parse it
            const localStorageData = JSON.parse(locallyStoredUserData)


            // Step 2 : Update data in
            dispatch(updateStoreData(localStorageData))
        }


        // Get submitted form count on refres
        const submittedFormCountStoredInLocal = Number(localStorage.getItem("submittedFormCount"))

        if (submittedFormCountStoredInLocal) {
            setSubmittedFormCount(submittedFormCountStoredInLocal)
        }
    }, [])



    return (
        <div className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} w-full min-h-screen flex flex-col mt-16 items-center p-4 transition-colors`}>

            {/* Progress Bar on TOP */}
            <div className='w-full max-w-2xl mb-6'>
                <ProgressBar submittedFormCount={submittedFormCount} darkMode={darkMode} />
            </div>

            {/* Render Forms */}
            <div className="w-full max-w-7xl mx-80 flex items-center justify-between gap-12 mt-12">

                {/* Left Image */}
                <Suspense fallback={<CircularLoader />}>
                    <LazyFormImageComponent />
                </Suspense>

                {/* Right Form */}
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
    )
}

export default Form