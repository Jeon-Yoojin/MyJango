import React, { useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import SearchBar from "./SearchBar";
import Search from "./mode/Search";
import Bookmark from "./mode/Bookmark";
import Expiration from "./mode/Expiration";

const componentMap = {
    Search,
    Expiration,
    Bookmark,
};

function renderText(mode){
    switch(mode){
        case 'Expiration':
            return '유통기한';
        case 'Bookmark':
            return '즐겨찾기';
        default: 
            return '';
    }
}

const SearchScreen = () => {
    const [searchText, setSearchText] = useState("");
    const [mode, setMode] = useState('Search');

    const renderScreen = () => {
        const Component = componentMap[mode];
        return Component===Search?  <Component searchText={searchText}/> : <Component/>;
    };
    
    return(
        <SafeAreaView style={{flex: 1,}}>
            <SearchBar searchText={searchText} setSearchText={setSearchText} onSubmit={()=>{setMode('Search')}}/>

            <Text style={styles.recommendText} >레시피 추천 </Text>
            <View style={styles.buttonview}>
                {Object.keys(componentMap).map(type => (type!=='Search'?
                    <TouchableOpacity
                        key={type}
                        style={[
                            styles.switch,
                            {
                                backgroundColor:
                                    mode === type ? '#e1615b' : '#EFEFEF',
                            },
                        ]}
                        onPress={() => setMode(type)}
                    >
                        <Text style={{color: mode===type? 'white': '#1A1A1A'}}>{renderText(type)}</Text>
                    </TouchableOpacity>
                    : null
                ))}
            </View>
            {renderScreen()}            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    button:{
        margin: 5,
        padding: 5
    },
    recommendText: { marginTop: 15, marginLeft: 25, marginBottom: 5, fontSize: 20, fontWeight: "700" },
    buttonview: { flexDirection: "row", paddingLeft: 18, margin: 5 },
    switch: {
        alignItems: 'center',
        marginVertical: 2,
        marginHorizontal: 2,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6
    },
})

export default SearchScreen;