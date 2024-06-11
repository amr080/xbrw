var currentFundIndex = getMapInfo("fund_map", thisFundArray[0]);

switch (currentFundIndex) {
  case 0:
    $(".hero-short").addClass("hero-short__img-1");
    break;
  case 1:
    $(".hero-short").addClass("hero-short__img-2");
    break;
}
