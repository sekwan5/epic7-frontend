import CoImage from "@/components/common/CoImages";
import { Fragment, useEffect } from "react";

export default function ProfileImg(props: { id: string }) {
  const profileImage =
    "https://static.smilegatemegaport.com/event/live/epic7/guide/images/hero/c1159_s.png";
  const imgUrl = import.meta.env.VITE_ASSETS_URL;

  useEffect(() => {
    const img = new Image();
    img.src = `${imgUrl}/hero_images/${props.id}.png`;
  }, [props.id, imgUrl]);

  return (
    <Fragment>
      <CoImage
        className="profile-outline"
        src={"/images/img_profile_wrap.png"}
        alt="profile"
      />
      <CoImage
        className="profile-img"
        src={`${imgUrl}/hero_images/${props.id}.png` || profileImage}
        alt="profile"
      />
    </Fragment>
  );
}
