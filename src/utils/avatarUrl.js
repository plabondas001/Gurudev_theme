export function getUserAvatarSrc(user) {
  if (!user) return "/Img/logo/ge_main_logo.png";
  return (
    user.avatarDataUrl ||
    user.photoURL ||
    user.photoUrl ||
    user.picture ||
    user.image ||
    user.img ||
    "/Img/logo/ge_main_logo.png"
  );
}

/** Props for <img /> — Google avatars often 403 without no-referrer. */
export function getUserAvatarImgProps(user) {
  return {
    src: getUserAvatarSrc(user),
    referrerPolicy: "no-referrer",
  };
}