import LinkedinIcon from "../../../assets/client/icons/LinkedinIcon";
import TwitterIcon from "../../../assets/client/icons/TwitterIcon";
import InstagramIcon from "../../../assets/client/icons/InstagramIcon";
import FacebookIcon from "../../../assets/client/icons/FacebookIcon";

export default function IconsRow() {
  const Icons = [LinkedinIcon, TwitterIcon, InstagramIcon, FacebookIcon];
  return (
    <div className="flex items-center justify-center md:justify-start gap-4">
      {Icons.map((Icon) => (
        <Icon
          className={"cursor-pointer"}
          pathClassname={"fill-white"}
          key={Icon.toString()}
        />
      ))}
    </div>
  );
}
