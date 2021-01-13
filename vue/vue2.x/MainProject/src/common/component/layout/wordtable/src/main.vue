<template>
    <div
        class="word-table"
        :class="{
      designtimemode: mode==='DesignTime',
      runtimemode: mode==='RunTime'}"
    >
        <template v-if="mode==='DesignTime'">
            <div
                v-if="wordTableCells.length===0"
                @click="initFirstCell"
            >
                <slot name="nulltemplate"></slot>
            </div>
            <div
                class="word-table-cell"
                v-for="(cell,index) of wordTableCells"
                :key="index"
                @click.ctrl="selectCellsByPressCtrl(cell,index)"
                @contextmenu.prevent="cellRightClickToShowContextMenu(cell,index,$event)"
                :class="{activeinsertrow:(cell.rowEnd===quickInsertRowIndex||(cell.rowStart<quickInsertRowIndex&&cell.rowEnd>quickInsertRowIndex)),
      activeinsertcolumn:cell.columnStart===quickInsertColumnIndex||(cell.columnStart<quickInsertColumnIndex&&cell.columnEnd>quickInsertColumnIndex),
      activeinsertcolumnlast:isActiveInsertColumnLast,
      hastopborder:cell.rowStart===1,
      hasleftborder:cell.columnStart===1,
      activemergecell:tempSelectedCellsToMerge.indexOf(cell)>=0}"
                :style="{gridColumnStart: cell.columnStart, gridColumnEnd:cell.columnEnd,gridRowStart: cell.rowStart ,gridRowEnd: cell.rowEnd }"
            >
                <!-- 单元格内容区域 -->
                <div class="cell-content-wrapper">
                    <slot
                        name="celltemplate"
                        v-bind:wordtablecell="cell"
                    ></slot>
                </div>
                <!-- 设计时操作区域 -->
                <template>
                    <div class="quick-insert-column">
                        <div
                            class="circle-plus"
                            @click="quickInsertColumnCircleClickToInsertOneColumn(cell)"
                            @mouseover="quickInsertColumnCircleMoveOverFn(cell)"
                            @mouseout="quickInsertColumnCircleMoveOutFn"
                            v-if="cell.rowStart===1&&cell.columnStart>1"
                        >
                            <div class="icon plus"></div>
                        </div>
                        <div class="line"></div>
                    </div>
                    <div
                        class="quick-insert-last-column"
                        v-if="cell.columnEnd===maxGridColumnEnd"
                    >
                        <div
                            class="circle-plus"
                            @click="quickInsertLastColumnCircleClickToInsertLastColumn(cell)"
                            @mouseover="quickInsertLastColumnCircleMoveOverFn(cell)"
                            @mouseout="quickInsertLastColumnCircleMoveOutFn"
                            v-if="cell.rowStart===1"
                        >
                            <div class="icon plus"></div>
                        </div>
                        <div class="line"></div>
                    </div>
                    <div class="quick-insert-row">
                        <div
                            class="circle-plus"
                            @click="quickInsertRowCircleClickToInsertOneRow(cell)"
                            @mouseover="quickInsertRowCircleMoveOverFn(cell)"
                            @mouseout="quickInsertRowCircleMoveOutFn"
                            v-if="cell.columnStart===1"
                        >
                            <div class="icon plus"></div>
                        </div>
                        <div class="line"></div>
                    </div>
                </template>
            </div>
            <ssfminneruse
                v-if="isShowContextmenu"
                :show-items="availableContextmenuItems"
                :pos="contextmenuPosConfig"
                @item-click="monitorContextmenuItemClickFn"
            ></ssfminneruse>
        </template>
        <template v-else>
            <div
                class="word-table-cell"
                v-for="(cell,index) of wordTableCells"
                :key="index"
                :style="{gridColumnStart: cell.columnStart, gridColumnEnd:cell.columnEnd,gridRowStart: cell.rowStart ,gridRowEnd: cell.rowEnd }"
            >
                <!-- 单元格内容区域 -->
                <div class="cell-content-wrapper">
                    <slot
                        name="celltemplate"
                        v-bind:wordtablecell="cell"
                    ></slot>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
/**
 *  1、依赖的第三方库 lodash
 *  2、
 */
import ssfminneruse from "../../../float-menu/single-stage/index.js";
import { cloneDeep } from "lodash";
export default {
    name: "WordTable",
    props: {
        value: {
            type: Array,
            required: true,
            default() {
                return [];
            },
        },
        mode: {
            type: String,
            default() {
                // DesignTime | RunTime
                return "RunTime";
            },
        },
    },
    watch: {
        value: {
            handler(val, oldVal) {
                this.wordTableCells = cloneDeep(val);
            },
            deep: true,
            immediate: true,
        },
        "wordTableCells.length": {
            handler(val, oldVal) {
                if (val !== oldVal) {
                    this.$emit("input", cloneDeep(this.wordTableCells));
                }
            },
        },
    },
    data() {
        return {
            quickInsertRowIndex: 0,
            quickInsertColumnIndex: 0,
            isActiveInsertColumnLast: false,
            tempSelectedCellsToMerge: [],
            wordTableCells: [],
            wordTableCellsHistory: [],
            wordTableCellsHistoryDelete: [],
            //右键操作菜单相关
            isShowContextmenu: false,
            contextmenuPosConfig: null,
            allContextmenuItems: [
                {
                    text: "在左侧插入列",
                    type: "item",
                    icon: "",
                    extendParameter: null,
                    clickMethod: "contextMenuItemInsertColumnFormLeft",
                    judgeAvailableMethod: "judgeIsShowInsertColumnFormLeft",
                },
                {
                    text: "在右侧插入列",
                    type: "item",
                    icon: "",
                    extendParameter: null,
                    clickMethod: "contextMenuItemInsertColumnFormRight",
                    judgeAvailableMethod: "judgeIsShowInsertColumnFormRight",
                },
                {
                    text: "在上方插入行",
                    type: "item",
                    icon: "",
                    extendParameter: null,
                    clickMethod: "contextMenuItemInsertRowFormTop",
                    judgeAvailableMethod: "judgeIsShowInsertRowFormTop",
                },
                {
                    text: "在下方插入行",
                    type: "item",
                    icon: "",
                    extendParameter: null,
                    clickMethod: "contextMenuItemInsertRowFormBottom",
                    judgeAvailableMethod: "judgeIsShowInsertRowFormBottom",
                },
                {
                    text: "删除单元格-整行",
                    type: "item",
                    icon: "",
                    extendParameter: null,
                    clickMethod: "contextMenuItemDeleteCellWholeRow",
                    judgeAvailableMethod: "judgeIsShowDeleteCellWholeRowColumn",
                },
                {
                    text: "删除单元格-整列",
                    type: "item",
                    icon: "",
                    extendParameter: null,
                    clickMethod: "contextMenuItemDeleteCellWholeColumn",
                    judgeAvailableMethod: "judgeIsShowDeleteCellWholeRowColumn",
                },
                {
                    text: "合并单元格",
                    type: "item",
                    icon: "",
                    extendParameter: null,
                    clickMethod: "contextMenuItemMergeCell",
                    judgeAvailableMethod: "judgeIsShowMergeCell",
                },
                {
                    text: "拆分单元格",
                    type: "item",
                    icon: "",
                    extendParameter: null,
                    clickMethod: "contextMenuItemSplitCell",
                    judgeAvailableMethod: "judgeIsShowSplitCell",
                },
            ],
            availableContextmenuItems: [],
        };
    },
    components: {
        ssfminneruse,
    },
    computed: {
        maxGridColumnEnd() {
            var tempColumnEnds = this.wordTableCells
                .map((x) => x.columnEnd)
                .sort((a, b) => b - a);
            return tempColumnEnds.length ? tempColumnEnds[0] : 2;
        },
    },
    methods: {
        getGUID() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                /[xy]/g,
                function (c) {
                    var r = (16 * Math.random()) | 0;
                    return ("x" == c ? r : (3 & r) | 8)
                        .toString(16)
                        .toUpperCase();
                }
            );
        },
        getDataType(obj) {
            return Object.prototype.toString
                .call(obj)
                .replace(/^\[object\s(\w+)\]$/, "$1")
                .toLowerCase();
        },
        handleDocClickFn() {
            this.isShowContextmenu = false;
        },
        //  ********************************************************************************************************************
        handleDocKeydownCtrlZY(e) {
            if (!((e.keyCode === 90 || e.keyCode === 89) && e.ctrlKey)) {
                return;
            }
            e.preventDefault();
            switch (e.keyCode) {
                case 89: {
                    this.recoveryOperate();
                    break;
                }
                case 90: {
                    this.undoOperate();
                    break;
                }
            }
        },
        updateWordTableCellsHistory() {
            this.wordTableCellsHistory.push(cloneDeep(this.wordTableCells));
        },
        //  ctrl+z撤销操作
        undoOperate() {
            if (this.wordTableCellsHistory.length > 1) {
                //  数据栈中最新的一个出栈
                var tempHistory = this.wordTableCellsHistory.pop();
                //  将上面的数据放在另一个数据中，ctrl+y 使用
                this.wordTableCellsHistoryDelete.push(tempHistory);
                //  获取数据栈中最新的一个并赋值，完成插销操作
                this.wordTableCells = cloneDeep(
                    this.wordTableCellsHistory[
                        this.wordTableCellsHistory.length - 1
                    ]
                );
            }
        },
        //  ctrl+y撤销操作
        recoveryOperate() {
            if (this.wordTableCellsHistoryDelete.length > 0) {
                var tempHistoryDel = this.wordTableCellsHistoryDelete.pop();
                this.wordTableCellsHistory.push(tempHistoryDel);
                this.wordTableCells = cloneDeep(tempHistoryDel);
            }
        },
        //  ********************************************************************************************************************
        //  插入行——鼠标移入事件
        quickInsertRowCircleMoveOverFn(cell) {
            this.quickInsertRowIndex = cell.rowEnd;
        },
        //  插入行——点击事件
        quickInsertRowCircleClickToInsertOneRow(cell) {
            //  1、插入新的一行
            var tempNewCells = [];
            var tempFindWordTableCells = this.wordTableCells
                .filter((x) => x.rowEnd === cell.rowEnd)
                .forEach((x) => {
                    tempNewCells.push({
                        id: this.getGUID(),
                        rowStart: cell.rowEnd,
                        rowEnd: cell.rowEnd + 1,
                        columnStart: x.columnStart,
                        columnEnd: x.columnEnd,
                    });
                });
            //  2、将插入行下方的单元格都向下移动一个单位
            this.wordTableCells.filter((x) => {
                if (x.rowStart >= cell.rowEnd) {
                    x.rowStart++;
                    x.rowEnd++;
                }
                if (x.rowStart < cell.rowEnd && x.rowEnd > cell.rowEnd) {
                    x.rowEnd++;
                }
            });

            //  最后插入新的一行
            this.wordTableCells = this.wordTableCells.concat(tempNewCells);
            this.updateWordTableCellsHistory();
        },
        //  插入行——鼠标移出事件
        quickInsertRowCircleMoveOutFn() {
            this.quickInsertRowIndex = 0;
        },
        //  插入列——鼠标移入事件
        quickInsertColumnCircleMoveOverFn(cell) {
            this.quickInsertColumnIndex = cell.columnStart;
        },
        //  插入列——点击事件
        quickInsertColumnCircleClickToInsertOneColumn(cell) {
            var tempCurrnetColumnStart = cell.columnStart;
            var tempRowEnds = Array.from(
                new Set(
                    this.wordTableCells
                        .map((x) => x.rowEnd)
                        .sort((a, b) => a - b)
                )
            );
            if (tempRowEnds.length) {
                var tempNewCells = [];
                tempRowEnds.map((item, index, arr) => {
                    var tempNewCellRowStart = index === 0 ? 1 : arr[index - 1];
                    var tempNewCellRowEnd = item;
                    var tempFlagCell = this.wordTableCells.find((x) => {
                        return (
                            (x.columnStart === tempCurrnetColumnStart ||
                                (x.columnStart < tempCurrnetColumnStart &&
                                    x.columnEnd > tempCurrnetColumnStart)) &&
                            tempNewCellRowStart >= x.rowStart &&
                            tempNewCellRowEnd <= x.rowEnd
                        );
                    });
                    if (tempFlagCell) {
                        tempNewCells.push({
                            id: this.getGUID(),
                            rowStart: tempNewCellRowStart,
                            rowEnd: tempNewCellRowEnd,
                            columnStart: tempFlagCell.columnStart,
                            columnEnd: tempFlagCell.columnStart + 1,
                        });
                    }
                });

                this.wordTableCells.map((x) => {
                    if (
                        x.columnStart >= tempCurrnetColumnStart ||
                        (x.columnStart < tempCurrnetColumnStart &&
                            x.columnEnd > tempCurrnetColumnStart)
                    ) {
                        x.columnStart++;
                        x.columnEnd++;
                    }
                });
                this.wordTableCells = this.wordTableCells.concat(tempNewCells);
                this.updateWordTableCellsHistory();
            }
        },
        //  插入列——鼠标移出事件
        quickInsertColumnCircleMoveOutFn() {
            this.quickInsertColumnIndex = 0;
        },
        //  插最后一列——鼠标移入事件
        quickInsertLastColumnCircleMoveOverFn(cell) {
            this.isActiveInsertColumnLast = true;
        },
        //  插最后一列——点击事件
        quickInsertLastColumnCircleClickToInsertLastColumn(cell) {
            var tempRowEnds = Array.from(
                new Set(
                    this.wordTableCells
                        .map((x) => x.rowEnd)
                        .sort((a, b) => a - b)
                )
            );
            if (tempRowEnds.length) {
                var tempNewCells = [];
                tempRowEnds.map((item, index, arr) => {
                    tempNewCells.push({
                        id: this.getGUID(),
                        rowStart: index === 0 ? 1 : arr[index - 1],
                        rowEnd: item,
                        columnStart: cell.columnEnd,
                        columnEnd: cell.columnEnd + 1,
                    });
                });
                this.wordTableCells = this.wordTableCells.concat(tempNewCells);
                this.updateWordTableCellsHistory();
            }
        },
        //  插最后一列——鼠标移出事件
        quickInsertLastColumnCircleMoveOutFn(cell) {
            this.isActiveInsertColumnLast = false;
        },
        //  ********************************************************************************************************************
        judgeSelectedCellsShapeIsValid() {
            //  判断选中的所有单元格组成的形状是否是有效的（是否可以合并等）
            var retObj = { isValid: false, area: null };
            var minRowStart = this.tempSelectedCellsToMerge[0].rowStart,
                maxRowEnd = this.tempSelectedCellsToMerge[0].rowEnd,
                minColumnStart = this.tempSelectedCellsToMerge[0].columnStart,
                maxColumnEnd = this.tempSelectedCellsToMerge[0].columnEnd,
                selectedCellsArea = 0,
                maxRangeArea = 0;
            this.tempSelectedCellsToMerge.map((x) => {
                minRowStart =
                    minRowStart > x.rowStart ? x.rowStart : minRowStart;
                minColumnStart =
                    minColumnStart > x.columnStart
                        ? x.columnStart
                        : minColumnStart;
                maxRowEnd = maxRowEnd < x.rowEnd ? x.rowEnd : maxRowEnd;
                maxColumnEnd =
                    maxColumnEnd < x.columnEnd ? x.columnEnd : maxColumnEnd;
                selectedCellsArea +=
                    (x.rowEnd - x.rowStart) * (x.columnEnd - x.columnStart);
            });
            maxRangeArea =
                (maxRowEnd - minRowStart) * (maxColumnEnd - minColumnStart);
            if (selectedCellsArea === maxRangeArea) {
                retObj.isValid = true;
                retObj.area = {
                    rowStart: minRowStart,
                    rowEnd: maxRowEnd,
                    columnStart: minColumnStart,
                    columnEnd: maxColumnEnd,
                };
            }
            return retObj;
        },
        judgeIsShowInsertColumnFormLeft(cell, index) {
            return {
                isShow: true,
                extendParameter: {
                    cellItem: cloneDeep(cell),
                    cellIndex: index,
                },
            };
        },
        judgeIsShowInsertColumnFormRight(cell, index) {
            return {
                isShow: true,
                extendParameter: {
                    cellItem: cloneDeep(cell),
                    cellIndex: index,
                },
            };
        },
        judgeIsShowInsertRowFormTop(cell, index) {
            return {
                isShow: true,
                extendParameter: {
                    cellItem: cloneDeep(cell),
                    cellIndex: index,
                },
            };
        },
        judgeIsShowInsertRowFormBottom(cell, index) {
            return {
                isShow: true,
                extendParameter: {
                    cellItem: cloneDeep(cell),
                    cellIndex: index,
                },
            };
        },
        judgeIsShowDeleteCellWholeRowColumn(cell, index) {
            var retObj = { isShow: false, extendParameter: null };
            if (this.tempSelectedCellsToMerge.indexOf(cell) >= 0) {
                var tempJudgeResult = this.judgeSelectedCellsShapeIsValid();
                if (!tempJudgeResult.isValid) return retObj;
                retObj.isShow = true;
                retObj.extendParameter = cloneDeep(tempJudgeResult.area);
            } else {
                retObj.isShow = true;
                retObj.extendParameter = cloneDeep(cell);
            }
            // if (
            //   this.tempSelectedCellsToMerge.length > 1 &&
            //   this.tempSelectedCellsToMerge.indexOf(cell) >= 0
            // ) {
            //   var tempJudgeResult = this.judgeSelectedCellsShapeIsValid();
            //   if (!tempJudgeResult.isValid) return retObj;
            //   retObj.isShow = true;
            //   retObj.extendParameter = cloneDeep(tempJudgeResult.pos);
            // }
            // retObj.isShow = true;
            // retObj.extendParameter = cloneDeep(cell.pos);
            return retObj;
        },
        judgeIsShowMergeCell(cell, index) {
            var retObj = { isShow: false, extendParameter: null };
            if (this.tempSelectedCellsToMerge.length <= 1) return retObj;
            if (this.tempSelectedCellsToMerge.indexOf(cell) < 0) {
                this.tempSelectedCellsToMerge = [];
                return retObj;
            }
            var tempJudgeResult = this.judgeSelectedCellsShapeIsValid();
            if (tempJudgeResult.isValid) {
                retObj.isShow = true;
                retObj.extendParameter = cloneDeep(tempJudgeResult.area);
            }
            return retObj;
        },
        judgeIsShowSplitCell(cell, index) {
            var retObj = { isShow: false, extendParameter: null };
            if (
                this.tempSelectedCellsToMerge.length > 1 &&
                this.tempSelectedCellsToMerge.indexOf(cell) >= 0
            ) {
                return retObj;
            }
            retObj.isShow =
                cell.columnEnd - cell.columnEnd > 1 ||
                cell.rowEnd - cell.rowStart > 1;
            retObj.extendParameter = {
                cellItem: cloneDeep(cell),
                cellIndex: index,
            };
            return retObj;
        },
        contextMenuItemInsertColumnFormLeft(extendParameter) {
            this.quickInsertColumnCircleClickToInsertOneColumn(
                extendParameter.cellItem
            );
        },
        contextMenuItemInsertColumnFormRight(extendParameter) {
            if (extendParameter.cellItem.columnEnd === this.maxGridColumnEnd) {
                this.quickInsertLastColumnCircleClickToInsertLastColumn(
                    extendParameter.cellItem
                );
            } else {
                extendParameter.cellItem.columnStart =
                    extendParameter.cellItem.columnEnd;
                this.quickInsertColumnCircleClickToInsertOneColumn(
                    extendParameter.cellItem
                );
            }
        },
        contextMenuItemInsertRowFormTop(extendParameter) {
            //  1、插入新的一行
            var tempNewCells = [],
                tempNewRowStart = extendParameter.cellItem.rowStart;
            var tempFindWordTableCells = this.wordTableCells
                .filter((x) => x.rowStart === tempNewRowStart)
                .forEach((x) => {
                    tempNewCells.push({
                        id: this.getGUID(),
                        rowStart: tempNewRowStart,
                        rowEnd: tempNewRowStart + 1,
                        columnStart: x.columnStart,
                        columnEnd: x.columnEnd,
                    });
                });
            //  2、将插入行下方的单元格都向下移动一个单位
            this.wordTableCells.filter((x) => {
                if (x.rowStart >= extendParameter.cellItem.rowStart) {
                    x.rowStart++;
                    x.rowEnd++;
                } else if (x.rowEnd > extendParameter.cellItem.rowStart) {
                    x.rowEnd++;
                }
            });
            //  最后插入新的一行
            this.wordTableCells = this.wordTableCells.concat(tempNewCells);
            this.updateWordTableCellsHistory();
        },
        contextMenuItemInsertRowFormBottom(extendParameter) {
            this.quickInsertRowCircleClickToInsertOneRow(
                extendParameter.cellItem
            );
        },
        contextMenuItemDeleteCellWholeRow(extendParameter) {
            var tempRowCounter =
                extendParameter.rowEnd - extendParameter.rowStart;
            for (let i = 0; i < this.wordTableCells.length; ) {
                var tempCell = this.wordTableCells[i],
                    tempWhetherDel = false;
                if (
                    tempCell.rowStart >= extendParameter.rowStart &&
                    tempCell.rowEnd <= extendParameter.rowEnd
                ) {
                    tempWhetherDel = true;
                }
                if (
                    tempCell.rowStart <= extendParameter.rowStart &&
                    tempCell.rowEnd >= extendParameter.rowEnd
                ) {
                    tempCell.rowEnd -= tempRowCounter;
                }
                if (tempCell.rowStart >= extendParameter.rowEnd) {
                    tempCell.rowStart -= tempRowCounter;
                    tempCell.rowEnd -= tempRowCounter;
                }
                if (tempWhetherDel) {
                    this.wordTableCells.splice(i, 1);
                } else i++;
            }
            this.updateWordTableCellsHistory();
        },
        contextMenuItemDeleteCellWholeColumn(extendParameter) {
            var tempColumnCounter =
                extendParameter.columnEnd - extendParameter.columnStart;
            for (let i = 0; i < this.wordTableCells.length; ) {
                var tempCell = this.wordTableCells[i],
                    tempWhetherDel = false;
                if (
                    tempCell.columnStart >= extendParameter.columnStart &&
                    tempCell.columnEnd <= extendParameter.columnEnd
                ) {
                    tempWhetherDel = true;
                }
                if (
                    tempCell.columnStart <= extendParameter.columnStart &&
                    tempCell.columnEnd >= extendParameter.columnEnd
                ) {
                    tempCell.columnEnd -= tempColumnCounter;
                }
                if (tempCell.columnStart >= extendParameter.columnEnd) {
                    tempCell.columnStart -= tempColumnCounter;
                    tempCell.columnEnd -= tempColumnCounter;
                }
                if (tempWhetherDel) {
                    this.wordTableCells.splice(i, 1);
                } else i++;
            }
            this.updateWordTableCellsHistory();
        },
        contextMenuItemMergeCell(extendParameter) {
            //再此条件下可以合并单元格
            for (let i = 0; i < this.wordTableCells.length; ) {
                if (
                    this.tempSelectedCellsToMerge.indexOf(
                        this.wordTableCells[i]
                    ) >= 0
                ) {
                    this.wordTableCells.splice(i, 1);
                } else i++;
            }
            this.tempSelectedCellsToMerge = [];
            this.wordTableCells.push({
                id: this.getGUID(),
                rowStart: extendParameter.rowStart,
                rowEnd: extendParameter.rowEnd,
                columnStart: extendParameter.columnStart,
                columnEnd: extendParameter.columnEnd,
            });
            this.updateWordTableCellsHistory();
        },
        contextMenuItemSplitCell(extendParameter) {
            //  暂时先拆分成最小单位，之后在考虑选择行数和列数
            this.wordTableCells.splice(extendParameter.cellIndex, 1);
            for (
                let i = extendParameter.cellItem.rowStart;
                i < extendParameter.cellItem.rowEnd;
                i++
            ) {
                for (
                    let j = extendParameter.cellItem.columnStart;
                    j < extendParameter.cellItem.columnEnd;
                    j++
                ) {
                    this.wordTableCells.push({
                        id: this.getGUID(),
                        rowStart: i,
                        rowEnd: i + 1,
                        columnStart: j,
                        columnEnd: j + 1,
                    });
                }
            }
            this.updateWordTableCellsHistory();
        },
        //  ********************************************************************************************************************
        //同时按ctrl点击事件：选择单元格
        selectCellsByPressCtrl(cell) {
            if (this.tempSelectedCellsToMerge.indexOf(cell) < 0) {
                this.tempSelectedCellsToMerge.push(cell);
            }
        },
        //单元格右键点击事件
        cellRightClickToShowContextMenu(cell, index, event) {
            this.availableContextmenuItems = [];
            this.allContextmenuItems.forEach((item) => {
                if (
                    item.judgeAvailableMethod &&
                    this.getDataType(this[item.judgeAvailableMethod]) ===
                        "function"
                ) {
                    var tempJudgeResult = this[item.judgeAvailableMethod](
                        cell,
                        index
                    );
                    if (tempJudgeResult && tempJudgeResult.isShow) {
                        this.availableContextmenuItems.push({
                            text: item.text,
                            type: item.type,
                            icon: item.icon,
                            extendParameter: tempJudgeResult.extendParameter
                                ? tempJudgeResult.extendParameter
                                : null,
                            clickMethod: item.clickMethod,
                            judgeAvailableMethod: item.judgeAvailableMethod,
                        });
                    }
                }
            });
            if (this.availableContextmenuItems.length) {
                this.isShowContextmenu = false;
                this.$nextTick(() => {
                    this.isShowContextmenu = true;
                    this.contextmenuPosConfig = {
                        pageX: event.pageX,
                        pageY: event.pageY,
                        margin: 10,
                    };
                });
            }
        },
        monitorContextmenuItemClickFn(item, event) {
            if (this.getDataType(this[item.clickMethod]) === "function") {
                this[item.clickMethod](item.extendParameter);
            }
        },
        //*************************************************************************************************************
        initFirstCell() {
            this.wordTableCells.push({
                id: this.getGUID(),
                rowStart: 1,
                rowEnd: 2,
                columnStart: 1,
                columnEnd: 2,
            });
            this.updateWordTableCellsHistory();
        },
    },
    mounted() {
        document.addEventListener("keydown", this.handleDocKeydownCtrlZY);
        document.addEventListener("click", this.handleDocClickFn);
    },
    created() {},
    beforeDestroy() {
        document.removeEventListener("keydown", this.handleDocKeydownCtrlZY);
        document.removeEventListener("click", this.handleDocClickFn);
    },
};
</script>
<style lang="less">
.word-table {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    &.designtimemode {
        > .word-table-cell {
            position: relative;
            border-right: 1px solid #000;
            border-bottom: 1px solid #000;
            > .cell-content-wrapper {
                // height: 100%;
                // width: 100%;
                // overflow: hidden;
            }
            > .quick-insert-column {
                width: 20px;
                position: absolute;
                left: -11px;
                top: 0;
                bottom: -1px;
                > div {
                    margin-left: auto;
                    margin-right: auto;
                    opacity: 0;
                    transition: opacity 0.2s;
                }
                > .circle-plus {
                    height: 20px;
                    width: 20px;
                    position: absolute;
                    top: -20px;
                    border: 1px solid #3e6db5;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    .icon.plus {
                        height: 100%;
                        width: 100%;
                        position: relative;
                        &:before {
                            content: "";
                            position: absolute;
                            width: 12px;
                            height: 1px;
                            background-color: #3e6db5;
                            left: 50%;
                            margin-left: -6px;
                            top: 50%;
                            margin-top: -0.5px;
                        }
                        &:after {
                            content: "";
                            position: absolute;
                            width: 12px;
                            height: 1px;
                            background-color: #3e6db5;
                            transform: rotate(90deg);
                            left: 50%;
                            margin-left: -6px;
                            top: 50%;
                            margin-top: -0.5px;
                        }
                    }
                }
                > .line {
                    width: 5px;
                    height: 100%;
                    border-left: 1px solid #3e6db5;
                    border-right: 1px solid #3e6db5;
                    cursor: w-resize;
                    background-color: #fff;
                    position: relative;
                    z-index: 1;
                }
            }
            > .quick-insert-last-column {
                width: 20px;
                position: absolute;
                right: -10px;
                top: 0;
                bottom: -1px;
                > div {
                    margin-left: auto;
                    margin-right: auto;
                    opacity: 0;
                    transition: opacity 0.2s;
                }
                > .circle-plus {
                    height: 20px;
                    width: 20px;
                    position: absolute;
                    top: -20px;
                    border: 1px solid #3e6db5;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    .icon.plus {
                        height: 100%;
                        width: 100%;
                        position: relative;
                        &:before {
                            content: "";
                            position: absolute;
                            width: 12px;
                            height: 1px;
                            background-color: #3e6db5;
                            left: 50%;
                            margin-left: -6px;
                            top: 50%;
                            margin-top: -0.5px;
                        }
                        &:after {
                            content: "";
                            position: absolute;
                            width: 12px;
                            height: 1px;
                            background-color: #3e6db5;
                            transform: rotate(90deg);
                            left: 50%;
                            margin-left: -6px;
                            top: 50%;
                            margin-top: -0.5px;
                        }
                    }
                }
                > .line {
                    width: 5px;
                    height: 100%;
                    border-left: 1px solid #3e6db5;
                    border-right: 1px solid #3e6db5;
                    cursor: w-resize;
                    background-color: #fff;
                    position: relative;
                    z-index: 1;
                }
            }
            > .quick-insert-row {
                height: 20px;
                display: flex;
                align-items: center;
                position: absolute;
                bottom: -11px;
                left: 0;
                right: 0;
                > div {
                    opacity: 0;
                    transition: opacity 0.2s;
                }
                > .circle-plus {
                    height: 20px;
                    width: 20px;
                    position: absolute;
                    left: -20px;
                    border: 1px solid #3e6db5;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    .icon.plus {
                        height: 100%;
                        width: 100%;
                        position: relative;
                        &:before {
                            content: "";
                            position: absolute;
                            width: 13px;
                            height: 1px;
                            background-color: #3e6db5;
                            left: 50%;
                            margin-left: -6.5px;
                            top: 50%;
                            margin-top: -0.5px;
                        }
                        &:after {
                            content: "";
                            position: absolute;
                            width: 13px;
                            height: 1px;
                            background-color: #3e6db5;
                            transform: rotate(90deg);
                            left: 50%;
                            margin-left: -6.5px;
                            top: 50%;
                            margin-top: -0.5px;
                        }
                    }
                }
                > .line {
                    height: 5px;
                    border-top: 1px solid #3e6db5;
                    border-bottom: 1px solid #3e6db5;
                    width: 100%;
                    cursor: s-resize;
                    background-color: #fff;
                }
            }
            &.activeinsertrow {
                > .quick-insert-row {
                    > div {
                        opacity: 1;
                    }
                }
            }
            &.activeinsertcolumn {
                > .quick-insert-column {
                    > div {
                        opacity: 1;
                    }
                }
            }
            &.activemergecell {
                background-color: rgb(198, 198, 198);
            }
            &.hastopborder {
                border-top: 1px solid #000;
            }
            &.hasleftborder {
                border-left: 1px solid #000;
            }
            &.activeinsertcolumnlast {
                > .quick-insert-last-column {
                    > div {
                        opacity: 1;
                    }
                }
            }
        }
    }
}
</style>