import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";

import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default function InboxScreenHeader(props) {

    const navigation = useNavigation();

    return(
        <View style={{height: 70}}>
            <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', padding: 10}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('MenuScreen')}
                    >
                        <Ionicons name="menu" size={30} color="black" />
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 10}}>{props.title}</Text>
                </View>

                <View style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'row'}}>
                    <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ProfileScrenn')}
                    >
                        <Image source={require('../../assets/favicon.png')} style={{width: 30, height: 30, borderRadius: 15, marginLeft: 10}}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}