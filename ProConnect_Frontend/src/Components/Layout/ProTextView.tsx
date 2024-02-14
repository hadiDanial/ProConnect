import { View, StyleSheet, Platform, Animated} from 'react-native';
import { Colors, Text } from 'react-native-ui-lib';

interface LabelProps{
    text: string,
    webWidth?: number | 'auto' | `${number}%` | Animated.AnimatedNode,
    mobileWidth?: number | 'auto' | `${number}%` | Animated.AnimatedNode,
    height?: number,
    isLabel?: boolean
}

const ProTextView: React.FC<LabelProps> = (props) => {
  const isWeb = Platform.OS === 'web';
  const width = isWeb ? (props.webWidth || 400) : (props.mobileWidth || '90%')
    const height = props.height ? props.height : 45;
    
    const backgroundColor = props.isLabel ? 'transparent' : 'white';
    const borderColor = props.isLabel ? 'transparent' : '#e8e8e8';
    const fontSize = props.isLabel ? 16 : 14;
    const padding = props.isLabel ? 0 : 10;
    const margin = props.isLabel ? 0 : 5;
    const color = props.isLabel ? Colors.textPrimary : 'black';
  return (
      <View
        style={[styles.container, {width: width, height: height, backgroundColor: backgroundColor, borderColor: borderColor, padding: padding, margin: margin}]}>
        <Text
          style={[styles.text, {fontSize:fontSize, color: color}]}>
          {props.text}
        </Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
  },
  text: {
    height: '100%',
    width: '100%',   
    textAlignVertical: 'center',  
  },
});

export default ProTextView;