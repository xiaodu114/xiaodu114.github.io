import { ref, computed, watchEffect, nextTick, watch } from "vue";
import { useVirtualizer } from "@tanstack/vue-virtual";
import { useInfiniteQuery, useQueryClient } from "@tanstack/vue-query";
import { getHistoryMessageList } from "../../api/im.js";

export default {
    name: "du-im-message-list",
    template: "#du-im-message-list-template",
    props: {},
    emits: ["update-status"], // 可选：向父组件通知连接状态等
    setup(props, { expose, emit }) {
        const ESTIMATED_ITEM_HEIGHT = 120;
        const PAGE_SIZE = 24;

        const rootRef = ref(null);
        const isLoadingData = ref(false);
        const isInitialLoad = ref(true);

        const queryClient = useQueryClient();

        // -----------------------------------------------------------
        // 1. 数据查询
        // -----------------------------------------------------------
        async function getHistoryMessageListWrapper(pageNum) {
            const items = await getHistoryMessageList(PAGE_SIZE, pageNum, allMessages.value[0]?.timestamp);
            return {
                items,
                currentPageCount: items.length,
                nextPageNum: pageNum + 1,
                hasMore: items.length === PAGE_SIZE
            };
        }

        const { status, data, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
            queryKey: ["im-messages"],
            queryFn: ({ pageParam = 1 }) => getHistoryMessageListWrapper(pageParam),
            getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextPageNum : undefined),
            initialPageParam: 1
        });

        // 计算所有消息并排序 (旧 -> 新)
        const allMessages = computed(() => {
            if (!data.value) return [];
            // 翻转 pages，因为第0页是最新的，我们需要从旧到新显示
            const reversedPages = [...data.value.pages].reverse();
            return reversedPages.flatMap((page) => page.items);
        });

        // -----------------------------------------------------------
        // 2. 虚拟滚动逻辑
        // -----------------------------------------------------------

        const calcVirtualizerOptions = computed(() => {
            return {
                count: allMessages.value.length + (isLoadingData.value ? 1 : 0),
                getScrollElement: () => rootRef.value,
                estimateSize: () => ESTIMATED_ITEM_HEIGHT,
                overscan: 5,
                measureElement: (element) => {
                    return element?.querySelector(".message-item-wrapper")?.getBoundingClientRect()?.height || ESTIMATED_ITEM_HEIGHT;
                }
            };
        });

        const virtualizer = useVirtualizer(calcVirtualizerOptions);
        const virtualItems = computed(() => virtualizer.value.getVirtualItems());
        const totalSize = computed(() => virtualizer.value.getTotalSize());

        function scrollToIndexWrapper(index) {
            nextTick(() => {
                if (virtualizer.value) {
                    virtualizer.value.scrollToIndex(index);
                }
            });
        }

        // -----------------------------------------------------------
        // 3. 滚动与加载更多逻辑
        // -----------------------------------------------------------

        // 监听滚动，触发加载历史
        watchEffect((onCleanup) => {
            const [firstItem] = virtualItems.value;
            if (!firstItem || isLoadingData.value) return;

            const isNearTop = firstItem.start < ESTIMATED_ITEM_HEIGHT;
            if (isNearTop && hasNextPage.value) {
                const timer = setTimeout(() => {
                    loadPrevious();
                }, 200);
                onCleanup(() => clearTimeout(timer));
            }
        });

        // 加载历史消息
        const loadPrevious = async () => {
            if (isLoadingData.value || isFetchingNextPage.value) return;

            isLoadingData.value = true;
            const currentPageNum = data.value?.pages?.length ? data.value.pages.length + 1 : 1;
            const result = await fetchNextPage({ pageParam: currentPageNum });
            const { pages } = result?.data || {};
            let newMessagesLen = 0;
            if (Array.isArray(pages) && pages.length > 0) {
                const lastPage = pages[pages.length - 1];
                newMessagesLen = lastPage.currentPageCount;
            }
            await nextTick();
            scrollToIndexWrapper(newMessagesLen - 1);
            isLoadingData.value = false;
        };

        // 监听数据变化，初始加载完成后滚动到底部
        watch(allMessages, (newMessages) => {
            if (isInitialLoad.value && newMessages.length > 0) {
                isInitialLoad.value = false; // 只触发一次
                scrollToBottom();
            }
        });

        // -----------------------------------------------------------
        // 5. 辅助函数
        // -----------------------------------------------------------

        const shouldShowTime = (index) => {
            if (index === 0) return true;
            const currentMsg = allMessages.value[index];
            const prevMsg = allMessages.value[index - 1];
            if (!currentMsg || !prevMsg) return true;
            const currentDate = new Date(currentMsg.timestamp);
            const prevDate = new Date(prevMsg.timestamp);
            if (currentDate.toDateString() !== prevDate.toDateString()) return true;
            const timeDiff = Math.abs(currentMsg.timestamp - prevMsg.timestamp);
            return Math.floor(timeDiff / (1000 * 60)) >= 30;
        };

        // 暴露给父组件的方法

        function scrollToBottom() {
            if (allMessages.value.length > 0) {
                scrollToIndexWrapper(allMessages.value.length - 1);
            }
        }

        function addNewMessage(newMessage) {
            queryClient.setQueryData(["im-messages"], (oldData) => {
                if (!oldData) return oldData;
                const newPages = [...oldData.pages];
                const lastPageIndex = newPages.length - 1;
                newPages[lastPageIndex] = {
                    ...newPages[lastPageIndex],
                    items: [...newPages[lastPageIndex].items, newMessage]
                };
                return {
                    ...oldData,
                    pages: newPages
                };
            });

            scrollToBottom();
        }

        expose({ scrollToBottom, addNewMessage });

        return {
            rootRef,
            status,
            error,
            allMessages,
            isLoadingData,
            virtualItems,
            totalSize,
            virtualizer,
            shouldShowTime
        };
    }
};
