import React, { useState } from "react";

export const DataContext = React.createContext();

export const DataProvider = (props) => {

    const [preData, setPreData] = useState({});

    return (
        <DataContext.Provider
            value={{
                preData, setPreData
            }}>

            {props.children}
        </DataContext.Provider>
    )
};