import { createSlice } from "@reduxjs/toolkit";
import { FORM_SECTIONS } from "../constant";


const formDataSlice = createSlice({
    name: "formData",
    initialState: {},
    reducers: {

        // Update store on page load after getting data from local storage
        updateStoreData(state, action) {
            // Return new state for store
            return action.payload
        },


        // Updates state section like intro, objective, projects etc by taking these details in arguments section, questionId, answer
        updateData(state, action) {

            const section = action.payload.section
            const questionId = action.payload.questionId
            const answer = action.payload.answer
            const subSectionKey = action.payload?.subSectionKey
            // state = action.payload

            if (subSectionKey) {
                state[section][subSectionKey].forEach((item) => {
                    if (item.id === questionId) {
                        item.answer = answer
                    }
                })

                state.renderingQuestions = state[section]
            } else {


                state[section].forEach((item) => {
                    if (item.id === questionId) {
                        item.answer = answer
                    }
                })

                state.renderingQuestions = state[section]

            }

        },

        // On submit of form
        updateFormRender(state) {

            // Store user entered data on submit of each form
            localStorage.setItem("userData", JSON.stringify(state))

            if (state.currentForm === FORM_SECTIONS.INTRO) {
                state.currentForm = FORM_SECTIONS.OBJECTIVE;
                state.renderingQuestions = state.objective;
            } else if (state.currentForm === FORM_SECTIONS.OBJECTIVE) {
                state.currentForm = FORM_SECTIONS.SKILLS;
                state.renderingQuestions = state.skills;
            } else if (state.currentForm === FORM_SECTIONS.SKILLS) {

                // If experience present in template render experienct
                if (state.experience) {
                    state.currentForm = FORM_SECTIONS.EXPERIENCE;
                    state.renderingQuestions = state.experience
                }
                // If not display project section
                else {
                    state.currentForm = FORM_SECTIONS.PROJECT;
                    state.renderingQuestions = state.projects;
                }
            } else if (state.currentForm === FORM_SECTIONS.EXPERIENCE) {
                state.currentForm = FORM_SECTIONS.PROJECT;
                state.renderingQuestions = state.projects;
            }
            else if (state.currentForm === FORM_SECTIONS.PROJECT) {
                state.currentForm = FORM_SECTIONS.EDUCATION;
                state.renderingQuestions = state.education;
            }
            else if(state.currentForm === FORM_SECTIONS.EDUCATION){
                state.currentForm = FORM_SECTIONS.CERTIFICATIONS
                state.renderingQuestions = state.certifications
            }
        },

        // Clear store data
        clearStoreData(){
            return {}
        }


    }
})

export const { updateData, updateFormRender, updateStoreData,clearStoreData } = formDataSlice.actions
export default formDataSlice.reducer
