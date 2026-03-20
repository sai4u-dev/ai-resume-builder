import { useDispatch, useSelector } from 'react-redux'
import { updateData, updateFormRender, updateStoreData, updateBackRender } from '../features/formDataSlice'
import { FORM_SECTIONS, getLabel, SECTION_TITLES, isRequiredFieldsFilled, validateField } from '../constant'
import { useNavigate } from 'react-router-dom'
import RenderingBasicForm from './RenderBasicForm'
import NestedForm from './NestedForm'
import { useEffect, useState } from 'react'

const containerStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

  .fc-root {
    --or50: #FFF4ED;
    --or100: #FFE4CC;
    --or200: #FFC599;
    --or400: #F97316;
    --or600: #C2410C;
    --sk50: #F0F9FF;
    --sk100: #E0F2FE;
    --sk200: #BAE6FD;
    --sk400: #38BDF8;
    --sk600: #0284C7;
    font-family: 'DM Sans', sans-serif;
  }

  .fc-wrapper {
    padding: 40px 24px;
    width: 100%;
    transition: background 0.2s;
  }
  .fc-wrapper.light { background: #FAFAFA; color: #111; }
  .fc-wrapper.dark  { background: #1A1F2B; color: #F1F5F9; }

  .fc-inner { max-width: 780px; margin: 0 auto; }

  /* Section header */
  .fc-section-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 28px;
  }
  .fc-section-tag {
    font-family: 'Syne', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--or600);
    background: var(--or50);
    border: 1px solid var(--or200);
    padding: 4px 10px;
    border-radius: 4px;
  }
  .fc-section-tag.dark {
    color: #FDBA74;
    background: rgba(249,115,22,0.1);
    border-color: rgba(249,115,22,0.25);
  }
  .fc-title {
    font-family: 'Syne', sans-serif;
    font-size: 26px;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #0F172A;
    margin: 0;
  }
  .fc-title.dark { color: #F8FAFC; }

  /* Form card */
  .fc-card {
    border-radius: 16px;
    padding: 32px;
    transition: background 0.2s, border 0.2s;
    position: relative;
    overflow: hidden;
  }
  .fc-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(to right, var(--or400), var(--sk400));
  }
  .fc-card.light {
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  }
  .fc-card.dark {
    background: #0F172A;
    border: 1px solid #1E293B;
    box-shadow: 0 4px 32px rgba(0,0,0,0.4);
  }

  /* Button row */
  .fc-btn-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid #F1F5F9;
  }
  .fc-btn-row.dark { border-color: #1E293B; }

  /* Previous button */
  .fc-btn-prev {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    border: 1.5px solid var(--sk400);
    color: var(--sk600);
    background: var(--sk50);
    transition: all 0.18s;
    font-family: 'DM Sans', sans-serif;
  }
  .fc-btn-prev:hover { background: var(--sk100); border-color: var(--sk600); }
  .fc-btn-prev.dark {
    border-color: rgba(56,189,248,0.4);
    color: var(--sk400);
    background: rgba(56,189,248,0.08);
  }
  .fc-btn-prev.dark:hover { background: rgba(56,189,248,0.14); }

  /* Next / Submit button */
  .fc-btn-next {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 11px 28px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    border: none;
    color: #fff;
    background: var(--or400);
    transition: all 0.18s;
    font-family: 'Syne', sans-serif;
    letter-spacing: 0.03em;
    position: relative;
    overflow: hidden;
  }
  .fc-btn-next::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom right, rgba(255,255,255,0.15), transparent);
  }
  .fc-btn-next:hover:not(:disabled) {
    background: var(--or600);
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(249,115,22,0.35);
  }
  .fc-btn-next:active:not(:disabled) { transform: translateY(0); }
  .fc-btn-next:disabled {
    background: #CBD5E1;
    color: #94A3B8;
    cursor: not-allowed;
    box-shadow: none;
  }

  .fc-btn-spacer { flex: 1; }

  /* Arrow icons in buttons */
  .fc-arrow { font-size: 16px; line-height: 1; }
`;

function FormContainer({ setSubmittedFormCount, submittedFormCount }) {
    const currentForm = useSelector((state) => state.formData.currentForm)
    const renderingArray = useSelector((state) => state.formData.renderingQuestions)
    const darkMode = useSelector((state) => state.theme)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const sectionTitle = SECTION_TITLES[currentForm]
    const isFinalSection = [FORM_SECTIONS.CERTIFICATIONS].includes(currentForm)
    const [errors, setErrors] = useState({})
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(() => {
        document.title = `${currentForm} - Resume Builder`
    }, [currentForm])

    let isNested = false
    if (renderingArray && typeof renderingArray === 'object' && !Array.isArray(renderingArray)) {
        const values = Object.values(renderingArray || {})
        const allValuesAreArrays = values.every((value) => Array.isArray(value))
        isNested = allValuesAreArrays
    }

    function getData(e) {
        e.preventDefault()
        if (isDisabled) return
        if (!isRequiredFieldsFilled(renderingArray)) return
        dispatch(updateFormRender())
        if (isFinalSection) navigate('/preview')
        localStorage.setItem('submittedFormCount', submittedFormCount + 1)
        setSubmittedFormCount((prev) => prev + 1)
    }

    function inputChange(text, item, subSectionKey = null) {
        const updatedItem = { ...item, answer: text }
        const result = validateField(updatedItem)
        setErrors((prev) => {
            const copy = { ...prev }
            if (!result.valid) copy[item.id] = result.message
            else delete copy[item.id]
            return copy
        })
        dispatch(updateData({ answer: text, questionId: item.id, section: currentForm, subSectionKey: subSectionKey || null }))
    }

    function goBack() {
        dispatch(updateBackRender())
        setSubmittedFormCount((prev) => Math.max(prev - 1, 0))
    }

    useEffect(() => {
        const filled = isRequiredFieldsFilled(renderingArray)
        setIsDisabled(!filled)
    }, [renderingArray])

    const dm = darkMode ? 'dark' : 'light'

    return (
        <div className={`fc-root fc-wrapper ${dm}`}>
            <style>{containerStyles}</style>

            <div className="fc-inner">
                {/* Section header */}
                <div className="fc-section-header">
                    <span className={`fc-section-tag ${dm}`}>Section</span>
                    <h2 className={`fc-title ${dm}`}>{sectionTitle}</h2>
                </div>

                {/* Form card */}
                <form className={`fc-card ${dm}`} onSubmit={getData}>
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
                            errors={errors}
                            labelFormatter={(key) => getLabel(currentForm, key)}
                        />
                    )}

                    {/* Button row */}
                    <div className={`fc-btn-row ${dm}`}>
                        {currentForm !== FORM_SECTIONS.INTRO ? (
                            <button type="button" onClick={goBack} className={`fc-btn-prev ${dm}`}>
                                <span className="fc-arrow">←</span> Previous
                            </button>
                        ) : (
                            <span className="fc-btn-spacer" />
                        )}

                        <button type="submit" disabled={isDisabled} className="fc-btn-next">
                            {isFinalSection ? 'Submit' : 'Next'} <span className="fc-arrow">→</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormContainer