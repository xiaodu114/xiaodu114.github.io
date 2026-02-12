import { ref, nextTick, onMounted } from "vue";
import { getHistoryMessageList } from "../../api/im.js";

export default {
    name: "du-im-message-list",
    template: "#du-im-message-list-template",
    props: {},
    emits: ["update-status"], // 可选：向父组件通知连接状态等
    setup(props, { expose, emit }) {
        const PAGE_SIZE = 24; // 每页数量

        const scrollerRef = ref(null);
        const messages = ref([]);

        const currentPateNum = ref(1);
        const isLoadingData = ref(false);
        const hasMore = ref(true);

        // 判断是否应该显示时间
        function shouldShowTime(index) {
            if (index === 0) return true; // 第一条消息总是显示时间

            const currentMsg = messages.value[index];
            const prevMsg = messages.value[index - 1];

            if (!prevMsg) return true;

            const currentDate = new Date(currentMsg.timestamp);
            const prevDate = new Date(prevMsg.timestamp);

            // 如果日期不同，显示时间
            if (currentDate.toDateString() !== prevDate.toDateString()) {
                return true;
            }

            // 如果时间差超过30分钟，显示时间
            const timeDiff = Math.abs(currentMsg.timestamp - prevMsg.timestamp);
            const minutesDiff = Math.floor(timeDiff / (1000 * 60));

            return minutesDiff >= 30;
        }

        async function loadData() {
            if (isLoadingData.value || !hasMore.value) return;

            isLoadingData.value = true;
            try {
                const newMessages = await getHistoryMessageList(PAGE_SIZE, currentPateNum.value, messages.value[0]?.timestamp);
                if (Array.isArray(newMessages)) {
                    if (newMessages.length > 0) {
                        // 将新消息添加到开头
                        messages.value = [...newMessages, ...messages.value];

                        // 等待DOM更新后调整滚动位置
                        await nextTick();

                        if (currentPateNum.value === 1) {
                            scrollToBottom();
                        } else {
                            requestAnimationFrame(() => {
                                scrollToIndexWrapper(newMessages.length - 1);
                            });
                        }
                    }
                    if (newMessages.length < PAGE_SIZE) {
                        hasMore.value = false;
                    } else {
                        currentPateNum.value++;
                    }
                }
            } catch (error) {
            } finally {
                isLoadingData.value = false;
            }
        }

        function scrollToTopHandler() {
            loadData();
        }

        onMounted(async () => {
            await loadData();
        });

        // 暴露的方法

        function scrollToIndexWrapper(index) {
            nextTick(() => {
                scrollerRef.value?.scrollToItem(index, { align: "start", behavior: "auto" });
            });
        }

        function scrollToBottom() {
            nextTick(() => {
                scrollerRef.value?.scrollToBottom();
            });
        }

        function addNewMessage(newMessage) {
            messages.value.push(newMessage);

            scrollToBottom();
        }

        expose({ scrollToIndexWrapper, scrollToBottom, addNewMessage });

        return {
            scrollerRef,
            messages,
            isLoadingData,
            scrollToTopHandler,
            shouldShowTime
        };
    }
};
