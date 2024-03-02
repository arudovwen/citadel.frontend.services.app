<template>
  <div class="mt-8">
    <div class="lg:flex justify-between flex-wrap items-center mb-6">
      <h1 class="text-slate-900 font-semibold text-lg">OUTREACH REPORT</h1>
      <button
        @click="handleModal('reportedit')"
        class="outreach-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900"
      >
        <span class="text-lg">
          <Icon icon="ant-design:edit-outlined" />
        </span>
        <span>Edit Report</span>
      </button>
    </div>
    <Card bodyClass="p-6">
      <div class="mb-8">
        <h2 class="text-slate-900 font-medium text-base mb-2">
          Activities Summary
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam
          placeat deleniti exercitationem voluptatibus ipsam, accusamus commodi
          dolore voluptatum. Ratione, recusandae in rem laborum fugiat
          laudantium inventore, beatae harum nostrum vel hic cupiditate
          repudiandae quae pariatur vero labore, distinctio dignissimos.
        </p>
      </div>

      <div>
        <div class="">
          <h2 class="text-slate-900 font-medium text-base mb-2">
            Total Converts
          </h2>
          <div class="flex-1 border rounded">
            <div class="flex gap-x-6 border-b px-4 py-2 justify-between">
              <span class="min-w-[150px]">Adults</span>

              <div class="flex gap-x-5 items-center">
                <span class="flex gap-x-3 items-center"><span></span></span>
                <!-- <div class="border-l h-4"></div>
                  <span class="flex gap-x-3 items-center"
                    ><span>Males</span>-<span>{{
                      detail?.cihAttendances[0]?.adult
                    }}</span></span
                  >
                  <div class="border-l h-4"></div>
                  <span class="flex gap-x-3 items-center"
                    ><span>Females</span>-<span>4</span></span
                  > -->
              </div>
            </div>
            <div class="flex gap-x-6 border-b px-4 py-2 justify-between">
              <span class="min-w-[150px]">Youths</span>

              <div class="flex gap-x-5 items-center">
                <span class="flex gap-x-3 items-center"><span></span></span>
                <!-- <div class="border-l h-4"></div> -->
                <!-- <span class="flex gap-x-3 items-center"
                    ><span>Males</span>-<span>4</span></span
                  >
                  <div class="border-l h-4"></div>
                  <span class="flex gap-x-3 items-center"
                    ><span>Females</span>-<span>4</span></span
                  > -->
              </div>
            </div>
            <div class="flex gap-x-6 border-b px-4 py-2 justify-between">
              <span class="min-w-[150px]">Teenagers</span>

              <div class="flex gap-x-5 items-center">
                <span class="flex gap-x-3 items-center"><span>{{}}</span></span>
                <!-- <div class="border-l h-4"></div> -->
                <!-- <span class="flex gap-x-3 items-center"
                    ><span>Males</span>-<span>4</span></span
                  >
                  <div class="border-l h-4"></div>
                  <span class="flex gap-x-3 items-center"
                    ><span>Females</span>-<span>4</span></span
                  > -->
              </div>
            </div>
            <div class="flex gap-x-6 border-b px-4 py-2 justify-between">
              <span class="min-w-[150px]">Children</span>

              <div class="flex gap-x-5 items-center">
                <span class="flex gap-x-3 items-center"><span>{{}}</span></span>
                <!-- <div class="border-l h-4"></div> -->
                <!-- <span class="flex gap-x-3 items-center"
                    ><span>Males</span>-<span>4</span></span
                  >
                  <div class="border-l h-4"></div>
                  <span class="flex gap-x-3 items-center"
                    ><span>Females</span>-<span>4</span></span
                  > -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import Card from "@/components/Card";
import Icon from "@/components/Icon";
export default {
  components: {
    Card,
    Icon,
  },
  inject: {
    handleModal: {
      default: null, // You can specify a default value or set it to null
    },
  },
  methods: {
    print() {
      window.print();
    },
  },
};
</script>
<style lang="scss">
.vgt-wrap__actions-footer {
  border: none !important;
}

.invocie-btn {
  @apply hover:bg-slate-900 hover:text-slate-100 dark:hover:bg-slate-600 mr-3 mb-4;
}

@media print {
  .invocie-btn {
    display: none;
  }

  .sidebar-wrapper,
  .app-header,
  .site-footer,
  .shadow-deep {
    @apply hidden;
  }

  .content-wrapper {
    @apply w-full ml-0;
  }
}
</style>
