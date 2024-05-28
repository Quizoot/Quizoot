<template>
  <div class="loader"></div>
</template>

<script setup lang="ts"></script>

<style scoped>
.loader:is(.dark *) {
  --content-color: #fff;
}
.loader {
  --content-color: #000;
}
.loader {
  --w: 3ch;
  font-weight: bold;
  font-family: monospace;
  font-size: 30px;
  line-height: 1.4em;
  letter-spacing: var(--w);
  width: var(--w);
  overflow: hidden;
  white-space: nowrap;
  color: #0000;
  text-shadow:
    calc(0 * var(--w)) 0 var(--content-color),
    calc(-1 * var(--w)) 0 var(--content-color),
    calc(-2 * var(--w)) 0 var(--content-color),
    calc(-3 * var(--w)) 0 var(--content-color),
    calc(-4 * var(--w)) 0 var(--content-color),
    calc(-5 * var(--w)) 0 var(--content-color),
    calc(-6 * var(--w)) 0 var(--content-color),
    calc(-7 * var(--w)) 0 var(--content-color),
    calc(-8 * var(--w)) 0 var(--content-color),
    calc(-9 * var(--w)) 0 var(--content-color);
  animation: l20 2s infinite linear;
}
.loader:before {
  content: '...';
}

@keyframes l20 {
  9.09% {
    text-shadow:
      calc(0 * var(--w)) -10px var(--content-color),
      calc(-1 * var(--w)) 0 var(--content-color),
      calc(-2 * var(--w)) 0 var(--content-color),
      calc(-3 * var(--w)) 0 var(--content-color),
      calc(-4 * var(--w)) 0 var(--content-color),
      calc(-5 * var(--w)) 0 var(--content-color),
      calc(-6 * var(--w)) 0 var(--content-color),
      calc(-7 * var(--w)) 0 var(--content-color),
      calc(-8 * var(--w)) 0 var(--content-color),
      calc(-9 * var(--w)) 0 var(--content-color);
  }
  18.18% {
    text-shadow:
      calc(0 * var(--w)) 0 var(--content-color),
      calc(-1 * var(--w)) -10px var(--content-color),
      calc(-2 * var(--w)) 0 var(--content-color),
      calc(-3 * var(--w)) 0 var(--content-color),
      calc(-4 * var(--w)) 0 var(--content-color),
      calc(-5 * var(--w)) 0 var(--content-color),
      calc(-6 * var(--w)) 0 var(--content-color),
      calc(-7 * var(--w)) 0 var(--content-color),
      calc(-8 * var(--w)) 0 var(--content-color),
      calc(-9 * var(--w)) 0 var(--content-color);
  }
  27.27% {
    text-shadow:
      calc(0 * var(--w)) 0 var(--content-color),
      calc(-1 * var(--w)) 0 var(--content-color),
      calc(-2 * var(--w)) -10px var(--content-color),
      calc(-3 * var(--w)) 0 var(--content-color),
      calc(-4 * var(--w)) 0 var(--content-color),
      calc(-5 * var(--w)) 0 var(--content-color),
      calc(-6 * var(--w)) 0 var(--content-color),
      calc(-7 * var(--w)) 0 var(--content-color),
      calc(-8 * var(--w)) 0 var(--content-color),
      calc(-9 * var(--w)) 0 var(--content-color);
  }
  36.36% {
    text-shadow:
      calc(0 * var(--w)) 0 var(--content-color),
      calc(-1 * var(--w)) 0 var(--content-color),
      calc(-2 * var(--w)) 0 var(--content-color),
      calc(-3 * var(--w)) -10px var(--content-color),
      calc(-4 * var(--w)) 0 var(--content-color),
      calc(-5 * var(--w)) 0 var(--content-color),
      calc(-6 * var(--w)) 0 var(--content-color),
      calc(-7 * var(--w)) 0 var(--content-color),
      calc(-8 * var(--w)) 0 var(--content-color),
      calc(-9 * var(--w)) 0 var(--content-color);
  }
  45.45% {
    text-shadow:
      calc(0 * var(--w)) 0 var(--content-color),
      calc(-1 * var(--w)) 0 var(--content-color),
      calc(-2 * var(--w)) 0 var(--content-color),
      calc(-3 * var(--w)) 0 var(--content-color),
      calc(-4 * var(--w)) -10px var(--content-color),
      calc(-5 * var(--w)) 0 var(--content-color),
      calc(-6 * var(--w)) 0 var(--content-color),
      calc(-7 * var(--w)) 0 var(--content-color),
      calc(-8 * var(--w)) 0 var(--content-color),
      calc(-9 * var(--w)) 0 var(--content-color);
  }
  54.54% {
    text-shadow:
      calc(0 * var(--w)) 0 var(--content-color),
      calc(-1 * var(--w)) 0 var(--content-color),
      calc(-2 * var(--w)) 0 var(--content-color),
      calc(-3 * var(--w)) 0 var(--content-color),
      calc(-4 * var(--w)) 0 var(--content-color),
      calc(-5 * var(--w)) -10px var(--content-color),
      calc(-6 * var(--w)) 0 var(--content-color),
      calc(-7 * var(--w)) 0 var(--content-color),
      calc(-8 * var(--w)) 0 var(--content-color),
      calc(-9 * var(--w)) 0 var(--content-color);
  }
  63.63% {
    text-shadow:
      calc(0 * var(--w)) 0 var(--content-color),
      calc(-1 * var(--w)) 0 var(--content-color),
      calc(-2 * var(--w)) 0 var(--content-color),
      calc(-3 * var(--w)) 0 var(--content-color),
      calc(-4 * var(--w)) 0 var(--content-color),
      calc(-5 * var(--w)) 0 var(--content-color),
      calc(-6 * var(--w)) -10px var(--content-color),
      calc(-7 * var(--w)) 0 var(--content-color),
      calc(-8 * var(--w)) 0 var(--content-color),
      calc(-9 * var(--w)) 0 var(--content-color);
  }
  72.72% {
    text-shadow:
      calc(0 * var(--w)) 0 var(--content-color),
      calc(-1 * var(--w)) 0 var(--content-color),
      calc(-2 * var(--w)) 0 var(--content-color),
      calc(-3 * var(--w)) 0 var(--content-color),
      calc(-4 * var(--w)) 0 var(--content-color),
      calc(-5 * var(--w)) 0 var(--content-color),
      calc(-6 * var(--w)) 0 var(--content-color),
      calc(-7 * var(--w)) -10px var(--content-color),
      calc(-8 * var(--w)) 0 var(--content-color),
      calc(-9 * var(--w)) 0 var(--content-color);
  }
  81.81% {
    text-shadow:
      calc(0 * var(--w)) 0 var(--content-color),
      calc(-1 * var(--w)) 0 var(--content-color),
      calc(-2 * var(--w)) 0 var(--content-color),
      calc(-3 * var(--w)) 0 var(--content-color),
      calc(-4 * var(--w)) 0 var(--content-color),
      calc(-5 * var(--w)) 0 var(--content-color),
      calc(-6 * var(--w)) 0 var(--content-color),
      calc(-7 * var(--w)) 0 var(--content-color),
      calc(-8 * var(--w)) -10px var(--content-color),
      calc(-9 * var(--w)) 0 var(--content-color);
  }
  90.90% {
    text-shadow:
      calc(0 * var(--w)) 0 var(--content-color),
      calc(-1 * var(--w)) 0 var(--content-color),
      calc(-2 * var(--w)) 0 var(--content-color),
      calc(-3 * var(--w)) 0 var(--content-color),
      calc(-4 * var(--w)) 0 var(--content-color),
      calc(-5 * var(--w)) 0 var(--content-color),
      calc(-6 * var(--w)) 0 var(--content-color),
      calc(-7 * var(--w)) 0 var(--content-color),
      calc(-8 * var(--w)) 0 var(--content-color),
      calc(-9 * var(--w)) -10px var(--content-color);
  }
}
</style>
