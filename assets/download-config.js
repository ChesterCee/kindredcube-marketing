/* Add the live store URLs here when they are available. */
const KINDRED_CUBE_DOWNLOADS = {
  googlePlayUrl: "",
  appleAppStoreUrl: "https://apps.apple.com/app/idYOUR_APP_ID",
  androidApkPath: "../downloads/kindredcube.apk",
};

const androidCard = document.querySelector('[data-platform="android"]');
const appleCard = document.querySelector('[data-platform="apple"]');

if (androidCard) {
  if (KINDRED_CUBE_DOWNLOADS.googlePlayUrl) {
    androidCard.href = KINDRED_CUBE_DOWNLOADS.googlePlayUrl;
    androidCard.target = "_blank";
    androidCard.rel = "noopener";
  } else {
    androidCard.href = KINDRED_CUBE_DOWNLOADS.androidApkPath;
    androidCard.setAttribute("download", "kindredcube.apk");
  }
}

if (appleCard) {
  appleCard.href = KINDRED_CUBE_DOWNLOADS.appleAppStoreUrl;
}
