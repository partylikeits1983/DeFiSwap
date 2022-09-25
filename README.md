

## Curve Swap Contract

```sh

           Alice
          │   ▲
          │   │
      DAI │   │   USDT
          │   │
          │   │
          ▼   │
┌─────────────┴────────────┐                 ┌──────────────────────────┐
│                          │       USDT      │                          │
│                          │◄────────────────┤                          │
│       SwapContract       │                 │      Curve Contract      │
│                          ├────────────────►│                          │
│                          │       DAI       │                          │
│                          │                 │                          │
└──────────────────────────┘                 └──────────────────────────┘

```

| Pool | address |
| ------ | ------ |
| 3Pool | [0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7](https://etherscan.io/address/0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7#code)|