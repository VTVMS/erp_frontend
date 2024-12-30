<template>
    <TableComponent :table="table" titleList="listEmployee">
        <template #customContent>
            <button @click="openDialog('add')" type="button" class="inline-flex items-center text-gray-100 justify-center px-3 rounded-md py-1 text-basemarker: font-medium focus:outline-none bg-[#3b82f6] hover:scale-105 hover:shadow-lg transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                {{ $t('add') }}
            </button>
            <div class="relative mt-1">
                <input type="text" id="searchInput" placeholder="Tìm kiếm ..." class="border border-gray-300 rounded-lg pl-10 w-full py-1" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="absolute inset-y-0 left-0 w-5 h-5 text-gray-400 ml-2 my-auto">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </div>
            <div class="dropdown-nav">
                <div class="dropdown-nav group relative">
                    <div class="dropdown-toggle-nav">
                        <div class="w-full flex justify-center border rounded-md bg-gray-200 p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                                />
                            </svg>
                        </div>
                    </div>
                    <div class="dropdown-content-nav border min-w-44 rounded-md right-0 absolute bg-gray-100 text-gray-800 shadow hidden group-hover:block z-50 p-2">
                        <div class="flex flex-col justify-center space-y-2">
                            <button type="button" class="inline-flex items-center border text-gray-700 justify-center min-w-40 rounded-md py-2 text-sm font-medium focus:outline-none bg-gray-200 hover:bg-gray-300" @click="sortData('checkStockCode')">
                                <svg class="size-6 mr-1" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve" fill="#000000">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="23" y1="26.1" x2="23" y2="5"></line>
                                        <polyline fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" points="18.7,21.8 23,26.1 27.3,21.8 "></polyline>
                                        <polyline fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" points="12,15 12,14 9.1,6 8.9,6 6,14 6,15 "></polyline>
                                        <line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="6" y1="12" x2="12" y2="12"></line>
                                        <polyline fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" points="5,18 12,18 12,19 6,25 6,26 13,26 "></polyline>
                                    </g>
                                </svg>
                                {{ $t('sort') }} A
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                                Z
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template #actions="{ row }">
            <button
                @click="openDialog('edit')"
                type="button"
                class="inline-flex items-center border text-gray-500 border-gray-400 justify-center px-1 rounded-md py-1 text-basemarker: font-medium focus:outline-none bg-gray-100 hover:bg-gray-100 hover:scale-105 hover:shadow-lg transition-transform duration-300"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
            </button>
            <button
                @click="openDialog('delete')"
                type="button"
                class="inline-flex items-center border text-red-400 border-red-300 justify-center px-1 rounded-md py-1 text-basemarker: font-medium focus:outline-none bg-gray-100 hover:bg-gray-100 hover:scale-105 hover:shadow-lg transition-transform duration-300"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                </svg>
            </button>
        </template>
    </TableComponent>

    <Dialog :isOpen="isDialogOpen" @update:isOpen="isDialogOpen = $event" :width="'700px'">
        <template #header>
            <div v-if="typeDialog === 'add'">
                <h1 class="text-2xl font-semibold flex items-center text-gray-800">
                    {{ $t('addEmployee') }}
                </h1>
            </div>
            <div v-if="typeDialog === 'edit'">
                <h1 class="text-2xl font-semibold flex items-center text-gray-800">
                    {{ $t('editEmployee') }}
                </h1>
            </div>
            <div v-if="typeDialog === 'delete'">
                <h1 class="text-2xl font-semibold flex items-center text-gray-800">
                    {{ $t('deleteEmployee') }}
                </h1>
            </div>
        </template>
        <template #content>
            <div v-if="typeDialog === 'add'">
                <div class="">
                    <label for="email" class="block text-base font-medium leading-6"> {{ $t('codeEmployee') }} </label>
                    <div class="mt-2.5">
                        <input
                            bind:value=""
                            type="email"
                            name="email"
                            id="email"
                            class="block w-full rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(-color-30)] sm:text-sm sm:leading-6"
                            placeholder="Tiêu đề bài viết"
                        />
                    </div>
                </div>
                <div class="grid gap-4 grid-cols-2 grid-rows-1">
                    <div class="mt-2.5">
                        <label for="email" class="block text-base font-medium leading-6"> {{ $t('password') }} </label>
                        <div class="mt-2.5">
                            <input
                                bind:value=""
                                type="email"
                                name="email"
                                id="email"
                                class="block w-full rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(-color-30)] sm:text-sm sm:leading-6"
                                placeholder="Tiêu đề bài viết"
                            />
                        </div>
                    </div>
                    <div class="mt-2.5">
                        <label for="position" class="block text-base font-medium leading-6">{{ $t('position') }}</label>
                        <select
                            id="position"
                            v-model="selectPosition"
                            name="user"
                            autocomplete="country-name"
                            class="mt-2.5 block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[var(-color-30)] sm:max-w-xs sm:text-sm sm:leading-6 dark:bg-gray-850 dark:ring-gray-600"
                        >
                            <option v-for="position in positions" :key="position.id" :value="JSON.stringify(position)">
                                {{ position.position_name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="grid gap-4 grid-cols-2 grid-rows-1">
                    <div class="mt-2.5">
                        <label for="email" class="block text-base font-medium leading-6"> {{ $t('email') }} </label>
                        <div class="mt-2.5">
                            <input
                                bind:value=""
                                type="email"
                                name="email"
                                id="email"
                                class="block w-full rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(-color-30)] sm:text-sm sm:leading-6"
                                placeholder="Tiêu đề bài viết"
                            />
                        </div>
                    </div>
                    <div class="mt-2.5">
                        <label for="email" class="block text-base font-medium leading-6"> {{ $t('phone') }} </label>
                        <div class="mt-2.5">
                            <input
                                bind:value=""
                                type="email"
                                name="email"
                                id="email"
                                class="block w-full rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(-color-30)] sm:text-sm sm:leading-6"
                                placeholder="Tiêu đề bài viết"
                            />
                        </div>
                    </div>
                </div>
                <div class="grid gap-4 grid-cols-2 grid-rows-1">
                    <div class="mt-2.5">
                        <label for="position" class="block text-base font-medium leading-6">{{ $t('sex') }}</label>
                        <select
                            id="position"
                            v-model="selectPosition"
                            name="user"
                            autocomplete="country-name"
                            class="mt-2.5 block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[var(-color-30)] sm:max-w-xs sm:text-sm sm:leading-6 dark:bg-gray-850 dark:ring-gray-600"
                        >
                            <option v-for="position in positions" :key="position.id" :value="JSON.stringify(position)">
                                {{ position.position_name }}
                            </option>
                        </select>
                    </div>
                    <div class="mt-2.5">
                        <label for="email" class="block text-base font-medium leading-6"> {{ $t('birthday') }} </label>
                        <div class="mt-2.5">
                            <input
                                bind:value=""
                                type="date"
                                name="email"
                                id="email"
                                class="block w-full rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(-color-30)] sm:text-sm sm:leading-6"
                                placeholder="Tiêu đề bài viết"
                            />
                        </div>
                    </div>
                </div>
                <div class="grid gap-4 grid-cols-2 grid-rows-1">
                    <div class="mt-2.5">
                        <label for="position" class="block text-base font-medium leading-6">{{ $t('sex') }}</label>
                        <select
                            id="department"
                            v-model="selectPosition"
                            name="user"
                            autocomplete="country-name"
                            class="mt-2.5 block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[var(-color-30)] sm:max-w-xs sm:text-sm sm:leading-6 dark:bg-gray-850 dark:ring-gray-600"
                        >
                            <option v-for="position in positions" :key="position.id" :value="JSON.stringify(position)">
                                {{ position.position_name }}
                            </option>
                        </select>
                    </div>
                    <div class="mt-2.5">
                        <label for="email" class="block text-base font-medium leading-6"> {{ $t('employeeApprove') }} </label>
                        <div class="mt-2.5">
                            <input
                                bind:value=""
                                type="text"
                                name="email"
                                id="email"
                                class="block w-full rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(-color-30)] sm:text-sm sm:leading-6"
                                placeholder="Tiêu đề bài viết"
                            />
                        </div>
                    </div>
                </div>
                <div class="mt-2.5">
                    <label for="email" class="block text-base font-medium leading-6">{{ $t('avatar') }}</label>

                    <div class="mt-2.5 py-3 w-auto rounded-lg border border-dashed border-gray-900/25 dark:bg-gray-850 dark:border-gray-600">
                        <div ref="container" class="text-gray-400 relative group min-w-16">
                            <div v-if="showImage">
                                <div class="relative w-20 h-20">
                                    <img :src="image" alt="Preview" class="border border-gray-300 rounded-md object-cover" />
                                    <button class="absolute top-0 right-0 text-gray-600" @click="removeFile">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                                            <path
                                                fill-rule="evenodd"
                                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div v-else>
                                <svg class="mx-auto h-20 w-20 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path
                                        fill-rule="evenodd"
                                        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <label for="file-upload" class="cursor-pointer rounded-full bg-gray-200 p-2 hover:text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>

                                    <input type="file" id="file-upload" name="file-upload" class="sr-only" @change="onChange" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="typeDialog === 'edit'">
                <div class="">
                    <label for="email" class="block text-base font-medium leading-6"> {{ $t('codeEmployee') }} </label>
                    <div class="mt-2.5">
                        <input
                            bind:value="codeEmployee"
                            type="email"
                            name="email"
                            id="email"
                            class="block w-full rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(-color-30)] sm:text-sm sm:leading-6"
                            placeholder="Tiêu đề bài viết"
                        />
                    </div>
                </div>
                <div class="grid gap-4 grid-cols-2 grid-rows-1">
                    <div class="mt-2.5">
                        <label for="email" class="block text-base font-medium leading-6"> {{ $t('password') }} </label>
                        <div class="mt-2.5">
                            <input
                                bind:value="password"
                                type="email"
                                name="email"
                                id="email"
                                class="block w-full rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(-color-30)] sm:text-sm sm:leading-6"
                                placeholder="Tiêu đề bài viết"
                            />
                        </div>
                    </div>
                    <div class="mt-2.5">
                        <label for="position" class="block text-base font-medium leading-6">{{ $t('position') }}</label>
                        <select
                            id="position"
                            v-model="selectPosition"
                            name="user"
                            autocomplete="country-name"
                            class="mt-2.5 block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[var(-color-30)] sm:max-w-xs sm:text-sm sm:leading-6 dark:bg-gray-850 dark:ring-gray-600"
                        >
                            <option v-for="position in positions" :key="position.id" :value="JSON.stringify(position)">
                                {{ position.position_name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="grid gap-4 grid-cols-2 grid-rows-1">
                    <div class="mt-2.5">
                        <label for="email" class="block text-base font-medium leading-6"> {{ $t('email') }} </label>
                        <div class="mt-2.5">
                            <input
                                bind:value=""
                                type="email"
                                name="email"
                                id="email"
                                class="block w-full rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(-color-30)] sm:text-sm sm:leading-6"
                                placeholder="Tiêu đề bài viết"
                            />
                        </div>
                    </div>
                    <div class="mt-2.5">
                        <label for="email" class="block text-base font-medium leading-6"> {{ $t('phone') }} </label>
                        <div class="mt-2.5">
                            <input
                                bind:value=""
                                type="email"
                                name="email"
                                id="email"
                                class="block w-full rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(-color-30)] sm:text-sm sm:leading-6"
                                placeholder="Tiêu đề bài viết"
                            />
                        </div>
                    </div>
                </div>
                <div class="grid gap-4 grid-cols-2 grid-rows-1">
                    <div class="mt-2.5">
                        <label for="position" class="block text-base font-medium leading-6">{{ $t('sex') }}</label>
                        <select
                            id="position"
                            v-model="selectPosition"
                            name="user"
                            autocomplete="country-name"
                            class="mt-2.5 block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[var(-color-30)] sm:max-w-xs sm:text-sm sm:leading-6 dark:bg-gray-850 dark:ring-gray-600"
                        >
                            <option v-for="position in positions" :key="position.id" :value="JSON.stringify(position)">
                                {{ position.position_name }}
                            </option>
                        </select>
                    </div>
                    <div class="mt-2.5">
                        <label for="email" class="block text-base font-medium leading-6"> {{ $t('birthday') }} </label>
                        <div class="mt-2.5">
                            <input
                                bind:value=""
                                type="date"
                                name="email"
                                id="email"
                                class="block w-full rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(-color-30)] sm:text-sm sm:leading-6"
                                placeholder="Tiêu đề bài viết"
                            />
                        </div>
                    </div>
                </div>
                <div class="grid gap-4 grid-cols-2 grid-rows-1">
                    <div class="mt-2.5">
                        <label for="position" class="block text-base font-medium leading-6">{{ $t('sex') }}</label>
                        <select
                            id="department"
                            v-model="selectPosition"
                            name="user"
                            autocomplete="country-name"
                            class="mt-2.5 block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[var(-color-30)] sm:max-w-xs sm:text-sm sm:leading-6 dark:bg-gray-850 dark:ring-gray-600"
                        >
                            <option v-for="position in positions" :key="position.id" :value="JSON.stringify(position)">
                                {{ position.position_name }}
                            </option>
                        </select>
                    </div>
                    <div class="mt-2.5">
                        <label for="email" class="block text-base font-medium leading-6"> {{ $t('employeeApprove') }} </label>
                        <div class="mt-2.5">
                            <input
                                bind:value=""
                                type="text"
                                name="email"
                                id="email"
                                class="block w-full rounded-md border-0 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(-color-30)] sm:text-sm sm:leading-6"
                                placeholder="Tiêu đề bài viết"
                            />
                        </div>
                    </div>
                </div>
                <div class="mt-2.5">
                    <label for="email" class="block text-base font-medium leading-6">{{ $t('avatar') }}</label>

                    <div class="mt-2.5 py-3 w-auto rounded-lg border border-dashed border-gray-900/25 dark:bg-gray-850 dark:border-gray-600">
                        <div ref="container" class="text-gray-400 relative group min-w-16">
                            <div v-if="showImage">
                                <div class="relative w-20 h-20">
                                    <img :src="image" alt="Preview" class="border border-gray-300 rounded-md object-cover" />
                                    <button class="absolute top-0 right-0 text-gray-600" @click="removeFile">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                                            <path
                                                fill-rule="evenodd"
                                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div v-else>
                                <svg class="mx-auto h-20 w-20 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path
                                        fill-rule="evenodd"
                                        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <label for="file-upload" class="cursor-pointer rounded-full bg-gray-200 p-2 hover:text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>

                                    <input type="file" id="file-upload" name="file-upload" class="sr-only" @change="onChange" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="typeDialog === 'delete'">
                <p>{{ $t('titleDelete') }}</p>
            </div>
        </template>

        <template #footer>
            <div v-if="typeDialog === 'add'">
                <button @click="handleAddItem" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 mr-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                    </svg>
                    {{ $t('save') }}
                </button>
            </div>
            <div v-if="typeDialog === 'edit'">
                <button @click="handleEditItem" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 mr-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                    </svg>
                    {{ $t('save') }}
                </button>
            </div>
            <div v-if="typeDialog === 'delete'">
                <button @click="handleDeleteItem" class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 mr-1">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                    </svg>

                    {{ $t('delete') }}
                </button>
            </div>
        </template>
    </Dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TableComponent from '@/components/Table.vue';
import Dialog from '@/components/Dialog.vue';

const table = ref({
    cols: [
        { title: 'avatar', field: 'avatar', type: 'img', show: true, sort: true },
        { title: 'codeEmployee', field: 'codeEmployee', show: true, sort: true },
        { title: 'name', field: 'name', show: true, sort: true },
        { title: 'department', field: 'department', show: true, sort: true },
        { title: 'position', field: 'position', show: true, sort: true },
        { title: 'phone', field: 'phone', show: true, sort: true },
        { title: 'email', field: 'email', show: true, sort: true },
    ],
    data: [
        {
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
            codeEmployee: 'Stock updated',
            name: 'John Doe',
            department: '2024-01-01',
            position: 'Stock updated',
            phone: 'John Doe',
            email: '2024-01-01',
        },
    ],
});

const isDialogOpen = ref(false);
const typeDialog = ref<'add' | 'edit' | 'delete'>('add');
const newItem = ref('');
const editedItem = ref('');

const showImage = ref(false);
const image = ref('');
const avatar = ref<File | null>(null);

const container = ref<HTMLElement | null>(null);

const onChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        const file = input.files[0];
        avatar.value = file;

        // Hiển thị hình ảnh xem trước
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                image.value = e.target.result as string;
                showImage.value = true;
            }
        };
        reader.readAsDataURL(file);
    }
};

const removeFile = () => {
    showImage.value = false;
    avatar.value = null;
    image.value = '';
};

const openDialog = (type: 'add' | 'edit' | 'delete') => {
    typeDialog.value = type;
    isDialogOpen.value = true;
};

const handleAddItem = () => {
    console.log('Adding item:', newItem.value);
};

const handleEditItem = () => {
    console.log('Editing item:', editedItem.value);
};

const handleDeleteItem = () => {
    console.log('Deleting item');
    // Logic for deleting item
};

function sortData(field: string) {
    table.value.data.sort((a: any, b: any) => {
        const valueA = a[field]?.toString().toLowerCase() || '';
        const valueB = b[field]?.toString().toLowerCase() || '';
        return valueA.localeCompare(valueB);
    });
}

const positions = ref([
    { id: 1, position_name: 'Vị trí 1' },
    { id: 2, position_name: 'Vị trí 2' },
    { id: 3, position_name: 'Vị trí 3' },
]);

const selectPosition = ref('');
</script>
