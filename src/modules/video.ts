import { getGlobal } from './utils.js';

// will set to true when video can be copied to texture
export let copyVideo = false;

// eslint-disable-next-line max-lines-per-function
export const setupVideo = (url: string): HTMLVideoElement => {

  const video = getGlobal().document.createElement('video');

  let playing = false;
  let timeupdate = false;

  video.autoplay = true;
  video.muted = true;
  video.loop = true;

  /*
   * Waiting for these 2 events ensures
   * there is data in the video
   */

  const checkReady = (): void => {

    if (playing && timeupdate) {

      copyVideo = true;

    }

  };

  video.addEventListener(
    'playing',
    () => {

      playing = true;
      checkReady();

    },
    true
  );

  video.addEventListener(
    'timeupdate',
    () => {

      timeupdate = true;
      checkReady();

    },
    true
  );

  video.src = url;
  video.play();

  return video;

};
