import React from "react";
import {Link,browserHistory} from 'react-router'


export default class NavLayout extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            hasNewMessage: false,
            people:false,
            book:false,
            my:false,
            message:false,
            home:false,
        };
    }

    choose(node){
        this.setState({
            people:false,
            book:false,
            my:false,
            message:false,
            home:false,
        });
        if(node.indexOf('book')>-1){
            this.setState({
                book:true
            });
        }else if(node.indexOf('people')>-1){
            this.setState({
                people:true
            });
        }else if(node.indexOf('me')>-1  && node.indexOf('ho')===-1){
            this.setState({
                my:true
            });
        }else if(node.indexOf('active')>-1){
            this.setState({
                message:true
            });
        }if(node.indexOf('ho')>-1){
            this.setState({
                home:true
            });
        }
    }



    componentWillReceiveProps(){
        this.choose(window.location.pathname)
    }

    componentDidMount() {
       this.choose(window.location.pathname);
        // Lean.imClient.then(imClient => {
        //     this.imClient = imClient;
        //     imClient.on("unreadmessagescountupdate", (conversations) => {
        //         for( let conv of conversations) {
        //             if(conv.unreadMessagesCount > 0) {
        //                 this.setState({hasNewMessage: true});
        //                 break;
        //             }
        //         }
        //     });
        // });
    }

    render() {
        return (
            <div className="home-wrapper">
                {

                        <div className="nav-bar" style={{zIndex:88}}>
                            <div className="nav-item">
                                <Link  to="/home">
                                    <div className="bar-icon icon-png book">
                                        {this.state.home ? <img style={{width:'.72rem'}} src="http://lcimg.oss-cn-hangzhou.aliyuncs.com/canger/img/home_using.png" alt=""/> : <img style={{width:'.72rem'}} src="http://lcimg.oss-cn-hangzhou.aliyuncs.com/canger/img/home.png" alt=""/>}
                                    </div>
                                    <p className="nav-tit">首页</p>
                                </Link>
                            </div>
                            <div className="nav-item">
                                <Link  to="/people">
                                    <div className="bar-icon icon-png friend">
                                        {this.state.people ? <img style={{width:'.6rem'}} src="http://lcimg.oss-cn-hangzhou.aliyuncs.com/canger/img/canger_using.png" alt=""/> : <img style={{width:'.6rem'}} src="http://lcimg.oss-cn-hangzhou.aliyuncs.com/canger/img/canger.png" alt=""/>}
                                    </div>
                                    <p className="nav-tit">书友</p>
                                </Link>
                            </div>
                            <div className="nav-item">
                                <Link  to="/book">
                                    <div className="bar-icon icon-png book">
                                        {this.state.book ? <img src="http://lcimg.oss-cn-hangzhou.aliyuncs.com/canger/img/search%20book_using.png" alt=""/> : <img src="http://lcimg.oss-cn-hangzhou.aliyuncs.com/canger/img/search%20book.png" alt=""/>}
                                    </div>
                                    <p className="nav-tit">觅书</p>
                                </Link>
                            </div>

                            <div className="nav-item">
                                <Link to="/active">
                                    <div className="bar-icon icon-png">
                                        {this.state.message ? <img style={{width:'0.72rem'}} src="http://lcimg.oss-cn-hangzhou.aliyuncs.com/canger/img/city_using.png" alt=""/> : <img style={{width:'0.72rem'}} src="http://lcimg.oss-cn-hangzhou.aliyuncs.com/canger/img/city_unuse.png" alt=""/>}
                                    </div>
                                    <p className="nav-tit">同城活动</p>
                                </Link>
                            </div>
                            <div className="nav-item" >
                                <Link to="/me" >
                                    <div className="bar-icon icon-png my-user">
                                        {this.state.my ? <img style={{width:'.6rem'}} src="http://lcimg.oss-cn-hangzhou.aliyuncs.com/canger/img/me_using.png" alt=""/> : <img style={{width:'.6rem'}} src="http://lcimg.oss-cn-hangzhou.aliyuncs.com/canger/img/me.png" alt=""/>}
                                    </div>
                                    <p className={this.state.hasNewMessage?'redpoint':'none'}></p>
                                    <p className="nav-tit">个人中心</p>
                                </Link>
                            </div>

                        </div>

                }
                {this.props.children}
            </div>
        )
    }
}