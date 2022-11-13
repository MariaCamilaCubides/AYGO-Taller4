<template>
    <div :class="externalCard">
      <slot name="Pre-header">
        <div :class="middleCard">
          <slot name="external-header" />
          <slot name="external-body">
            <div
              :class="internalCard"
              :style="styleInternalCard"
            >
              <div
                :style="styleInternalHeader"
              >
                <slot name="header" />
              </div>
              <slot name="body" />
              <slot name="footer" />
            </div>
          </slot>
          <slot name="external-footer" />
        </div>
      </slot>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CardComponent',
    props: {
      externalCard: {
        type: String,
        default: '',
      },
      middleCard: {
        type: String,
        default: '',
      },
      internalCard: {
        type: String,
        default: '',
      },
      styleInternalHeader: {
        type: String,
        default: 'display: flex',
      },
      styleInternalCard: {
        type: String,
        default: '',
      },
    },
  };
  </script>