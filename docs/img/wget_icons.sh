#!/bin/sh
echo "WGET Script to download Icons4Menu"
echo "----------------------------------"
echo "Source: https://niebert.github.io/icons4menu/wget_icons.sh"
echo "Check if current folder name is 'img' - then script started from folder 'img'."
currentfolder=${PWD##*/}
if [ "$currentfolder" = "img" ]; then
    echo "Started in 'img' - change to parent directory"
    cd ..
else
    echo "Not started in directory 'img' - start script directly!"
fi;
 
DOWNLOAD_FOLDER="icons-svg"
 
if [ "$1" = "svg" ]; then
  echo "Download SVG"
  DOWNLOAD_FOLDER="icons-svg"
fi
 
if [ "$1" = "png" ]; then
  echo "Download PNG Icons"
  DOWNLOAD_FOLDER="icons-png"
fi
 
mkdir img 
wget https://niebert.github.io/icons4menu/README.html -O img/README_Icons4Menu.html
wget https://niebert.github.io/icons4menu/LICENSE_Jquery_Mobile.txt -O img/LICENSE_Jquery_Mobile.txt
wget https://niebert.github.io/icons4menu/img/./img/json4icons.json -O img/./img/json4icons.json
wget https://niebert.github.io/icons4menu/update_wget_icons.sh -O img/update_wget_icons.sh
 
if [ "$DOWNLOAD_FOLDER" = "icons-png" ]; then
    echo "Download icons-png"
    mkdir img/icons-png 
 
    wget https://niebert.github.io/icons4menu/img/icons-png/action-black.png -O img/icons-png/action-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/action-white.png -O img/icons-png/action-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/alert-black.png -O img/icons-png/alert-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/alert-white.png -O img/icons-png/alert-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/arrow-d-black.png -O img/icons-png/arrow-d-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/arrow-d-l-black.png -O img/icons-png/arrow-d-l-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/arrow-d-l-white.png -O img/icons-png/arrow-d-l-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/arrow-d-r-black.png -O img/icons-png/arrow-d-r-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/arrow-d-r-white.png -O img/icons-png/arrow-d-r-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/arrow-d-white.png -O img/icons-png/arrow-d-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/arrow-l-black.png -O img/icons-png/arrow-l-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/arrow-l-white.png -O img/icons-png/arrow-l-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/arrow-r-black.png -O img/icons-png/arrow-r-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/arrow-r-white.png -O img/icons-png/arrow-r-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/arrow-u-black.png -O img/icons-png/arrow-u-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/arrow-u-l-black.png -O img/icons-png/arrow-u-l-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/arrow-u-l-white.png -O img/icons-png/arrow-u-l-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/arrow-u-r-black.png -O img/icons-png/arrow-u-r-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/arrow-u-r-white.png -O img/icons-png/arrow-u-r-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/arrow-u-white.png -O img/icons-png/arrow-u-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/audio-black.png -O img/icons-png/audio-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/audio-white.png -O img/icons-png/audio-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/back-black.png -O img/icons-png/back-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/back-white.png -O img/icons-png/back-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/bars-black.png -O img/icons-png/bars-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/bars-white.png -O img/icons-png/bars-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/bullets-black.png -O img/icons-png/bullets-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/bullets-white.png -O img/icons-png/bullets-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/calendar-black.png -O img/icons-png/calendar-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/calendar-white.png -O img/icons-png/calendar-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/camera-black.png -O img/icons-png/camera-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/camera-white.png -O img/icons-png/camera-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/carat-d-black.png -O img/icons-png/carat-d-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/carat-d-white.png -O img/icons-png/carat-d-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/carat-l-black.png -O img/icons-png/carat-l-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/carat-l-white.png -O img/icons-png/carat-l-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/carat-r-black.png -O img/icons-png/carat-r-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/carat-r-white.png -O img/icons-png/carat-r-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/carat-u-black.png -O img/icons-png/carat-u-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/carat-u-white.png -O img/icons-png/carat-u-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/check-black.png -O img/icons-png/check-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/check-white.png -O img/icons-png/check-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/clock-black.png -O img/icons-png/clock-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/clock-white.png -O img/icons-png/clock-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/cloud-black.png -O img/icons-png/cloud-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/cloud-white.png -O img/icons-png/cloud-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/comment-black.png -O img/icons-png/comment-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/comment-white.png -O img/icons-png/comment-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/delete-black.png -O img/icons-png/delete-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/delete-white.png -O img/icons-png/delete-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/edit-black.png -O img/icons-png/edit-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/edit-white.png -O img/icons-png/edit-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/eye-black.png -O img/icons-png/eye-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/eye-white.png -O img/icons-png/eye-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/forbidden-black.png -O img/icons-png/forbidden-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/forbidden-white.png -O img/icons-png/forbidden-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/forward-black.png -O img/icons-png/forward-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/forward-white.png -O img/icons-png/forward-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/gear-black.png -O img/icons-png/gear-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/gear-white.png -O img/icons-png/gear-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/grid-black.png -O img/icons-png/grid-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/grid-white.png -O img/icons-png/grid-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/heart-black.png -O img/icons-png/heart-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/heart-white.png -O img/icons-png/heart-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/home-black.png -O img/icons-png/home-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/home-white.png -O img/icons-png/home-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/info-black.png -O img/icons-png/info-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/info-white.png -O img/icons-png/info-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/location-black.png -O img/icons-png/location-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/location-white.png -O img/icons-png/location-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/lock-black.png -O img/icons-png/lock-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/lock-white.png -O img/icons-png/lock-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/mail-black.png -O img/icons-png/mail-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/mail-white.png -O img/icons-png/mail-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/minus-black.png -O img/icons-png/minus-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/minus-white.png -O img/icons-png/minus-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/navigation-black.png -O img/icons-png/navigation-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/navigation-white.png -O img/icons-png/navigation-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/phone-black.png -O img/icons-png/phone-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/phone-white.png -O img/icons-png/phone-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/plus-black.png -O img/icons-png/plus-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/plus-white.png -O img/icons-png/plus-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/power-black.png -O img/icons-png/power-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/power-white.png -O img/icons-png/power-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/recycle-black.png -O img/icons-png/recycle-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/recycle-white.png -O img/icons-png/recycle-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/refresh-black.png -O img/icons-png/refresh-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/refresh-white.png -O img/icons-png/refresh-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/search-black.png -O img/icons-png/search-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/search-white.png -O img/icons-png/search-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/shop-black.png -O img/icons-png/shop-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/shop-white.png -O img/icons-png/shop-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/star-black.png -O img/icons-png/star-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/star-white.png -O img/icons-png/star-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/tag-black.png -O img/icons-png/tag-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/tag-white.png -O img/icons-png/tag-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/user-black.png -O img/icons-png/user-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/user-white.png -O img/icons-png/user-white.png
    wget https://niebert.github.io/icons4menu/img/icons-png/video-black.png -O img/icons-png/video-black.png
    wget https://niebert.github.io/icons4menu/img/icons-png/video-white.png -O img/icons-png/video-white.png
fi
 
if [ "$DOWNLOAD_FOLDER" = "icons-svg" ]; then
    echo "Download icons-svg"
    mkdir img/icons-svg 
 
    wget https://niebert.github.io/icons4menu/img/icons-svg/action-black.svg -O img/icons-svg/action-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/action-white.svg -O img/icons-svg/action-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/action.svg -O img/icons-svg/action.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/alert-black.svg -O img/icons-svg/alert-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/alert-white.svg -O img/icons-svg/alert-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/alert.svg -O img/icons-svg/alert.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/arrow-d-black.svg -O img/icons-svg/arrow-d-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/arrow-d-l-black.svg -O img/icons-svg/arrow-d-l-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/arrow-d-l-white.svg -O img/icons-svg/arrow-d-l-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/arrow-d-r-black.svg -O img/icons-svg/arrow-d-r-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/arrow-d-r-white.svg -O img/icons-svg/arrow-d-r-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/arrow-d-white.svg -O img/icons-svg/arrow-d-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/arrow-l-black.svg -O img/icons-svg/arrow-l-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/arrow-l-white.svg -O img/icons-svg/arrow-l-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/arrow-r-black.svg -O img/icons-svg/arrow-r-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/arrow-r-white.svg -O img/icons-svg/arrow-r-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/arrow-u-black.svg -O img/icons-svg/arrow-u-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/arrow-u-l-black.svg -O img/icons-svg/arrow-u-l-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/arrow-u-l-white.svg -O img/icons-svg/arrow-u-l-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/arrow-u-r-black.svg -O img/icons-svg/arrow-u-r-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/arrow-u-r-white.svg -O img/icons-svg/arrow-u-r-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/arrow-u-white.svg -O img/icons-svg/arrow-u-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/audio-black.svg -O img/icons-svg/audio-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/audio-white.svg -O img/icons-svg/audio-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/back-black.svg -O img/icons-svg/back-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/back-white.svg -O img/icons-svg/back-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/bars-black.svg -O img/icons-svg/bars-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/bars-white.svg -O img/icons-svg/bars-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/bullets-black.svg -O img/icons-svg/bullets-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/bullets-white.svg -O img/icons-svg/bullets-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/calendar-black.svg -O img/icons-svg/calendar-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/calendar-white.svg -O img/icons-svg/calendar-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/camera-black.svg -O img/icons-svg/camera-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/camera-white.svg -O img/icons-svg/camera-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/carat-d-black.svg -O img/icons-svg/carat-d-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/carat-d-white.svg -O img/icons-svg/carat-d-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/carat-l-black.svg -O img/icons-svg/carat-l-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/carat-l-white.svg -O img/icons-svg/carat-l-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/carat-r-black.svg -O img/icons-svg/carat-r-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/carat-r-white.svg -O img/icons-svg/carat-r-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/carat-u-black.svg -O img/icons-svg/carat-u-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/carat-u-white.svg -O img/icons-svg/carat-u-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/check-black.svg -O img/icons-svg/check-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/check-white.svg -O img/icons-svg/check-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/clock-black.svg -O img/icons-svg/clock-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/clock-white.svg -O img/icons-svg/clock-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/cloud-black.svg -O img/icons-svg/cloud-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/cloud-white.svg -O img/icons-svg/cloud-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/comment-black.svg -O img/icons-svg/comment-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/comment-white.svg -O img/icons-svg/comment-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/delete-black.svg -O img/icons-svg/delete-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/delete-white.svg -O img/icons-svg/delete-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/edit-black.svg -O img/icons-svg/edit-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/edit-white.svg -O img/icons-svg/edit-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/eye-black.svg -O img/icons-svg/eye-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/eye-white.svg -O img/icons-svg/eye-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-audio-backward-black.svg -O img/icons-svg/fa-audio-backward-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-audio-backward-white.svg -O img/icons-svg/fa-audio-backward-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-audio-backward.svg -O img/icons-svg/fa-audio-backward.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-audio-eject-black.svg -O img/icons-svg/fa-audio-eject-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-audio-eject-white.svg -O img/icons-svg/fa-audio-eject-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-audio-eject.svg -O img/icons-svg/fa-audio-eject.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-audio-forward-black.svg -O img/icons-svg/fa-audio-forward-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-audio-forward-white.svg -O img/icons-svg/fa-audio-forward-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-audio-forward.svg -O img/icons-svg/fa-audio-forward.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-audio-pause-black.svg -O img/icons-svg/fa-audio-pause-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-audio-pause-white.svg -O img/icons-svg/fa-audio-pause-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-audio-pause.svg -O img/icons-svg/fa-audio-pause.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-audio-play-black.svg -O img/icons-svg/fa-audio-play-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-audio-play-white.svg -O img/icons-svg/fa-audio-play-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-audio-play.svg -O img/icons-svg/fa-audio-play.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-audio-record-black.svg -O img/icons-svg/fa-audio-record-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-audio-record-white.svg -O img/icons-svg/fa-audio-record-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-audio-record.svg -O img/icons-svg/fa-audio-record.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-audio-stop-black.svg -O img/icons-svg/fa-audio-stop-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-audio-stop-white.svg -O img/icons-svg/fa-audio-stop-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-audio-stop.svg -O img/icons-svg/fa-audio-stop.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-barcode-black.svg -O img/icons-svg/fa-barcode-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-barcode-white.svg -O img/icons-svg/fa-barcode-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-barcode.svg -O img/icons-svg/fa-barcode.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-book-black.svg -O img/icons-svg/fa-book-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-book-white.svg -O img/icons-svg/fa-book-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-book.svg -O img/icons-svg/fa-book.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-camera-black.svg -O img/icons-svg/fa-camera-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-camera-white.svg -O img/icons-svg/fa-camera-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-camera.svg -O img/icons-svg/fa-camera.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-cancel-black.svg -O img/icons-svg/fa-cancel-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-cancel-red.svg -O img/icons-svg/fa-cancel-red.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-cancel-white.svg -O img/icons-svg/fa-cancel-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-cancel.svg -O img/icons-svg/fa-cancel.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-chart-pie-black.svg -O img/icons-svg/fa-chart-pie-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-chart-pie-white.svg -O img/icons-svg/fa-chart-pie-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-chart-pie.svg -O img/icons-svg/fa-chart-pie.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-copy-black.svg -O img/icons-svg/fa-copy-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-copy-white.svg -O img/icons-svg/fa-copy-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-copy.svg -O img/icons-svg/fa-copy.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-edit-black.svg -O img/icons-svg/fa-edit-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-edit-white.svg -O img/icons-svg/fa-edit-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-edit.svg -O img/icons-svg/fa-edit.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-enumeration-black.svg -O img/icons-svg/fa-enumeration-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-enumeration-white.svg -O img/icons-svg/fa-enumeration-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-enumeration.svg -O img/icons-svg/fa-enumeration.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-envelope-black.svg -O img/icons-svg/fa-envelope-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-envelope-white.svg -O img/icons-svg/fa-envelope-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-envelope.svg -O img/icons-svg/fa-envelope.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-file-archive-black.svg -O img/icons-svg/fa-file-archive-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-file-archive-white.svg -O img/icons-svg/fa-file-archive-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-file-archive.svg -O img/icons-svg/fa-file-archive.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-file-save-black.svg -O img/icons-svg/fa-file-save-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-file-save-white.svg -O img/icons-svg/fa-file-save-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-file-save.svg -O img/icons-svg/fa-file-save.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-folder-open-black.svg -O img/icons-svg/fa-folder-open-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-folder-open-white.svg -O img/icons-svg/fa-folder-open-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-folder-open.svg -O img/icons-svg/fa-folder-open.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-font-black.svg -O img/icons-svg/fa-font-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-font-white.svg -O img/icons-svg/fa-font-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-font.svg -O img/icons-svg/fa-font.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-globe-black.svg -O img/icons-svg/fa-globe-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-globe-white.svg -O img/icons-svg/fa-globe-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-globe.svg -O img/icons-svg/fa-globe.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-hamburger-icon-black.svg -O img/icons-svg/fa-hamburger-icon-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-hamburger-icon-white.svg -O img/icons-svg/fa-hamburger-icon-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-hamburger-icon.svg -O img/icons-svg/fa-hamburger-icon.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-harddisk-black.svg -O img/icons-svg/fa-harddisk-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-harddisk-white.svg -O img/icons-svg/fa-harddisk-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-harddisk.svg -O img/icons-svg/fa-harddisk.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-key-black.svg -O img/icons-svg/fa-key-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-key-white.svg -O img/icons-svg/fa-key-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-key.svg -O img/icons-svg/fa-key.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-language-black.svg -O img/icons-svg/fa-language-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-language-white.svg -O img/icons-svg/fa-language-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-language.svg -O img/icons-svg/fa-language.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-line-chart-black.svg -O img/icons-svg/fa-line-chart-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-line-chart-white.svg -O img/icons-svg/fa-line-chart-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-line-chart.svg -O img/icons-svg/fa-line-chart.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-list-black.svg -O img/icons-svg/fa-list-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-list-white.svg -O img/icons-svg/fa-list-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-list.svg -O img/icons-svg/fa-list.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-minus-square-black.svg -O img/icons-svg/fa-minus-square-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-minus-square-white.svg -O img/icons-svg/fa-minus-square-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-minus-square.svg -O img/icons-svg/fa-minus-square.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-paste-black.svg -O img/icons-svg/fa-paste-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-paste-white.svg -O img/icons-svg/fa-paste-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-paste.svg -O img/icons-svg/fa-paste.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-picture-black.svg -O img/icons-svg/fa-picture-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-picture-white.svg -O img/icons-svg/fa-picture-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-picture.svg -O img/icons-svg/fa-picture.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-plus-square-black.svg -O img/icons-svg/fa-plus-square-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-plus-square-white.svg -O img/icons-svg/fa-plus-square-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-plus-square.svg -O img/icons-svg/fa-plus-square.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-print-black.svg -O img/icons-svg/fa-print-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-print-white.svg -O img/icons-svg/fa-print-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-print.svg -O img/icons-svg/fa-print.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-qrcode-black.svg -O img/icons-svg/fa-qrcode-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-qrcode-white.svg -O img/icons-svg/fa-qrcode-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-qrcode.svg -O img/icons-svg/fa-qrcode.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-settings-black.svg -O img/icons-svg/fa-settings-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-settings-white.svg -O img/icons-svg/fa-settings-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-settings.svg -O img/icons-svg/fa-settings.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-signin-black.svg -O img/icons-svg/fa-signin-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-signin-white.svg -O img/icons-svg/fa-signin-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-signin.svg -O img/icons-svg/fa-signin.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-signout-black.svg -O img/icons-svg/fa-signout-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-signout-white.svg -O img/icons-svg/fa-signout-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-signout.svg -O img/icons-svg/fa-signout.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-sort-black.svg -O img/icons-svg/fa-sort-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-sort-white.svg -O img/icons-svg/fa-sort-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-sort.svg -O img/icons-svg/fa-sort.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-spinner-black.svg -O img/icons-svg/fa-spinner-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-spinner-white.svg -O img/icons-svg/fa-spinner-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-spinner.svg -O img/icons-svg/fa-spinner.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-tablet-black.svg -O img/icons-svg/fa-tablet-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-tablet-white.svg -O img/icons-svg/fa-tablet-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-tablet.svg -O img/icons-svg/fa-tablet.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-trash-black.svg -O img/icons-svg/fa-trash-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-trash-white.svg -O img/icons-svg/fa-trash-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-trash.svg -O img/icons-svg/fa-trash.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-truck-black.svg -O img/icons-svg/fa-truck-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-truck-white.svg -O img/icons-svg/fa-truck-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-truck.svg -O img/icons-svg/fa-truck.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-undo-black.svg -O img/icons-svg/fa-undo-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-undo-white.svg -O img/icons-svg/fa-undo-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-undo.svg -O img/icons-svg/fa-undo.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-vr-headset-black.svg -O img/icons-svg/fa-vr-headset-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-vr-headset-white.svg -O img/icons-svg/fa-vr-headset-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/fa-vr-headset.svg -O img/icons-svg/fa-vr-headset.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/forbidden-black.svg -O img/icons-svg/forbidden-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/forbidden-white.svg -O img/icons-svg/forbidden-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/forward-black.svg -O img/icons-svg/forward-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/forward-white.svg -O img/icons-svg/forward-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/gear-black.svg -O img/icons-svg/gear-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/gear-white.svg -O img/icons-svg/gear-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/grid-black.svg -O img/icons-svg/grid-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/grid-white.svg -O img/icons-svg/grid-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/heart-black.svg -O img/icons-svg/heart-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/heart-white.svg -O img/icons-svg/heart-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/home-black.svg -O img/icons-svg/home-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/home-white.svg -O img/icons-svg/home-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/info-black.svg -O img/icons-svg/info-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/info-white.svg -O img/icons-svg/info-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/location-black.svg -O img/icons-svg/location-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/location-white.svg -O img/icons-svg/location-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/lock-black.svg -O img/icons-svg/lock-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/lock-white.svg -O img/icons-svg/lock-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/mail-black.svg -O img/icons-svg/mail-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/mail-white.svg -O img/icons-svg/mail-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/minus-black.svg -O img/icons-svg/minus-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/minus-white.svg -O img/icons-svg/minus-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/navigation-black.svg -O img/icons-svg/navigation-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/navigation-white.svg -O img/icons-svg/navigation-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/phone-black.svg -O img/icons-svg/phone-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/phone-white.svg -O img/icons-svg/phone-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/plus-black.svg -O img/icons-svg/plus-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/plus-white.svg -O img/icons-svg/plus-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/power-black.svg -O img/icons-svg/power-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/power-white.svg -O img/icons-svg/power-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/recycle-black.svg -O img/icons-svg/recycle-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/recycle-white.svg -O img/icons-svg/recycle-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/refresh-black.svg -O img/icons-svg/refresh-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/refresh-white.svg -O img/icons-svg/refresh-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/search-black.svg -O img/icons-svg/search-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/search-white.svg -O img/icons-svg/search-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/shop-black.svg -O img/icons-svg/shop-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/shop-white.svg -O img/icons-svg/shop-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/star-black.svg -O img/icons-svg/star-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/star-white.svg -O img/icons-svg/star-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/tag-black.svg -O img/icons-svg/tag-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/tag-white.svg -O img/icons-svg/tag-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/user-black.svg -O img/icons-svg/user-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/user-white.svg -O img/icons-svg/user-white.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/video-black.svg -O img/icons-svg/video-black.svg
    wget https://niebert.github.io/icons4menu/img/icons-svg/video-white.svg -O img/icons-svg/video-white.svg
fi
