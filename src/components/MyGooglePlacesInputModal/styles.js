import { StyleSheet } from 'react-native';
import { COLOR, SIZE } from '../../utils/Constants';

const styles = StyleSheet.create({
    contentContainerStyle:{
        flex: 1,
        backgroundColor: 'white', 
    },
    contentStyle:{
        flex: 1,
        paddingTop: 0,
        paddingBottom: 20,
        paddingHorizontal: 20,        
    }  
});

export default styles;