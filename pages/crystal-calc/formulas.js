export function min2crystals(x) {
  if (x > 1209600) {
    return null;
  }

  return Math.floor(
    x > 86400 && x <= 1209600
      ? (2700 / 1123200) * (x - 86400) + 300
      : x > 3600 && x <= 86400
      ? (270 / 82800) * (x - 3600) + 30
      : x > 60 && x <= 3600
      ? (29 / 3540) * (x - 60) + 1
      : 1
  );
}

export function credits2crystals(x) {
  if (x > 10000000) {
    return null;
  }

  return Math.floor(
    x > 1000000 && x <= 10000000
      ? (8000 / 9000000) * (x - 1000000) + 4000
      : x > 100000 && x <= 1000000
      ? (3000 / 900000) * (x - 100000) + 1000
      : x > 10000 && x <= 100000
      ? (850 / 90000) * (x - 10000) + 150
      : x > 1000 && x <= 10000
      ? (130 / 9000) * (x - 1000) + 20
      : x > 100 && x <= 1000
      ? (19 / 900) * (x - 100) + 1
      : 1
  );
}

export function hydrogen2crystals(x) {
  if (x > 1000000) {
    return null;
  }

  return Math.floor(
    x > 100000 && x <= 1000000
      ? (8000 / 900000) * (x - 100000) + 2000
      : x > 10000 && x <= 100000
      ? (1600 / 90000) * (x - 10000) + 400
      : x > 1000 && x <= 10000
      ? (320 / 9000) * (x - 1000) + 80
      : x > 100 && x <= 1000
      ? (65 / 900) * (x - 100) + 15
      : x > 10 && x <= 100
      ? (14 / 90) * (x - 10) + 1
      : 1
  );
}

export function crystals2sec(x) {
  if (x > 3000) {
    return null;
  }

  return Math.ceil(
    x > 300 && x <= 3000
      ? ((1123200 * (x - 300)) / 2700 + 86400) / 60
      : x > 30 && x <= 300
      ? ((82800 * (x - 30)) / 270 + 3600) / 60
      : x > 1 && x <= 30
      ? ((3540 * (x - 1)) / 29 + 60) / 60
      : (x = 1 ? 1 : 0)
  );
}

export function crystals2credits(x) {
  return Math.ceil(
    x > 12000
      ? 9999999
      : x > 4000 && x <= 12000
      ? (9000000 * (x - 4000)) / 8000 + 1000000
      : x > 1000 && x <= 4000
      ? (900000 * (x - 1000)) / 3000 + 100000
      : x > 150 && x <= 1000
      ? (90000 * (x - 150)) / 850 + 10000
      : x > 20 && x <= 150
      ? (9000 * (x - 20)) / 130 + 1000
      : x > 1 && x <= 20
      ? (900 * (x - 1)) / 19 + 100
      : 1
  );
}

export function crystals2hydrogen(x) {
  return Math.floor(
    x > 10000
      ? 999999
      : x > 2000 && x <= 10000
      ? (900000 * (x - 2000)) / 8000 + 100000
      : x > 400 && x <= 2000
      ? (90000 * (x - 400)) / 1600 + 10000
      : x > 80 && x <= 400
      ? (9000 * (x - 80)) / 320 + 1000
      : x > 15 && x <= 80
      ? (900 * (x - 15)) / 65 + 100
      : x > 1 && x <= 15
      ? (90 * (x - 1)) / 14 + 10
      : 1
  );
}
