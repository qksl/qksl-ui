<template>
  <ul :class="simpleWrapClasses" :style="styles" v-if="simple">
    <li title="上一页" :class="prevClasses" @click="prev">
      <a>
        <i class="bt-icon bt-icon-left"></i>
      </a>
    </li>
    <div :class="simplePagerClasses" :title="currentPage + '/' + allPages">
      <input
        type="text"
        :value="currentPage"
        autocomplete="off"
        spellcheck="false"
        @keydown="keyDown"
        @keyup="keyUp"
        @change="keyUp"
      />
      <span>/</span>
      {{ allPages }}
    </div>
    <li title="下一页" :class="nextClasses" @click="next">
      <a>
        <i class="bt-icon bt-icon-right"></i>
      </a>
    </li>
  </ul>
  <ul :class="wrapClasses" :style="styles" v-else>
    <span :class="[prefixCls + '-total']" v-if="showTotal">共 {{ total }} 页</span>
    <li title="上一页" :class="prevClasses" @click="prev">
      <a>
        <template v-if="prevText !== ''">{{ prevText }}</template>
        <i v-else class="bt-icon bt-icon-left"></i>
      </a>
    </li>
    <li title="1" :class="firstPageClasses" @click="changePage(1)">
      <a>1</a>
    </li>
    <li
      title="上5页"
      v-if="currentPage > 5"
      :class="[prefixCls + '-item-jump-prev']"
      @click="fastPrev"
    >
      <a>
        <i class="bt-icon bt-icon-d-arrow-left"></i>
      </a>
    </li>
    <li
      :title="currentPage - 3"
      v-if="currentPage === 5"
      :class="[prefixCls + '-item']"
      @click="changePage(currentPage - 3)"
    >
      <a>{{ currentPage - 3 }}</a>
    </li>
    <li
      :title="currentPage - 2"
      v-if="currentPage - 2 > 1"
      :class="[prefixCls + '-item']"
      @click="changePage(currentPage - 2)"
    >
      <a>{{ currentPage - 2 }}</a>
    </li>
    <li
      :title="currentPage - 1"
      v-if="currentPage - 1 > 1"
      :class="[prefixCls + '-item']"
      @click="changePage(currentPage - 1)"
    >
      <a>{{ currentPage - 1 }}</a>
    </li>
    <li
      :title="currentPage"
      v-if="currentPage != 1 && currentPage != allPages"
      :class="[prefixCls + '-item',prefixCls + '-item-active']"
    >
      <a>{{ currentPage }}</a>
    </li>
    <li
      :title="currentPage + 1"
      v-if="currentPage + 1 < allPages"
      :class="[prefixCls + '-item']"
      @click="changePage(currentPage + 1)"
    >
      <a>{{ currentPage + 1 }}</a>
    </li>
    <li
      :title="currentPage + 2"
      v-if="currentPage + 2 < allPages"
      :class="[prefixCls + '-item']"
      @click="changePage(currentPage + 2)"
    >
      <a>{{ currentPage + 2 }}</a>
    </li>
    <li
      :title="currentPage + 3"
      v-if="allPages - currentPage === 4"
      :class="[prefixCls + '-item']"
      @click="changePage(currentPage + 3)"
    >
      <a>{{ currentPage + 3 }}</a>
    </li>
    <li
      title="下5页"
      v-if="allPages - currentPage >= 5"
      :class="[prefixCls + '-item-jump-next']"
      @click="fastNext"
    >
      <a>
        <i class="bt-icon bt-icon-d-arrow-right"></i>
      </a>
    </li>
    <li
      :title="allPages"
      v-if="allPages > 1"
      :class="lastPageClasses"
      @click="changePage(allPages)"
    >
      <a>{{ allPages }}</a>
    </li>
    <li title="下一页" :class="nextClasses" @click="next">
      <a>
        <template v-if="nextText !== ''">{{ nextText }}</template>
        <i v-else class="bt-icon bt-icon-right"></i>
      </a>
    </li>
  </ul>
</template>
<script>
/* eslint-disable */
const prefixCls = "bt-page";
export default {
  name: "Page",
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizeOpts: {
      type: Array,
      default() {
        return [10, 20, 30, 40];
      }
    },
    placement: {
      validator(value) {
        const validList = ["top", "bottom"];
        for (let i = 0; i < validList.length; i++) {
          if (value === validList[i]) {
            return true;
          }
        }
        return false;
      },
      default: "bottom"
    },
    transfer: {
      type: Boolean,
      default() {
        return !this.$IVIEW || this.$IVIEW.transfer === ""
          ? false
          : this.$IVIEW.transfer;
      }
    },
    size: {
      validator(value) {
        const validList = ["small"];
        for (let i = 0; i < validList.length; i++) {
          if (value === validList[i]) {
            return true;
          }
        }
        return false;
      }
    },
    simple: {
      type: Boolean,
      default: false
    },
    showTotal: {
      type: Boolean,
      default: false
    },
    showElevator: {
      type: Boolean,
      default: false
    },
    showSizer: {
      type: Boolean,
      default: false
    },
    className: {
      type: String
    },
    styles: {
      type: Object
    },
    prevText: {
      type: String,
      default: ""
    },
    nextText: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      prefixCls: prefixCls,
      currentPage: this.current,
      currentPageSize: this.pageSize
    };
  },
  watch: {
    total(val) {
      let maxPage = Math.ceil(val / this.currentPageSize);
      if (maxPage < this.currentPage) {
        this.currentPage = maxPage === 0 ? 1 : maxPage;
      }
    },
    current(val) {
      this.currentPage = val;
    },
    pageSize(val) {
      this.currentPageSize = val;
    }
  },
  computed: {
    isSmall() {
      return !!this.size;
    },
    allPages() {
      const allPage = Math.ceil(this.total / this.currentPageSize);
      return allPage === 0 ? 1 : allPage;
    },
    simpleWrapClasses() {
      return [
        `${prefixCls}`,
        `${prefixCls}-simple`,
        {
          [`${this.className}`]: !!this.className
        }
      ];
    },
    simplePagerClasses() {
      return `${prefixCls}-simple-pager`;
    },
    wrapClasses() {
      return [
        `${prefixCls}`,
        {
          [`${this.className}`]: !!this.className,
          mini: !!this.size
        }
      ];
    },
    prevClasses() {
      return [
        `${prefixCls}-prev`,
        {
          [`${prefixCls}-disabled`]: this.currentPage === 1,
          [`${prefixCls}-custom-text`]: this.prevText !== ""
        }
      ];
    },
    nextClasses() {
      return [
        `${prefixCls}-next`,
        {
          [`${prefixCls}-disabled`]: this.currentPage === this.allPages,
          [`${prefixCls}-custom-text`]: this.nextText !== ""
        }
      ];
    },
    firstPageClasses() {
      return [
        `${prefixCls}-item`,
        {
          [`${prefixCls}-item-active`]: this.currentPage === 1
        }
      ];
    },
    lastPageClasses() {
      return [
        `${prefixCls}-item`,
        {
          [`${prefixCls}-item-active`]: this.currentPage === this.allPages
        }
      ];
    }
  },
  methods: {
    changePage(page) {
      if (this.currentPage != page) {
        this.currentPage = page;
        this.$emit("update:current", page);
        this.$emit("on-change", page);
      }
    },
    prev() {
      const current = this.currentPage;
      if (current <= 1) {
        return false;
      }
      this.changePage(current - 1);
    },
    next() {
      const current = this.currentPage;
      if (current >= this.allPages) {
        return false;
      }
      this.changePage(current + 1);
    },
    fastPrev() {
      const page = this.currentPage - 5;
      if (page > 0) {
        this.changePage(page);
      } else {
        this.changePage(1);
      }
    },
    fastNext() {
      const page = this.currentPage + 5;
      if (page > this.allPages) {
        this.changePage(this.allPages);
      } else {
        this.changePage(page);
      }
    },
    onSize(pageSize) {
      this.currentPageSize = pageSize;
      this.$emit("on-page-size-change", pageSize);
      this.changePage(1);
    },
    onPage(page) {
      this.changePage(page);
    },
    keyDown(e) {
      const key = e.keyCode;
      const condition =
        (key >= 48 && key <= 57) ||
        (key >= 96 && key <= 105) ||
        key === 8 ||
        key === 37 ||
        key === 39;
      if (!condition) {
        e.preventDefault();
      }
    },
    keyUp(e) {
      const key = e.keyCode;
      const val = parseInt(e.target.value);
      if (key === 38) {
        this.prev();
      } else if (key === 40) {
        this.next();
      } else if (key === 13) {
        let page = 1;
        if (val > this.allPages) {
          page = this.allPages;
        } else if (val <= 0 || !val) {
          page = 1;
        } else {
          page = val;
        }
        e.target.value = page;
        this.changePage(page);
      }
    }
  }
};
</script>

<style lang="scss">
.bt-icon{
  color: #2d8cf0;
}
.bt-page:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  overflow: hidden;
  visibility: hidden;
}

.bt-page-item {
  display: inline-block;
  vertical-align: middle;
  min-width: 32px;
  height: 32px;
  line-height: 30px;
  margin-right: 4px;
  text-align: center;
  list-style: none;
  background-color: #fff;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
  font-family: Arial;
  font-weight: 500;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  transition: border 0.2s ease-in-out, color 0.2s ease-in-out;
}

.bt-page-item a {
  font-family: Monospaced Number;
  margin: 0 6px;
  text-decoration: none;
  color: #515a6e;
}

.bt-page-item:hover {
  border-color: #2d8cf0;
}

.bt-page-item:hover a {
  color: #2d8cf0;
}

.bt-page-item-active {
  border-color: #2d8cf0;
}

.bt-page-item-active:hover a,
.bt-page-item-active a {
  color: #2d8cf0;
}

.bt-page-item-jump-next:after,
.bt-page-item-jump-prev:after {
  content: "\2022\2022\2022";
  display: block;
  letter-spacing: 1px;
  color: #ccc;
  text-align: center;
}

.bt-page-item-jump-next:hover:after,
.bt-page-item-jump-next i,
.bt-page-item-jump-prev:hover:after,
.bt-page-item-jump-prev i {
  display: none;
}

.bt-page-item-jump-next:hover i,
.bt-page-item-jump-prev:hover i {
  display: inline;
}

.bt-page-item-jump-prev:hover i:after {
  // content: "\F115";
  margin-left: -8px;
}

.bt-page-item-jump-next:hover i:after {
  // content: "\F11F";
  margin-left: -8px;
}

.bt-page-item-jump-next,
.bt-page-item-jump-prev,
.bt-page-prev {
  margin-right: 4px;
}

.bt-page-item-jump-next,
.bt-page-item-jump-prev,
.bt-page-next,
.bt-page-prev {
  display: inline-block;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  min-width: 32px;
  height: 32px;
  line-height: 30px;
  list-style: none;
  text-align: center;
  cursor: pointer;
  color: #666;
  font-family: Arial;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
}

.bt-page-item-jump-next,
.bt-page-item-jump-prev {
  border-color: transparent;
}

.bt-page-next,
.bt-page-prev {
  background-color: #fff;
}

.bt-page-next a,
.bt-page-prev a {
  color: #666;
  font-size: 14px;
}

.bt-page-next:hover,
.bt-page-prev:hover {
  border-color: #2d8cf0;
}

.bt-page-next:hover a,
.bt-page-prev:hover a {
  color: #2d8cf0;
}

.bt-page-disabled {
  cursor: not-allowed;
}

.bt-page-disabled a {
  color: #ccc;
}

.bt-page-disabled:hover {
  border-color: #dcdee2;
}

.bt-page-disabled:hover a {
  color: #ccc;
  cursor: not-allowed;
}

.bt-page-options {
  display: inline-block;
  vertical-align: middle;
  margin-left: 15px;
}

.bt-page-options-sizer {
  display: inline-block;
  margin-right: 10px;
}

.bt-page-options-elevator {
  display: inline-block;
  vertical-align: middle;
  height: 32px;
  line-height: 32px;
}

.bt-page-options-elevator input {
  display: inline-block;
  width: 100%;
  height: 32px;
  line-height: 1.5;
  padding: 4px 7px;
  font-size: 12px;
  border: 1px solid #dcdee2;
  color: #515a6e;
  background-color: #fff;
  background-image: none;
  position: relative;
  cursor: text;
  transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  border-radius: 4px;
  margin: 0 8px;
  width: 50px;
}

.bt-page-options-elevator input::-moz-placeholder {
  color: #c5c8ce;
  opacity: 1;
}

.bt-page-options-elevator input:-ms-input-placeholder {
  color: #c5c8ce;
}

.bt-page-options-elevator input::-webkit-input-placeholder {
  color: #c5c8ce;
}

.bt-page-options-elevator input:hover {
  border-color: #57a3f3;
}

.bt-page-options-elevator input:focus {
  border-color: #57a3f3;
  outline: 0;
  box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.2);
}

.bt-page-options-elevator input[disabled],
fieldset[disabled] .bt-page-options-elevator input {
  background-color: #f3f3f3;
  opacity: 1;
  cursor: not-allowed;
  color: #ccc;
}

.bt-page-options-elevator input[disabled]:hover,
fieldset[disabled] .bt-page-options-elevator input:hover {
  border-color: #e3e5e8;
}

textarea.bt-page-options-elevator input {
  max-width: 100%;
  height: auto;
  min-height: 32px;
  vertical-align: bottom;
  font-size: 14px;
}

.bt-page-options-elevator input-large {
  font-size: 14px;
  padding: 6px 7px;
  height: 36px;
}

.bt-page-options-elevator input-small {
  padding: 1px 7px;
  height: 24px;
  border-radius: 3px;
}

.bt-page-total {
  display: inline-block;
  height: 32px;
  line-height: 32px;
  margin-right: 10px;
}

.bt-page-simple .bt-page-next,
.bt-page-simple .bt-page-prev {
  margin: 0;
  border: 0;
  height: 24px;
  line-height: normal;
  font-size: 18px;
}

.bt-page-simple .bt-page-simple-pager {
  display: inline-block;
  margin-right: 8px;
  vertical-align: middle;
}

.bt-page-simple .bt-page-simple-pager input {
  width: 30px;
  height: 24px;
  margin: 0 8px;
  padding: 5px 8px;
  text-align: center;
  box-sizing: border-box;
  background-color: #fff;
  outline: 0;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  transition: border-color 0.2s ease-in-out;
}

.bt-page-simple .bt-page-simple-pager input:hover {
  border-color: #2d8cf0;
}

.bt-page-simple .bt-page-simple-pager span {
  padding: 0 8px 0 2px;
}

.bt-page-custom-text,
.bt-page-custom-text:hover {
  border-color: transparent;
}

.bt-page.mini .bt-page-total {
  height: 24px;
  line-height: 24px;
}

.bt-page.mini .bt-page-item {
  border: 0;
  margin: 0;
  min-width: 24px;
  height: 24px;
  line-height: 24px;
  border-radius: 3px;
}

.bt-page.mini .bt-page-next,
.bt-page.mini .bt-page-prev {
  margin: 0;
  min-width: 24px;
  height: 24px;
  line-height: 22px;
  border: 0;
}

.bt-page.mini .bt-page-next a i:after,
.bt-page.mini .bt-page-prev a i:after {
  height: 24px;
  line-height: 24px;
}

.bt-page.mini .bt-page-item-jump-next,
.bt-page.mini .bt-page-item-jump-prev {
  height: 24px;
  line-height: 24px;
  border: none;
  margin-right: 0;
}

.bt-page.mini .bt-page-options {
  margin-left: 8px;
}

.bt-page.mini .bt-page-options-elevator {
  height: 24px;
  line-height: 24px;
}

.bt-page.mini .bt-page-options-elevator input {
  padding: 1px 7px;
  height: 24px;
  border-radius: 3px;
  width: 44px;
}
</style>
