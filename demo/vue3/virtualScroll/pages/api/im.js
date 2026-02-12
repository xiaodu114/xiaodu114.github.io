import { getGUID, randomIntInRange, randomHanOrEn, randomDateInRange, formatTimeForLocale } from "a2bei4-utils";

const randomAvatar = (seed) => `https://picsum.photos/seed/${seed}/100/100`;

export const myAvatar = randomAvatar("my_avatar");
export const otherAvatar = randomAvatar("other");

const otherNames = ["卫青", "霍去病", "诸葛亮", "曹操", "刘备", "孙权", "司马懿", "关羽", "张飞", "赵云", "吕布", "周瑜", "岳飞", "罗成"];
const otherSeedId = "other";
export const otherName = otherNames[randomIntInRange(0, otherNames.length - 1)];

function createMockMessage(pageParam, maxTimestamp = new Date().getTime()) {
    const isMe = Math.random() > 0.5; // 随机是我还是对方
    const message_types = ["text", "text", "text", "image", "video", "file"];
    const message_type = message_types[randomIntInRange(0, message_types.length - 1)];
    const file_types = ["doc", "docx", "xls", "xlsx", "ppt", "pptx", "pdf", "txt", "zip", "rar"];
    const file_type = file_types[randomIntInRange(0, file_types.length - 1)];

    let content = "";
    let fileName = "";
    let fileSize = "";
    let thumbnail = "";

    switch (message_type) {
        case "text": {
            content = `第 ${pageParam} 页消息：${randomHanOrEn(randomIntInRange(10, 500))}`;
            break;
        }
        case "image": {
            content = `https://picsum.photos/seed/${otherSeedId}/300/200`;
            break;
        }
        case "video": {
            content = `https://picsum.photos/seed/${otherSeedId}/300/200`; // 模拟视频封面
            thumbnail = content;
            break;
        }
        case "file": {
            fileName = `第 ${pageParam} 页-${randomHanOrEn(randomIntInRange(2, 50))}.${file_type}`;
            fileSize = (Math.random() * 10).toFixed(1) + " MB";
            break;
        }
    }

    // 模拟状态
    let status = isMe ? "已读" : "";

    maxTimestamp = maxTimestamp - 1000 * 60;
    const timestamp = randomDateInRange(new Date(maxTimestamp - 1000 * 60 * randomIntInRange(1, 60 * 24)), new Date(maxTimestamp)).getTime();

    return {
        id: getGUID(),
        isMe: isMe,
        avatar: isMe ? myAvatar : otherAvatar,
        nickname: isMe ? "我" : otherName,
        type: message_type,
        content: content,
        fileName: fileName,
        fileSize: fileSize,
        thumbnail: thumbnail,
        timestamp,
        timestampForShow: formatTimeForLocale(timestamp),
        status: status
    };
}

function createPageMockMessages(pageSize, pageParam, maxTimestamp = new Date().getTime()) {
    const messages = [];
    for (let i = 0; i < pageSize; i++) {
        messages.push(createMockMessage(pageParam, maxTimestamp));
    }
    messages.sort((a, b) => a.timestamp - b.timestamp);
    return messages;
}

export async function getHistoryMessageList(pageSize, pageParam, maxTimestamp = new Date().getTime(), delay = 300) {
    await new Promise((resolve) => setTimeout(resolve, delay));
    return createPageMockMessages(pageSize, pageParam, maxTimestamp);
}
