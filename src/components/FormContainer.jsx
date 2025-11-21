



import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateData, updateFormRender, updateStoreData } from '../features/formDataSlice'
import { FORM_SECTIONS, LABEL_FORMATTERS, SECTION_TITLES } from '../constant'
import { useNavigate } from 'react-router-dom'
import RenderingBasicForm from './RenderBasicForm'
import NestedForm from './NestedForm'

function FormContainer({setSubmittedFormCount}) {

    const currentForm = useSelector((state) => state.formData.currentForm)
    const renderingArray = useSelector((state) => state.formData.renderingQuestions)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const sectionTitle = SECTION_TITLES[currentForm]

    const isNested = renderingArray && !Array.isArray(renderingArray) && Object.values(renderingArray).every(Array.isArray);
    
    const labelFormatter = LABEL_FORMATTERS[currentForm] || null;
    const isFinalSection = [FORM_SECTIONS.CERTIFICATIONS, FORM_SECTIONS.INTERNSHIP].includes(currentForm);

    // On submit of form
    function getData(e) {
        e.preventDefault()

        // Check if current form is last form
        if (renderingArray[renderingArray.length - 1]?.isLastFrom) {
            navigate('/preview')
        } else {
            // Data update in store
            dispatch(updateFormRender())

        }

        // Increase form submit count
        setSubmittedFormCount((prev)=>prev+1)


    }


    // Update answer for each question in store
    function inputChange(text, item, subSectionKey = null) {

        dispatch(updateData(
            {
                answer: text,
                questionId: item.id,
                section: currentForm,
                subSectionKey
            }))

    }

    return (
        <div className="py-8 px-4 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
                {/* Section Title */}
                <h2 className="text-2xl font-bold mb-6">{sectionTitle}</h2>

                {/* Form */}
                <form className="p-6 rounded-lg shadow-md" onSubmit={getData}>
                    {isNested ? (
                        <NestedForm
                            nestedData={renderingArray}
                            section={currentForm}
                            labelFormatter={labelFormatter}
                            inputChange={inputChange}
                        />
                    ) : (
                        <RenderingBasicForm
                            questions={Array.isArray(renderingArray) ? renderingArray : Object.values(renderingArray || {})}
                            inputChange={inputChange}
                            section={currentForm}
                            subsectionKey={null}
                        />
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="px-6 py-2.5 rounded-md font-medium text-white bg-green-500 hover:bg-green-600 transition-colors"
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