import React, { createContext, useReducer } from "react";
import axiosInstance from "../API/baseUri"; // Import the configured Axios instance

// Initial state for the reducer
const initialState = {
  leads: [],
  loading: false,
  error: null,
  success:null
};

// Reducer function
const leadReducer = (state = initialState, {type , payload}) => {
  switch (type) {
    case "LEAD_REQUEST":
      return { ...state, loading: true, error: null , success:null };
    case "LEAD_SUCCESS":
      return { ...state, loading: false, success: payload.message };
    case "LEAD_FAILURE":
      return { ...state, loading: false, error: payload.message };
    default:
      return state;
  }
};

// Create Context
export const LeadContext = createContext();

// Provider Component
export const LeadProvider = ({ children }) => {
  const [state, dispatch] = useReducer(leadReducer, initialState);

  // Action to add a lead
  const addLead = async (leadData) => {
    dispatch({ type: "LEAD_REQUEST" });
    try {
      const response = await axiosInstance.post("/leads", leadData); // Use axiosInstance here
      dispatch({ type: "LEAD_SUCCESS", payload: response.data });
      console.log(response.data)
      alert("Added successfuly")
    } catch (error) {
      dispatch({
        type: "LEAD_FAILURE",
        payload: error,
      });
    }
  };

  return (
    <LeadContext.Provider value={{ ...state, addLead }}>
      {children}
    </LeadContext.Provider>
  );
};
