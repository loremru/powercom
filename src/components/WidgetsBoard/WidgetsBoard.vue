﻿<script setup>
/* eslint-disable vue/no-v-for-template-key-on-child */
import { defineProps, ref, onMounted, computed, onUnmounted } from "vue";
import { SmartWidgetGrid } from "vue-smart-widget";
import { WidgetCard } from "@/components/WidgetCard";
import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { ContextMenu } from "@/components/ContextMenu";
import TreeData from "@/components/TreeData";
import AdvancedFilter from "@/components/AdvancedFilter";
import Search from "@/components/Search";
import {
  IconModeEdit,
  IconCheckCircle,
  IconPageView,
  IconContentAdd,
} from "@/components/Icon";

const props = defineProps({
  layout: {
    type: Array,
    required: true,
  },
  aviableWidgets: {
    type: Array,
    default: ()=> []
  }
});
const isEditMode = ref(false);
const isShowAddNew = ref(false);
const items = ref([]);
const rowHeight = ref(38);
const filteredData = ref([]);
const windowWidth = ref(window.innerWidth);

// watch(
//   () => windowWidth,
//   (newValue) => {
//     console.log(newValue)
//   }
// );

// const type = computed(() => {
//   if (windowWidth.value < 550) return 'xs'
//   if (windowWidth.value >= 550 && windowWidth.value < 1200) return 'md'
//   if (windowWidth.value >= 1200) return 'lg'
//   return null; // This is an unreachable line, simply to keep eslint happy.
// })

// const width = computed(() => windowWidth.value)

const rowHeightComputed = computed(() => {
  return rowHeight.value;
});

const onClickEditHandler = () => {
  isEditMode.value = !isEditMode.value;
};

const onWidgetCloseHandler = (item) => {
  if (isEditMode.value) {
    items.value = items.value.filter((value) => value !== item);
  }
};
const addWidgetHandler = (item) => {
  items.value.push(item);
};
const onWidthChange = () => {
  windowWidth.value = window.innerWidth;
  console.log(windowWidth.value);
};

// lifecycle hooks
onMounted(() => {
  items.value = props.layout;
  window.addEventListener("resize", onWidthChange);
});
onUnmounted(() => window.removeEventListener("resize", onWidthChange));




const treeData = ref([
  {
    name: "Israel",
    children: [
      {
        name: "DEMO",
        children: [{ name: "Fedor_Demo" }],
      },
    ],
  },
  {
    name: "DEMO",
    children: [
      {
        name: "DEMO",
        children: [{ name: "Fedor_Demo" }],
      },
    ],
  },
  {
    name: "DEMO",
    children: [
      {
        name: "DEMO",
        children: [{ name: "Fedor_Demo" }],
      },
    ],
  },
  {
    name: "DEMO",
    children: [
      {
        name: "DEMO",
        children: [{ name: "Fedor_Demo2", categories: [ "postpaid" ]}],
      },
    ],
  },
  {
    name: "DEMO",
    children: [
      {
        name: "DEMO1",
        categories: [ "prepaid" ],
        children: [{ name: "Fedor_Demo_payment" }],
      },
    ],
  },
]);
const categories = ref([
    {
      id: "paymentType",
      name: "Payment type",
      inputType: "select",
      options: [
        {title: "Prepaid", value: "prepaid", selected: "checked"},
        {title: "Postpaid", value: "postpaid", selected: "unchecked"}
      ]
    },
    {
      id: "rateType",
      name: "Rate type",
      inputType: "select",
      options: [
        {title: "Placeholder", value: "Placeholder", selected: "checked"},
        {title: "Area", value: "Area", selected: "unchecked"}
      ]
    },
    {
      id: "connectionType",
      name: "Connection type",
      inputType: "select",
      options: [
        {title: "Wifi", value: "Wifi", selected: "checked"},
        {title: "Lan", value: "Lan", selected: "unchecked"}
      ]
    },
    {
      id: "netMetering",
      name: "Net metering",
      inputType: "input",
      value: "meter"
    },
]);
const filteredTree = ref([]);
</script>

<template>
  <div :class="$style.widgetsBoard">
    <div :class="$style.gridHeader">
      <div :class="$style.mbL">
        <h4 :class="[$style.title4, $style.mbXSS]">Recently Used</h4>
        <div :class="$style.btnControlsWrapper">
          <Button title="Inventory" color="purple" size="M" outline responsive></Button>
          <Button title="Workorder" color="purple" size="M" outline responsive></Button>
          <Button title="Assets" color="purple" size="M" outline responsive></Button>
          <Button title="Commands" color="purple" size="M" outline responsive></Button>
          <Button
            title="Command Results"
            color="purple"
            size="M"
            outline
            responsive
          ></Button>
          <Button title="Alerts/Vee" color="purple" size="M" outline responsive></Button>
        </div>
      </div>
      <div :class="[$style.mbXSS, $style.flex]">
        <h4 :class="[$style.title4]">
          Current Area:
          <span @contextmenu.prevent="$refs.menu.open">Fedor_Demo</span>
        </h4>
        <ContextMenu>
         <template #activator>
          <IconArrowDropDown height="12" width="12" />
         </template>
         <template #content>
           <div :class="$style.contextMenuContent">
            <div :class="[$style.mbXS]">
              <AdvancedFilter v-model="filteredTree" :data="treeData" :categories="categories"/>
            </div>
            <TreeData :items="filteredTree" />
           </div>
         </template>
         </ContextMenu>
      </div>
      <div :class="[$style.flex, $style.justifyBetween]">
        <Button title="View details" color="purple" size="M">
          <template #prepend>
            <IconPageView />
          </template>
          <template #append>
            <IconChevronRight width="16" height="16" />
          </template>
        </Button>
        <Button
          :title="isEditMode ? 'Apply' : 'Edit'"
          :color="isEditMode ? 'green' : 'purple'"
          @click="onClickEditHandler"
          size="M"
        >
          <template #prepend>
            <IconCheckCircle v-if="isEditMode" />
            <IconModeEdit v-else />
          </template>
        </Button>
      </div>
      <div v-if="isEditMode" :class="$style.mtS">
        <Button
          title="Add New"
          color="purple"
          size="L"
          @click="isShowAddNew = true"
          solid
        >
          <template #prepend>
            <IconContentAdd />
          </template>
        </Button>
      </div>
    </div>
    <div :class="$style.gridWrapper">
      <smart-widget-grid
        :layout="items"
        :isStatic="!isEditMode"
        responsive
        resizable
        :margin="[24, 24]"
        :cols="{ lg: 10, md: 8, sm: 8, xs: 4, xxs: 2 }"
        :rowHeight="rowHeightComputed"
      >
        <template v-for="item in items" v-slot:[item.i]>
          <WidgetCard
            :key="item.i"
            :title="item.title"
            :color="item.color"
            :template="item.template"
            :indicators="item.indicators"
            :chart="item.chart"
            :isEditMode="isEditMode"
            :isPreviewMode="item.type === 'prewievWidget'"
            :previewUrl="item.previewUrl"
            :content="item.content"
            :isCharts="true"
            :selector="item.selector"
            :padding="0"
            @widget:close="onWidgetCloseHandler(item)"
          />
        </template>
      </smart-widget-grid>
    </div>
    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <Modal
        :isShowModal="isShowAddNew"
        @close="isShowAddNew = false"
        isClosable
      >
        <template #header>
          <h3 :class="[$style.title3, $style.mbXS]">Add New</h3>
          <div :class="[$style.mbS, $style.controls]">
            <Search
              v-model="filteredData"
              :data="props.aviableWidgets"
              searchField="title"
              outline
            >
            </Search>
          </div>
        </template>
        <template #body>
          <div v-if="filteredData.length" :class="$style.previewGrid">
            <div
              v-for="item in filteredData"
              :key="item.id"
              :class="[$style.previewGridItem, $style[item.template]]"
            >
              <WidgetCard
                :key="item.id"
                :title="item.title"
                :color="item.color"
                :template="item.template"
                :indicators="item.indicators"
                :chart="item.chart"
                :isEditMode="isEditMode"
                :isPreviewMode="true"
                :previewUrl="item.previewUrl"
                :content="item.content"
                @widget:close="onWidgetCloseHandler(item)"
                :padding="0"
                :selector="item.selector"
              />
              <div :class="$style.previewGridItemOverlay"></div>
              <span :class="$style.previewAddButton">
                <Button
                  title="Add"
                  @click="addWidgetHandler(item)"
                  size="L"
                  color="purple"
                  solid
                  shadow
                />
              </span>
            </div>
          </div>
          <p v-else>No matches found.</p>
        </template>
      </Modal>
    </Teleport>
  </div>
</template>

<style lang="scss" module>
@import "WidgetsBoard.module";
@import "@/assets/styles/utils.module";
</style>
