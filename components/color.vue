<template>
  <div class="ngm-c-content">
    <div style="padding: 25px">
      <div class="ngm-block" :style="`background-color: #0f172a; margin: 0; margin-bottom: 25px`" />
      <div class="d-flex flex-wrap" style="margin-left: -5px; margin-right: -5px;">
        <template v-for="(arr, i) in colors">
          <template v-for="(v, ii) in arr">
            <div :key="`${i}-${ii}`" class="ngm-block" :style="`background-color: ${v}`" @click="$emit('close')" />
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    colors () {
      const color = [
        '#0f172a',
        '#111827',
        '#18181b',
        '#171717',
        '#1c1917',
        '#7f1d1d',
        '#7c2d12',
        '#78350f',
        '#713f12',
        '#365314',
        '#14532d',
        '#064e3b',
        '#134e4a',
        '#164e63',
        '#0c4a6e',
        '#1e3a8a',
        '#312e81',
        '#4c1d95',
        '#581c87',
        '#701a75',
        '#831843',
        '#881337'
      ]
      const col = []
      color.forEach((v, i) => {
        col[i] = []
        col[i].push(v)
        Array.from({ length: 9 }, (v, ii) => ii).forEach((iii) => {
          col[i].push(this.lightenDarkenColor((iii * 5) / 100, this.hexToRgbA(v)))
        })
      })
      return col
    }
  },
  methods: {
    hexToRgbA (hex) {
      let c
      if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('')
        if (c.length === 3) {
          c = [c[0], c[0], c[1], c[1], c[2], c[2]]
        }
        c = '0x' + c.join('')
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',1)'
      }
      throw new Error('Bad Hex')
    },
    lightenDarkenColor (p, c0, c1, l) {
      let r; let g; let b; let P; let f; let t; let h; const i = parseInt; const m = Math.round; let a = typeof (c1) === 'string'
      if (typeof (p) !== 'number' || p < -1 || p > 1 || typeof (c0) !== 'string' || (c0[0] !== 'r' && c0[0] !== '#') || (c1 && !a)) { return null }
      if (!this.pSBCr) {
        this.pSBCr = (d) => {
          let n = d.length; const x = {}
          if (n > 9) {
            // eslint-disable-next-line no-unused-expressions,no-sequences
            [r, g, b, a] = d = d.split(','), n = d.length
            if (n < 3 || n > 4) { return null }
            // eslint-disable-next-line no-unused-expressions,no-sequences
            x.r = i(r[3] === 'a' ? r.slice(5) : r.slice(4)), x.g = i(g), x.b = i(b), x.a = a ? parseFloat(a) : -1
          } else {
            if (n === 8 || n === 6 || n < 4) { return null }
            if (n < 6) { d = '#' + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : '') }
            d = i(d.slice(1), 16)
            // eslint-disable-next-line no-unused-expressions,no-sequences
            if (n === 9 || n === 5) { x.r = d >> 24 & 255, x.g = d >> 16 & 255, x.b = d >> 8 & 255, x.a = m((d & 255) / 0.255) / 1000 } else { x.r = d >> 16, x.g = d >> 8 & 255, x.b = d & 255, x.a = -1 }
          } return x
        }
      }
      // eslint-disable-next-line no-unused-expressions,no-sequences
      h = c0.length > 9, h = a ? c1.length > 9 ? true : c1 === 'c' ? !h : false : h, f = this.pSBCr(c0), P = p < 0, t = c1 && c1 !== 'c' ? this.pSBCr(c1) : P ? { r: 0, g: 0, b: 0, a: -1 } : { r: 255, g: 255, b: 255, a: -1 }, p = P ? p * -1 : p, P = 1 - p
      if (!f || !t) { return null }
      // eslint-disable-next-line no-unused-expressions,no-sequences
      if (l) { r = m(P * f.r + p * t.r), g = m(P * f.g + p * t.g), b = m(P * f.b + p * t.b) } else { r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5), g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5), b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5) }
      // eslint-disable-next-line no-unused-expressions,no-sequences
      a = f.a, t = t.a, f = a >= 0 || t >= 0, a = f ? a < 0 ? t : t < 0 ? a : a * P + t * p : 0
      // eslint-disable-next-line no-unused-expressions,no-sequences
      if (h) { return 'rgb' + (f ? 'a(' : '(') + r + ',' + g + ',' + b + (f ? ',' + m(a * 1000) / 1000 : '') + ')' } else { return '#' + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2) }
    }
  }
}
</script>
