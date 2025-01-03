<template>
    <div ref="chartdiv" style="width: 100%; height: 550px"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, onBeforeUnmount } from 'vue';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

export default defineComponent({
    name: 'PieChartComponent',
    setup() {
        const chartdiv = ref<HTMLElement | null>(null);
        let root: am5.Root;

        onMounted(() => {
            if (chartdiv.value) {
                // Create root element
                root = am5.Root.new(chartdiv.value);
                root.setThemes([am5themes_Animated.new(root)]);
                const chart = root.container.children.push(
                    am5percent.PieChart.new(root, {
                        layout: root.verticalLayout,
                        innerRadius: am5.percent(50),
                    }),
                );

                // Create series
                const series = chart.series.push(
                    am5percent.PieSeries.new(root, {
                        valueField: 'value',
                        categoryField: 'category',
                        alignLabels: false,
                    }),
                );

                series.labels.template.setAll({
                    textType: 'circular',
                    centerX: 0,
                    centerY: 0,
                });

                // Set data
                const data = [
                    { value: 10, category: 'One' },
                    { value: 9, category: 'Two' },
                    { value: 6, category: 'Three' },
                ];
                series.data.setAll(data);

                // Create legend
                const legend = chart.children.push(
                    am5.Legend.new(root, {
                        centerX: am5.percent(50),
                        x: am5.percent(50),
                        marginTop: 15,
                        marginBottom: 15,
                    }),
                );
                legend.data.setAll(series.dataItems);

                // Play initial animation
                series.appear(1000, 100);

                // Add total label in the center
                const total = data.reduce((acc, item) => acc + item.value, 0);

                const totalLabel = chart.children.push(
                    am5.Label.new(root, {
                        text: `Total: ${total}`,
                        fontSize: 20,
                        fill: am5.color(0x000000), // Text color
                        centerX: am5.percent(-500),
                        centerY: am5.percent(500),
                    }),
                );
            }
        });

        onBeforeUnmount(() => {
            if (root) {
                root.dispose();
            }
        });

        return {
            chartdiv,
        };
    },
});
</script>

<style scoped>
/* Ẩn logo amCharts */
#chartdiv .amChartsLogo {
    display: none !important;
}
</style>
