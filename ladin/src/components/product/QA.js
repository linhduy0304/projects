

import React,  {Component} from 'react';
import { 
    Text, 
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import CtIcon from './CtIcon';
import HTMLView from 'react-native-htmlview';

class QA extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qa: '',
            data: [],
            viewMore: false
        }
    }

    componentWillMount = () => {
        this.props.getQA(this.props.id)
    };
    
    componentWillReceiveProps = (nextProps) => {
        if(nextProps.product.qa) {
        this.setState({
            data: nextProps.product.qa
        })
        }
    };

    sendQuestion() {
        var body = {
        product_id: this.props.id,
        question: this.state.qa
        }
        this.props.sendQuestion(body)
        this.setState({
        qa: ''
        })
    }

    direct() {
        if(!this.props.auth.isLogin) {
        var request = {
            type: 'sendQA',
            id: this.props.id
        }
        this.props.updateRequest(request)
        Keyboard.dismiss()
        Actions.login()
        }
    }

    viewMore = () => {
        this.setState({
            viewMore: !this.state.viewMore
        })
    }

    render() {
        const {qa, data, viewMore} = this.state;
        return (
            <View style={css.ct}>
                <View style={css.ctHeader}>
                <CtIcon source={require('../../icons/ic_chat.png')}/>
                <Text style={css.label}>Hỏi đáp sản phẩm</Text>
                </View>
                <View style={css.ctInput}>
                <TextInput 
                    value={qa}
                    onFocus={() => this.direct()}
                    onSubmitEditing={() => this.sendQuestion()}
                    style={{
                    padding: 0,
                    padding: 7,
                    paddingLeft: 15,
                    fontStyle:'italic',
                    fontSize: 15
                    }}
                    onChangeText={text => this.setState({qa: text})}
                    placeholder='Viết hỏi đáp của bạn'
                    placeholderTextColor='#8c9192'
                />
                </View>
                <View style={{height: 1, backgroundColor: '#e6eff1'}}/>

                <View>
                {
                    data.map((item, index) => {
                        if(!viewMore && index > 3) {
                            return null
                        }else {
                            return (
                                <View key={index} style={css.ctItem}>
                                    <View >
                                        <Text style={{color: '#333', fontSize: 16, fontWeight: 'bold'}}>{item.member.name} </Text>
                                        <Text style={{color: '#9a9a9a', marginLeft: 30}}>
                                            <HTMLView
                                                value={item.question}
                                            />
                                        
                                        {/* {item.question} */}
                                        </Text>
                                    </View>
                                    <Text style={{marginLeft: 30, fontSize: 13, marginTop: 5, color: '#b8b8b8'}}>{renderDateTime(item.created_at.date)}</Text>
                                    {
                                        item.answer.map((itemAns, index1) => {
                                        return (
                                            <View key={index1}>
                                            <View style={{marginTop: 5}}>
                                                <Text style={{color: '#333', fontSize: 16, fontWeight: 'bold'}}>{itemAns.respondent}</Text>
                                                <Text style={{color: '#9a9a9a' , marginLeft: 30}}>
                                                <HTMLView
                                                    value={itemAns.answer}
                                                />
                                                {/* {itemAns.answer} */}
                                                </Text>
                                            </View>
                                            <Text style={{marginLeft: 30, fontSize: 13, marginTop: 5, color: '#b8b8b8'}}>{itemAns.answer_at}</Text>
                                            </View>
                                        
                                        )
                                        })
                                    }
                                </View>
                            )
                        }
                    })
                }
                {
                    data.length > 4 ?
                        <TouchableOpacity onPress={this.viewMore} style={css.ctMore}>
                            <Text style={{color: '#de1838'}}>{viewMore ? 'Rút gọn' : 'Xem tất cả'}</Text>
                        </TouchableOpacity>
                    : null
                }
                </View>
            </View>
        )
    }
}

const css = StyleSheet.create({
    ctMore: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ctItem: {
        borderBottomColor: '#e6eff1',
        borderBottomWidth: 1,
        padding: 10
    },
    ctInput: {
        backgroundColor: '#e6eff1',
        borderRadius: 20,
        margin: 10,
        
    },
    ctHeader: {
        flexDirection: 'row', 
        alignItems: 'center',
        borderBottomColor: '#e6eff1',
        borderBottomWidth: 1,
        padding: 10
    },
    
    label: {
        color: '#333',
        fontSize: 16,
        marginLeft: 10
    },
    ct: {
        backgroundColor: '#fff',
        marginTop: 10,
        marginBottom: 10,
    },
})

import {connect} from 'react-redux';
import {getQA, sendQuestion} from '../../actions/product';
import {updateRequest} from '../../actions/auth';
import { Actions } from 'react-native-router-flux';
import { renderDateTime } from '../Functions';

const mapStateToProps = (state) => {
    return {
        product: state.product,
        auth: state.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getQA: (id) => dispatch(getQA(id)),
        sendQuestion: (body) => dispatch(sendQuestion(body)),
        updateRequest: (data) => dispatch(updateRequest(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QA);
