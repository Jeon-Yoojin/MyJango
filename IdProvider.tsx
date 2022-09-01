import React, { createContext, useContext } from "react";
import type { FC } from 'react';

export type IdContextType = {
    myId: string,
    myNickname: string
};

const defaultContext = {
    myId: '',
    myNickname: ''
}
const IdContext = createContext<IdContextType>(defaultContext);

type IdContextProperties = {
    myId: string,
    myNickname: string,
    children: string
}

export const IdProvider:FC<IdContextProperties>=({myId, myNickname, children})=>{
    const value = {myId, myNickname}
    return <IdContext.Provider value = {value}>{children}</IdContext.Provider>;
}

export const useIdContext = () => {
    return useContext(IdContext);
}
