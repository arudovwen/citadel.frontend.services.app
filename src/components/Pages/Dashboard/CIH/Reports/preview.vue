<template>
  <div>
    <div class="lg:flex justify-between flex-wrap items-center">
      <h1 class="text-slate-900 font-semibold text-lg">CIH CENTER NAME</h1>
      <div class="flex lg:justify-end items-center flex-wrap">
        <button
          type="button"
          @click="print"
          class="invocie-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900"
        >
          <span class="text-lg"><Icon icon="heroicons:printer" /></span>
          <span>Print</span>
        </button>
      </div>
    </div>
    <Card bodyClass="p-6">
      <div class="max-w-[980px] mx-auto my-6 rounded-md overflow-x-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div>
            <h6 class="text-xs font-semibold text-slate-400">Activity name</h6>
            <p class="text-base font-semibold text-slate-900">John Doe</p>
          </div>

          <div>
            <h6 class="text-xs font-semibold text-slate-400">Activity type</h6>
            <p class="text-base font-semibold text-slate-900">John Doe</p>
          </div>
          <div>
            <h6 class="text-xs font-semibold text-slate-400">Activity date</h6>
            <p class="text-base font-semibold text-slate-900">John Doe</p>
          </div>

          <div class="col-span-1 md:col-span-2">
            <h6 class="text-xs font-semibold text-slate-400">Summary</h6>
            <p class="text-base font-semibold text-slate-900">John Doe</p>
          </div>
        </div>
        <div>
          <div class="">
            <h2 class="text-slate-900 font-medium text-base mb-2">
              Attendance
            </h2>
            <div class="flex-1 border rounded">
              <div class="flex gap-x-6 border-b px-4 py-2">
                <span class="min-w-[150px]">Adults</span>

                <div class="flex gap-x-5 items-center">
                  <span class="flex gap-x-3 items-center"
                    ><span>Total</span>-<span>20</span></span
                  >
                  <div class="border-l h-4"></div>
                  <span class="flex gap-x-3 items-center"
                    ><span>Males</span>-<span>4</span></span
                  >
                  <div class="border-l h-4"></div>
                  <span class="flex gap-x-3 items-center"
                    ><span>Females</span>-<span>4</span></span
                  >
                </div>
              </div>
              <div class="flex gap-x-6 border-b px-4 py-2">
                <span class="min-w-[150px]">Youths</span>

                <div class="flex gap-x-5 items-center">
                  <span class="flex gap-x-3 items-center"
                    ><span>Total</span>-<span>20</span></span
                  >
                  <div class="border-l h-4"></div>
                  <span class="flex gap-x-3 items-center"
                    ><span>Males</span>-<span>4</span></span
                  >
                  <div class="border-l h-4"></div>
                  <span class="flex gap-x-3 items-center"
                    ><span>Females</span>-<span>4</span></span
                  >
                </div>
              </div>
              <div class="flex gap-x-6 border-b px-4 py-2">
                <span class="min-w-[150px]">Teenagers</span>

                <div class="flex gap-x-5 items-center">
                  <span class="flex gap-x-3 items-center"
                    ><span>Total</span>-<span>20</span></span
                  >
                  <div class="border-l h-4"></div>
                  <span class="flex gap-x-3 items-center"
                    ><span>Males</span>-<span>4</span></span
                  >
                  <div class="border-l h-4"></div>
                  <span class="flex gap-x-3 items-center"
                    ><span>Females</span>-<span>4</span></span
                  >
                </div>
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
