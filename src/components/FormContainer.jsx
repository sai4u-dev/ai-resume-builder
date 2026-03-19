

import { useDispatch, useSelector } from 'react-redux'
import { updateData, updateFormRender, updateStoreData, updateBackRender } from '../features/formDataSlice'
import { FORM_SECTIONS, getLabel, SECTION_TITLES, isRequiredFieldsFilled, validateField } from '../constant'
import { useNavigate } from 'react-router-dom'

import RenderingBasicForm from './RenderBasicForm'
import NestedForm from './NestedForm'
import { useEffect, useState } from 'react'

function FormContainer({ setSubmittedFormCount, submittedFormCount }) {

    const currentForm = useSelector((state) => state.formData.currentForm)
    const renderingArray = useSelector((state) => state.formData.renderingQuestions)
    const darkMode = useSelector((state) => state.theme);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const sectionTitle = SECTION_TITLES[currentForm]
    const isFinalSection = [FORM_SECTIONS.CERTIFICATIONS].includes(currentForm);
    const [errors, setErrors] = useState({});
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        document.title = `${currentForm} - Resume Builder`;
    }, [currentForm]);

    let isNested = false;
    if (renderingArray && typeof renderingArray === "object" && !Array.isArray(renderingArray)) {
        const values = Object.values(renderingArray || {});
        const allValuesAreArrays = values.every((value) => Array.isArray(value));
        isNested = allValuesAreArrays;
    }
    function getData(e) {
        e.preventDefault()

        if (isDisabled) return;

        if (!isRequiredFieldsFilled(renderingArray)) {
            return
        }
        dispatch(updateFormRender())

        if (isFinalSection) {
            navigate('/preview')
        }

        localStorage.setItem("submittedFormCount", submittedFormCount + 1)

        setSubmittedFormCount((prev) => prev + 1)
    }


    function inputChange(text, item, subSectionKey = null) {

        const updatedItem = { ...item, answer: text };

        const result = validateField(updatedItem);

        setErrors((prev) => {
            const copy = { ...prev };

            if (!result.valid) {
                copy[item.id] = result.message;
            } else {
                delete copy[item.id];
            }

            return copy;
        });



        dispatch(updateData(
            {
                answer: text,
                questionId: item.id,
                section: currentForm,
                subSectionKey: subSectionKey || null
            }))

    }

    function goBack() {
        dispatch(updateBackRender());
        setSubmittedFormCount(prev => Math.max(prev - 1, 0))
    }

    useEffect(() => {
        const filled = isRequiredFieldsFilled(renderingArray);
        setIsDisabled(!filled);

    }, [renderingArray]);


    return (
        <div className={`${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'} py-8 px-4 rounded-lg shadow-lg w-full transition-colors`}>
            <div className="max-w-3xl mx-auto">
                {/* Section Title */}
                <h2 className="text-2xl font-bold mb-6">{sectionTitle}</h2>

                {/* Form */}
                <form className={`${darkMode ? 'bg-gray-800 shadow-lg text-white' : 'bg-white shadow-md'} p-6 rounded-lg transition-colors`}
                    onSubmit={getData}>
                    {isNested ? (
                        <NestedForm
                            nestedData={renderingArray}
                            section={currentForm}
                            labelFormatter={(key) => getLabel(currentForm, key)}
                            inputChange={inputChange}
                        />
                    ) : (
                        <RenderingBasicForm
                            questions={Array.isArray(renderingArray) ? renderingArray : Object.values(renderingArray || {})}
                            inputChange={inputChange}
                            section={currentForm}
                            errors={errors}  // error
                            labelFormatter={(key) => getLabel(currentForm, key)}
                        //  Ensure it's null if undefined
                        />
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-end mt-6 relative">
                        {/* Previous Button */}
                        {currentForm !== FORM_SECTIONS.INTRO && (
                            <button
                                type="button"
                                onClick={goBack}
                                className={`${darkMode ? 'bg-blue-500 hover:bg-blue-900 text-white' : 'bg-red-600 hover:bg-rose-400 text-white'} absolute left-0 px-6 py-2.5 rounded-md font-medium`}
                            >
                                Previous
                            </button>
                        )}
                        {/* Next / Submit */}
                        <button
                            type="submit"
                            disabled={isDisabled}
                            className={`
                                px-6 py-2.5 rounded-md font-medium transition-colors text-white
                                ${isDisabled
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : darkMode
                                        ? "bg-green-600 hover:bg-green-700"
                                        : "bg-green-500 hover:bg-green-600"
                                }
                            `}
                        >
                            {isFinalSection ? "Submit" : "Next"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormContainer