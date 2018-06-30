import React,{ Component } from 'react';
import {
    View,
    Text,
    Image,
    Animated,
    StyleSheet,
    Easing,
    TouchableWithoutFeedback
} from 'react-native';

let totalStars = 5;

export default class CustomizedStarRating extends Component{
    constructor(props) {
        super(props);
        this.state = {
            scaleAnimation: new Animated.Value(1),
            filledStar: 0
        }
    }

    clickStar=(i)=>{
        this.setState({
            filledStar: i
        })
        this.renderStars();

        console.log('You have given ' + i +'star rating');
    }

    doAnimation = () => {  
        //AnimationStar
        Animated.timing(this.state.scaleAnimation, {
            toValue: 1.4,
            duration: 300,
            easing: Easing.easeOutCubic,
            useNativeDriver: true
        }).start(() => {
            this.state.scaleAnimation.setValue(1)
        });
    }

    renderStars=()=>{

        let stars = [];

        const animatedValue={
            transform: [
                {
                    scale: this.state.scaleAnimation
                }
            ]
        }

        for (let i = 1; i <= totalStars;i++){
            if(i<=this.state.filledStar){
                stars.push(
                        <TouchableWithoutFeedback
                            key={i}
                            onPress={() => {
                                this.clickStar(i),
                                this.doAnimation()
                            }}>
                        <Animated.View style={[animatedValue, styles.starView]}>
                                <Image
                                    style={[styles.starRating]}
                                    source={require('../images/starFilled.png')} />
                            </Animated.View>
                        </TouchableWithoutFeedback>
                )
            }
            else{
                stars.push(
                        <TouchableWithoutFeedback
                            key={i}
                            onPress={() => {
                                this.clickStar(i),
                                this.doAnimation()
                            }}>
                        <Animated.View style={styles.starView}>
                                <Image
                                    style={[styles.starRating]}
                                    source={require('../images/emptyStar.png')} />
                            </Animated.View>
                        </TouchableWithoutFeedback>
                )
            }
        }
        return stars;
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.textBlock}>
                    <Text style={styles.text}>
                        You have given 
                        <Text style={styles.starCount}> {this.state.filledStar} </Text>
                         star rating
                    </Text>
                </View>

                <View style={styles.starBlock}>
                    {this.renderStars()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    starBlock:{
        flexDirection: 'row',
    },
    starView:{
        width: 50,
        height: 50,
        marginHorizontal: 5,
    },
    starRating:{
        width: 50,
        height: 50
    },
    textBlock:{
        marginVertical: 30
    },
    text:{
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold'
    },
    starCount:{
        color: '#1ECC00'
    }
});