<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
interface BlockState {
  x: number
  y: number
  revealed?: boolean
  mine?: boolean
  flagged?: boolean
  adjacentMines: number
}
const Width = 10
const Height = 10
const state = reactive(Array.from({ length: Height },
  (_, y) => Array.from({ length: Width },
    (_, x): BlockState => ({
      x,
      y,
      adjacentMines: 0,
    }))))
// const user = useUserStore()
// const name = $ref(user.savedName)
const onClick = (x: number, y: number) => {
  // console.log(`clicked ${x}, ${y}`)
}
// const router = useRouter()
// const go = () => {
//   if (name)
//     router.push(`/hi/${encodeURIComponent(name)}`)
// }
function generateMines() {
  for (const row of state) {
    for (const block of row)
      block.mine = Math.random() < 0.2
  }
}
const directions = [
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
]
function updateNumbers() {
  state.forEach((row, y) => {
    row.forEach((block, x) => {
      if (block.mine)
        return
      directions.forEach(([dx, dy]) => {
        const x2 = x + dx
        const y2 = y + dy
        if (x2 < 0 || x2 >= Width || y2 < 0 || y2 >= Height)
          return
        if (state[y2][x2].mine)
          block.adjacentMines += 1
      })
    })
  })
}
generateMines()
updateNumbers()
// const { t } = useI18n()
</script>

<template>
  <div>
    Minesweeper
    <div v-for="row, y in state" :key="y">
      <button v-for="item, x in row" :key="x" w-10 h-10 border hover:bg-gray @click="onClick(x, y)">
        {{ item.mine ? 'x' : item.adjacentMines }}
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
