<template>
  <div>
    <TableComponent :table="table" @action-clicked="handleActionClicked" />
  </div>
</template>

<script lang="ts" setup>
import TableComponent from '@/components/Table.vue';

const table = {
  cols: [
    { title: 'STT', field: 'index', show: true, sort: false },
    { title: 'CheckStockCode', field: 'checkStockCode', show: true, sort: true },
    { title: 'Explain Note', field: 'explainNote', show: true, sort: true },
    { title: 'Request User', field: 'requestUserName', show: true, sort: true },
    { title: 'Request Date', field: 'requestDate', type: 'date', show: true, sort: true },
    { title: 'Actions', field: 'action', type: 'action', show: true, sort: false },
  ],
  data: [
    {
      checkStockCode: 'STK123',
      explainNote: 'Stock updated',
      requestUserName: 'John Doe',
      requestDate: '2024-01-01',
      actions: [
        { label: 'Edit', type: 'edit' },
        { label: 'Delete', type: 'delete' },
      ],
    },
    {
      checkStockCode: 'STK456',
      explainNote: 'Stock removed',
      requestUserName: 'Jane Smith',
      requestDate: '2024-01-05',
      actions: [
        { label: 'Edit', type: 'edit' },
        { label: 'Delete', type: 'delete' },
      ],
    },
  ],
};

// Handle action click event
function handleActionClicked(action: any, row: any) {
  if (action === 'edit') {
    console.log('Edit action clicked for row:', row);
  } else if (action === 'delete') {
    console.log('Delete action clicked for row:', row);
  }
}
</script>
