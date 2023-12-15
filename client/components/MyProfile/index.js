import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { useState } from "react";

export default function MyProfile() {
    const userinfo = { id: 0, name: "ThisIsMyName", follower: 1, postkarma: 3, commentkarma: 48, gold: 5, date: "Mar 12,2023", intro: "I am a student", avatar: require("../../assets/avatar.png") }
    const comments = [
        { id: 1, title: "cuddle buddies, platonically", community: "hanoi", time: "3h", like: 1, content: "would u" },
        { id: 2, title: "looking for a manga here", community: "manga", time: "3d", like: 5, content: "wait ggl play store has project sekai???? i searched it but i couldnt find it, so i downloaded it from other link on the internet" },
        { id: 3, title: "The last thing you bought is now permanently out of stock. How screwed is the human race?", community: "hochiminhcity", time: "7d", like: 1, content: "Inbox and i will take you to best hidden gems in hcm!" },
        { id: 4, title: " Very loud Karaoke in villas near my apartment. Why no one is doing anything about it?", community: "VietNam", time: "1m", like: 15, content: "If you are from USA, you ever heard vietnamese people complain about mass shooting there?" },
    ];
    const listPost = [
        { id: 5, community: "askReddit", imgCommunity: require("../../assets/avatar1.png"), time: "21h", title: "cuddle buddies, platonically", content: "Had you ever done anything make you sad", like: 63, comment: 88, share: 27, status: 0 },
        { id: 6, community: "manga", imgCommunity: require("../../assets/avatar2.png"), time: "3d", title: "looking for a manga here", content: "Inbox and i will take you to best hidden gems in hcm!", like: 5, comment: 5, share: 2, status: 0 },
        { id: 7, community: "manga", imgCommunity: require("../../assets/avatar2.png"), time: "3d", title: "looking for a manga here", content: "Inbox and i will take you to best hidden gems in hcm!", like: 5, comment: 5, share: 2, status: 0 },

    ]

    const [currentTab, setCurrentTab] = useState(1);

    const handlePostBtn = () => {
        setCurrentTab(1);
    };

    const handleCommentBtn = () => {
        setCurrentTab(2);
    };

    const handleAboutBtn = () => {
        setCurrentTab(3);
    };

    const TabPost = ({ listPost }) => {
        return (
            <View style={styles.viewTabPost}>
                <FlatList
                    data={listPost}
                    renderItem={({ item }) => (
                        <View style={styles.viewPostContainer}>
                            <TouchableOpacity>
                                <View style={styles.viewPostInfo}>
                                    <Image source={item.imgCommunity} style={styles.imgPostAvatar}></Image>
                                    <Text style={styles.textPostCommunity}> r/{item.community} </Text>
                                    <Text style={styles.textPostTime}> {item.time} </Text>
                                </View>
                                <Text style={styles.textPostTitle}>{item.title}</Text>
                                <Text style={styles.textPostContent}>{item.content}</Text>
                            </TouchableOpacity>
                            <View style={styles.viewPostButton}>
                                <View style={styles.viewBtnTab}>
                                    <TouchableOpacity>
                                        <Image
                                            style={styles.btnIcon}
                                            source={require("../../assets/likeicon.png")}
                                        ></Image>
                                    </TouchableOpacity>
                                    <Text style={styles.textPostBtn}>{item.like}</Text>
                                    <TouchableOpacity>
                                        <Image
                                            style={styles.btnIcon}
                                            source={require("../../assets/dislikeicon.png")}
                                        ></Image>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.viewBtnTab}>
                                    <TouchableOpacity style={styles.viewBtnTab}>
                                        <Image
                                            style={styles.btnIcon}
                                            source={require("../../assets/commenticon.png")}
                                        ></Image>
                                        <Text style={styles.textPostBtn}>{item.comment}</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.viewBtnTab}>
                                    <TouchableOpacity style={styles.viewBtnTab}>
                                        <Image
                                            style={styles.btnIcon}
                                            source={require("../../assets/shareicon.png")}
                                        ></Image>
                                        <Text style={styles.textPostBtn}>{item.share}</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>


                    )}
                />
            </View>
        )
    }

    const TabComment = ({ comments }) => {
        return (
            <View style={styles.viewTabComments}>
                <FlatList
                    data={comments}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.viewCommentContainer}>
                            <Text style={styles.textCommentTitle}>{item.title}</Text>
                            <View style={styles.viewCommentIntro}>
                                <Text style={styles.textCommentContent}>r/{item.community} - {item.time} - {item.like}
                                    <Image source={require('../../assets/blacklikeicon.png')} style={styles.imgLikeComment}></Image>
                                </Text>
                            </View>
                            <Text style={styles.textCommentContent}>{item.content}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        )
    }

    const TabAbout = () => {
        return (
            <View style={styles.viewTabAbout}>
                <View style={styles.viewAboutKarma}>
                    <View style={styles.viewAboutKarmaDetail}>
                        <Text style={styles.textNumberKarma}>{userinfo.postkarma}</Text>
                        <Text style={styles.textKarma}>Post Karma</Text>
                    </View>
                    <View style={styles.viewAboutKarmaDetail}>
                        <Text style={styles.textNumberKarma}>{userinfo.commentkarma}</Text>
                        <Text style={styles.textKarma}>Comment Karma</Text>
                    </View>
                </View>
                <View style={styles.viewAboutIntro}>
                    <Text style={styles.textAboutIntro} >{userinfo.intro}</Text>
                </View>
                <View style={styles.viewTrophyTitle}>
                    <Text style={styles.textTrophyTitle}>TROPHIES</Text>
                </View>
                <View style={styles.viewTrophies}></View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.viewUserinfo}>
                <Image source={userinfo.avatar} style={styles.ImgUserAvatar}></Image>
                <TouchableOpacity style={styles.btnEdit}>
                    <Text style={styles.textEdit}>Edit</Text>
                </TouchableOpacity>
                <Text style={styles.textUsername}>{userinfo.name}</Text>
                <Text style={styles.textBold}>{userinfo.follower} follower</Text>
                <Text style={styles.textBasic}>u/{userinfo.name} - {userinfo.postkarma + userinfo.commentkarma} karma - {userinfo.date}</Text>
                <Text style={styles.textBasic}>{userinfo.gold} Gold</Text>
                <Text style={styles.textBasic}>{userinfo.intro}</Text>
                <TouchableOpacity style={styles.btnAddSocial}>
                    <Text style={styles.textBasic}>+ Add social link</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.viewTab}>
                <TouchableOpacity style={styles.btnTab} onPress={handlePostBtn}><Text style={styles.textTab}>Posts</Text></TouchableOpacity>
                <TouchableOpacity style={styles.btnTab} onPress={handleCommentBtn}><Text style={styles.textTab}>Comments</Text></TouchableOpacity>
                <TouchableOpacity style={styles.btnTab} onPress={handleAboutBtn}><Text style={styles.textTab}>About</Text></TouchableOpacity>
            </View>

            <View style={styles.container}>
                {currentTab === 1 && <TabPost listPost={listPost}></TabPost>}
                {currentTab === 2 && <TabComment comments={comments}></TabComment>}
                {currentTab === 3 && <TabAbout></TabAbout>}
            </View>
        </View>
    )
}