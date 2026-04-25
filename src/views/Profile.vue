<template lang="pug">
.min-h-screen.flex.flex-col(v-if="staff", class="md:flex-row")
  // Left Side
  .w-full.relative.flex.flex-col.justify-center.p-10.bg-dekode-bg(class="md:w-1/2 lg:p-24")
    
    // Greeting
    .mb-12.z-10
      h1.font-spartan.font-bold.text-5xl.leading-tight(class="md:text-6xl lg:text-[5.5rem]")
        span.text-dekode-red Hello,
        span.text-black  I’m
        br
        span.text-black {{ staff.name }}.
    
    // Contact Info
    .flex.flex-col.gap-4.mb-12.z-10
      // Phone
      .flex.items-center.gap-4
        .w-8.h-8.bg-black.rounded-full.flex.items-center.justify-center
          // Phone Icon (SVG)
          svg.w-4.h-4.text-white(fill="currentColor" viewBox="0 0 24 24")
            path(d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.12.45 2.33.69 3.58.69a1 1 0 011 1v3.5a1 1 0 01-1 1A19.95 19.95 0 012 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.24 2.46.69 3.58a1 1 0 01-.27 1.11l-2.2 2.2z")
        span.font-roboto.font-bold.text-black.text-lg {{ staff.phone }}
      
      // Email
      .flex.items-center.gap-4
        .w-8.h-8.bg-black.rounded-full.flex.items-center.justify-center
          // Email Icon (SVG)
          svg.w-4.h-4.text-white(fill="currentColor" viewBox="0 0 24 24")
            path(d="M2 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm2 0v.011l8 3.555 8-3.555V6H4zm16 1.989l-8 3.556-8-3.556V18h16V7.989z")
        span.font-roboto.font-bold.text-black.text-lg {{ staff.email }}
    
    // Add to Contacts Button
    .z-10
      button.bg-black.text-white.font-roboto.font-bold.py-3.px-12.rounded-xl.shadow-lg.transition-transform.duration-200.ease-in-out(class="hover:scale-105 hover:bg-gray-800" @click="downloadVCard") Add to Contacts

    // Watermark Logo
    .absolute.bottom-10.left-10(class="lg:left-24 lg:bottom-12 z-0")
      img.opacity-40(src="../assets/dekode01.png" alt="dekode logo" class="w-32 md:w-40")

  // Right Side
  .w-full.bg-white.relative.flex.items-center.justify-center.overflow-hidden(class="md:w-1/2 min-h-[50vh]")
    // Background Red Logo
    img.absolute.object-contain.max-w-none.scale-125(src="../assets/dekode02.png" alt="Background" class="w-[120%] right-[-10%] opacity-90 z-0 md:w-[130%] md:right-[-15%]")
    
    // Profile Image
    img.absolute.bottom-0.z-10.rounded-full.aspect-square.object-contain(v-if="staff.image", :src="getImageUrl(staff.image)" alt="Profile Picture" class="h-[90%] md:h-[95%] left-1/2 transform -translate-x-1/2")

    //- // Profile Image
    //- img.absolute.bottom-0.z-10.rounded-full.aspect-square.object-contain(v-if="staff.image", :src="getImageUrl(staff.image)" alt="Profile Picture" class="h-[90%] md:h-[95%] left-1/2 transform -translate-x-1/2")

.min-h-screen.flex.items-center.justify-center.bg-dekode-bg(v-else)
  h1.font-spartan.font-bold.text-4xl User Not Found
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import staffData from '../data/staff.json'
import { saveAs } from 'file-saver'

const route = useRoute()
const staff = ref(null)

onMounted(() => {
  const id = route.params.id
  staff.value = staffData.find(s => s.id.toLowerCase() === id.toLowerCase())
})

// Dynamically resolve image path
const getImageUrl = (imageName) => {
  return new URL(`../assets/${imageName}`, import.meta.url).href
}

const downloadVCard = () => {
  if (!staff.value) return

  const nameParts = staff.value.name.split(' ')
  const lastName = nameParts.length > 1 ? nameParts.pop() : ''
  const firstName = nameParts.join(' ')

  // Constructing a vCard v3.0 string manually to ensure browser compatibility
  const vcard = `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${staff.value.name}
TEL;TYPE=CELL:${staff.value.phone}
EMAIL;TYPE=PREF,INTERNET:${staff.value.email}
ORG:Dekode
END:VCARD`

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' })
  saveAs(blob, `${staff.value.name.replace(/\s+/g, '_')}_contact.vcf`)
}
</script>

<style scoped>
/* Ensure standard reset is applied if needed */
</style>
