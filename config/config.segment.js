import React, { createContext, useState } from "react";
import { createClient, AnalyticsProvider } from "@segment/analytics-react-native";

export const AppContext = createContext()

export const AppProvider = ({ children }) => {

    const segmentClient = createClient({
        writeKey: 'TK6zpCBBBtA0DY7oJcMAMcVCvDY37xXc'
    });

    const [myVariable, setMyVariable] = useState(segmentClient)
    return (
        <AppContext.Provider value={{ myVariable, setMyVariable }}>
            <AnalyticsProvider client={segmentClient}>
                {children}
            </AnalyticsProvider>
        </AppContext.Provider>
    )
}